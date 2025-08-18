import React from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { InputNumberRef } from ".";
import { InputNumber } from ".";

it("renders an input type number", () => {
  const { getByLabelText } = render(
    <InputNumber
      version={2}
      value={123}
      placeholder="My number"
      minValue={0}
      maxValue={200}
    />,
  );
  expect(getByLabelText("My number")).toBeVisible();
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

test("it should clamp value to maxValue when value exceeds maxValue", () => {
  const { getByRole } = render(
    <InputNumber version={2} value={25} maxValue={20} placeholder="Number" />,
  );

  const input = getByRole("textbox", { name: "Number" });
  expect(input).toBeVisible();
  expect(input).toHaveValue("20");
});

test("it should clamp value to minValue when value is below minValue", () => {
  const { getByRole } = render(
    <InputNumber version={2} value={5} minValue={10} placeholder="Number" />,
  );

  const input = getByRole("textbox", { name: "Number" });
  expect(input).toBeVisible();
  expect(input).toHaveValue("10");
});

test("it should render element description directly without wrapping in paragraph", () => {
  const customDescription = (
    <div data-testid="custom-description">Custom element description</div>
  );

  const { getByTestId } = render(
    <InputNumber
      version={2}
      placeholder="Number"
      description={customDescription}
    />,
  );

  const descriptionElement = getByTestId("custom-description");
  expect(descriptionElement).toBeVisible();
  expect(descriptionElement.parentElement).not.toBeInstanceOf(
    HTMLParagraphElement,
  );
});
