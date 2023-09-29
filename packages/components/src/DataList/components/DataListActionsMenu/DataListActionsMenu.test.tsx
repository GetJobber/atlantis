import React from "react";
import { render, screen } from "@testing-library/react";
import { tokens } from "@jobber/design";
import { DataListActionsMenu } from "./DataListActionsMenu";

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const menuWidth = 160;
const menuHeight = 200;

jest.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
  width: menuWidth,
  height: menuHeight,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  toJSON: jest.fn(),
});

const mockVisibleValue = jest.fn(() => true);
const mockPositionValue = jest.fn(() => ({ x: 0, y: 0 }));
const handleRequestClose = jest.fn();

afterEach(() => {
  mockVisibleValue.mockClear();
  mockPositionValue.mockClear();
  handleRequestClose.mockClear();
});

describe("DataListActionsMenu", () => {
  it("should render the menu when visible is true", () => {
    renderComponent();
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close menu" }),
    ).toBeInTheDocument();
  });

  it("should not render anything visible is false", () => {
    mockVisibleValue.mockReturnValueOnce(false);
    const { container } = renderComponent();
    expect(container).toBeEmptyDOMElement();
  });

  it("should call onRequestClose when the overlay is clicked", () => {
    renderComponent();
    screen.getByRole("button", { name: "Close menu" }).click();
    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });

  describe("Positioning", () => {
    it("should position the menu at the 0,0", () => {
      renderComponent();
      expect(screen.getByRole("menu")).toHaveStyle({
        "--actions-menu-x": "0px",
        "--actions-menu-y": "0px",
      });
    });

    it("should ensure the X positioning doesn't put the menu off screen", () => {
      mockPositionValue.mockReturnValueOnce({ x: viewportWidth, y: 0 });
      renderComponent();

      screen.logTestingPlaygroundURL();
      expect(screen.getByRole("menu")).toHaveStyle({
        "--actions-menu-x": `${
          viewportWidth - menuWidth - tokens["space-base"]
        }px`,
        "--actions-menu-y": "0px",
      });
    });

    it("should ensure the Y positioning doesn't put the menu off screen", () => {
      mockPositionValue.mockReturnValueOnce({ x: 0, y: viewportHeight });
      renderComponent();

      screen.logTestingPlaygroundURL();
      expect(screen.getByRole("menu")).toHaveStyle({
        "--actions-menu-x": "0px",
        "--actions-menu-y": `${viewportHeight - menuHeight}px`,
      });
    });
  });
});

function renderComponent() {
  return render(
    <DataListActionsMenu
      visible={mockVisibleValue()}
      position={mockPositionValue()}
      onRequestClose={handleRequestClose}
    />,
  );
}
