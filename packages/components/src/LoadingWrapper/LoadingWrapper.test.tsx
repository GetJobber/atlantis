import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { LoadingWrapper } from ".";

afterEach(cleanup);

it.skip("renders a LoadingWrapper", () => {
  const tree = renderer.create(<LoadingWrapper text="Foo" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it.skip("renders a loud LoadingWrapper", () => {
  const tree = renderer
    .create(<LoadingWrapper text="Foo" loud={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip("it should call the handler with the new value", () => {
  const clickHandler = jest.fn();
  const text = "Foo";
  const { getByText } = render(
    <LoadingWrapper onClick={clickHandler} text={text} />,
  );

  fireEvent.click(getByText(text));
  expect(clickHandler).toHaveBeenCalled();

  // E.g. If you need a change event, rather than a click event:
  //
  // fireEvent.change(getByLabelText(placeholder), {
  //   target: { value: newValue },
  // });
  // expect(changeHandler).toHaveBeenCalledWith(newValue);
});
