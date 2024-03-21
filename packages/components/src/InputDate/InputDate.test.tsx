import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { InputDate } from ".";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { Text } from "../Text";

it("renders a blank form by default", () => {
  const { getByDisplayValue, queryByText } = render(
    <InputDate onChange={jest.fn()} />,
  );
  expect(getByDisplayValue("")).toBeInTheDocument();
  expect(queryByText("15")).not.toBeInTheDocument();
});

it("fires onChange with the new value when you click a date", () => {
  const date = "11/11/2011";
  const newDate = "11/15/2011";
  const changeHandler = jest.fn();
  const { getByText, getByRole } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  const calendarButton = getByRole("button");

  fireEvent.click(calendarButton);

  const selectDate = getByText("15");
  fireEvent.click(selectDate);
  expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
});
it("shouldn't call onChange with the new value when you click a disabled date", () => {
  const date = "11/11/2011";
  const minDate = "11/9/2011";
  const maxDate = "11/15/2011";
  const changeHandler = jest.fn();
  const { getByRole, getByText } = render(
    <InputDate
      minDate={new Date(minDate)}
      maxDate={new Date(maxDate)}
      value={new Date(date)}
      onChange={changeHandler}
    />,
  );
  const calendarButton = getByRole("button");
  fireEvent.click(calendarButton);

  const selectDate1 = getByText("7");
  fireEvent.click(selectDate1);
  const selectDate2 = getByText("17");
  fireEvent.click(selectDate2);
  expect(changeHandler).not.toHaveBeenCalled();
});

it("fires onChange with the new value when you type a different date", () => {
  const date = "11/11/2011";
  const newDate = "11/15/2011";
  const placeholder = "placeholder";
  const changeHandler = jest.fn();
  const { getByLabelText } = render(
    <InputDate
      value={new Date(date)}
      onChange={changeHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newDate },
  });
  expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
});

it("updates the value of the field when the value prop changes", () => {
  const date = "11/11/2011";
  const newDate = "11/15/2011";
  const changeHandler = jest.fn();
  const { queryByDisplayValue, rerender } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  expect(queryByDisplayValue(date)).toBeInTheDocument();

  rerender(<InputDate value={new Date(newDate)} onChange={changeHandler} />);

  expect(queryByDisplayValue(date)).not.toBeInTheDocument();
  expect(queryByDisplayValue(newDate)).toBeInTheDocument();
});

it("returns the correct date object when long formatted date is supplied", () => {
  const date = "11/11/2011";
  const newDate = "November 15, 2011";
  const changeHandler = jest.fn();
  const { getByDisplayValue } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  expect(getByDisplayValue(date)).toBeInTheDocument();

  fireEvent.change(getByDisplayValue(date), {
    target: { value: newDate },
  });

  expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
});

it("doesn't fire onChange when the new value is invalid", async () => {
  const date = "11/11/2011";
  const badInput = "bad input";
  const changeHandler = jest.fn();
  const placeholder = "placeholder";
  const { getByDisplayValue, getByLabelText } = render(
    <InputDate
      placeholder={placeholder}
      value={new Date(date)}
      onChange={changeHandler}
    />,
  );

  expect(getByDisplayValue(date)).toBeInTheDocument();

  const form = getByDisplayValue(date);
  fireEvent.focus(form);

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: badInput },
  });
  expect(changeHandler).toHaveBeenCalledTimes(0);
});

it("doesn't display the calendar when input is focused with keyboard", () => {
  const date = "11/11/2011";
  const changeHandler = jest.fn();
  const { queryByText, getByDisplayValue } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  const input = getByDisplayValue(date);

  fireEvent.focus(input);

  expect(queryByText("15")).not.toBeInTheDocument();
});
it("doesn't display the calendar when calendar button is focused with keyboard", () => {
  const date = "11/11/2011";
  const changeHandler = jest.fn();
  const { queryByText, getByRole } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  const calendarButton = getByRole("button");

  fireEvent.focus(calendarButton);

  expect(queryByText("15")).not.toBeInTheDocument();
});

it("displays the calendar when button is pressed", () => {
  const date = "11/11/2011";
  const changeHandler = jest.fn();
  const { getByText, getByRole } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  const calendarButton = getByRole("button");

  fireEvent.click(calendarButton);

  expect(getByText("15")).toBeInTheDocument();
});

it("displays the calendar when input is focused with a click", () => {
  const date = "11/11/2011";
  const changeHandler = jest.fn();
  const { getByText, getByDisplayValue } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  const input = getByDisplayValue(date);

  fireEvent.click(input);

  expect(getByText("15")).toBeInTheDocument();
});

describe("when InputDate is used within a Modal", () => {
  it("should close only the open picker when the escape key is pressed", async () => {
    const date = "11/11/2011";
    const { getByRole, getByText, getByDisplayValue, queryByText } = render(
      <NestedTestComponent date={date} />,
    );
    const button = getByRole("button");
    fireEvent.click(button);

    const input = getByDisplayValue(date);
    fireEvent.click(input);

    expect(getByText("15")).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "Escape" });

    expect(getByText("Test Modal Content")).toBeInTheDocument();
    expect(queryByText("15")).not.toBeInTheDocument();
  });
});

function NestedTestComponent(props: { readonly date: string }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const changeHandler = jest.fn();

  return (
    <div>
      <Modal open={isOpen}>
        <Text>Test Modal Content</Text>
        <InputDate value={new Date(props.date)} onChange={changeHandler} />
      </Modal>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        label={isOpen ? "Close" : "Open"}
      />
    </div>
  );
}
