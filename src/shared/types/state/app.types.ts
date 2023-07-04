import { ID } from '@shared/types';

export interface SliceApp {
  settings: AppSettings;
  inputs: Record<ID, string>;
};

export type AppSettings = {
  messageFontSize: number;
  messageGroupGap: number;
};
