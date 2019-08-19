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
