import React from "react";
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
