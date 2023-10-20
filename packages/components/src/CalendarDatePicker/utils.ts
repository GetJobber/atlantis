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

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + months);

  return newDate;
};
