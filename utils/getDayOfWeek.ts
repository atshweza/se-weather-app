export default function getDayOfWeek(dateString: string, short?: boolean): string {
  const date = new Date(dateString);

  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return short ? shortDays[date.getDay()] : fullDays[date.getDay()];
}
