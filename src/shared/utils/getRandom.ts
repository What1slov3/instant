export function getRandom(arr: any[]) {
  return arr[(Math.random() * arr.length) >> 0];
}
