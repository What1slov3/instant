export const getUniqueStringArray = <T extends (string | number)[]>(array: T): T => {
  const set = new Set<string | number>();

  array.forEach((v) => {
    set.add(v);
  });

  return Array.from(set) as T;
};
