import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputTemplate } from ".";

afterEach(cleanup);

it("renders a InputTemplate", () => {
  const tree = renderer.create(<InputTemplate text="Foo" />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});

it("renders a loud InputTemplate", () => {
  const tree = renderer.create(<InputTemplate text="Foo" loud />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});

test("it should call the handler with the new value", () => {
  const changeHandler = jest.fn();
  const newValue = "Bar";

  const { getByLabelText } = render(
    <InputTemplate onChange={changeHandler} placeholder={placeholder} />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);
});
