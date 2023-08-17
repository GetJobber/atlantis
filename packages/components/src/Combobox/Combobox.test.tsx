import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Combobox } from ".";

afterEach(cleanup);

it("renders a Combobox", () => {
  const { container } = render(<Combobox text="Foo" />);
  expect(container).toMatchSnapshot();
});

it("renders a loud Combobox", () => {
  const { container } = render(<Combobox text="Foo" loud={true} />);
  expect(container).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const clickHandler = jest.fn();
  const text = "Foo";
  const { getByText } = render(<Combobox onClick={clickHandler} text={text} />);

  fireEvent.click(getByText(text));
  expect(clickHandler).toHaveBeenCalled();

  // E.g. If you need a change event, rather than a click event:
  //
  // fireEvent.change(getByLabelText(placeholder), {
  //   target: { value: newValue },
  // });
  // expect(changeHandler).toHaveBeenCalledWith(newValue);
});
