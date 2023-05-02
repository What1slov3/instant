import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { EmojiViewer, emojisCategoryList, EmojiFinder, EmojiCategoryList, EmojiList } from '@entities/emoji';
import { useGlobalListener, useInput, useWindowResize } from '@shared/hooks';
import { getRandomEmoji, normalizeMenuCoords } from '../../libs/helpers';
import type { Coords2D } from '@shared/types';
import type { Emoji } from '@entities/emoji';
import s from './emojipicker.module.css';

type Props = {
  setEmoji: (emoji: string) => void;
};

export const EmojiPicker: React.FC<Props> = ({ setEmoji }): JSX.Element => {
  const searcher = useInput({ initial: '' });

  const [hovered, setHovered] = useState<Emoji>(emojisCategoryList[0].emojis[0]);
  const [pickerIcon, setPickerIcon] = useState(getRandomEmoji());
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState<Coords2D>({ x: -500, y: -500 });

  const menuRef = useRef<HTMLDivElement>(null!);
  const buttonRef = useRef<HTMLDivElement>(null!);
  const categoriesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      categoriesRef.current = [];
      setMenuCoords({ x: -500, y: -500 });
    }
  }, [isOpen]);

  useEffect(() => {
    if (searcher.value.trim().length > 1) {
      categoriesRef.current = [];
    }
  }, [searcher.value]);

  useGlobalListener(
    'mousedown',
    isOpen,
    (e: MouseEvent) => {
      if (!(e.target as HTMLDivElement).closest('[data-emoji]')) {
        toggleIsOpen();
      }
    },
    []
  );

  useWindowResize(() => setNormalizedCoords());

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePointerEnter = () => {
    if (!isOpen) {
      setPickerIcon(getRandomEmoji());
    }
  };

  const setNormalizedCoords = () => {
    const normalizedCoords = normalizeMenuCoords(
      menuRef.current.getBoundingClientRect(),
      buttonRef.current.getBoundingClientRect(),
      15
    );
    setMenuCoords(normalizedCoords);
  };

  const handleOpen = () => {
    setNormalizedCoords();
  };

  const moveToCategory = (index: number) => {
    categoriesRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={s.wrapper} data-emoji="true">
      {isOpen && (
        <div ref={menuRef} className={s.menuWrapper} style={{ top: menuCoords.y, left: menuCoords.x }}>
          <EmojiFinder searcher={searcher} />
          <div className="flex gap5">
            <EmojiCategoryList onClick={moveToCategory} />
            <EmojiList
              setEmoji={setEmoji}
              setHovered={setHovered}
              searchingShortname={searcher.value}
              refs={categoriesRef}
            />
          </div>
          <EmojiViewer emoji={hovered.emoji} shortname={hovered.shortname} />
        </div>
      )}
      <div
        ref={buttonRef}
        onPointerEnter={handlePointerEnter}
        onClick={toggleIsOpen}
        className={classNames(s.previewEmoji, { [s.open]: isOpen })}
      >
        {pickerIcon}
      </div>
    </div>
  );
};
