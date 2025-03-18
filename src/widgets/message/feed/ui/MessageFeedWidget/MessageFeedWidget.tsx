import { MouseEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModalControls } from '@shared/hooks';
import { useAppSelector, setChatLoadingStatus, markMessageAsEditing } from '@shared/state';
import { Scroller } from '@features/message/view-messages';
import type { Chat, ID, MessageAction } from '@shared/types';
import s from './messagefeedwidget.module.css';

type Props = {
  chat: Chat;
};

export const MessageFeedWidget: React.FC<Props> = ({ chat }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const fullyLoadedResources = useAppSelector(state => state.statuses.fullyLoadedResources);
  const chatLoadingStatus = useAppSelector(state => state.statuses.chatLoadingStatus);
  const history = useAppSelector(state => state.messages[chat.id] || []);

  useEffect(() => {
    dispatch(
      setChatLoadingStatus({
        hasMore: !fullyLoadedResources.chatIds.includes(chat.id),
        loading: false,
        isLoaded: false,
      })
    );
  }, [chat.id]);

  const handleMessageClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const elem = target.closest('[data-message-id]') as HTMLDivElement;
      if (elem) {
        const action = target.dataset.messageAction as MessageAction;
        switch (action) {
          case 'delete':
            handleDeleteMessage(elem.dataset.messageId!);
            break;
          case 'copy':
            handleCopyText(elem.dataset.messageText!);
            break;
          case 'edit':
            handleEditMessage(elem.dataset.messageId!);
            break;
        }
      }
    },
    [history]
  );

  const handleDeleteMessage = (messageId: ID) => {
    modalControls.open({
      name: 'deleteMessage',
      payload: { message: history.find(message => message.id === messageId)! },
    });
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleEditMessage = (messageId: ID) => {
    dispatch(markMessageAsEditing({ chatId: chat.id, message: history.find(message => message.id === messageId)! }));
  };

  return (
    <div className={s.wrapper} onClick={handleMessageClick}>
      <Scroller
        key={chat.id}
        chatId={chat.id}
        chatName={chat.name}
        history={history}
        chatLoadingStatus={chatLoadingStatus}
        fullyLoadedResources={fullyLoadedResources}
      />
    </div>
  );
};
