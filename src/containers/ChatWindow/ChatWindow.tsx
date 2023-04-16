import { MouseEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Scroller from '@components/Chat/Scroller/Scroller';
import { useModalControls } from '@common/hooks/useModalControls';
import { useAppSelector, setChatLoadingStatus } from '@state/index';
import type { Chat, ID, MessageAction } from '@customTypes/index';
import s from './chatwindow.module.css';

type Props = {
  chat: Chat;
};

const ChatWindow: React.FC<Props> = ({ chat }): JSX.Element => {
  const dispatch = useDispatch<any>();

  const modalControls = useModalControls();

  const fullyLoadedResources = useAppSelector((state) => state.app.fullyLoadedResources);
  const chatLoadingStatus = useAppSelector((state) => state.app.chatLoadingStatus);
  const history = useAppSelector((state) => state.messages[chat._id] || []);

  useEffect(() => {
    dispatch(
      setChatLoadingStatus({
        hasMore: !fullyLoadedResources.chatIds.includes(chat._id),
        loading: false,
        isLoaded: false,
      })
    );
  }, [chat._id]);

  const handleMessageClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const elem = target.closest('[data-message-id]') as HTMLDivElement;
      if (elem) {
        const action = target.dataset.messageAction as MessageAction;
        switch (action) {
          case 'delete':
            deleteMessage(elem.dataset.messageId!);
            break;
        }
      }
    },
    [history]
  );

  const deleteMessage = (messageId: ID) => {
    modalControls.open({
      name: 'deleteMessage',
      payload: { message: history.find((message) => message._id === messageId)! },
    });
  };

  return (
    <div className={s.wrapper} onClick={handleMessageClick}>
      <Scroller
        key={chat._id}
        chatId={chat._id}
        chatName={chat.name}
        history={history}
        chatLoadingStatus={chatLoadingStatus}
        fullyLoadedResources={fullyLoadedResources}
      />
    </div>
  );
};

export default ChatWindow;
