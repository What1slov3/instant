import type { Coords2D } from "@shared/types";
import type { TooltipPosition } from "../types";

export const calculateTooltipCoordsFixed = (
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
