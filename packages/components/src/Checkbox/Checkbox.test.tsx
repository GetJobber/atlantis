import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Checkbox } from ".";

afterEach(cleanup);

it("renders a Checkbox", () => {
  const tree = renderer.create(<Checkbox label="Send me spam?" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a checked Checkbox", () => {
  const tree = renderer
    .create(<Checkbox label="Foo" checked={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an indeterminate Checkbox", () => {
  const tree = renderer
    .create(<Checkbox label="Foo" checked={true} indeterminate={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Clicking the checkbox it should call the handler", () => {
  test("with a true value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={false} onClick={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(true);
  });

  test("with a false value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={true} onClick={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(false);
  });
});
