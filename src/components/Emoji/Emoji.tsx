import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import emojiPreviewList from '@common/emojiPreviewList';
import Menu from './Menu/Menu';
import { normalizeInnerCoords } from '@common/utils';
import { useGlobalListener } from '@common/hooks';
import type { Coords2D } from '@customTypes/index';
import s from './emoji.module.css';

const getRandomEmoji = () => {
  return emojiPreviewList[Math.floor(Math.random() * emojiPreviewList.length)];
};

const normalizeMenuCoords = (menuRect: DOMRect, buttonRect: DOMRect, gap: number) => {
  return normalizeInnerCoords(
    {
      x: buttonRect.x + buttonRect.width - menuRect.width,
      y: buttonRect.y - menuRect.height - gap,
    },
    menuRect
  );
};

type Props = {
  emojiSetter: (emoji: string) => void;
};

const Emoji: React.FC<Props> = ({ emojiSetter }): JSX.Element => {
  const [previewEmoji, setPreviewEmoji] = useState(getRandomEmoji());
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState<Coords2D>({ x: -500, y: -500 });

  const menuRef = useRef<HTMLDivElement>(null!);
  const buttonRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (isOpen) {
      onOpenHandler();
    }
  }, [isOpen]);

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

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onPointerEnterHandler = () => {
    if (!isOpen) {
      setPreviewEmoji(getRandomEmoji());
    }
  };

  const onOpenHandler = () => {
    const normalizedCoords = normalizeMenuCoords(
      menuRef.current.getBoundingClientRect(),
      buttonRef.current.getBoundingClientRect(),
      15
    );
    setMenuCoords(normalizedCoords);
  };

  return (
    <div className={s.wrapper} data-emoji="true">
      {isOpen && (
        <div ref={menuRef} className={s.menuWrapper} style={{ top: menuCoords.y, left: menuCoords.x }}>
          <Menu emojiSetter={emojiSetter} />
        </div>
      )}
      <div
        ref={buttonRef}
        onPointerEnter={onPointerEnterHandler}
        onClick={toggleIsOpen}
        className={classNames(s.previewEmoji, { [s.open]: isOpen })}
      >
        {previewEmoji}
      </div>
    </div>
  );
};

export default Emoji;
