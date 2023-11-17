import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import { DataListAction } from "./DataListAction";

const name = "Hello";
const handleClick = jest.fn();
const mockIconValue = jest.fn().mockReturnValue(undefined);
const mockDestructiveValue = jest.fn().mockReturnValue(undefined);
const mockActiveItemValue = jest.fn().mockReturnValue(undefined);

beforeEach(() => {
  handleClick.mockClear();
  mockIconValue.mockClear();
  mockDestructiveValue.mockClear();
  mockActiveItemValue.mockClear();
});

describe("DataListAction", () => {
  it("should render an action with no icon", () => {
    const { button } = renderComponent();

    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).not.toBeInTheDocument();
  });

  it("should render an action with an icon", () => {
    const iconName = "add";
    mockIconValue.mockReturnValue(iconName);
    const { button } = renderComponent();

    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByTestId(iconName)).toBeInstanceOf(SVGSVGElement);
  });

  it("should render a destructive action", () => {
    mockDestructiveValue.mockReturnValue(true);
    const { button } = renderComponent();

    expect(button.querySelector("p")).toHaveClass("critical");
  });

  it("should not fire the onClick when the item from the context is undefined", async () => {
    const { button } = renderComponent();

    await userEvent.click(button);
    // ensure item doesn't get passed in
    expect(handleClick).toHaveBeenCalledWith();
  });

  it("should fire the onClick when the item from the context is defined", async () => {
    const mockItem = { id: "1" };
    mockActiveItemValue.mockReturnValue(mockItem);
    const { button } = renderComponent();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledWith(mockItem);
  });

  describe("Action visibility", () => {
    const value = { activeItem: { id: 1 } };

    it("should render the action if the visibility prop is returning true", () => {
      const mockVisibility = jest.fn(() => true);
      render(
        <DataListLayoutActionsContext.Provider value={value}>
          <DataListAction label={name} visible={mockVisibility} />
        </DataListLayoutActionsContext.Provider>,
      );

      expect(screen.getByRole("button", { name })).toBeInTheDocument();
      expect(mockVisibility).toHaveBeenCalledWith(value.activeItem);
    });

    it("should not render the action if the visibility prop is returning false", () => {
      const mockVisibility = jest.fn(() => false);
      render(
        <DataListLayoutActionsContext.Provider value={value}>
          <DataListAction label={name} visible={mockVisibility} />
        </DataListLayoutActionsContext.Provider>,
      );

      expect(screen.queryByRole("button", { name })).not.toBeInTheDocument();
      expect(mockVisibility).toHaveBeenCalledWith(value.activeItem);
    });
  });
});

function renderComponent() {
  const component = render(
    <DataListLayoutActionsContext.Provider
      value={{ activeItem: mockActiveItemValue() }}
    >
      <DataListAction
        label={name}
        onClick={handleClick}
        icon={mockIconValue()}
        destructive={mockDestructiveValue()}
      />
    </DataListLayoutActionsContext.Provider>,
  );

  return { ...component, button: screen.getByRole("button", { name }) };
}
