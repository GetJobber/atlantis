import React, { PropsWithChildren } from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
import {
  DataListLayoutContext,
  defaultValues as layoutDefaultValues,
} from "@jobber/components/DataList/context/DataListLayoutContext";
import { DataListItemActions } from "@jobber/components/DataList/components/DataListItemActions";
import { DataListAction } from "@jobber/components/DataList/components/DataListAction";
import { DataListLayoutActions } from "@jobber/components/DataList/components/DataListLayoutActions";
import { DataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import { DataListItem } from "./DataListItem";

const listItem = "I am a list item";
const handleItemClick = jest.fn();
const mockLayout = jest.fn().mockReturnValue(() => <div>{listItem}</div>);
const mockSetHasInLayoutActions = jest.fn().mockReturnValue(true);
const mockItemActionComponent = jest.fn().mockReturnValue(
  <DataListItemActions onClick={handleItemClick}>
    <DataListAction label="Edit" />
    <DataListAction label="Email" />
    <DataListAction label="Delete" />
  </DataListItemActions>,
);

afterEach(() => {
  handleItemClick.mockClear();
  mockLayout.mockClear();
  mockSetHasInLayoutActions.mockClear();
  mockItemActionComponent.mockClear();
});

describe("DataListItem", () => {
  describe("Hover/Focus/Context Menu", () => {
    it("should render a menu when hovered and not on unhover", async () => {
      renderComponent();

      const listItemEl = screen.getByText(listItem);
      await userEvent.hover(listItemEl);

      const menuButton = screen.getByRole("button", { name: "More actions" });
      expect(menuButton).toBeInTheDocument();

      await userEvent.unhover(listItemEl);
      await waitFor(() => {
        expect(menuButton).not.toBeInTheDocument();
      });
    });

    it("should render a menu when focused and not on blur", async () => {
      renderComponent();

      const listItemEl = screen.getByText(listItem);
      fireEvent.focus(listItemEl);
      listItemEl.focus();

      const menuButton = screen.getByRole("button", { name: "More actions" });
      expect(menuButton).toBeInTheDocument();

      fireEvent.blur(listItemEl);
      await waitFor(() => {
        expect(menuButton).not.toBeInTheDocument();
      });
    });

    it("should render a context menu when right clicked", async () => {
      renderComponent();

      const listItemEl = screen.getByText(listItem);

      const clientX = 20;
      const clientY = 30;
      await userEvent.hover(listItemEl);
      fireEvent.contextMenu(listItemEl, { clientX, clientY });

      const menuElement = screen.getByRole("menu");
      expect(menuElement).toHaveStyle({
        "--actions-menu-x": `${clientX}px`,
        "--actions-menu-y": `${clientY}px`,
      });
    });

    it("should not show a context menu when the actions are hidden", async () => {
      mockItemActionComponent.mockReturnValueOnce(
        <DataListItemActions onClick={handleItemClick}>
          <DataListAction label="Edit" visible={() => false} />
          <DataListAction label="Email" visible={() => false} />
        </DataListItemActions>,
      );

      renderComponent();

      const listItemEl = screen.getByText(listItem);
      await userEvent.hover(listItemEl);
      fireEvent.contextMenu(listItemEl);

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "More actions" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("In-layout action", () => {
    beforeEach(() => {
      mockLayout.mockReturnValueOnce(() => (
        <div>
          {listItem} <DataListLayoutActions />
        </div>
      ));
      renderComponent();
    });

    it("should render the action with the layout", () => {
      const listItemEl = screen.getByText(listItem);
      expect(
        within(listItemEl).getByRole("button", { name: "More actions" }),
      ).toBeInTheDocument();
    });

    it("should not fire the parent click when opening the menu", async () => {
      const moreAction = screen.getByRole("button", { name: "More actions" });

      await userEvent.click(moreAction);
      expect(handleItemClick).not.toHaveBeenCalled();
    });

    it("should not fire the parent click when clicking one of the menu items", async () => {
      const moreAction = screen.getByRole("button", { name: "More actions" });

      await userEvent.click(moreAction);
      await userEvent.click(screen.getByRole("button", { name: "Edit" }));
      expect(handleItemClick).not.toHaveBeenCalled();
    });
  });
});

function renderComponent() {
  return render(
    <MockMainContextProvider>
      <MockLayoutContextProvider>
        <DataListItem item={{ id: 1 }} index={0} layout={mockLayout()} />
      </MockLayoutContextProvider>
    </MockMainContextProvider>,
  );
}

function MockMainContextProvider({ children }: PropsWithChildren<object>) {
  return (
    <DataListContext.Provider
      value={{
        ...defaultValues,
        itemActionComponent: mockItemActionComponent(),
      }}
    >
      {children}
    </DataListContext.Provider>
  );
}

function MockLayoutContextProvider({ children }: PropsWithChildren<object>) {
  return (
    <DataListLayoutContext.Provider
      value={{
        ...layoutDefaultValues,
        isInLayoutProvider: true,
        hasInLayoutActions: false,
        setHasInLayoutActions: mockSetHasInLayoutActions,
      }}
    >
      <DataListLayoutActionsContext.Provider value={{ activeItem: { id: 1 } }}>
        {children}
      </DataListLayoutActionsContext.Provider>
    </DataListLayoutContext.Provider>
  );
}
