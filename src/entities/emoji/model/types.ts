export type Emoji = {
  emoji: string;
  shortname: string;
};

export type EmojiCategory = {
  name: CategoryName;
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
