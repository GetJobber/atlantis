import React, { PropsWithChildren } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataListAction } from "@jobber/components/DataList/components/DataListAction";
import {
  DataListLayoutContext,
  defaultValues as layoutDefaultValues,
} from "@jobber/components/DataList/context/DataListLayoutContext";
import { DataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import { InternalDataListItemActions } from ".";

const handleEditClick = jest.fn();
const mockSetHasInLayoutActions = jest.fn().mockReturnValue(true);
const mockActions = jest
  .fn()
  .mockReturnValue([
    <DataListAction
      key="Edit"
      icon="edit"
      label="Edit"
      onClick={handleEditClick}
    />,
    <DataListAction key="Email" icon="email" label="Email" />,
    <DataListAction key="Note" icon="note" label="Note" />,
    <DataListAction key="Delete" label="Delete" />,
  ]);

describe("DataListItemActions", () => {
  it("should render the 3 buttons", () => {
    renderComponent();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("should render a more action", () => {
    renderComponent();
    expect(screen.getByLabelText("More actions")).toBeInTheDocument();
  });

  it("should only render the first 2 actions", async () => {
    renderComponent();
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("Note")).not.toBeInTheDocument();
  });

  it("should only render put the remaining actions in the more menu", async () => {
    renderComponent();

    const moreMenuButton = screen.getByLabelText("More actions");
    await userEvent.click(moreMenuButton);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(within(menu).getByText("Note")).toBeInTheDocument();
    expect(within(menu).getByText("Delete")).toBeInTheDocument();
    expect(within(menu).getAllByRole("button")).toHaveLength(2);
  });

  it("should call the onClick handler when clicking the edit button", async () => {
    renderComponent();
    await userEvent.click(screen.getByLabelText("Edit"));
    expect(handleEditClick).toHaveBeenCalledTimes(1);
    expect(handleEditClick).toHaveBeenCalledWith({ id: 1 });
  });
});

function renderComponent() {
  return render(
    <MockLayoutContextProvider>
      <InternalDataListItemActions actions={mockActions()} />
    </MockLayoutContextProvider>,
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
