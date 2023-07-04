import { ID } from '../common.types';

export interface SlicePermissions {
  chat: Record<ID, number>;
  channel: Record<ID, number>;
}
