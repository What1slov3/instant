import { RowsList } from '../RowsList/RowsList';
import {
  Emoji,
  EmojiCategory as TEmojiCategory,
  emojiCategoryNamesEngToRus,
  emojisCategoryList,
} from '@entities/emoji';
import s from './emojicategory.module.css';

type Props = {
  category: TEmojiCategory;
  onEmojiClick: (emoji: string) => void;
  onEmojiHover: (emoji: Emoji) => void;
  virtual?: boolean;
  refs: React.MutableRefObject<HTMLDivElement[]>;
};

export const EmojiCategory: React.FC<Props> = ({
  category,
  onEmojiClick,
  onEmojiHover,
  virtual,
  refs,
}): JSX.Element => {
  return (
    <div
      className={s.categoryBlock}
      ref={(el) => {
        if (refs.current.length < emojisCategoryList.length) {
          refs.current.push(el!);
        }
      }}
    >
      <div className={s.categoryName}>{emojiCategoryNamesEngToRus[category.name]}</div>
      <div className={s.categoryContent}>
        <RowsList onClick={onEmojiClick} onHover={onEmojiHover} virtual={virtual} emojis={category.emojis} />
      </div>
    </div>
  );
};
