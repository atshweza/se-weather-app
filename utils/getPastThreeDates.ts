export default function getPastThreeDates(): string {
  const dates: string[] = [];

  for (let i = 0; i < 3; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const formatted = d.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    dates.push(formatted);
  }

  return dates.join(';');
}
