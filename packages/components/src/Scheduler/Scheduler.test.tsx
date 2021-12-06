/* eslint-disable max-statements */
import React, { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { DatePickerProps } from "jobber/payments_react/Sg1DatePicker";
import { Scheduler } from "./Scheduler";
import { DurationPeriod, RecurrenceOptions, SchedulerState } from "./types";
import { useScheduler } from "./useScheduler";

jest.mock("@jobber/components/dist/Tooltip", () => {
  return {
    Tooltip: function Tooltip({ children }: { children: React.ReactNode }) {
      return children;
    },
  };
});

jest.mock("jobber/payments_react/Sg1DatePicker", () => {
  return {
    Sg1DatePicker: function Sg1DatePicker(props: DatePickerProps) {
      // onChangeStartDate in Scheduler has an OR branching logic that
      // can only be tested by forcing the mocked Sg1DatePicker to return
      // undefined for a special case. (In this case year is before 2021)
      // this is because Scheduler always works with a date so it is never
      // undefined but because Sg1DatePicker might return undefined we
      // still have to account for it in onChangeStartDate
      const mockUpdateDate =
        props.date && props.date.getFullYear() < 2021 ? undefined : props.date;

      const onInput = () => props.onChange && props.onChange(mockUpdateDate);
      return (
        <>
          <input
            data-testid={props["data-testid"] || ""}
            onInput={onInput}
            placeholder="_"
            defaultValue="_"
          />
        </>
      );
    },
  };
});

describe("Scheduler", () => {
  const SchedulerApp = (props: Partial<SchedulerState>) => {
    const [schedulerState, setSchedulerState] = useScheduler(props);
    const [calendarIsHidden, setCalendarIsHidden] = useState(false);

    const onHideCalendar = () => setCalendarIsHidden(!calendarIsHidden);

    const onChange = (partialNextSchedule: Partial<SchedulerState>) =>
      setSchedulerState({ ...schedulerState, ...partialNextSchedule });

    return (
      <Scheduler
        onChange={onChange}
        onHideCalendar={onHideCalendar}
        calendarIsHidden={calendarIsHidden}
        {...schedulerState}
        {...props}
      />
    );
  };

  it("should allow the user to show and hide the calendar", async () => {
    const rendered = render(<SchedulerApp />);

    const showHideCalendarButtonEl = await rendered.findByRole("button", {
      name: "Hide Calendar",
    });
    expect(showHideCalendarButtonEl instanceof HTMLButtonElement).toBe(true);

    if (showHideCalendarButtonEl instanceof HTMLButtonElement) {
      act(() => {
        fireEvent.click(showHideCalendarButtonEl);
      });
    }

    await rendered.findByRole("button", {
      name: "Show Calendar",
    });
  });

  it("should allow the user to mark choose a 'Schedule later' option", async () => {
    const rendered = render(<SchedulerApp />);

    const scheduleLaterInputEl = await rendered.findByLabelText(
      "Schedule later",
    );
    expect(scheduleLaterInputEl).toBeDefined();
    expect(scheduleLaterInputEl instanceof HTMLInputElement).toBe(true);

    if (scheduleLaterInputEl instanceof HTMLInputElement) {
      expect(scheduleLaterInputEl.checked).toBe(false);

      act(() => {
        fireEvent.click(scheduleLaterInputEl);
      });

      expect(scheduleLaterInputEl.checked).toBe(true);
    }
  });

  it("should allow the user to provide a start date", async () => {
    const rendered = render(<SchedulerApp />);

    const startDateInputEl = await rendered.findByTestId(
      "job-scheduler-start-date",
    );
    expect(startDateInputEl).toBeDefined();

    act(() => {
      fireEvent.input(startDateInputEl);
    });
  });

  it("should render an empty schedule summary if schedule becomes empty", async () => {
    const rendered = render(<SchedulerApp />);

    const recurrenceSelectorEl = rendered.container.querySelector(
      "[name='recurring_schedule_dropdown']",
    );

    expect(recurrenceSelectorEl).toBeDefined();
    expect(recurrenceSelectorEl instanceof HTMLSelectElement).toBe(false);

    if (recurrenceSelectorEl instanceof HTMLSelectElement) {
      expect(rendered.queryByLabelText("Ends on")).toBeNull();
      expect(rendered.queryByLabelText("Ends after")).toBeNull();

      act(() => {
        fireEvent.change(recurrenceSelectorEl, {
          target: { value: RecurrenceOptions.Custom },
        });
      });

      const recurrenceDurationNumberInputEl = rendered.container.querySelector(
        '[name="schedule-end-interval"]',
      );
      expect(recurrenceDurationNumberInputEl).not.toBeNull();
      expect(recurrenceDurationNumberInputEl instanceof HTMLInputElement).toBe(
        true,
      );

      const recurrenceDurationPeriodSelectEl = rendered.container.querySelector(
        'select[name="end_period_dropdown"]',
      );
      expect(recurrenceDurationPeriodSelectEl).not.toBeNull();
      expect(
        recurrenceDurationPeriodSelectEl instanceof HTMLSelectElement,
      ).toBe(true);

      if (
        recurrenceDurationNumberInputEl instanceof HTMLInputElement &&
        recurrenceDurationPeriodSelectEl instanceof HTMLSelectElement
      ) {
        act(() => {
          fireEvent.change(recurrenceDurationPeriodSelectEl, {
            target: { value: DurationPeriod.DayOfMonth },
          });
        });

        act(() => {
          fireEvent.input(recurrenceDurationNumberInputEl, {
            target: { value: 1 },
          });
        });
      }

      const scheduleRecurrenceIntervalInputEl = rendered.container.querySelector(
        'input[name="schedule-recurrence-interval"]',
      );
      expect(scheduleRecurrenceIntervalInputEl).not.toBeNull();
      expect(
        scheduleRecurrenceIntervalInputEl instanceof HTMLInputElement,
      ).toBe(true);

      const scheduleRecurrenceTypeSelectEl = rendered.container.querySelector(
        'select[name="schedule-recurrence-type"]',
      );
      expect(scheduleRecurrenceTypeSelectEl).not.toBeNull();
      expect(scheduleRecurrenceTypeSelectEl instanceof HTMLSelectElement).toBe(
        true,
      );

      if (
        scheduleRecurrenceIntervalInputEl instanceof HTMLInputElement &&
        scheduleRecurrenceTypeSelectEl instanceof HTMLSelectElement
      ) {
        act(() => {
          fireEvent.input(scheduleRecurrenceIntervalInputEl, {
            target: { value: 1 },
          });
        });

        act(() => {
          fireEvent.change(scheduleRecurrenceTypeSelectEl, {
            target: { value: DurationPeriod.DayOfMonth },
          });
        });

        expect(scheduleRecurrenceIntervalInputEl.value).toBe("1");
      }
    }
  });

  it("should handle callbacks from Sg1DatePicker with an undefined value", async () => {
    const rendered = render(
      <SchedulerApp startDate={new Date(1995, 11, 17)} />,
    );

    const startDateInputEl = await rendered.findByTestId(
      "job-scheduler-start-date",
    );
    expect(startDateInputEl).toBeDefined();

    act(() => {
      fireEvent.input(startDateInputEl);
    });
  });

  it("should allow the user to provide a start- and end time or select 'Anytime on day of visit'.", async () => {
    const rendered = render(<SchedulerApp />);

    const startTimeInputEl = await rendered.findByLabelText("Start time");
    expect(startTimeInputEl).toBeDefined();
    expect(startTimeInputEl instanceof HTMLInputElement).toBe(true);

    const endTimeInputEl = await rendered.findByLabelText("End time");
    expect(endTimeInputEl).toBeDefined();
    expect(endTimeInputEl instanceof HTMLInputElement).toBe(true);

    const anyTimeCheckboxEl = await rendered.findByLabelText(
      "Anytime on day of visit",
    );
    expect(anyTimeCheckboxEl).toBeDefined();
    expect(anyTimeCheckboxEl instanceof HTMLInputElement).toBe(true);

    if (
      startTimeInputEl instanceof HTMLInputElement &&
      endTimeInputEl instanceof HTMLInputElement &&
      anyTimeCheckboxEl instanceof HTMLInputElement
    ) {
      expect(anyTimeCheckboxEl.checked).toBe(true);
      expect(startTimeInputEl.value).toBe("");
      expect(endTimeInputEl.value).toBe("");

      act(() => {
        fireEvent.change(startTimeInputEl, {
          target: { value: "10:00" },
        });
      });

      expect(anyTimeCheckboxEl.checked).toBe(false);
      expect(startTimeInputEl.value).toBe("10:00");
      expect(endTimeInputEl.value).toBe("");

      act(() => {
        fireEvent.change(endTimeInputEl, {
          target: { value: "08:00" },
        });
      });

      expect(anyTimeCheckboxEl.checked).toBe(false);
      expect(startTimeInputEl.value).toBe("10:00");
      expect(endTimeInputEl.value).toBe("08:00");

      act(() => {
        fireEvent.click(anyTimeCheckboxEl);
      });

      expect(anyTimeCheckboxEl.checked).toBe(true);
      expect(startTimeInputEl.value).toBe("");
      expect(endTimeInputEl.value).toBe("");

      act(() => {
        fireEvent.change(endTimeInputEl, {
          target: { value: "08:00" },
        });
      });

      expect(anyTimeCheckboxEl.checked).toBe(false);

      act(() => {
        fireEvent.change(endTimeInputEl, {
          target: { value: "" },
        });
      });

      expect(anyTimeCheckboxEl.checked).toBe(true);
    }
  });

  it("should allow the user to schedule a daily recurrence", async () => {
    const rendered = render(<SchedulerApp />);
    expect(rendered.queryByLabelText("End date")).toBeDefined();
    expect(rendered.queryByLabelText("Duration")).toBeDefined();

    const endsOnInputEl = await rendered.findByLabelText("End date");
    expect(endsOnInputEl).toBeDefined();
    expect(endsOnInputEl instanceof HTMLInputElement).toBe(true);

    const endsAfterInputEl = await rendered.findByLabelText("Duration");
    expect(endsAfterInputEl).toBeDefined();
    expect(endsAfterInputEl instanceof HTMLInputElement).toBe(true);

    if (
      endsAfterInputEl instanceof HTMLInputElement &&
      endsOnInputEl instanceof HTMLInputElement
    ) {
      act(() => {
        fireEvent.click(endsAfterInputEl);
      });

      const durationNumberInputEl = rendered.container.querySelector(
        "[name='schedule-end-interval']",
      );
      expect(durationNumberInputEl).toBeDefined();
      expect(durationNumberInputEl instanceof HTMLInputElement).toBe(true);

      const durationPeriodSelectEl = rendered.container.querySelector(
        'select[name="end_period_dropdown"]',
      );
      expect(durationPeriodSelectEl).toBeDefined();
      expect(durationPeriodSelectEl instanceof HTMLSelectElement).toBe(true);

      if (
        durationNumberInputEl instanceof HTMLInputElement &&
        durationPeriodSelectEl instanceof HTMLSelectElement
      ) {
        act(() => {
          fireEvent.input(durationNumberInputEl, { target: { value: "7" } });
        });

        expect(+durationNumberInputEl.value).toBe(7);

        act(() => {
          fireEvent.change(durationPeriodSelectEl, {
            target: { value: DurationPeriod.DayOfMonth },
          });
        });

        expect(durationPeriodSelectEl.value).toBe(DurationPeriod.DayOfMonth);
      }
    }

    const recurrenceDurationNumberInputEl = rendered.container.querySelector(
      '[name="schedule-end-interval"]',
    );
    expect(recurrenceDurationNumberInputEl).not.toBeNull();
    expect(recurrenceDurationNumberInputEl instanceof HTMLInputElement).toBe(
      true,
    );

    const recurrenceSelectorEl = rendered.container.querySelector(
      "[name='recurring_schedule_dropdown']",
    );

    expect(recurrenceSelectorEl).toBeDefined();
    expect(recurrenceSelectorEl instanceof HTMLSelectElement).toBe(true);

    if (recurrenceSelectorEl instanceof HTMLSelectElement) {
      act(() => {
        fireEvent.change(recurrenceSelectorEl, {
          target: { value: RecurrenceOptions.AsNeeded },
        });
      });

      act(() => {
        fireEvent.change(recurrenceSelectorEl, {
          target: { value: RecurrenceOptions.BiWeekly },
        });
      });

      act(() => {
        fireEvent.change(recurrenceSelectorEl, {
          target: { value: RecurrenceOptions.Custom },
        });
      });

      const recurrenceDurationPeriodSelectEl = rendered.container.querySelector(
        'select[name="end_period_dropdown"]',
      );
      expect(recurrenceDurationPeriodSelectEl).not.toBeNull();
      expect(
        recurrenceDurationPeriodSelectEl instanceof HTMLSelectElement,
      ).toBe(true);

      if (
        recurrenceDurationNumberInputEl instanceof HTMLInputElement &&
        recurrenceDurationPeriodSelectEl instanceof HTMLSelectElement
      ) {
        act(() => {
          fireEvent.change(recurrenceDurationPeriodSelectEl, {
            target: { value: DurationPeriod.Year },
          });
        });

        act(() => {
          fireEvent.input(recurrenceDurationNumberInputEl, {
            target: { value: 3 },
          });
        });
      }

      const scheduleRecurrenceIntervalInputEl = rendered.container.querySelector(
        'input[name="schedule-recurrence-interval"]',
      );
      expect(scheduleRecurrenceIntervalInputEl).not.toBeNull();
      expect(
        scheduleRecurrenceIntervalInputEl instanceof HTMLInputElement,
      ).toBe(true);

      const scheduleRecurrenceTypeSelectEl = rendered.container.querySelector(
        'select[name="schedule-recurrence-type"]',
      );
      expect(scheduleRecurrenceTypeSelectEl).not.toBeNull();
      expect(scheduleRecurrenceTypeSelectEl instanceof HTMLSelectElement).toBe(
        true,
      );

      if (
        scheduleRecurrenceIntervalInputEl instanceof HTMLInputElement &&
        scheduleRecurrenceTypeSelectEl instanceof HTMLSelectElement
      ) {
        act(() => {
          fireEvent.input(scheduleRecurrenceIntervalInputEl, {
            target: { value: 5 },
          });
        });

        act(() => {
          fireEvent.change(scheduleRecurrenceTypeSelectEl, {
            target: { value: DurationPeriod.Year },
          });
        });

        expect(scheduleRecurrenceIntervalInputEl.value).toBe("5");
      }
    }
  });
});
