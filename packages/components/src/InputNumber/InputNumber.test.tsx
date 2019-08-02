import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputNumber } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const tree = renderer.create(<InputNumber value="123" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
      style={
        Object {
          "--formField-maxLength": undefined,
        }
      }
    >
      <input
        className="formField"
        onChange={[Function]}
        onFocus={[Function]}
        type="number"
        value="123"
      />
    </div>
  `);
});

test("it should call the handler with the new value", () => {
  const changeHandler = jest.fn();
  const newValue = "100";
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
