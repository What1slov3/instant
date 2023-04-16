import exceptionKeys from './exceptionKeys';

export class Shortcut {
  public pressed: string[] = [];

  constructor() {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      this.press(e.code);
    });
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      this.unpress(e.code);
    });
  }

  press(keyCode: string) {
    if (!this.pressed.includes(keyCode)) {
      this.pressed.push(keyCode);
    }
  }

  unpress(keyCode: string) {
    this.pressed = this.pressed.filter((pressedKey) => pressedKey !== keyCode);
  }

  includes(keyCode: string | string[]) {
    if (typeof keyCode === 'string') {
      if (['Control', 'Shift', 'Alt'].includes(keyCode)) {
        return this.pressed.includes(`${keyCode}Left`) || this.pressed.includes(`${keyCode}Right`);
      }
      return this.pressed.includes(keyCode);
    }
    if (Array.isArray(keyCode)) {
      return this.pressed.filter((pressedKey) => keyCode.includes(pressedKey)).length === keyCode.length;
    }
  }

  isException(key: string) {
    return exceptionKeys.includes(key);
  }
}
