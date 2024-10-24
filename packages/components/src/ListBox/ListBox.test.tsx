import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ListBox } from ".";


it("renders a ListBox", () => {
  const { container } = render(<ListBox text="Foo" />);
  expect(container).toMatchSnapshot();
});

it("renders a loud ListBox", () => {
  const { container } = render(<ListBox text="Foo" loud={true} />);
  expect(container).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const clickHandler = jest.fn();
  const text = "Foo";
  const { getByText } = render(<ListBox onClick={clickHandler} text={text} />);

  fireEvent.click(getByText(text));
  expect(clickHandler).toHaveBeenCalled();

  // E.g. If you need a change event, rather than a click event:
  //
  // fireEvent.change(getByLabelText(placeholder), {
  //   target: { value: newValue },
  // });
  // expect(changeHandler).toHaveBeenCalledWith(newValue);
});