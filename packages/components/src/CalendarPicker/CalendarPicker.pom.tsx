import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarPicker } from "./CalendarPicker";
import {
  CalendarPickerProps,
  PickedCalendarRange,
} from "./CalendarPickerTypes";
import { useHumanReadable } from "./useHumanReadableRRule";

const selectID = "ATL-CalendarPicker-Select";
const dailyID = "ATL-CalendarPicker-Daily";
const weeklyID = "ATL-CalendarPicker-Weekly";
const monthlyID = "ATL-CalendarPicker-Monthly";
const yearlyID = "ATL-CalendarPicker-Yearly";

const HumanReadable = ({
  range,
  testId = "human-readable",
}: {
  readonly range: PickedCalendarRange;
  readonly testId?: string;
}) => {
  const humanReadable = useHumanReadable(range);

  return <div data-testid={testId}>{humanReadable}</div>;
};

export const HumanReadablePOM = (range: PickedCalendarRange) => {
  const { getByTestId } = render(
    <HumanReadable range={range} testId="human-readable" />,
  );

  const getHumanReadable = () => {
    const element = getByTestId("human-readable");

    return element.textContent;
  };

  return { getHumanReadable };
};

export const CalendarPickerPOM = (props?: CalendarPickerProps) => {
  const newValue = jest.fn();
  const { queryByTestId } = render(
    <CalendarPicker {...props} selectPickerId={selectID} onUpdate={newValue} />,
  );

  const getSelect = () => queryByTestId(selectID)?.querySelector("select");

  const changeCurrentFrequencyTo = async (value: string) => {
    const select = getSelect();

    if (select) {
      await userEvent.selectOptions(select, value);
    }
  };

  const getCurrentFrequency = async () => {
    const select = getSelect();
    let currentFrequency = "";

    if (select) {
      currentFrequency = select.value;
    }

    return currentFrequency;
  };

  const toggleMonthRadio = () => {
    const radioButtons = queryByTestId(monthlyID)?.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;

    if (radioButtons[0].checked) {
      userEvent.click(radioButtons[1]);
    } else {
      userEvent.click(radioButtons[0]);
    }
  };

  const clickButtonsByIndex = async (indexes: number[]) => {
    const select = getSelect();

    if (select) {
      let buttons: NodeListOf<HTMLButtonElement> | undefined;

      switch (select.value) {
        case "Daily":
          buttons = queryByTestId(dailyID)?.querySelectorAll("button");
          break;
        case "Weekly":
          buttons = queryByTestId(weeklyID)?.querySelectorAll("button");
          break;
        case "Monthly":
          buttons = queryByTestId(monthlyID)?.querySelectorAll("button");
          break;
        case "Yearly":
          buttons = queryByTestId(yearlyID)?.querySelectorAll("button");
          break;
      }

      for (let i = 0; i < indexes?.length; i++) {
        if (buttons?.[indexes[i]]) {
          await userEvent.click(buttons[indexes[i]]);
        }
      }
    }
  };

  const changeIntervalTo = async (newInterval: number) => {
    const select = getSelect();

    if (select) {
      let input;

      switch (select.value) {
        case "Daily":
          input = queryByTestId(dailyID)?.querySelector("input");
          break;
        case "Weekly":
          input = queryByTestId(weeklyID)?.querySelector("input");
          break;
        case "Monthly":
          input = queryByTestId(monthlyID)?.querySelector("input");
          break;
        case "Yearly":
          input = queryByTestId(yearlyID)?.querySelector("input");
      }

      if (input) {
        await userEvent.clear(input);
        await userEvent.type(input, String(newInterval));
      }
    }
  };

  const getCurrentInterval = () => {
    const select = getSelect();
    let interval = "1";

    if (select) {
      let input;

      switch (select.value) {
        case "Daily":
          input = queryByTestId(dailyID)?.querySelector("input");
          break;
        case "Weekly":
          input = queryByTestId(weeklyID)?.querySelector("input");
          break;
        case "Monthly":
          input = queryByTestId(monthlyID)?.querySelector("input");
          break;
        case "Yearly":
          input = queryByTestId(yearlyID)?.querySelector("input");
      }

      if (input) {
        interval = input.value;
      }
    }

    return Number(interval);
  };

  return {
    lastRange: () => newValue.mock.calls[newValue.mock.calls.length - 1]?.[0],
    changeCurrentFrequencyTo,
    getCurrentFrequency,
    clickButtonsByIndex,
    toggleMonthRadio,
    changeIntervalTo,
    getCurrentInterval,
  };
};
