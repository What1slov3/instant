import { RowsList } from '../RowsList/RowsList';
import type { Emoji, EmojiCategory as TEmojiCategory } from '@entities/emoji';
import s from './emojicategory.module.css';

type Props = {
  category: TEmojiCategory;
  onEmojiClick: (emoji: string) => void;
  onEmojiHover: (emoji: Emoji) => void;
  virtual?: boolean;
};

export const EmojiCategory: React.FC<Props> = ({ category, onEmojiClick, onEmojiHover, virtual }): JSX.Element => {
  return (
    <div className={s.categoryBlock}>
      <div className={s.categoryName}>{category.name}</div>
      <div className={s.categoryContent}>
        <RowsList onClick={onEmojiClick} onHover={onEmojiHover} virtual={virtual} emojis={category.emojis} />
      </div>
    </div>
  );
};
