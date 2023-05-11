import { useModalControls } from '@shared/hooks';
import { Accordion } from '@shared/components';
import { IconButton } from '@shared/ui';
import { ChatItem } from '@entities/channel';
import type { Chat, ChatGroup, ChatsState, Connection } from '@shared/types';
import s from './channelchatlist.module.css';

type Props = {
  chatGroups: ChatGroup<Chat>[];
  loadedChats: ChatsState;
  connection: Connection;
};

export const ChannelChatsList: React.FC<Props> = ({ chatGroups, connection, loadedChats }): JSX.Element => {
  const modalControls = useModalControls();

  const renderChats = () => {
    let activeBlock: JSX.Element;
    if (connection.chatId && loadedChats[connection.chatId]) {
      const openedChat = loadedChats[connection.chatId];
      activeBlock = (
        <ChatItem
          name={openedChat.name}
          chatId={openedChat._id}
          connection={connection}
          settingsButton={
            <IconButton
              faClass="fa-solid fa-cog"
              className={s.settingButton}
              onClick={() => {
                modalControls.open({ name: 'chatSettings', payload: { ...connection, chatId: openedChat._id } });
              }}
            />
          }
        />
      );
    }

    return chatGroups.map((group) => {
      return (
        <Accordion
          key={group.name}
          title={group.name}
          activeBlock={activeBlock}
          extraButton={
            <IconButton
              faClass="fa-solid fa-plus"
              onClick={() =>
                modalControls.open({
                  name: 'createChat',
                  payload: {
                    chatGroup: { name: group.name, _id: group._id },
                    channelId: connection.channelId!,
                  },
                })
              }
            />
          }
        >
          {group.chats.map((chat) => {
            if (chat) {
              return (
                <ChatItem
                  key={chat._id}
                  name={chat.name}
                  chatId={chat._id}
                  connection={connection}
                  settingsButton={
                    <IconButton
                      faClass="fa-solid fa-cog"
                      className={s.settingButton}
                      onClick={() => {
                        modalControls.open({ name: 'chatSettings', payload: { ...connection, chatId: chat._id } });
                      }}
                    />
                  }
                />
              );
            }
          })}
        </Accordion>
      );
    });
  };

  return <div className={s.wrapper}>{renderChats()}</div>;
};
