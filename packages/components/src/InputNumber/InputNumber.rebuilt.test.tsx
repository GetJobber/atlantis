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

test("it should handle focus", async () => {
  const inputRef = React.createRef<InputNumberRef>();
  const placeholder = "Number";

  const { getByLabelText } = render(
    <InputNumber placeholder={placeholder} ref={inputRef} version={2} />,
  );

  await act(async () => {
    inputRef?.current?.focus();
  });
  expect(document.activeElement).toBe(getByLabelText(placeholder));
});

test("it should handle blur", async () => {
  const inputRef = React.createRef<InputNumberRef>();
  const blurHandler = jest.fn();

  render(<InputNumber ref={inputRef} onBlur={blurHandler} version={2} />);

  await act(async () => {
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

describe("HTMLInputBaseProps", () => {
  it("should render with id attribute", () => {
    const { getByRole } = render(
      <InputNumber version={2} placeholder="Number" id="test-id" />,
    );
    expect(getByRole("textbox")).toHaveAttribute("id", "test-id");
  });

  it("should be disabled when disabled prop is true", () => {
    const { getByRole } = render(
      <InputNumber version={2} placeholder="Number" disabled />,
    );
    expect(getByRole("textbox")).toBeDisabled();
  });

  it("should not allow typing when disabled", async () => {
    const changeHandler = jest.fn();
    const { getByRole } = render(
      <InputNumber
        version={2}
        placeholder="Number"
        disabled
        onChange={changeHandler}
      />,
    );
    const input = getByRole("textbox");
    await userEvent.type(input, "123");
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("should be read-only when readOnly prop is true", () => {
    const { getByRole } = render(
      <InputNumber version={2} placeholder="Number" readOnly />,
    );
    expect(getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("should not allow typing when readOnly", async () => {
    const changeHandler = jest.fn();
    const { getByRole } = render(
      <InputNumber
        version={2}
        placeholder="Number"
        readOnly
        value={10}
        onChange={changeHandler}
      />,
    );
    const input = getByRole("textbox");
    await userEvent.type(input, "5");
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("should auto-focus when autoFocus prop is true", () => {
    const { getByRole } = render(
      <InputNumber version={2} placeholder="Number" autoFocus />,
    );
    expect(getByRole("textbox")).toHaveFocus();
  });
});

describe("RebuiltInputCommonProps", () => {
  it("should render placeholder as label", () => {
    const { getByLabelText } = render(
      <InputNumber version={2} placeholder="Enter amount" />,
    );
    expect(getByLabelText("Enter amount")).toBeInTheDocument();
  });

  it("should apply invalid styling when invalid prop is true", () => {
    const { container } = render(
      <InputNumber version={2} placeholder="Number" invalid />,
    );
    const wrapper = container.querySelector('[role="group"]');
    expect(wrapper).toHaveClass("invalid");
  });

  it("should apply small size class", () => {
    const { container } = render(
      <InputNumber version={2} placeholder="Number" size="small" />,
    );
    const inputWrapper = container.querySelector('[class*="inputWrapper"]');
    expect(inputWrapper).toHaveClass("small");
  });

  it("should apply large size class", () => {
    const { container } = render(
      <InputNumber version={2} placeholder="Number" size="large" />,
    );
    const inputWrapper = container.querySelector('[class*="inputWrapper"]');
    expect(inputWrapper).toHaveClass("large");
  });

  it("should apply inline class", () => {
    const { container } = render(
      <InputNumber version={2} placeholder="Number" inline />,
    );
    const containerEl = container.firstChild;
    expect(containerEl).toHaveClass("inline");
  });

  it("should render string description", () => {
    const description = "Enter a whole number";
    const { getByText } = render(
      <InputNumber
        version={2}
        placeholder="Number"
        description={description}
      />,
    );
    expect(getByText(description)).toBeInTheDocument();
  });
});

describe("Event handlers", () => {
  it("should call onFocus when input is focused", async () => {
    const focusHandler = jest.fn();
    const { getByRole } = render(
      <InputNumber version={2} placeholder="Number" onFocus={focusHandler} />,
    );
    await userEvent.click(getByRole("textbox"));
    expect(focusHandler).toHaveBeenCalledTimes(1);
  });

  it("should call onKeyDown when key is pressed", async () => {
    const keyDownHandler = jest.fn();
    const { getByRole } = render(
      <InputNumber
        version={2}
        placeholder="Number"
        onKeyDown={keyDownHandler}
      />,
    );
    const input = getByRole("textbox");
    await userEvent.type(input, "1");
    expect(keyDownHandler).toHaveBeenCalled();
  });

  it("should call onKeyUp when key is released", async () => {
    const keyUpHandler = jest.fn();
    const { getByRole } = render(
      <InputNumber version={2} placeholder="Number" onKeyUp={keyUpHandler} />,
    );
    const input = getByRole("textbox");
    await userEvent.type(input, "1");
    expect(keyUpHandler).toHaveBeenCalled();
  });
});
