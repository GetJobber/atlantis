import React, { PropsWithChildren } from "react";
import { render, screen } from "@testing-library/react";
import { DataListLayoutActions } from "./DataListLayoutActions";
import { DataListContext, defaultValues } from "../../context/DataListContext";
import { DataListItemActions } from "../DataListItemActions";
import { DataListAction } from "../DataListAction";
import { DataListLayoutContext } from "../../context/DataListLayoutContext";

const mockMainSetHasInLayoutActions = jest.fn();
const mockLayoutSetHasInLayoutActions = jest.fn();
const mockItemActionComponent = jest.fn<JSX.Element | undefined, []>(() => (
  <DataListItemActions>
    <DataListAction label="Edit" />
    <DataListAction label="Email" />
    <DataListAction label="Delete" />
  </DataListItemActions>
));

describe("DataListLayoutActions.test", () => {
  it("should render a more action", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: "More actions" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should let the layout context know that it can be rendered", () => {
    renderComponent();

    expect(mockLayoutSetHasInLayoutActions).toHaveBeenCalledWith(true);
  });

  it("should not let the main context know that it can be rendered because that's the layouts job", () => {
    renderComponent();

    expect(mockMainSetHasInLayoutActions).not.toHaveBeenCalled();
  });

  it("should let the layout context know that it has been removed", () => {
    const { unmount } = renderComponent();
    expect(mockLayoutSetHasInLayoutActions).toHaveBeenCalledWith(true);

    unmount();
    expect(mockLayoutSetHasInLayoutActions).toHaveBeenCalledWith(false);
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
        setHasInLayoutActions: mockMainSetHasInLayoutActions,
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
        ...defaultValues,
        setHasInLayoutActions: mockLayoutSetHasInLayoutActions,
        activeItem: { id: 1 },
      }}
    >
      {children}
    </DataListLayoutContext.Provider>
  );
}
