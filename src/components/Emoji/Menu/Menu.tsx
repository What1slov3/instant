import { useRef, useState, useTransition } from 'react';
import classNames from 'classnames';
import Input from '@layouts/Input/Input';
import emojisCategoryList from '@common/emojisCategoryList';
import { useInput, useIntersectionObserver } from '@common/hooks';
import type { Emoji, EmojiCategory, FCChildren } from '@customTypes/index';
import s from './menu.module.css';

type EmojiOptions = {
  virtual?: boolean;
  emojiSetter: (emoji: string) => void;
  hoveredEmojiSetter: (emoji: Emoji) => void;
};

const renderByRows = (
  emojis: Emoji[],
  { virtual = true, emojiSetter, hoveredEmojiSetter }: EmojiOptions,
  perRow: number = 10
) => {
  const rows: JSX.Element[] = [];

  let emojiIconBuffer: JSX.Element[] = [];

  for (let i = 0; i < emojis.length; i++) {
    emojiIconBuffer.push(<Icon emojiSetter={emojiSetter} emoji={emojis[i]} hoveredEmojiSetter={hoveredEmojiSetter} />);

    if (emojiIconBuffer.length === perRow || (emojiIconBuffer.length && emojis.length - i === 1)) {
      rows.push(<Row virtual={virtual}>{emojiIconBuffer}</Row>);
      emojiIconBuffer = [];
    }
  }

  return rows;
};

// EMOJI ICON

type PropsEmojiIcon = {
  emoji: Emoji;
  emojiSetter: (emoji: string) => void;
  hoveredEmojiSetter: (emoji: Emoji) => void;
};

const Icon: React.FC<PropsEmojiIcon> = ({ emoji, emojiSetter, hoveredEmojiSetter }): JSX.Element => {
  const onClickHandler = () => {
    emojiSetter(emoji.emoji);
  };

  const onHoverHandler = () => {
    hoveredEmojiSetter(emoji);
  };

  return (
    <div className={s.emoji} onClick={onClickHandler} onPointerEnter={onHoverHandler}>
      {emoji.emoji}
    </div>
  );
};

// EMOJI ROW

type PropsEmojiRow = {
  virtual?: boolean;
} & FCChildren;

const Row: React.FC<PropsEmojiRow> = ({ children, virtual = true }): JSX.Element => {
  const [, startTranstition] = useTransition();
  const [isShowing, setIsShowing] = useState(virtual ? false : true);

  const rowRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(rowRef.current, (entries) => {
    startTranstition(() => setIsShowing(entries[0].isIntersecting));
  });

  return (
    <div ref={virtual ? rowRef : undefined} className="flex" style={{ height: '36px', width: '100%' }}>
      {isShowing && children}
    </div>
  );
};

// EMOJI CATEGORY

type PropsEmojiCategory = {
  category: EmojiCategory;
  emojiSetter: (emoji: string) => void;
  hoveredEmojiSetter: (emoji: Emoji) => void;
  virtual?: boolean;
};

const CategoryItem: React.FC<PropsEmojiCategory> = ({
  category,
  emojiSetter,
  hoveredEmojiSetter,
  virtual,
}): JSX.Element => {
  const renderCategory = () => {
    return renderByRows(category.emojis, { hoveredEmojiSetter, emojiSetter, virtual });
  };

  return (
    <div className={s.categoryBlock}>
      <div className={s.categoryName}>{category.categoryName}</div>
      <div className={s.categoryContent}>{renderCategory()}</div>
    </div>
  );
};

//  EMOJI MENU

type Props = {
  emojiSetter: (emoji: string) => void;
};

const Menu: React.FC<Props> = ({ emojiSetter }): JSX.Element => {
  const searcher = useInput({ initial: '' });

  const [hoveredEmoji, setHoveredEmoji] = useState<Emoji>(emojisCategoryList[0].emojis[0]);

  const renderBlocks = () => {
    return emojisCategoryList.map((emojiBlock, index) => {
      return (
        <CategoryItem
          key={emojiBlock.categoryName}
          category={emojiBlock}
          emojiSetter={emojiSetter}
          hoveredEmojiSetter={setHoveredEmoji}
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
    }, [] as Emoji[]);

    return renderByRows(emojis, { hoveredEmojiSetter: setHoveredEmoji, emojiSetter });
  };

  const renderList = () => {
    if (searcher.value) {
      return renderSearching();
    }
    return renderBlocks();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.emojiFinder}>
        <Input
          value={searcher.value}
          onChange={searcher.onChange}
          type="text"
          placeholder="Потеряли что-то?"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div className={s.emojiList}>{renderList()}</div>
      <div className={classNames(s.hoveredEmojiWrapper, 'flex flexaic')}>
        <div className={s.hoveredEmoji}>{hoveredEmoji.emoji}</div>
        <div>{hoveredEmoji.shortname}</div>
      </div>
    </div>
  );
};

export default Menu;
