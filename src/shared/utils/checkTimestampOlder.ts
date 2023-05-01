/**
 * @param diff - время в миллисекундах
 * @returns
 */
export function checkTimestampOlder(tm1: string | number, tm2: string | number, diff: number) {
  return Math.abs(new Date(tm1).getTime() - new Date(tm2).getTime()) >= diff;
}
