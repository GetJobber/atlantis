import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";
import { columns, data } from "./test-utilities";

describe("when rendering a Basic Table", () => {
  beforeEach(() => {
    render(<DataTable data={data} columns={columns} />);
  });

  it("renders all headers", () => {
    const tableHeader = screen.getAllByRole("row")[0];

    expect(within(tableHeader).getByText(/Name/i)).toBeInTheDocument();
    expect(within(tableHeader).getByText(/House/i)).toBeInTheDocument();
    expect(within(tableHeader).getByText(/Region/i)).toBeInTheDocument();
    expect(within(tableHeader).getByText(/Sigil/i)).toBeInTheDocument();
    expect(within(tableHeader).getByText(/Alive/i)).toBeInTheDocument();
  });

  it("renders all rows", () => {
    const [, ...bodyRows] = screen.getAllByRole("row");

    expect(bodyRows).toHaveLength(data.length);
  });
});

describe("when using pagination", () => {
  beforeEach(() => {
    render(
      <DataTable
        data={data}
        columns={columns}
        pagination={{ manualPagination: false, itemsPerPage: [5, 10, 15] }}
      />,
    );
  });

  it("renders table with pagination info", () => {
    const paginationInfo = screen.getByText(/Showing 1-10 of 13 items/i);
    expect(paginationInfo).toBeInTheDocument();
  });

  it("renders the correct number of rows", () => {
    const [, ...bodyRows] = screen.getAllByRole("row");

    expect(bodyRows).toHaveLength(10);
  });

  it("renders previous page button disabled on the first page", () => {
    expect(screen.getByLabelText("arrowLeft")).toBeDisabled();
  });

  it("renders updated pagination info of the next page", () => {
    const arrowRight = screen.getByTestId("arrowRight");
    userEvent.click(arrowRight);

    const paginationInfo = screen.getByText(/Showing 11-13 of 13 items/i);
    expect(paginationInfo).toBeInTheDocument();
  });

  it("renders correct number of rows of the next page and previous page", () => {
    const arrowRight = screen.getByTestId("arrowRight");
    userEvent.click(arrowRight);

    const [, ...bodyRowsPage2] = screen.getAllByRole("row");
    expect(bodyRowsPage2).toHaveLength(3);

    userEvent.click(screen.getByTestId("arrowLeft"));

    const [, ...bodyRowsPage1] = screen.getAllByRole("row");
    expect(bodyRowsPage1).toHaveLength(10);
  });

  it("renders correctly after per page change", async () => {
    const select = screen.getByRole("combobox");
    const selectedOption1 = "5";

    fireEvent.change(select, {
      target: { value: selectedOption1 },
    });

    const [, ...bodyRows] = screen.getAllByRole("row");

    expect(bodyRows).toHaveLength(5);

    const selectedOption2 = "15";

    fireEvent.change(select, {
      target: { value: selectedOption2 },
    });

    const [, ...bodyRowsUpdated] = screen.getAllByRole("row");
    expect(bodyRowsUpdated).toHaveLength(13);
  });
});

describe("when using sorting", () => {
  beforeEach(() => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sorting={{ manualSorting: false }}
      />,
    );
  });

  it("renders table with clickable headers", () => {
    const nameHeader = screen.getByRole("columnheader", { name: /name/i });

    userEvent.click(nameHeader); // sort to asc

    const firstBodyRow = screen.getAllByRole("row")[1];
    expect(within(firstBodyRow).getByText("Arya")).toBeInTheDocument();

    userEvent.click(nameHeader); // sort to desc

    const firstBodyRowUpdated = screen.getAllByRole("row")[1];
    expect(within(firstBodyRowUpdated).getByText("Tommen")).toBeInTheDocument();
  });
});
