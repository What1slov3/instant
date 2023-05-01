import { Coords2D } from '@shared/types';

export function normalizeInnerCoords(
  coords: Coords2D,
  elemRect: DOMRect,
  hNormalization: boolean = true,
  vNormalization: boolean = true
): Coords2D {
  const x = hNormalization
    ? coords.x < 0
      ? 10
      : coords.x + elemRect.width - 10 >= window.innerWidth
      ? window.innerWidth - elemRect.width - 10
      : coords.x
    : coords.x;
  const y = vNormalization
    ? coords.y < 0
      ? 10
      : coords.y + elemRect.height + 10 >= window.innerHeight
      ? window.innerHeight - elemRect.height - 10
      : coords.y
    : coords.y;

  return { x, y };
}
