import { emojiPreviewList } from '@entities/emoji';
import { normalizeInnerCoords } from '@shared/utils';

export const getRandomEmoji = () => {
  return emojiPreviewList[Math.floor(Math.random() * emojiPreviewList.length)];
};

export const normalizeMenuCoords = (menuRect: DOMRect, buttonRect: DOMRect, gap: number) => {
  return normalizeInnerCoords(
    {
      x: buttonRect.x + buttonRect.width - menuRect.width,
      y: buttonRect.y - menuRect.height - gap,
    },
    menuRect
  );
};
