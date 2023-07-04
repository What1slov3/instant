import { useState } from 'react';

export type CustomNavbarSetter = <T extends Readonly<string[]>>(tab: T[number]) => void;

export const useCustomNavbar = <T extends Readonly<string[]>>(
  tabs: T,
  defaultTab: T[number]
): [T[number], CustomNavbarSetter] => {
  const [acitveTab, setAcitveTab] = useState<T[number]>(defaultTab);

  const activeTabSetter = (tab: T[number]) => {
    if (tabs.includes(tab)) {
      setAcitveTab(tab);
    }
  };

  return [acitveTab, activeTabSetter];
};
