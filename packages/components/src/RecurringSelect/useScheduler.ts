import { useState } from "react";
import { DurationPeriod, SchedulerState } from "./types";

export const useScheduler = (initialState: Partial<SchedulerState> = {}) => {
  const [state, setState] = useState<SchedulerState>({
    startDate: new Date(),
    startTime: undefined,
    endTime: undefined,
    recurrence: {
      rule: { interval: 1, type: DurationPeriod.Day },
      ends: {
        type: "date",
        date: new Date(),
        numOfPeriods: 1,
        durationPeriod: DurationPeriod.Day,
      },
    },
    ...initialState,
  });

  return [state, setState] as const;
};
