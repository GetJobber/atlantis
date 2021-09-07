import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { ButtonDismiss } from ".";

afterEach(cleanup);

it("renders a ButtonDismiss", () => {
  const tree = renderer
    .create(<ButtonDismiss onClick={undefined} ariaLabel="Close" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const clickHandler = jest.fn();
  const { getByRole } = render(
    <ButtonDismiss onClick={clickHandler} ariaLabel="Close" />,
  );

  fireEvent.click(getByRole("button"));
  expect(clickHandler).toHaveBeenCalled();
});
