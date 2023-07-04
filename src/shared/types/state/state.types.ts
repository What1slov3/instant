import { SliceStatuses } from './statuses.types';
import { SliceUser } from './user.types';
import { SliceUI } from './ui.types';
import { SliceChannels } from './channels.types';
import { SliceChats } from './chats.types';
import { SliceMessages } from './messages.types';
import { SlicePermissions } from './permissions.types';

export interface Store {
  ui: SliceUI;
  user: SliceUser;
  statuses: SliceStatuses;
  channels: SliceChannels;
  chats: SliceChats;
  messages: SliceMessages;
  permissions: SlicePermissions;
}
