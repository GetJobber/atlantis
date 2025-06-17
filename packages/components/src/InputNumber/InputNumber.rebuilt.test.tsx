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
