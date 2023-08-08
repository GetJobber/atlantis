import React, { useState } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { RadioGroup, RadioOption } from ".";

afterEach(cleanup);

test("renders a RadioGroup", () => {
  const { container } = render(<MockRadioGroup />);
  expect(container).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const changeHandler = jest.fn();
  const { getAllByLabelText } = render(
    <MockRadioGroup onChange={changeHandler} />,
  );
  fireEvent.click(getAllByLabelText("Two")[0]);
  expect(changeHandler).toHaveBeenCalledWith("two");
});

test("it should not call the handler if the value does not change", () => {
  const changeHandler = jest.fn();
  const { getAllByText } = render(<MockRadioGroup onChange={changeHandler} />);
  fireEvent.click(getAllByText("One")[0]);
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

test("it should have unique ids on all radio options", () => {
  const { container, getAllByLabelText } = render(<MockRadioGroup />);
  const labels = getAllByLabelText("Two");
  const radio1 = container.querySelector(
    `input#${labels[0].id}`,
  ) as HTMLInputElement;
  const radio2 = container.querySelector(
    `input#${labels[1].id}`,
  ) as HTMLInputElement;
  expect(radio1.checked).toBeFalsy();
  expect(radio2.checked).toBeFalsy();
  fireEvent.click(labels[1]);
  expect(radio1.checked).toBeFalsy();
  expect(radio2.checked).toBeTruthy();
});

test("it should render an option from `label` prop", () => {
  const { getByText } = render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo" label="Radio" />
    </RadioGroup>,
  );

  expect(getByText("Radio")).toBeInstanceOf(HTMLLabelElement);
});

test("it should render an option from `children` prop", () => {
  const { getByText } = render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo">Radio</RadioOption>
    </RadioGroup>,
  );

  expect(getByText("Radio")).toBeInstanceOf(HTMLLabelElement);
});

test("it should render a description", () => {
  const { getByText } = render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo" description="A sound box" label="Radio" />
    </RadioGroup>,
  );

  expect(getByText("A sound box")).toBeInstanceOf(HTMLParagraphElement);
});

test("it should render a label, description, and children", () => {
  const { getByText } = render(
    <RadioGroup value="" onChange={jest.fn()} ariaLabel="Test Label">
      <RadioOption value="foo" description="Description" label="Label">
        Children
      </RadioOption>
    </RadioGroup>,
  );

  expect(getByText("Label")).toBeInstanceOf(HTMLLabelElement);
  expect(getByText("Description")).toBeInstanceOf(HTMLParagraphElement);
  expect(getByText("Children")).toBeInstanceOf(HTMLElement);
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
