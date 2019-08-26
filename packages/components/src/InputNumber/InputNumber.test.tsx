import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputNumber } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const tree = renderer.create(<InputNumber value="123" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      "",
      <div
        className="wrapper"
        style={
          Object {
            "--formField-maxLength": undefined,
          }
        }
      >
        <label
          className="label"
          htmlFor="123e4567-e89b-12d3-a456-426655440000"
        >
           
        </label>
        <input
          className="formField"
          id="123e4567-e89b-12d3-a456-426655440000"
          onChange={[Function]}
          onFocus={[Function]}
          type="number"
          value="123"
        />
      </div>,
    ]
  `);
});

it("renders an error", () => {
  const tree = renderer
    .create(<InputNumber value="1.1" errorMessage="Not a whole number" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <p
        className="base base red"
      >
        Not a whole number
      </p>,
      <div
        className="wrapper hasErrorMessage invalid"
        style={
          Object {
            "--formField-maxLength": undefined,
          }
        }
      >
        <label
          className="label"
          htmlFor="123e4567-e89b-12d3-a456-426655440000"
        >
           
        </label>
        <input
          className="formField"
          id="123e4567-e89b-12d3-a456-426655440000"
          onChange={[Function]}
          onFocus={[Function]}
          type="number"
          value="1.1"
        />
      </div>,
    ]
  `);
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

test("it should call the validation with a success status", () => {
  const validationHandler = jest.fn();

  render(
    <InputNumber
      value={100}
      min={99}
      max={100}
      onValidate={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith("pass", "");
});

test("it should call the validation with a range error", () => {
  const validationHandler = jest.fn();

  render(
    <InputNumber
      value={101}
      min={99}
      max={100}
      onValidate={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith(
    "fail",
    "Enter a number between 99 and 100",
  );
});

test("it should call the validation with a max length error", () => {
  const validationHandler = jest.fn();

  render(
    <InputNumber
      value={101}
      max={100}
      onValidate={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith(
    "fail",
    "Enter a number that is less than or equal to 100",
  );
});

test("it should call the validation with a min length error", () => {
  const validationHandler = jest.fn();

  render(
    <InputNumber
      value={98}
      min={99}
      onValidate={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith(
    "fail",
    "Enter a number that is greater than or equal to 99",
  );
});
