import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { {{name}} } from ".";

afterEach(cleanup);

it("renders a {{name}}", () => {
  const tree = renderer.create(<{{name}} text="Foo" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a loud {{name}}", () => {
  const tree = renderer.create(<{{name}} text="Foo" loud={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const clickHandler = jest.fn();
  const text = "Foo";
  const { getByText } = render(<{{name}} onClick={clickHandler} text={text} />);

  fireEvent.click(getByText(text));
  expect(clickHandler).toHaveBeenCalled();

  // E.g. If you need a change event, rather than a click event:
  //
  // fireEvent.change(getByLabelText(placeholder), {
  //   target: { value: newValue },
  // });
  // expect(changeHandler).toHaveBeenCalledWith(newValue);
});
