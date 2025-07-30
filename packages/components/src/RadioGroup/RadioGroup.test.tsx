import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioOption } from ".";

test("renders a RadioGroup", () => {
  const { container } = render(<MockRadioGroup />);
  expect(container).toMatchSnapshot();
});

test("it should call the handler with the new value", async () => {
  const user = userEvent.setup();
  const changeHandler = jest.fn();
  render(<MockRadioGroup onChange={changeHandler} />);
  await user.click(screen.getAllByLabelText("Two")[0]);
  expect(changeHandler).toHaveBeenCalledWith("two");
});

test("it should not call the handler if the value does not change", async () => {
  const user = userEvent.setup();
  const changeHandler = jest.fn();
  render(<MockRadioGroup onChange={changeHandler} />);
  await user.click(screen.getAllByText("One")[0]);
  expect(changeHandler).not.toHaveBeenCalled();
});

test("it should be able to disable options", () => {
  const handleChange = jest.fn();
  const { container } = render(
    <RadioGroup
      name="Foo"
      value="foo"
      onChange={handleChange}
      ariaLabel="Test Label"
    >
      <RadioOption value="foo" label="foo"></RadioOption>
      <RadioOption value="bear" label="bear" disabled={true}></RadioOption>
    </RadioGroup>,
  );

  expect(container.querySelector(`[value="bear"]`)).toBeDisabled();
});

test("it should have unique ids on all radio options", async () => {
  const user = userEvent.setup();
  render(<MockRadioGroup />);
  const radio1 = screen.getAllByRole("radio")[0] as HTMLInputElement;
  const radio2 = screen.getAllByRole("radio")[1] as HTMLInputElement;
  expect(radio1.checked).toBeTruthy();
  expect(radio2.checked).toBeFalsy();
  await user.click(radio2);
  expect(radio1.checked).toBeFalsy();
  expect(radio2.checked).toBeTruthy();
});

test("it should render an option from `label` prop", () => {
  render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo" label="Radio" />
    </RadioGroup>,
  );

  expect(screen.getByText("Radio")).toBeInstanceOf(HTMLLabelElement);
});

test("it should render an option from `children` prop", () => {
  render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo">Radio</RadioOption>
    </RadioGroup>,
  );

  expect(screen.getByText("Radio")).toBeInstanceOf(HTMLLabelElement);
});

test("it should render a description", () => {
  render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo" description="A sound box" label="Radio" />
    </RadioGroup>,
  );

  expect(screen.getByText("A sound box")).toBeInstanceOf(HTMLParagraphElement);
});

test("it should render a label, description, and children", () => {
  render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo" description="Description" label="Label">
        Children
      </RadioOption>
    </RadioGroup>,
  );

  expect(screen.getByText("Label")).toBeInstanceOf(HTMLLabelElement);
  expect(screen.getByText("Description")).toBeInstanceOf(HTMLParagraphElement);
  expect(screen.getByText("Children")).toBeInstanceOf(HTMLElement);
});

interface MockProps {
  onChange?(val: string): void;
}

function MockRadioGroup({ onChange }: MockProps) {
  const [value, setValue] = useState("one");
  const [valueTwo, setValueTwo] = useState("one");

  return (
    <>
      <RadioGroup
        onChange={handleFirstChange}
        value={value}
        ariaLabel="Test Label 1"
      >
        <RadioOption value="one" label="One" />
        <RadioOption value="two" label="Two" />
      </RadioGroup>
      <RadioGroup
        onChange={handleSecondChange}
        value={valueTwo}
        ariaLabel="Test Label 2"
      >
        <RadioOption value="one" label="One" />
        <RadioOption value="two" label="Two" />
      </RadioGroup>
    </>
  );

  function handleFirstChange(val: string) {
    setValue(val);
    onChange && onChange(val);
  }

  function handleSecondChange(val: string) {
    setValueTwo(val);
    onChange && onChange(val);
  }
}
