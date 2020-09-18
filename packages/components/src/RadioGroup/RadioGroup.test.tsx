import React, { useState } from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { RadioGroup, RadioOption } from ".";

afterEach(cleanup);

test("renders a RadioGroup", () => {
  const handleChange = jest.fn();
  const currentValue = "bear";

  const radioGroup = (
    <RadioGroup name="Foo" value={currentValue} onChange={handleChange}>
      <RadioOption value="foo">Foo</RadioOption>
      <RadioOption value="bear">Bear</RadioOption>
    </RadioGroup>
  );

  const tree = renderer.create(radioGroup).toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const labelOne = "Foo1";
  const labelTwo = "Foo2";
  const currentValue = "bear";

  const handleChange = jest.fn();

  const { getByText } = render(
    <RadioGroup name="Foo" value={currentValue} onChange={handleChange}>
      <RadioOption value="foo">{labelOne}</RadioOption>
      <RadioOption value="bear">{labelTwo}</RadioOption>
    </RadioGroup>,
  );

  fireEvent.click(getByText(labelOne));
  expect(handleChange).toHaveBeenCalled();
});

test("it should be able to disable options", () => {
  const handleChange = jest.fn();
  const { container } = render(
    <RadioGroup name="Foo" value="foo" onChange={handleChange}>
      <RadioOption value="foo"></RadioOption>
      <RadioOption value="bear" disabled={true}></RadioOption>
    </RadioGroup>,
  );

  expect(container.querySelector(`[value="bear"]`)).toBeDisabled();
});

test("it should have unique ids on all radio options", () => {
  const { container, getAllByLabelText } = render(<MockRadioGroup />);
  const labels = getAllByLabelText("Two");
  const radio1 = container.querySelector(`input#${labels[0].id}`);
  const radio2 = container.querySelector(`input#${labels[1].id}`);
  expect(radio1.checked).toBeFalsy();
  expect(radio2.checked).toBeFalsy();
  fireEvent.click(labels[1]);
  expect(radio1.checked).toBeFalsy();
  expect(radio2.checked).toBeTruthy();
});

function MockRadioGroup() {
  const [value, setValue] = useState("One");
  const [valueTwo, setValueTwo] = useState("One");
  return (
    <>
      <RadioGroup onChange={setValue} value={value}>
        <RadioOption value="one">One</RadioOption>
        <RadioOption value="two">Two</RadioOption>
      </RadioGroup>
      <RadioGroup onChange={setValueTwo} value={valueTwo}>
        <RadioOption value="one">One</RadioOption>
        <RadioOption value="two">Two</RadioOption>
      </RadioGroup>
    </>
  );
}
