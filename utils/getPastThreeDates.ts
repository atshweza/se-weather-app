export default function getPastThreeDates(): string[] {
  const dates: string[] = [];
  for (let i = 1; i < 4; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}
