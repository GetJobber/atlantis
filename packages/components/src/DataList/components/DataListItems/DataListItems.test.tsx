import React, { PropsWithChildren } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
import { DataListItemActions } from "@jobber/components/DataList/components/DataListItemActions";
import { DataListAction } from "@jobber/components/DataList/components/DataListAction";
import { DataListItems } from ".";

const mockData = [
  { id: 1, label: "Luke Skywalker" },
  { id: 2, label: "Anakin Skywalker" },
];
const mockHeaders = { label: "Name" };
const mockEditClick = jest.fn();
const mockSelectedValue = jest.fn().mockReturnValue([]);

const onSelectMock = jest.fn();
const mockOnSelectValue = jest.fn().mockReturnValue(onSelectMock);

const mockItemActionComponent = jest.fn<JSX.Element | undefined, []>(() => (
  <DataListItemActions>
    <DataListAction label="Edit" onClick={mockEditClick} />
    <DataListAction label="Email" />
    <DataListAction label="Delete" />
  </DataListItemActions>
));

afterEach(() => {
  mockSelectedValue.mockClear();
});

describe("DataListItems", () => {
  describe("selectable", () => {
    it("should render list items with checkboxes when onSelect and selected provided", () => {
      renderComponent();
      expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });

    it("should not render list items with checkboxes when selected is not provided", () => {
      mockSelectedValue.mockReturnValueOnce(undefined);
      renderComponent();

      expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
    });

    it("should not render list items with checkboxes when  onSelect is not provided", () => {
      mockOnSelectValue.mockReturnValueOnce(undefined);
      renderComponent();

      expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
    });
  });

  describe("onSelect", () => {
    it("should call onSelect when a single checkbox is selected", async () => {
      renderComponent();

      const checkbox = screen.getAllByRole("checkbox")[0];
      await userEvent.click(checkbox);

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(onSelectMock).toHaveBeenCalledWith([mockData[0].id]);
    });

    it("should call onSelect with multiple checkboxes selected", async () => {
      mockSelectedValue.mockReturnValueOnce([mockData[0].id]);
      renderComponent();

      const checkbox = screen.getAllByRole("checkbox")[1];
      await userEvent.click(checkbox);

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(onSelectMock).toHaveBeenCalledWith([
        mockData[0].id,
        mockData[1].id,
      ]);
    });

    it("should call onSelect when a single checkbox is un-selected", async () => {
      mockSelectedValue.mockReturnValueOnce([mockData[0].id, mockData[1].id]);
      renderComponent();

      const checkbox = screen.getAllByRole("checkbox")[0];
      await userEvent.click(checkbox);

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(onSelectMock).toHaveBeenCalledWith([mockData[1].id]);
    });
  });

  describe("Context menu", () => {
    it("should render context menu when right clicking on a list item", async () => {
      renderComponent();
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();

      const listItem = screen.getByText(mockData[0].label);
      await userEvent.hover(listItem);

      fireEvent.contextMenu(listItem);

      const menuElement = screen.getByRole("menu");
      expect(menuElement).toBeInTheDocument();
      expect(within(menuElement).getAllByRole("button")).toHaveLength(3);
    });

    it("should render context menu in the right position when right clicking on a list item", async () => {
      renderComponent();
      const listItem = screen.getByText(mockData[0].label);
      await userEvent.hover(listItem);

      const clientX = 20;
      const clientY = 30;
      fireEvent.contextMenu(listItem, { clientX, clientY });

      const menuElement = screen.getByRole("menu");
      expect(menuElement).toHaveStyle({
        "--actions-menu-x": `${clientX}px`,
        "--actions-menu-y": `${clientY}px`,
      });
    });

    it("should have the correct item when clicking the edit button", async () => {
      renderComponent();
      const selectedItem = mockData[1];
      const listItem = screen.getByText(selectedItem.label);
      await userEvent.hover(listItem);
      fireEvent.contextMenu(listItem);

      const menuElement = screen.getByRole("menu");
      const editButton = within(menuElement).getByText("Edit");
      await userEvent.click(editButton);
      expect(mockEditClick).toHaveBeenCalledWith(selectedItem);
    });

    it("should not render context menu when right clicking on a list item and itemActionComponent is not provided", async () => {
      mockItemActionComponent.mockReturnValueOnce(undefined);
      renderComponent();
      const listItem = screen.getByText(mockData[0].label);
      await userEvent.hover(listItem);
      fireEvent.contextMenu(listItem);

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should not close the menu when hovering out of the target", async () => {
      renderComponent();
      const listItem = screen.getByText(mockData[0].label);
      await userEvent.hover(listItem);
      fireEvent.contextMenu(listItem);

      await userEvent.unhover(listItem);

      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });
});

function renderComponent() {
  return render(
    <MockMainContextProvider>
      <DataListItems />
    </MockMainContextProvider>,
  );
}

function MockMainContextProvider({ children }: PropsWithChildren<object>) {
  return (
    <DataListContext.Provider
      value={{
        ...defaultValues,
        data: mockData,
        headers: mockHeaders,
        itemActionComponent: mockItemActionComponent(),
        onSelect: mockOnSelectValue(),
        selected: mockSelectedValue(),
        layouts: {
          xs: item => (
            <div>
              <div>{item.label}</div>
            </div>
          ),
        },
      }}
    >
      {children}
    </DataListContext.Provider>
  );
}
