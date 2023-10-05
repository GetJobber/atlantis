import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataListActions } from "@jobber/components/DataList/components/DataListActions";
import { DataListAction } from "@jobber/components/DataList/components/DataListAction";

describe("DataListActions", () => {
  it("should render the 3 buttons and the More Actions", () => {
    render(
      <DataListActions>
        <DataListAction icon="edit" label="Edit" />
        <DataListAction icon="email" label="Email" />
        <DataListAction icon="note" label="Note" />
        <DataListAction label="Delete" />
      </DataListActions>,
    );
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByLabelText("More actions")).toBeInTheDocument();
  });

  it("should render 2 buttons and collapse the last 2 into More Actions", () => {
    renderComponent(2);
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("Note")).not.toBeInTheDocument();
    expect(screen.getByLabelText("More actions")).toBeInTheDocument();

    const moreMenuButton = screen.getByLabelText("More actions");
    userEvent.click(moreMenuButton);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(within(menu).getByText("Note")).toBeInTheDocument();
    expect(within(menu).getByText("Delete")).toBeInTheDocument();
    expect(within(menu).getAllByRole("button")).toHaveLength(2);
  });

  it("should not render the first 2 actions if the first action doesn't have an icon", () => {
    render(
      <DataListActions>
        <DataListAction label="Edit" />
        <DataListAction icon="email" label="Email" />
        <DataListAction icon="note" label="Note" />
        <DataListAction label="Delete" />
      </DataListActions>,
    );

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

  it("should not render a 2nd action if the 2nd action doesn't have an icon even though the 3rd action have an icon", () => {
    render(
      <DataListActions>
        <DataListAction icon="edit" label="Edit" />
        <DataListAction label="Email" />
        <DataListAction icon="note" label="Note" />
        <DataListAction label="Delete" />
      </DataListActions>,
    );

    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Note")).not.toBeInTheDocument();
    expect(screen.getByLabelText("More actions")).toBeInTheDocument();
  });

  it("should collapse all actions under More actions if the items to expose is 0", () => {
    renderComponent(0);
    expect(screen.queryByLabelText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Note")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Delete")).not.toBeInTheDocument();

    const moreMenuButton = screen.getByLabelText("More actions");
    userEvent.click(moreMenuButton);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(within(menu).getAllByRole("button")).toHaveLength(4);
  });

  it("should not render the more actions button if there are no more actions", () => {
    render(
      <DataListActions>
        <DataListAction icon="edit" label="Edit" />
        <DataListAction icon="email" label="Email" />
      </DataListActions>,
    );

    expect(screen.queryByLabelText("More actions")).not.toBeInTheDocument();
  });
});

function renderComponent(itemsToExpose = 3) {
  return render(
    <DataListActions itemsToExpose={itemsToExpose}>
      <DataListAction icon="edit" label="Edit" />
      <DataListAction icon="email" label="Email" />
      <DataListAction icon="note" label="Note" />
      <DataListAction label="Delete" />
    </DataListActions>,
  );
}
