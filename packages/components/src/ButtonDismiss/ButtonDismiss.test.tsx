import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { ButtonDismiss } from ".";

afterEach(cleanup);

it("renders a ButtonDismiss", () => {
  const { container } = render(
    <ButtonDismiss onClick={undefined} ariaLabel="Close" />,
  );
  expect(container).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const clickHandler = jest.fn();
  const { getByRole } = render(
    <ButtonDismiss onClick={clickHandler} ariaLabel="Close" />,
  );

  fireEvent.click(getByRole("button"));
  expect(clickHandler).toHaveBeenCalled();
});
