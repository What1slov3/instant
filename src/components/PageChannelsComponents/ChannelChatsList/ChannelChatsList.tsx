import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Accordion from '@components/Accordion/Accordion';
import Tooltip from '@components/Tooltip/Tooltip';
import type { Chat, ChatGroup, ChatsState, Connection, ID } from '@customTypes/index';
import s from './channelchatlist.module.css';
import { useModalControls } from '@common/hooks';

type PropsItem = {
  name: string;
  id: ID;
  connection: Connection;
};

const ChatItem: React.FC<PropsItem> = ({ name, id, connection }): JSX.Element => {
  const [isOverflow, setIsOverflow] = useState(false);

  const itemRef = useRef<HTMLAnchorElement>(null!);

  useEffect(() => {
    if (itemRef.current.clientWidth - itemRef.current.scrollWidth < 0) {
      setIsOverflow(true);
    }
  }, []);

  const render = () => {
    const ChatItem = (
      <Link
        ref={itemRef}
        to={`/channels/${connection.channelId}/${id}`}
        className={classNames(s.chatItem, { [s.active]: id === connection.chatId }, 'textOverflowEllipsis')}
      >
        <span>#</span>
        {name}
      </Link>
    );

    if (isOverflow) {
      return (
        <Tooltip text={name} position="top" delay={500}>
          {ChatItem}
        </Tooltip>
      );
    }

    return ChatItem;
  };

  return render();
};

type Props = {
  chatGroups: ChatGroup<Chat>[];
  loadedChats: ChatsState;
  connection: Connection;
};

const ChannelChatsList: React.FC<Props> = ({ chatGroups, connection, loadedChats }): JSX.Element => {
  const modalControls = useModalControls();

  const renderChats = () => {
    let activeBlock: JSX.Element;
    if (connection.chatId && loadedChats[connection.chatId]) {
      const openedChat = loadedChats[connection.chatId];
      activeBlock = <ChatItem name={openedChat.name} id={openedChat._id} connection={connection} />;
    }

    return chatGroups.map((chatGroup) => {
      return (
        <Accordion
          key={chatGroup.name}
          title={chatGroup.name}
          activeBlock={activeBlock}
          extraButton={
            <i
              className="fa-solid fa-plus"
              onClick={() =>
                modalControls.open({
                  name: 'createChat',
                  payload: {
                    chatGroup: { name: chatGroup.name, _id: chatGroup._id },
                    channelId: connection.channelId!,
                  },
                })
              }
            ></i>
          }
        >
          {chatGroup.chats.map((chat) => {
            if (chat) {
              return <ChatItem key={chat._id} name={chat.name} id={chat._id} connection={connection} />;
            }
          })}
        </Accordion>
      );
    });
  };

  return <div className={s.wrapper}>{renderChats()}</div>;
};

export default ChannelChatsList;
