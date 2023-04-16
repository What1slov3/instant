import { CSSProperties } from 'react';

export type RGB = { r: number; g: number; b: number };
export type FCChildren<T = any> = {
  children?: T;
};
export type FCStyle = {
  style?: CSSProperties;
};
export type Coords2D = {
  x: number;
  y: number;
};
export type Emoji = {
  emoji: string;
  shortname: string;
};
export type EmojiCategory = {
  categoryName: CategoryName;
  emojis: Emoji[];
};
export type CategoryName =
  | 'Smileys & Emotion'
  | 'People & Body'
  | 'Symbols'
  | 'Food & Drink'
  | 'Activities'
  | 'Animals & Nature'
  | 'Objects'
  | 'Travel & Places';
export type JWT = {
  sub: string;
  iat: number;
  exp: number;
};
export type ID = string;