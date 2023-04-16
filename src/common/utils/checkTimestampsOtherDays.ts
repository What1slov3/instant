export function checkTimestampsOtherDays(tm1: string | number, tm2: string | number) {
  return new Date(tm1).getDate() !== new Date(tm2).getDate();
}
