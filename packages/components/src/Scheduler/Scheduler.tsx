import React from "react";
import { RecurringSelect } from "./RecurringSelect";
import { DurationPeriod, SchedulerState } from "./types";
import { useScheduler } from "./useScheduler";

export const Scheduler = () => {
  const [schedulerState, setSchedulerState] = useScheduler({
    recurrence: {
      rule: { interval: 1, type: DurationPeriod.Day },
      ends: {
        type: "date",
        date: new Date(),
        numOfPeriods: 1,
        durationPeriod: DurationPeriod.Day,
      },
    },
  });
  const onChangeSchedule = (partialNextSchedule: Partial<SchedulerState>) =>
    setSchedulerState({ ...schedulerState, ...partialNextSchedule });

  return (
    <>
      <RecurringSelect
        recurrenceRule={schedulerState.recurrence.rule}
        recurrenceEnds={schedulerState.recurrence.ends}
        disabled={false}
        onChange={onChangeSchedule}
      />
    </>
  );
};
