import { set } from "date-fns";
import {
  MinutesIncrement,
  getTimeZoneOffsetInMinutes,
  roundUpToNearestMinutes,
} from ".";

describe("roundUpToNearestMinutes", () => {
  it.each<[MinutesIncrement, Record<string, number>]>([
    [15, { hours: 1, minutes: 28, expectedMinutes: 30 }],
    [15, { hours: 2, minutes: 3, expectedMinutes: 15 }],
    [30, { hours: 11, minutes: 2, expectedMinutes: 30 }],
    [30, { hours: 11, minutes: 32, expectedHours: 12, expectedMinutes: 0 }],
    [60, { hours: 11, minutes: 59, expectedHours: 12, expectedMinutes: 0 }],
    [60, { hours: 10, minutes: 1, expectedHours: 11, expectedMinutes: 0 }],
  ])(
    "should round up the time to the nearest %s mins",
    (increment, { hours, minutes, expectedMinutes, expectedHours }) => {
      const timeToUpdate = set(new Date(2022, 5, 27), { hours, minutes });
      const time = roundUpToNearestMinutes(timeToUpdate, increment);

      expect(time.getHours()).toBe(expectedHours || hours);
      expect(time.getMinutes()).toBe(expectedMinutes);
    },
  );
});

describe("getTimeZoneOffsetInMinutes", () => {
  const DSTDate = new Date(2022, 6, 5);
  const nonDSTDate = new Date(2022, 10, 7);

  it.each<[string, number, Date]>([
    ["America/Edmonton", -6, DSTDate],
    ["America/Edmonton", -7, nonDSTDate],
    ["Africa/Johannesburg", 2, DSTDate],
    ["America/Los_Angeles", -7, DSTDate],
    ["Asia/Manila", 8, DSTDate],
    ["Asia/Manila", 8, nonDSTDate],
  ])(
    "should convert %s to the correct timezone offset for %s",
    (timezone, expectedOffset, date) => {
      const timeZoneOffset = getTimeZoneOffsetInMinutes(timezone, date);

      expect(timeZoneOffset).toBe(expectedOffset * 60);
    },
  );
});
