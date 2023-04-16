import { useEffect, useRef, useState } from 'react';
import { normalizeInnerCoords } from '@common/utils';
import type { Coords2D, FCChildren } from '@customTypes/index';
import s from './popover.module.css';

type TPopoverPosition = 'top' | 'right' | 'bottom' | 'left';

const calculatePopoverCoords = (
  wrapperRect: DOMRect,
  popoverRect: DOMRect,
  position: TPopoverPosition,
  gap: number = 0
): Coords2D => {
  let coords = { x: 0, y: 0 };

  switch (position) {
    case 'top':
      coords = {
        x: wrapperRect.left + wrapperRect.width / 2 - popoverRect.width / 2,
        y: wrapperRect.top - popoverRect.height - gap,
      };
      break;
    case 'right':
      coords = {
        x: wrapperRect.left + wrapperRect.width + gap,
        y: wrapperRect.top + wrapperRect.height - popoverRect.height,
      };
      break;
    case 'bottom':
      coords = {
        x: wrapperRect.left + wrapperRect.width / 2 - popoverRect.width / 2,
        y: wrapperRect.top + wrapperRect.height + gap,
      };
      break;
    case 'left':
      coords = {
        x: wrapperRect.left - popoverRect.width - gap,
        y: wrapperRect.top + wrapperRect.height - popoverRect.height,
      };
      break;
    default:
      coords = { x: 0, y: 0 };
  }

  return coords;
};

type TProps = FCChildren & {
  popover?: React.ReactNode;
  positionType?: 'absoulte' | 'fixed';
  gap?: number;
  position?: TPopoverPosition;
  vNoramalize?: boolean;
  hNoramalize?: boolean;
};

const Popover: React.FC<TProps> = ({
  children,
  popover,
  positionType = 'fixed',
  gap = 10,
  position = 'top',
  hNoramalize = true,
  vNoramalize = false,
}): JSX.Element => {
  const popoverWrapperRef = useRef<HTMLDivElement>(null!);
  const popoverRef = useRef<HTMLDivElement>(null!);

  const [isVisible, setIsVisible] = useState(false);
  const [boxCoords, setBoxCoords] = useState<Coords2D>({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseDown = (e: any) => {
      (e.target as HTMLDivElement).closest('[data-popover]') || setIsVisible(false);
    };

    if (isVisible) {
      setBoxCoords(
        normalizeInnerCoords(
          calculatePopoverCoords(
            popoverWrapperRef.current.getBoundingClientRect(),
            popoverRef.current.getBoundingClientRect(),
            position,
            gap
          ),
          popoverRef.current.getBoundingClientRect(),
          hNoramalize,
          vNoramalize
        )
      );

      document.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      if (isVisible) {
        document.removeEventListener('mousedown', onMouseDown);
      }
    };
  }, [isVisible]);

  const handlePopoverClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div ref={popoverWrapperRef} data-popover="true">
      {isVisible && (
        <div
          ref={popoverRef}
          style={{
            position: positionType as any,
            left: `${boxCoords.x}px`,
            top: `${boxCoords.y}px`,
            opacity: !boxCoords.x || !boxCoords.y ? 0 : 1,
          }}
          className={s.popoverBox}
        >
          {popover}
        </div>
      )}
      <div className={s.children} onClick={handlePopoverClick}>
        {children}
      </div>
    </div>
  );
};

export default Popover;
