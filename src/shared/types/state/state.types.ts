import { StatusesState } from './statuses.types';
import { UserState } from './user.types';
import { UIState } from './ui.types';
import { ChannelsState } from './channels.types';
import { ChatsState } from './chats.types';
import { MessagesState } from './messages.types';

export type Store = {
  ui: UIState;
  user: UserState;
  statuses: StatusesState;
  channels: ChannelsState;
  chats: ChatsState;
  messages: MessagesState;
};
