import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { TimePicker } from ".";

afterEach(cleanup);

it("renders a TimePicker", () => {
  const tree = renderer.create(<TimePicker />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper"
        >
          <input
            className="input"
            disabled={false}
            type="time"
          />
        </div>
    `);
});

it("renders an initial time when given 'defaultValue'", () => {
  const tree = renderer.create(<TimePicker defaultValue="11:23" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
    >
      <input
        className="input"
        defaultValue="11:23"
        disabled={false}
        type="time"
      />
    </div>
  `);
});

it("renders correctly in a readonly state", () => {
  const tree = renderer.create(<TimePicker value="11:23" readOnly />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper"
        >
          <input
            className="input"
            disabled={false}
            readOnly={true}
            type="time"
            value="11:23"
          />
        </div>
    `);
});

it("adds a error border when invalid", () => {
  const tree = renderer.create(<TimePicker value="11:23" readOnly />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper"
        >
          <input
            className="input"
            disabled={false}
            readOnly={true}
            type="time"
            value="11:23"
          />
        </div>
    `);
});

it("should set the value when given 'value' and 'onChange'", () => {
  const tree = renderer.create(<TimePicker invalid />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper invalid"
        >
          <input
            className="input"
            disabled={false}
            type="time"
          />
        </div>
    `);
});

it("should call the onChange function when the component is modified", () => {
  const newValue = "05:32";
  const changeHandler = jest.fn();

  const { container } = render(
    <TimePicker value="02:35" onChange={changeHandler} />,
  );

  fireEvent.change(container.querySelector("input"), {
    target: { value: newValue },
  });

  expect(changeHandler).toHaveBeenCalledWith("05:32");
});
