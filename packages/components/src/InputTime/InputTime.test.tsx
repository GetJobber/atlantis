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
      <input
        className="formField"
        id="4d8a9f60-bded-11e9-a044-b5b3b0e4d171"
        onChange={[Function]}
        onFocus={[Function]}
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
      <input
        className="formField"
        defaultValue="11:23:00"
        id="4d941540-bded-11e9-a044-b5b3b0e4d171"
        onChange={[Function]}
        onFocus={[Function]}
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
      <input
        className="formField"
        id="4d94d890-bded-11e9-a044-b5b3b0e4d171"
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
      <input
        className="formField"
        id="4d9574d0-bded-11e9-a044-b5b3b0e4d171"
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
      <input
        className="formField"
        id="4d963820-bded-11e9-a044-b5b3b0e4d171"
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
    <InputTime value={new CivilTime(2, 35)} onChange={changeHandler} />,
  );

  fireEvent.change(container.querySelector("input"), {
    target: { value: newValue },
  });

  expect(changeHandler).toHaveBeenCalledWith(newCivilTime);
});
