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
import { mockUseMediaQuery } from "../../hooks/mockUseMediaQuery";

const { cleanup, setMediaQueryResult } = mockUseMediaQuery();
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

function matchIsCoarsePointer(query: string) {
  return query === "(any-pointer: coarse)";
}

function setIsCoarsePointer(value: boolean) {
  setMediaQueryResult(query => matchIsCoarsePointer(query) && value);
}

afterEach(() => {
  handleItemClick.mockClear();
  mockLayout.mockClear();
  mockSetHasInLayoutActions.mockClear();
  mockItemActionComponent.mockClear();
  cleanup();
});
describe("DataListItem", () => {
  describe("Hover/Focus/Context Menu", () => {
    beforeEach(() => {
      setIsCoarsePointer(false);
    });

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

    it("should not render a menu on hover when at least one option is selected", async () => {
      renderComponent({ selected: ["1"] });

      const listItemEl = screen.getByText(listItem);
      await userEvent.hover(listItemEl);

      const menuButton = screen.queryByRole("button", { name: "More actions" });
      expect(menuButton).not.toBeInTheDocument();
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

    it("should render a context menu when right clicked and hide the hover menu", async () => {
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

      expect(
        screen.queryByRole("button", { name: "More actions" }),
      ).toBeInTheDocument();
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
      await userEvent.pointer({ keys: "[MouseRight>]", target: listItemEl });

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "More actions" }),
      ).not.toBeInTheDocument();
    });

    it("should not show a context menu when at least one item is selected", async () => {
      mockItemActionComponent.mockReturnValueOnce(
        <DataListItemActions onClick={handleItemClick}>
          <DataListAction label="Edit" visible={() => false} />
          <DataListAction label="Email" visible={() => false} />
        </DataListItemActions>,
      );

      renderComponent({ selected: ["1"] });

      const listItemEl = screen.getByText(listItem);
      await userEvent.pointer({ keys: "[MouseRight>]", target: listItemEl });

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "More actions" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("In-layout action", () => {
    beforeEach(() => {
      setIsCoarsePointer(false);
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

  describe("touch screen rendering", () => {
    beforeEach(() => {
      setIsCoarsePointer(true);
    });

    describe("in-layout action", () => {
      it("should render only one action component", async () => {
        mockLayout.mockReturnValueOnce(() => (
          <div>
            {listItem} <DataListLayoutActions />
          </div>
        ));
        renderComponent({ hasInLayoutActions: true });
        expect(
          screen.queryAllByRole("button", { name: "More actions" }),
        ).toHaveLength(1);
      });

      it("should render an action component if one isn't already rendered", async () => {
        renderComponent();
        expect(
          screen.queryAllByRole("button", { name: "More actions" }),
        ).toHaveLength(1);
      });
    });
  });
});

function renderComponent({
  selected = [],
  hasInLayoutActions = false,
}: {
  readonly selected?: string[];
  readonly hasInLayoutActions?: boolean;
} = {}) {
  return render(
    <MockMainContextProvider selected={selected}>
      <MockLayoutContextProvider hasInLayoutActions={hasInLayoutActions}>
        <DataListItem item={{ id: 1 }} index={0} layout={mockLayout()} />
      </MockLayoutContextProvider>
    </MockMainContextProvider>,
  );
}

function MockMainContextProvider({
  children,
  selected = [],
}: PropsWithChildren<{ readonly selected?: string[] }>) {
  return (
    <DataListContext.Provider
      value={{
        ...defaultValues,
        selected,
        itemActionComponent: mockItemActionComponent(),
      }}
    >
      {children}
    </DataListContext.Provider>
  );
}

function MockLayoutContextProvider({
  children,
  hasInLayoutActions = false,
}: PropsWithChildren<{ readonly hasInLayoutActions?: boolean }>) {
  return (
    <DataListLayoutContext.Provider
      value={{
        ...layoutDefaultValues,
        isInLayoutProvider: true,
        hasInLayoutActions,
        setHasInLayoutActions: mockSetHasInLayoutActions,
      }}
    >
      <DataListLayoutActionsContext.Provider value={{ activeItem: { id: 1 } }}>
        {children}
      </DataListLayoutActionsContext.Provider>
    </DataListLayoutContext.Provider>
  );
}
