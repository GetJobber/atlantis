import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Drawer } from ".";

afterEach(cleanup);

test("drawer shows the children and a close button", () => {
  const title = "Drawer title";
  const content = "Drawer content";
  const handleClose = jest.fn();

  const { getByLabelText, getByText, queryByTestId } = render(
    <Drawer title={title} open={true} onRequestClose={handleClose}>
      {content}
    </Drawer>,
  );

  expect(queryByTestId("drawer-header")).not.toBeNull();
  expect(getByText(title)).toBeTruthy();
  expect(getByLabelText("Close drawer")).toBeTruthy();
  expect(getByText(content)).toBeTruthy();
});

it("doesn't render a closed drawer", () => {
  const handleClose = jest.fn();

  const { queryByTestId } = render(
    <Drawer title="Drawer" open={false} onRequestClose={handleClose}>
      Drawer content
    </Drawer>,
  );
  expect(
    queryByTestId("drawer-container").classList.contains("open"),
  ).toBeFalsy();
});

test("drawer fires onRequestClose when selecting the close button", () => {
  const handleClose = jest.fn();

  const { getByLabelText } = render(
    <Drawer title="Drawer" onRequestClose={handleClose}>
      Drawer content
    </Drawer>,
  );

  fireEvent.click(getByLabelText("Close drawer"));
  expect(handleClose).toHaveBeenCalledTimes(1);
});
