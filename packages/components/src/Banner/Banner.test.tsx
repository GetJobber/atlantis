import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Banner } from ".";

afterEach(cleanup);

it("renders a success banner", () => {
  const tree = renderer
    .create(<Banner type="success">Success</Banner>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash success"
    >
      <p
        className="base base greyBlueDark"
      >
        Success
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <div
          className="icon cross base green"
        />
      </button>
    </div>
  `);
});

it("renders an error banner", () => {
  const tree = renderer.create(<Banner type="error">Fail</Banner>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash error"
    >
      <p
        className="base base greyBlueDark"
      >
        Fail
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <div
          className="icon cross base red"
        />
      </button>
    </div>
  `);
});

it("renders a notice banner", () => {
  const tree = renderer
    .create(<Banner type="notice">Notice me</Banner>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash notice"
    >
      <p
        className="base base greyBlueDark"
      >
        Notice me
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <div
          className="icon cross base lightBlue"
        />
      </button>
    </div>
  `);
});

it("renders a warning banner", () => {
  const tree = renderer.create(<Banner type="warning">Warn</Banner>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash warning"
    >
      <p
        className="base base greyBlueDark"
      >
        Warn
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <div
          className="icon cross base yellow"
        />
      </button>
    </div>
  `);
});

test("it should call the handler with a number value", () => {
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <Banner type="success" onDismiss={changeHandler}>
      Close me
    </Banner>,
  );

  fireEvent.click(getByLabelText("Close"));
  expect(changeHandler).toHaveBeenCalledTimes(1);
});
