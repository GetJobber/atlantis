import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { InputTime } from ".";

afterEach(cleanup);

it("renders a InputTime", () => {
  const tree = renderer.create(<InputTime />).toJSON();
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
        id="123e4567-e89b-12d3-a456-426655440001"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="time"
      />
    </div>
  `);
});

it("renders an initial time when given 'defaultValue'", () => {
  const tree = renderer
    .create(<InputTime defaultValue={new CivilTime(11, 23)} />)
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
        defaultValue="11:23"
        id="123e4567-e89b-12d3-a456-426655440002"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="time"
      />
    </div>
  `);
});

it("renders correctly in a readonly state", () => {
  const tree = renderer
    .create(<InputTime value={new CivilTime(11, 23)} readonly={true} />)
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
        htmlFor="123e4567-e89b-12d3-a456-426655440003"
      >
         
      </label>
      <input
        className="formField"
        defaultValue="11:23"
        id="123e4567-e89b-12d3-a456-426655440003"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        readOnly={true}
        type="time"
      />
    </div>
  `);
});

it("adds a error border when invalid", () => {
  const tree = renderer
    .create(<InputTime value={new CivilTime(11, 23)} readonly={true} />)
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
        htmlFor="123e4567-e89b-12d3-a456-426655440004"
      >
         
      </label>
      <input
        className="formField"
        defaultValue="11:23"
        id="123e4567-e89b-12d3-a456-426655440004"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        readOnly={true}
        type="time"
      />
    </div>
  `);
});

it("should set the value when given 'value' and 'onChange'", () => {
  const tree = renderer.create(<InputTime invalid />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper invalid"
      style={
        Object {
          "--formField-maxLength": undefined,
        }
      }
    >
      <label
        className="label"
        htmlFor="123e4567-e89b-12d3-a456-426655440005"
      >
         
      </label>
      <input
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440005"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="time"
      />
    </div>
  `);
});

it("should call the onChange function when the component is modified", () => {
  const newValue = "05:32";
  // The event value get converted to a CivilTime inside the component.
  const newCivilTime = new CivilTime(5, 32);

  const changeHandler = jest.fn();

  const { container } = render(
    <InputTime value={new CivilTime(2, 35)} onChange={changeHandler} />,
  );

  fireEvent.change(container.querySelector("input"), {
    target: { value: newValue },
  });

  expect(changeHandler).toHaveBeenCalledWith(newCivilTime);
});
