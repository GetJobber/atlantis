import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputNumber } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const tree = renderer.create(<InputNumber value="123" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <div
        className="hasValidationMessage"
      />,
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
          htmlFor="123e4567-e89b-12d3-a456-426655440001"
        >
           
        </label>
        <input
          className="formField"
          id="123e4567-e89b-12d3-a456-426655440001"
          onBlur={[Function]}
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
        className="base regular base red"
      >
        Not a whole number
      </p>,
      <div
        className="hasValidationMessage"
      />,
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
          htmlFor="123e4567-e89b-12d3-a456-426655440002"
        >
           
        </label>
        <input
          className="formField"
          id="123e4567-e89b-12d3-a456-426655440002"
          onBlur={[Function]}
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
