import { useModalControls } from '@shared/hooks';
import { Accordion } from '@shared/components';
import { IconButton } from '@shared/ui';
import { ChatItem } from '@entities/channel';
import type { Chat, ChatGroup, SliceChats, Connection } from '@shared/types';
import s from './channelchatlist.module.css';

type Props = {
  chatGroups: ChatGroup<Chat>[];
  loadedChats: SliceChats;
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
          chatId={openedChat.id}
          connection={connection}
          settingsButton={
            <IconButton
              faClass="fa-solid fa-cog"
              className={s.settingButton}
              onClick={() => {
                modalControls.open({ name: 'chatSettings', payload: { ...connection, chatId: openedChat.id } });
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
                    chatGroup: { name: group.name, id: group.id },
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
                  key={chat.id}
                  name={chat.name}
                  chatId={chat.id}
                  connection={connection}
                  settingsButton={
                    <IconButton
                      faClass="fa-solid fa-cog"
                      className={s.settingButton}
                      onClick={() => {
                        modalControls.open({ name: 'chatSettings', payload: { ...connection, chatId: chat.id } });
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
