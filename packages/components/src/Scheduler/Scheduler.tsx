import React, { useMemo } from "react";
import { CivilTime } from "@std-proposal/temporal";
import classNames from "classnames";
import { RecurringSelect } from "./RecurringSelect";
import {
  DurationPeriod,
  Recurrence,
  RecurrenceOptions,
  RecurrenceRule,
  ScheduleEnd,
  SchedulerState,
} from "./types";
import styles from "./Scheduler.css";
import { computeRecurrence } from "./computeRecurrence";
import { ScheduleSummary } from "./ScheduleSummary";
import { computeOccurrence } from "./computeOccurrence";
import { useScheduler } from "./useScheduler";
import { strFormatDate } from "../FormatDate";
import { Content } from "../Content";
import { Card } from "../Card";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line max-statements
export const Scheduler = () => {
  const [schedulerState, setSchedulerState] = useScheduler({
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
  });
  const onChangeSchedule = (partialNextSchedule: Partial<SchedulerState>) =>
    setSchedulerState({ ...schedulerState, ...partialNextSchedule });

  const getRecurrenceRule = (option: RecurrenceOptions) => {
    if (option === RecurrenceOptions.AsNeeded) {
      return schedulerState.recurrence;
    }

    return computeRecurrence(
      schedulerState.startDate,
      schedulerState.recurrence,
      option,
    );
  };

  const onRecurrenceChange = (newRecurrence: {
    ends: ScheduleEnd;
    rule: RecurrenceRule;
  }) =>
    onChangeSchedule({
      recurrence: {
        ...newRecurrence,
      },
    });

  const schedule = useMemo(
    () =>
      computeOccurrence(schedulerState.startDate, schedulerState.recurrence),
    [schedulerState.startDate, schedulerState.recurrence],
  );

  const containerClass = classNames(styles.container);
  const showAdditionalDetail = false;

  return (
    <div className={containerClass}>
      <Card>
        <Content>
          <>
            <Content spacing="small">
              <RecurringSelect
                recurrenceRule={schedulerState.recurrence.rule}
                recurrenceEnds={schedulerState.recurrence.ends}
                disabled={false}
                onRecurrenceChange={onRecurrenceChange}
              />
            </Content>
          </>
          {showAdditionalDetail && (
            <Content spacing="small">
              <ScheduleSummary
                disabled={false}
                startDate={
                  typeof schedule.firstOccurrence === "string"
                    ? "-"
                    : strFormatDate(schedule.firstOccurrence)
                }
                endDate={
                  schedule.lastOccurrence instanceof Date
                    ? strFormatDate(schedule.lastOccurrence)
                    : "-"
                }
                totalOccurences={schedule.totalOccurrence}
                summaryString={
                  schedule.summaryString
                    ? `Visits ${schedule.summaryString}`
                    : ""
                }
              />
            </Content>
          )}
        </Content>
      </Card>
    </div>
  );
};
