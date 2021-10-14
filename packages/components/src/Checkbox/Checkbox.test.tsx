import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Checkbox } from ".";

afterEach(cleanup);

it("renders a Checkbox", () => {
  const { container } = render(
    <Checkbox label="Send me spam?" name="send_me_span" value="spam" />,
  );
  expect(container).toMatchSnapshot();
});

it("renders a disabled Checkbox", () => {
  const { container } = render(
    <Checkbox label="Dont click me" disabled={true} />,
  );
  expect(container).toMatchSnapshot();
});

it("renders each variation of checked, defaultChecked and indeterminate", () => {
  const variations = [
    { checked: true, indeterminate: true },
    { checked: false, indeterminate: true },
    { checked: true, indeterminate: false },
    { checked: false, indeterminate: false },

    { defaultChecked: true, indeterminate: true },
    { defaultChecked: false, indeterminate: true },
    { defaultChecked: true, indeterminate: false },
    { defaultChecked: false, indeterminate: false },
  ];

  variations.forEach(variation => {
    const { container } = render(<Checkbox label="Foo" {...variation} />);
    expect(container).toMatchSnapshot();
  });
});

describe("Clicking the checkbox it should call the handler", () => {
  test("with a true value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={false} onChange={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(true);
  });

  test("with a false value", () => {
    const clickHandler = jest.fn();

    const { getByLabelText } = render(
      <Checkbox checked={true} onChange={clickHandler} label="foo" />,
    );

    fireEvent.click(getByLabelText("foo"));
    expect(clickHandler).toHaveBeenCalledWith(false);
  });
});

test("should render a description when set", () => {
  const { getByText } = render(<Checkbox description="Checkers" />);
  const description = getByText("Checkers");
  expect(description).toBeInstanceOf(HTMLParagraphElement);
});
