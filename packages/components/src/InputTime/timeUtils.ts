export function dateToTimeString(date?: Date): string {
  // Check for invalid Date objects specifically
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  // Extract hours and minutes from the Date object
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the time string in HH:MM format
  return `${hours}:${minutes}`;
}

function isValidTime(h: number, m: number, s: number): boolean {
  return (
    !isNaN(h) &&
    h >= 0 &&
    h <= 23 &&
    !isNaN(m) &&
    m >= 0 &&
    m <= 59 &&
    !isNaN(s) &&
    s >= 0 &&
    s <= 59
  );
}

export function timeStringToDate(timeString: string): Date | undefined {
  if (!timeString || typeof timeString !== "string") return undefined;

  try {
    const parts = timeString.split(":").map(Number);
    if (parts.length < 2 || parts.length > 3) return undefined;

    const [hours, minutes] = parts;
    const seconds = parts[2] ?? 0; // Use ?? for default value

    if (!isValidTime(hours, minutes, seconds)) return undefined;

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);

    return date;
  } catch {
    return undefined;
  }
}
