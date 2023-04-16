import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { normalizeInnerCoords } from '@common/utils';
import TooltipBox from './TooltipBox/TooltipBox';
import type { Coords2D, FCChildren, FCStyle } from '@customTypes/common.types';
import s from './tooltip.module.css';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

const calculateTooltipCoordsFixed = (
  wrapperRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipPosition,
  tooltipGap = 0
): Coords2D => {
  switch (position) {
    case 'top':
      return {
        x: wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2,
        y: wrapperRect.top - tooltipRect.height - tooltipGap,
      };
    case 'right':
      return {
        x: wrapperRect.left + wrapperRect.width + tooltipGap,
        y: wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2,
      };
    case 'bottom':
      return {
        x: wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2,
        y: wrapperRect.top + wrapperRect.height + tooltipGap,
      };
    case 'left':
      return {
        x: wrapperRect.left - tooltipRect.width - tooltipGap,
        y: wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2,
      };
    default:
      return { x: 10, y: 10 };
  }
};

type Props = FCChildren &
  FCStyle & {
    positioning?: 'absolute' | 'fixed';
    tooltipGap?: number;
    position?: TooltipPosition;
    vNoramalize?: boolean;
    hNoramalize?: boolean;
    delay?: number;
    className?: string;
    innerClassName?: string;
  } & (
    | {
        text: string;
        tooltipElement?: never;
      }
    | { text?: never; tooltipElement: React.ReactNode }
  );

const Tooltip: React.FC<Props> = ({
  children,
  tooltipElement,
  style,
  className,
  innerClassName,
  text = '',
  positioning = 'fixed',
  position = 'top',
  tooltipGap = 10,
  hNoramalize = true,
  vNoramalize = true,
  delay = 0,
}): JSX.Element => {
  const tooltipWrapperRef = useRef<HTMLDivElement>(null!);
  const tooltipRef = useRef<HTMLDivElement>(null!);
  const delayRef = useRef<NodeJS.Timeout>();

  const [isVisible, setIsVisible] = useState(false);
  const [boxCoords, setBoxCoords] = useState<Coords2D | null>(null);

  const onVisible = () => {
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const tooltipWrapperRect = tooltipWrapperRef.current.getBoundingClientRect();

    const coords = calculateTooltipCoordsFixed(tooltipWrapperRect, tooltipRect, position, tooltipGap);

    setBoxCoords(normalizeInnerCoords(coords, tooltipRect, hNoramalize, vNoramalize));
  };

  useLayoutEffect(() => {
    if (isVisible && positioning === 'fixed') {
      onVisible();
    }
  }, [isVisible]);

  const handleTooltipMouseEnter = () => {
    if (typeof delay === 'number' && !Number.isNaN(delay)) {
      delayRef.current = setTimeout(() => setIsVisible(true), delay);
    } else {
      setIsVisible(true);
    }
  };

  const handleTooltipMouseLeave = () => {
    if (typeof delay === 'number' && !Number.isNaN(delay)) {
      clearTimeout(delayRef.current);
    }
    setIsVisible(false);
  };

  const styleForTooltip: CSSProperties =
    positioning === 'fixed'
      ? {
          position: positioning,
          left: `${boxCoords?.x || 0}px`,
          top: `${boxCoords?.y || 0}px`,
          opacity: boxCoords ? 1 : 0,
        }
      : { position: positioning };

  return (
    <div ref={tooltipWrapperRef} style={style} className={classNames(s.tooltipWrapper, className)}>
      {isVisible && (
        <div
          ref={tooltipRef}
          style={styleForTooltip}
          className={classNames(s.tooltipBox, { [s[position]]: positioning === 'absolute' })}
        >
          {tooltipElement || <TooltipBox trianglePosition={position}>{text}</TooltipBox>}
        </div>
      )}
      <div className={innerClassName} onPointerEnter={handleTooltipMouseEnter} onPointerLeave={handleTooltipMouseLeave}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
