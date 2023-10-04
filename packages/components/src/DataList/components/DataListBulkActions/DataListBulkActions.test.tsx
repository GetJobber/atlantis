/* eslint-disable max-statements */
import React, { PropsWithChildren } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
import { DataListBulkActions } from ".";
import { DataListAction } from "../DataListAction";
import { DataListHeaderCheckbox } from "../DataListHeader/DataListHeaderCheckbox";
import { BREAKPOINT_SIZES, Breakpoints } from "../../DataList.const";

const handleEditClick = jest.fn();
const mockBulkActionsComponent = jest.fn().mockReturnValue(
  <DataListBulkActions>
    <DataListAction icon="edit" label="Edit" onClick={handleEditClick} />
    <DataListAction icon="email" label="Email" />
    <DataListAction icon="note" label="Note" />
    <DataListAction label="Delete" />
  </DataListBulkActions>,
);

const mockHeader = { label: "Name" };
const mockData = [{ id: 1, label: "Luke Skywalker" }];

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const originalMatchMedia = window.matchMedia;

afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

describe("DataListBulkActions", () => {
  it("should render the 4 buttons", () => {
    renderComponent();
    const overflowContainer = screen.getByTestId(
      "ATL-DataListFilters-Container",
    );

    expect(within(overflowContainer).getAllByRole("button")).toHaveLength(4);
  });

  it("should render a more action", () => {
    renderComponent();

    expect(screen.getByLabelText("More actions")).toBeInTheDocument();
  });

  it("should call the onClick handler when clicking the edit button", () => {
    renderComponent();
    userEvent.click(screen.getByLabelText("Edit"));
    expect(handleEditClick).toHaveBeenCalledTimes(1);
  });

  it("should collapse all actions under More actions when breakpoint is smaller than sm", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => {
        const queryValue = parseInt(query.match(/(\d+)/)?.[0] || "0", 10);
        const queryBreakpoint = Object.entries(BREAKPOINT_SIZES).find(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => {
            return value === queryValue;
          },
        )?.[0];
        const expectedValue = {
          xs: true,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        }[queryBreakpoint as Breakpoints];
        return {
          matches: expectedValue,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      }),
    });

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
      <DataListHeaderCheckbox>
        <div />
      </DataListHeaderCheckbox>
    </MockMainContextProvider>,
  );
}

function MockMainContextProvider({ children }: PropsWithChildren<object>) {
  return (
    <DataListContext.Provider
      value={{
        ...defaultValues,
        bulkActionsComponent: mockBulkActionsComponent(),
        selected: ["1", "2"],
        onSelect: jest.fn(),
        onSelectAll: jest.fn(),
        headers: mockHeader,
        data: mockData,
      }}
    >
      {children}
    </DataListContext.Provider>
  );
}
