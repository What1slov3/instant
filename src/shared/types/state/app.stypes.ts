import { ID } from '@shared/types';

export type AppState = {
  settings: AppSettings;
  inputs: Record<ID, string>;
};

export type AppSettings = {
  messageFontSize: number;
  messageGroupGap: number;
};
