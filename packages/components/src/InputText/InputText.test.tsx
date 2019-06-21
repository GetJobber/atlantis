import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import { InputText } from "./InputText";

it("renders correctly with no props", () => {
  const tree = renderer.create(<InputText />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a placeholder", () => {
  const tree = renderer
    .create(<InputText placeholder="My placeholder" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly as small", () => {
  const tree = renderer.create(<InputText size="small" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly in a readonly state", () => {
  const tree = renderer.create(<InputText disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly in a disabled state", () => {
  const tree = renderer.create(<InputText disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("it should set the value", () => {
  const value = "Look, some words!";
  const { getByDisplayValue } = render(<InputText value={value} />);

  expect(getByDisplayValue(value)).toBeDefined();
});

test("it should call the handler with the new value", () => {
  const placeholder = "I hold places.";
  const newValue =
    "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
  const newerValue =
    "They always say time changes things, but you actually have to change them yourself.";
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <InputText onChange={changeHandler} placeholder={placeholder} />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newerValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newerValue);
});
