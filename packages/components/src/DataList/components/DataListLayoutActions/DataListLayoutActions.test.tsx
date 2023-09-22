import React, { PropsWithChildren } from "react";
import { render, screen } from "@testing-library/react";
import { DataListLayoutActions } from "./DataListLayoutActions";
import { DataListContext, defaultValues } from "../../context/DataListContext";
import { DataListItemActions } from "../DataListItemActions";
import { DataListAction } from "../DataListAction";
import {
  DataListLayoutContext,
  defaultValues as layoutDefaultValues,
} from "../../context/DataListLayoutContext";

const mockSetHasInLayoutActions = jest.fn();
const mockItemActionComponent = jest.fn<JSX.Element | undefined, []>(() => (
  <DataListItemActions>
    <DataListAction label="Edit" />
    <DataListAction label="Email" />
    <DataListAction label="Delete" />
  </DataListItemActions>
));

describe("DataListLayoutActions", () => {
  it("should render a more action", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: "More actions" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should let the layout context know that it can be rendered", () => {
    renderComponent();

    expect(mockSetHasInLayoutActions).toHaveBeenCalledWith(true);
  });

  it("should let the layout context know that it has been removed", () => {
    const { unmount } = renderComponent();
    expect(mockSetHasInLayoutActions).toHaveBeenCalledWith(true);

    unmount();
    expect(mockSetHasInLayoutActions).toHaveBeenCalledWith(false);
  });

  it("should not render when there's no actions to render", () => {
    mockItemActionComponent.mockReturnValueOnce(undefined);
    const { container } = renderComponent();

    expect(container).toBeEmptyDOMElement();
  });
});

function renderComponent() {
  return render(
    <MockMainContextProvider>
      <MocklayoutContextProvider>
        <DataListLayoutActions />
      </MocklayoutContextProvider>
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

function MocklayoutContextProvider({ children }: PropsWithChildren<object>) {
  return (
    <DataListLayoutContext.Provider
      value={{
        ...layoutDefaultValues,
        isInLayoutProvider: true,
        hasInLayoutActions: false,
        setHasInLayoutActions: mockSetHasInLayoutActions,
        activeItem: { id: 1 },
      }}
    >
      {children}
    </DataListLayoutContext.Provider>
  );
}
