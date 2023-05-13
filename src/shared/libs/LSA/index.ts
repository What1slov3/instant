import LSSDefault from './defaultStructure';
import type { LSStructure } from '@shared/types';

// LSA - Local Storage Accessor

export const deepObjectStructRestore = (reference: Record<string, any>, comparing: Record<string, any>) => {
  for (let key in reference) {
    if (comparing.hasOwnProperty(key)) {
      if (typeof reference[key] === 'object') {
        deepObjectStructRestore(reference[key], comparing[key]);
      }
    } else {
      comparing[key] = reference[key];
    }
  }
  return comparing;
};

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
      const restored = deepObjectStructRestore(LSSDefault[key as keyof typeof LSSDefault], lsField);
      if (Object.keys(restored).length !== 0) {
        this._ls.setItem(key, JSON.stringify(restored));
      }
    }
  }
}
