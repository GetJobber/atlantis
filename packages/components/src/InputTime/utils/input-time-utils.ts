export function dateToTimeString(date?: Date): string {
  if (!(date instanceof Date)) {
    return "";
  }

  // Extract hours and minutes from the Date object
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the time string in HH:MM format
  return `${hours}:${minutes}`;
}

export function timeStringToDate(
  timeString: string,
  baseDate?: Date,
): Date | undefined {
  try {
    const [hours, minutes] = timeString.split(":").map(Number);

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 24 ||
      minutes < 0 ||
      minutes > 60
    ) {
      return undefined;
    }

    // Try to preserve the Date part of the Date object as long as it is valid
    const date =
      baseDate instanceof Date && !isNaN(baseDate.getTime())
        ? new Date(baseDate)
        : new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  } catch {
    return undefined;
  }
}
