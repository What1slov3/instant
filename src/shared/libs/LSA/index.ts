import LSSDefault from './defaultStructure';
import { deepObjectStructRestoreByReference } from './restore';
import type { LSStructure } from '@shared/types';

// LSA - Local Storage Accessor

export class LSA {
  private _ls = localStorage;

  constructor() {
    this.checkAndRestoreLSS();
  }

  private checkAndRestoreLSS() {
    for (let key in LSSDefault) {
      if (!this._ls.getItem(key)) {
        this._ls.setItem(key, JSON.stringify(LSSDefault[key as keyof LSStructure]));
      }
      const lsField = JSON.parse(this._ls.getItem(key)!);
      const restored = deepObjectStructRestoreByReference(LSSDefault[key as keyof typeof LSSDefault], lsField);
      if (Object.keys(restored).length !== 0) {
        this._ls.setItem(key, JSON.stringify(restored));
      }
    }
  }
}
