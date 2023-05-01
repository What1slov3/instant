import type { RGB } from '@shared/types';

export function colorGrabber(
  imgSrc: string,
  setter: (color: RGB) => void,
  mode: 'default' | 'invert' | 'bw' = 'default'
) {
  const myImg = new Image();
  myImg.crossOrigin = 'Anonymous';
  myImg.src = imgSrc;
  return (myImg.onload = () => {
    const blockSize = 5;
    let width: number, height: number, data: Uint8ClampedArray, length: number;
    let i = -4;
    let count = 0;
    let rgb = { r: 0, g: 0, b: 0 };
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    width = canvas.width = myImg.width;
    height = canvas.height = myImg.height;

    if (width === 0 || height === 0) return;

    ctx.drawImage(myImg, 0, 0);

    data = ctx.getImageData(0, 0, width, height).data;

    length = data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data[i];
      rgb.g += data[i + 1];
      rgb.b += data[i + 2];
    }

    rgb.r = (rgb.r / count) | 0;
    rgb.g = (rgb.g / count) | 0;
    rgb.b = (rgb.b / count) | 0;

    switch (mode) {
      case 'default':
        break;
      case 'invert':
        rgb.r = Math.abs(255 - rgb.r);
        rgb.g = Math.abs(255 - rgb.g);
        rgb.b = Math.abs(255 - rgb.b);
        break;
      case 'bw':
        rgb = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
    }

    setter(rgb);
  });
}
