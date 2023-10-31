import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Drawer } from ".";

describe("Drawer", () => {
  it("should render the drawer", () => {
    const title = "A drawer with content";
    const content = "Drawer Content";
    const { getByText, getByTestId, getByLabelText } = render(
      <Drawer title={title} open onRequestClose={jest.fn}>
        {content}
      </Drawer>,
    );
    expect(getByTestId("drawer-header")).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
    expect(getByLabelText(`Close ${title}`)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  describe("when open", () => {
    describe("when clicking on dismiss button", () => {
      it("should trigger request close", () => {
        const onRequestCloseFn = jest.fn();
        const { getByLabelText } = render(
          <Drawer title="My drawer" open onRequestClose={onRequestCloseFn}>
            {"Drawer Content"}
          </Drawer>,
        );
        fireEvent.click(getByLabelText("Close My drawer"));
        expect(onRequestCloseFn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when closed", () => {
    it("should hide the drawer", () => {
      const content = "Drawer Content";
      const { getByTestId } = render(
        <Drawer title="A closed drawer" open={false} onRequestClose={jest.fn}>
          {content}
        </Drawer>,
      );
      expect(
        getByTestId("drawer-container").classList.contains("open"),
      ).toBeFalsy();
    });
  });
});
