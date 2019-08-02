import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { TimePicker } from ".";

afterEach(cleanup);

it("renders a TimePicker", () => {
  const tree = renderer.create(<TimePicker />).toJSON();
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
            type="time"
          />
        </div>
    `);
});

it("renders an initial time when given 'defaultValue'", () => {
  const tree = renderer
    .create(<TimePicker defaultValue={new CivilTime(11, 23)} />)
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
          <input
            className="formField"
            defaultValue="11:23:00"
            onChange={[Function]}
            onFocus={[Function]}
            type="time"
          />
        </div>
    `);
});

it("renders correctly in a readonly state", () => {
  const tree = renderer
    .create(<TimePicker value={new CivilTime(11, 23)} readonly={true} />)
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
      <input
        className="formField"
        onChange={[Function]}
        onFocus={[Function]}
        readOnly={true}
        type="time"
        value="11:23:00"
      />
    </div>
  `);
});

it("adds a error border when invalid", () => {
  const tree = renderer
    .create(<TimePicker value={new CivilTime(11, 23)} readonly={true} />)
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
      <input
        className="formField"
        onChange={[Function]}
        onFocus={[Function]}
        readOnly={true}
        type="time"
        value="11:23:00"
      />
    </div>
  `);
});

it("should set the value when given 'value' and 'onChange'", () => {
  const tree = renderer.create(<TimePicker invalid />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper invalid"
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
    <TimePicker value={new CivilTime(2, 35)} onChange={changeHandler} />,
  );

  fireEvent.change(container.querySelector("input"), {
    target: { value: newValue },
  });

  expect(changeHandler).toHaveBeenCalledWith(newCivilTime);
});
