import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BaseSwitch } from "./BaseSwitch";

it("renders a Switch with value true", () => {
  const tree = render(<BaseSwitch value={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Switch with defaultValue true", () => {
  const tree = render(<BaseSwitch defaultValue={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Switch with value false", () => {
  const tree = render(<BaseSwitch value={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Switch with defaultValue false", () => {
  const tree = render(<BaseSwitch defaultValue={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a disabled Switch with value true", () => {
  const tree = render(<BaseSwitch value={true} disabled={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a disabled Switch with value false", () => {
  const tree = render(<BaseSwitch value={false} disabled={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("invokes the valueChange callback", () => {
  const valueChangedCallback = jest.fn();
  const tree = render(
    <BaseSwitch
      value={false}
      onValueChange={valueChangedCallback}
      accessibilityLabel={"test switch"}
    />,
  );
  fireEvent(tree.getByLabelText("test switch"), "valueChange", true);
  expect(valueChangedCallback).toHaveBeenCalledWith(true);
  fireEvent(tree.getByLabelText("test switch"), "valueChange", false);
  expect(valueChangedCallback).toHaveBeenCalledWith(false);
});

it("doesn't invoke the valueChange callback if disabled", () => {
  const valueChangedCallback = jest.fn();
  const tree = render(
    <BaseSwitch
      value={false}
      disabled={true}
      onValueChange={valueChangedCallback}
      accessibilityLabel={"test switch"}
    />,
  );
  fireEvent(tree.getByLabelText("test switch"), "valueChange", true);
  expect(valueChangedCallback).not.toHaveBeenCalled();
});
