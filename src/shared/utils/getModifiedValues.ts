export function getModifiedValues<T>(dirtyValues: Record<string, any>, values: Record<string, any>): T {
  return Object.keys(dirtyValues).reduce((prev, curr) => {
    prev[curr] = values[curr];
    return prev;
  }, {} as Record<string, any>) as T;
}
