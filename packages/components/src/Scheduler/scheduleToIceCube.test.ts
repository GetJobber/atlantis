import { CivilTime } from "@std-proposal/temporal";
import { scheduleToIceCube } from "./scheduleToIceCube";
import { DurationPeriod } from "./types";

describe("scheduleToIceCube", () => {
  it("works", () => {
    expect(
      scheduleToIceCube({
        scheduleLater: false,
        startDate: new Date(),
        startTime: new CivilTime(8, 0),
        endTime: new CivilTime(10, 0),
        selectedRecurringOption: 0,
        anyTimeOfDay: false,
        recurrence: {
          rule: { interval: 1, type: DurationPeriod.Day },
          ends: {
            type: "date",
            date: new Date(),
            numOfPeriods: 1,
            durationPeriod: DurationPeriod.Day,
          },
        },
      }),
    ).toEqual("");
  });
});
