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
export type JWT = {
  sub: string;
  iat: number;
  exp: number;
};
export type ID = string;