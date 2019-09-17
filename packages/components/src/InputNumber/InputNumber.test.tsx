import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputNumber } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const tree = renderer.create(<InputNumber value={123} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an error", () => {
  const tree = renderer
    .create(<InputNumber value={1.1} errorMessage="Not a whole number" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the handler with a number value", () => {
  const changeHandler = jest.fn();
  const newValue = 100;
  const placeholder = "Count";

  const { getByLabelText } = render(
    <InputNumber
      onChange={changeHandler}
      placeholder={placeholder}
      name={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);
});

test("it should call the validation handler and return a range message", () => {
  const validationHandler = jest.fn();
  const expectedValidationCallBack = [
    {
      shouldShow: true,
      message: "Enter a number between 0 and 100",
      status: "error",
    },
  ];

  render(
    <InputNumber
      value={101}
      min={0}
      max={100}
      onValidate={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith(expectedValidationCallBack);
});

test("it should show a over max message", () => {
  const validationHandler = jest.fn();
  const expectedValidationCallBack = [
    {
      shouldShow: true,
      message: "Enter a number that is less than or equal to 100",
      status: "error",
    },
  ];

  render(
    <InputNumber
      value={101}
      max={100}
      onValidate={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith(expectedValidationCallBack);
});

test("it should show an under min message", () => {
  const validationHandler = jest.fn();
  const expectedValidationCallBack = [
    {
      shouldShow: true,
      message: "Enter a number that is greater than or equal to 99",
      status: "error",
    },
  ];

  render(
    <InputNumber
      value={98}
      min={99}
      onValidate={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith(expectedValidationCallBack);
});
