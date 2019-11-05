import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Checkbox } from ".";

afterEach(cleanup);

it("renders a Checkbox", () => {
  const tree = renderer
    .create(<Checkbox label="Send me spam?" name="send_me_span" value="spam" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders each variation of checked and indeterminate", () => {
  const variations = [
    { checked: true, indeterminate: true },
    { checked: false, indeterminate: true },
    { checked: true, indeterminate: false },
    { checked: false, indeterminate: false },
  ];

  variations.forEach(variation => {
    expect(
      renderer.create(<Checkbox label="Foo" {...variation} />).toJSON(),
    ).toMatchSnapshot();
  });
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
