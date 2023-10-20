export const startOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
};

export const startOfMonth = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
};

export const endOfMonth = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1, 0);
  newDate.setHours(23, 59, 59, 999);

  return newDate;
};

export const startOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day;

  return startOfDay(new Date(date.setDate(diff)));
};

export const datesAreEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);

  return newDate;
};

export function addMonths(date: Date, months: number): Date {
  const isPrev = months < 0;
  const numYears = Math.trunc(Math.abs(months) / 12);
  months = Math.abs(months) % 12;

  const newYear = isPrev
    ? date.getFullYear() - numYears
    : date.getFullYear() + numYears;

  const newMonth = isPrev ? date.getMonth() - months : date.getMonth() + months;

  const newDate = new Date(newYear, newMonth, 1);

  const daysInMonth = new Date(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    0,
  ).getDate();

  newDate.setDate(date.getDate() <= daysInMonth ? date.getDate() : daysInMonth);

  return newDate;
}

export function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}
