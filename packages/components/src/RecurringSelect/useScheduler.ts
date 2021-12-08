import { useState } from "react";
import { DurationPeriod, SchedulerState } from "./types";

export const useScheduler = (initialState: Partial<SchedulerState> = {}) => {
  const [state, setState] = useState<SchedulerState>({
    recurrence: {
      rule: { interval: 1, type: DurationPeriod.Day },
    },
    ...initialState,
  });

  return [state, setState] as const;
};
