import { emojisCategoryList } from '@entities/emoji';
import { EmojiCategory } from '../EmojiCategory/EmojiCategory';
import { RowsList } from '../RowsList/RowsList';
import type { Emoji } from '@entities/emoji/model/types';
import s from './emojilist.module.css';

type Props = {
  setEmoji: (emoji: string) => void;
  setHovered: (emoji: Emoji) => void;
  searchingShortname: string;
  refs: React.MutableRefObject<HTMLDivElement[]>;
};

export const EmojiList: React.FC<Props> = ({ setEmoji, searchingShortname, setHovered, refs }): JSX.Element => {
  const renderCategories = () => {
    return emojisCategoryList.map((category, index) => {
      return (
        <EmojiCategory
          refs={refs}
          key={category.name}
          category={category}
          onEmojiClick={setEmoji}
          onEmojiHover={setHovered}
          virtual={Boolean(index)}
        />
      );
    });
  };

  const renderSearching = () => {
    const emojis = emojisCategoryList.reduce((prev, category) => {
      return prev.concat(
        category.emojis.filter((emoji) => {
          return emoji.shortname.includes(searchingShortname.trim());
        })
      );
    }, [] as Emoji[]);

    return <RowsList onClick={setEmoji} onHover={setHovered} virtual={false} emojis={emojis} />;
  };

  const renderList = () => {
    if (searchingShortname.trim().length > 1) {
      return renderSearching();
    }
    return renderCategories();
  };

  return <div className={s.emojiList}>{renderList()}</div>;
};
