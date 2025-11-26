import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { InputNumberRef } from ".";
import { InputNumber } from ".";

it("renders an input type number", () => {
  render(
    <InputNumber
      version={2}
      value={123}
      placeholder="My number"
      minValue={0}
      maxValue={200}
    />,
  );
  expect(screen.getByLabelText("My number")).toBeVisible();
});

test("it should call the handler with a number value", async () => {
  const changeHandler = jest.fn();
  const newValue = 100;
  const placeholder = "Count";

  render(
    <InputNumber
      version={2}
      onChange={changeHandler}
      placeholder={placeholder}
      name={placeholder}
    />,
  );
  const input = screen.getByLabelText(placeholder);
  await userEvent.clear(input);
  await userEvent.type(input, newValue.toString());
  await userEvent.tab();
  expect(changeHandler).toHaveBeenCalledWith(newValue, undefined);
});

test("it should handle focus", async () => {
  const inputRef = React.createRef<InputNumberRef>();
  const placeholder = "Number";

  render(<InputNumber placeholder={placeholder} ref={inputRef} version={2} />);

  await act(async () => {
    inputRef?.current?.focus();
  });
  expect(document.activeElement).toBe(screen.getByLabelText(placeholder));
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
  render(
    <InputNumber version={2} value={25} maxValue={20} placeholder="Number" />,
  );

  const input = screen.getByRole("textbox", { name: "Number" });
  expect(input).toBeVisible();
  expect(input).toHaveValue("20");
});

test("it should clamp value to minValue when value is below minValue", () => {
  render(
    <InputNumber version={2} value={5} minValue={10} placeholder="Number" />,
  );

  const input = screen.getByRole("textbox", { name: "Number" });
  expect(input).toBeVisible();
  expect(input).toHaveValue("10");
});

test("it should render element description directly without wrapping in paragraph", () => {
  const customDescription = (
    <div data-testid="custom-description">Custom element description</div>
  );

  render(
    <InputNumber
      version={2}
      placeholder="Number"
      description={customDescription}
    />,
  );

  const descriptionElement = screen.getByTestId("custom-description");
  expect(descriptionElement).toBeVisible();
  expect(descriptionElement.parentElement).not.toBeInstanceOf(
    HTMLParagraphElement,
  );
});

describe("HTMLInputBaseProps", () => {
  it("should render with id attribute", () => {
    render(<InputNumber version={2} placeholder="Number" id="test-id" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "test-id");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<InputNumber version={2} placeholder="Number" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should not allow typing when disabled", async () => {
    const changeHandler = jest.fn();
    render(
      <InputNumber
        version={2}
        placeholder="Number"
        disabled
        onChange={changeHandler}
      />,
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "123");
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("should be read-only when readOnly prop is true", () => {
    render(<InputNumber version={2} placeholder="Number" readOnly />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("should not allow typing when readOnly", async () => {
    const changeHandler = jest.fn();
    render(
      <InputNumber
        version={2}
        placeholder="Number"
        readOnly
        value={10}
        onChange={changeHandler}
      />,
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "5");
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("should auto-focus when autoFocus prop is true", () => {
    render(<InputNumber version={2} placeholder="Number" autoFocus />);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

describe("RebuiltInputCommonProps", () => {
  it("should render placeholder as label", () => {
    render(<InputNumber version={2} placeholder="Enter amount" />);
    expect(screen.getByLabelText("Enter amount")).toBeVisible();
  });

  it("should apply invalid styling when invalid prop is true", () => {
    render(<InputNumber version={2} placeholder="Number" invalid />);
    const wrapper = screen.getByRole("group");
    expect(wrapper).toHaveClass("invalid");
  });

  it("should apply small size class", () => {
    render(<InputNumber version={2} placeholder="Number" size="small" />);
    const input = screen.getByRole("textbox");
    const inputWrapper = input.closest('[class*="inputWrapper"]');
    expect(inputWrapper).toHaveClass("small");
  });

  it("should apply large size class", () => {
    render(<InputNumber version={2} placeholder="Number" size="large" />);
    const input = screen.getByRole("textbox");
    const inputWrapper = input.closest('[class*="inputWrapper"]');
    expect(inputWrapper).toHaveClass("large");
  });

  it("should apply inline class", () => {
    render(<InputNumber version={2} placeholder="Number" inline />);
    const group = screen.getByRole("group");
    expect(group.parentElement).toHaveClass("inline");
  });

  it("should render string description", () => {
    const description = "Enter a whole number";
    render(
      <InputNumber
        version={2}
        placeholder="Number"
        description={description}
      />,
    );
    expect(screen.getByText(description)).toBeVisible();
  });
});

describe("Event handlers", () => {
  it("should call onFocus when input is focused", async () => {
    const focusHandler = jest.fn();
    render(
      <InputNumber version={2} placeholder="Number" onFocus={focusHandler} />,
    );
    await userEvent.click(screen.getByRole("textbox"));
    expect(focusHandler).toHaveBeenCalledTimes(1);
  });

  it("should call onKeyDown when key is pressed", async () => {
    const keyDownHandler = jest.fn();
    render(
      <InputNumber
        version={2}
        placeholder="Number"
        onKeyDown={keyDownHandler}
      />,
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "1");
    expect(keyDownHandler).toHaveBeenCalled();
  });

  it("should call onKeyUp when key is released", async () => {
    const keyUpHandler = jest.fn();
    render(
      <InputNumber version={2} placeholder="Number" onKeyUp={keyUpHandler} />,
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "1");
    expect(keyUpHandler).toHaveBeenCalled();
  });
});
