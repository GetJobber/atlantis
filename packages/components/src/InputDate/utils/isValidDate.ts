export function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}
