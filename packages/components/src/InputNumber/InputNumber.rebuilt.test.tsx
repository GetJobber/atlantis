import React from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputNumber, InputNumberRef } from ".";

it("renders an input type number", () => {
  const { getByLabelText } = render(
    <InputNumber version={2} value={123} placeholder="My number" />,
  );
  expect(getByLabelText("My number")).toBeInTheDocument();
});

test("it should call the handler with a number value", async () => {
  const changeHandler = jest.fn();
  const newValue = 100;
  const placeholder = "Count";

  const { getByLabelText } = render(
    <InputNumber
      version={2}
      onChange={changeHandler}
      placeholder={placeholder}
      name={placeholder}
    />,
  );
  const input = getByLabelText(placeholder);
  await userEvent.clear(input);
  await userEvent.type(input, newValue.toString());
  await userEvent.tab();
  expect(changeHandler).toHaveBeenCalledWith(newValue, undefined);
});

test("it should handle focus", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const placeholder = "Number";

  const { getByLabelText } = render(
    <InputNumber placeholder={placeholder} ref={inputRef} version={2} />,
  );

  act(() => {
    inputRef?.current?.focus();
  });
  expect(document.activeElement).toBe(getByLabelText(placeholder));
});

test("it should handle blur", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const blurHandler = jest.fn();

  render(<InputNumber ref={inputRef} onBlur={blurHandler} version={2} />);

  act(() => {
    inputRef?.current?.focus();
    inputRef?.current?.blur();
  });
  expect(blurHandler).toHaveBeenCalledTimes(1);
});

test("it should show validation error when value is below minValue", () => {
  const { getByText } = render(
    <InputNumber version={2} value={5} minValue={10} placeholder="Number" />,
  );

  expect(
    getByText("Enter a number that is greater than or equal to 10"),
  ).toBeVisible();
});

test("it should show validation error when value is above maxValue", () => {
  const { getByText } = render(
    <InputNumber version={2} value={15} maxValue={10} placeholder="Number" />,
  );

  expect(
    getByText("Enter a number that is less than or equal to 10"),
  ).toBeVisible();
});

test("it should show validation error when value is outside minValue and maxValue range", () => {
  const { getByText } = render(
    <InputNumber
      version={2}
      value={25}
      minValue={10}
      maxValue={20}
      placeholder="Number"
    />,
  );

  expect(getByText("Enter a number between 10 and 20")).toBeVisible();
});

test("it should not show validation error when value is within range", () => {
  const { queryByText } = render(
    <InputNumber
      version={2}
      value={15}
      minValue={10}
      maxValue={20}
      placeholder="Number"
    />,
  );

  expect(
    queryByText("Enter a number between 10 and 20"),
  ).not.toBeInTheDocument();
});

test("it should not show validation error when value is undefined", () => {
  const { queryByText } = render(
    <InputNumber
      version={2}
      value={undefined}
      minValue={10}
      maxValue={20}
      placeholder="Number"
    />,
  );

  expect(
    queryByText("Enter a number between 10 and 20"),
  ).not.toBeInTheDocument();
});

test("it should prioritize custom error over min/max validation error", () => {
  const customError = "Custom error message";
  const { getByText, queryByText } = render(
    <InputNumber
      version={2}
      value={25}
      minValue={10}
      maxValue={20}
      error={customError}
      placeholder="Number"
    />,
  );

  expect(getByText(customError)).toBeVisible();
  expect(
    queryByText("Enter a number between 10 and 20"),
  ).not.toBeInTheDocument();
});
