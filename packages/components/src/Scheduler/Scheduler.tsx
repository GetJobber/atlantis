import React, { useMemo } from "react";
import { CivilTime } from "@std-proposal/temporal";
import classNames from "classnames";
import { RecurringSelect } from "./RecurringSelect";
import {
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
import { strFormatDate } from "../FormatDate";
import { Content } from "../Content";
import { Card } from "../Card";

export interface SchedulerProps {
  startDate: Date;
  startTime: CivilTime | undefined;
  endTime: CivilTime | undefined;
  recurrence: Recurrence;
  selectedRecurringOption: RecurrenceOptions;
  summaryString?: string;
  onChange(state: Partial<SchedulerState>): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line max-statements
export const Scheduler = (props: SchedulerProps) => {
  const getRecurrenceRule = (option: RecurrenceOptions) => {
    if (option === RecurrenceOptions.AsNeeded) {
      return props.recurrence;
    }

    return computeRecurrence(props.startDate, props.recurrence, option);
  };

  const onRecurrenceChange = (newRecurrence: {
    ends: ScheduleEnd;
    rule: RecurrenceRule;
  }) =>
    props.onChange({
      recurrence: {
        ...newRecurrence,
      },
    });

  const schedule = useMemo(
    () => computeOccurrence(props.startDate, props.recurrence),
    [props.startDate, props.recurrence],
  );

  const containerClass = classNames(styles.container);

  const showAdditionalDetail =
    (props.recurrence.ends.type === "duration" ||
      (props.recurrence.ends.type === "date" &&
        props.recurrence.ends.date > props.startDate)) &&
    props.selectedRecurringOption !== RecurrenceOptions.AsNeeded &&
    schedule.lastOccurrence !== undefined;

  return (
    <div className={containerClass}>
      <Card>
        <Content>
          <>
            <Content spacing="small">
              <RecurringSelect
                recurrenceRule={props.recurrence.rule}
                recurrenceEnds={props.recurrence.ends}
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
