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
      <div
        className="inputWrapper"
      >
        <label
          className="label"
          htmlFor="123e4567-e89b-12d3-a456-426655440001"
        />
        <input
          className="input"
          id="123e4567-e89b-12d3-a456-426655440001"
          onBlur={[Function]}
          onChange={[Function]}
          onFocus={[Function]}
          onKeyDown={[Function]}
          type="password"
          value="123"
        />
      </div>
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
      <div
        className="inputWrapper"
      >
        <label
          className="label"
          htmlFor="123e4567-e89b-12d3-a456-426655440004"
        />
        <input
          className="input"
          id="123e4567-e89b-12d3-a456-426655440004"
          onBlur={[Function]}
          onChange={[Function]}
          onFocus={[Function]}
          onKeyDown={[Function]}
          type="password"
          value="p"
        />
      </div>
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
