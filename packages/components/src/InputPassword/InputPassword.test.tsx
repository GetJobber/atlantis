import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputPassword } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const tree = renderer.create(<InputPassword value="123" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
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
        defaultValue="123"
        id="123e4567-e89b-12d3-a456-426655440001"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="password"
      />
    </div>
  `);
});

it("renders an error", () => {
  const tree = renderer
    .create(<InputPassword value="p" errorMessage="Not long enough" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
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
        htmlFor="123e4567-e89b-12d3-a456-426655440002"
      >
         
      </label>
      <input
        className="formField"
        defaultValue="p"
        id="123e4567-e89b-12d3-a456-426655440002"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="password"
      />
    </div>
  `);
});

test("it should call the handler with a value", () => {
  const changeHandler = jest.fn();
  const newValue = "password";
  const placeholder = "Count";

  const { getByLabelText } = render(
    <InputPassword
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
