import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Menu } from '@entities/emoji';
import { useGlobalListener } from '@shared/hooks';
import { getRandomEmoji, normalizeMenuCoords } from '../../libs/helpers';
import type { Coords2D } from '@shared/types';
import s from './emojipicker.module.css';

type Props = {
  emojiSetter: (emoji: string) => void;
};

export const EmojiPicker: React.FC<Props> = ({ emojiSetter }): JSX.Element => {
  const [pickerIcon, setPickerIcon] = useState(getRandomEmoji());
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState<Coords2D>({ x: -500, y: -500 });

  const menuRef = useRef<HTMLDivElement>(null!);
  const buttonRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
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

  const handlePointerEnter = () => {
    if (!isOpen) {
      setPickerIcon(getRandomEmoji());
    }
  };

  const handleOpen = () => {
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
        onPointerEnter={handlePointerEnter}
        onClick={toggleIsOpen}
        className={classNames(s.previewEmoji, { [s.open]: isOpen })}
      >
        {pickerIcon}
      </div>
    </div>
  );
};
