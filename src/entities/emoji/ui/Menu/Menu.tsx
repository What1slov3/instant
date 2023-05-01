import { useState } from 'react';
import { Input } from '@shared/ui';
import { emojisCategoryList } from '@entities/emoji';
import { useInput } from '@shared/hooks';
import { EmojiCategory } from '../EmojiCategory/EmojiCategory';
import { RowsList } from '../RowsList/RowsList';
import { EmojiViewer } from '../EmojiViewer/EmojiViewer';
import type { Emoji as TEmoji } from '@entities/emoji/model/types';
import s from './menu.module.css';

type Props = {
  emojiSetter: (emoji: string) => void;
};

export const Menu: React.FC<Props> = ({ emojiSetter }): JSX.Element => {
  const searcher = useInput({ initial: '' });

  const [hovered, setHovered] = useState<TEmoji>(emojisCategoryList[0].emojis[0]);

  const renderCategories = () => {
    return emojisCategoryList.map((category, index) => {
      return (
        <EmojiCategory
          key={category.name}
          category={category}
          onEmojiClick={emojiSetter}
          onEmojiHover={setHovered}
          virtual={Boolean(index)}
        />
      );
    });
  };

  const renderSearching = () => {
    const emojis = emojisCategoryList.reduce((prev, curr) => {
      return prev.concat(
        curr.emojis.filter((emoji) => {
          return emoji.shortname.includes(searcher.value.trim());
        })
      );
    }, [] as TEmoji[]);

    return <RowsList onClick={emojiSetter} onHover={setHovered} virtual={false} emojis={emojis} />;
  };

  const renderList = () => {
    if (searcher.value) {
      return renderSearching();
    }
    return renderCategories();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.emojiFinder}>
        <Input
          value={searcher.value}
          onChange={searcher.onChange}
          type="text"
          placeholder="Поищем эмоджи"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div className={s.emojiList}>{renderList()}</div>
      <EmojiViewer emoji={hovered.emoji} shortname={hovered.shortname} />
    </div>
  );
};
