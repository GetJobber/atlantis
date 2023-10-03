import React, { PropsWithChildren } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
import { DataListAction } from "@jobber/components/DataList/components/DataListAction";
import {
  DataListLayoutContext,
  defaultValues as layoutDefaultValues,
} from "@jobber/components/DataList/context/DataListLayoutContext";
import { DataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import { DataListItemActions, InternalDataListItemActions } from ".";

const handleEditClick = jest.fn();
const mockSetHasInLayoutActions = jest.fn().mockReturnValue(true);
const mockItemActionComponent = jest.fn().mockReturnValue(
  <DataListItemActions>
    <DataListAction icon="edit" label="Edit" onClick={handleEditClick} />
    <DataListAction icon="email" label="Email" />
    <DataListAction icon="note" label="Note" />
    <DataListAction label="Delete" />
  </DataListItemActions>,
);

afterEach(() => {
  mockSetHasInLayoutActions.mockClear();
  mockItemActionComponent.mockClear();
  handleEditClick.mockClear();
});

describe("DataListItemActions", () => {
  it("should render the 3 buttons", () => {
    renderComponent();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("should render a more action", () => {
    renderComponent();
    expect(screen.getByLabelText("More actions")).toBeInTheDocument();
  });

  it("should only render the first 2 actions", () => {
    renderComponent();
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("Note")).not.toBeInTheDocument();
  });

  it("should only render put the remaining actions in the more menu", () => {
    renderComponent();

    const moreMenuButton = screen.getByLabelText("More actions");
    userEvent.click(moreMenuButton);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(within(menu).getByText("Note")).toBeInTheDocument();
    expect(within(menu).getByText("Delete")).toBeInTheDocument();
    expect(within(menu).getAllByRole("button")).toHaveLength(2);
  });

  it("should call the onClick handler when clicking the edit button", () => {
    renderComponent();
    userEvent.click(screen.getByLabelText("Edit"));
    expect(handleEditClick).toHaveBeenCalledTimes(1);
    expect(handleEditClick).toHaveBeenCalledWith({ id: 1 });
  });

  it("should not render the more actions button if there are no more actions", () => {
    mockItemActionComponent.mockReturnValueOnce(
      <DataListItemActions>
        <DataListAction icon="edit" label="Edit" />
        <DataListAction icon="email" label="Email" />
      </DataListItemActions>,
    );
    renderComponent();

    expect(screen.queryByLabelText("More actions")).not.toBeInTheDocument();
  });

  it("should not render a 2nd action if the 2nd action doesn't have an icon even though the 3rd action have an icon", () => {
    mockItemActionComponent.mockReturnValueOnce(
      <DataListItemActions>
        <DataListAction icon="edit" label="Edit" />
        <DataListAction label="Email" />
        <DataListAction icon="note" label="Note" />
        <DataListAction label="Delete" />
      </DataListItemActions>,
    );
    renderComponent();

    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Note")).not.toBeInTheDocument();
    expect(screen.getByLabelText("More actions")).toBeInTheDocument();
  });

  it("should not render the first 2 actions if the first action doesn't have an icon", () => {
    mockItemActionComponent.mockReturnValueOnce(
      <DataListItemActions>
        <DataListAction label="Edit" />
        <DataListAction icon="email" label="Email" />
        <DataListAction icon="note" label="Note" />
        <DataListAction label="Delete" />
      </DataListItemActions>,
    );
    renderComponent();

    expect(screen.queryByLabelText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Note")).not.toBeInTheDocument();
    expect(screen.getByLabelText("More actions")).toBeInTheDocument();

    const moreMenuButton = screen.getByLabelText("More actions");
    userEvent.click(moreMenuButton);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(within(menu).getAllByRole("button")).toHaveLength(4);
  });
});

function renderComponent() {
  return render(
    <MockMainContextProvider>
      <MockLayoutContextProvider>
        <InternalDataListItemActions />
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
