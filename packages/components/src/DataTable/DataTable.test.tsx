import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";
import {
  columSizeColumns,
  columnSizeData,
  columns,
  data,
  mockContainerWidth,
  royaltyReportColumns,
  royaltyReportData,
} from "./test-utilities";
import { GLIMMER_TEST_ID } from "../Glimmer";

// Allow us to mock and replace the value of useResizeObserver would return via
// a spy
// https://stackoverflow.com/a/72885576
jest.mock("@jobber/hooks/useResizeObserver", () => {
  return {
    __esModule: true, //    <----- this __esModule: true is important
    ...(jest.requireActual("@jobber/hooks/useResizeObserver") as object),
  };
});

describe("when rendering a Basic Table", () => {
  beforeEach(() => {
    render(<DataTable data={data} columns={columns} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
  const scrollToMock = jest.fn();
  beforeEach(() => {
    render(
      <DataTable
        data={data}
        columns={columns}
        pagination={{ manualPagination: false, itemsPerPage: [5, 10, 15] }}
      />,
    );
    const tableContainer = screen.getByTestId("ATL-DataTable-Container");
    tableContainer.scrollTo = scrollToMock;
  });

  it("renders table with pagination info", () => {
    const paginationInfo = screen.getByText(/Showing 1-5 of 13 items/i);
    expect(paginationInfo).toBeInTheDocument();
  });

  it("renders the correct number of rows", () => {
    const [, ...bodyRows] = screen.getAllByRole("row");

    expect(bodyRows).toHaveLength(5);
  });

  it("renders previous page button disabled on the first page", () => {
    expect(screen.getByLabelText("arrowLeft")).toBeDisabled();
  });

  it("resets scroll when navigating between next and previous page", async () => {
    const arrowRight = screen.getByTestId("arrowRight");
    await userEvent.click(arrowRight);
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);

    const arrowLeft = screen.getByTestId("arrowLeft");
    await userEvent.click(arrowLeft);
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it("renders updated pagination info of the next page", async () => {
    const arrowRight = screen.getByTestId("arrowRight");
    await userEvent.click(arrowRight);

    const paginationInfo = screen.getByText(/Showing 6-10 of 13 items/i);
    expect(paginationInfo).toBeInTheDocument();
  });

  it("renders correct number of rows of the next page and previous page", async () => {
    const arrowRight = screen.getByTestId("arrowRight");
    await userEvent.click(arrowRight);

    const [, ...bodyRowsPage2] = screen.getAllByRole("row");
    expect(bodyRowsPage2).toHaveLength(5);

    await userEvent.click(arrowRight);

    const [, ...bodyRowsPage3] = screen.getAllByRole("row");
    expect(bodyRowsPage3).toHaveLength(3);

    await userEvent.click(screen.getByTestId("arrowLeft"));

    const [, ...bodyRowsFinalPage] = screen.getAllByRole("row");
    expect(bodyRowsFinalPage).toHaveLength(5);
  });

  it("renders correctly after per page change", async () => {
    const select = screen.getByRole("combobox");
    const selectedOption1 = "10";

    fireEvent.change(select, {
      target: { value: selectedOption1 },
    });

    const [, ...bodyRows] = screen.getAllByRole("row");

    expect(bodyRows).toHaveLength(10);

    const selectedOption2 = "15";

    fireEvent.change(select, {
      target: { value: selectedOption2 },
    });

    const [, ...bodyRowsUpdated] = screen.getAllByRole("row");
    expect(bodyRowsUpdated).toHaveLength(13);
  });
});

describe("when using manual pagination", () => {
  const mockedOnPaginationChange = jest.fn();
  const scrollToMock = jest.fn();
  const state = { pageIndex: 0, pageSize: 10 };
  const totalItems = 13;
  beforeEach(() => {
    render(
      <DataTable
        data={data}
        columns={columns}
        pagination={{
          manualPagination: true,
          state,
          onPaginationChange: mockedOnPaginationChange,
          pageCount: Math.ceil(totalItems / state.pageSize),
          totalItems,
        }}
      />,
    );
    const tableContainer = screen.getByTestId("ATL-DataTable-Container");
    tableContainer.scrollTo = scrollToMock;
  });
  it("calls the provided callback", async () => {
    await userEvent.click(screen.getByLabelText("arrowRight"));

    expect(mockedOnPaginationChange).toHaveBeenCalledTimes(1);
  });
});

describe("when using sorting", () => {
  it("renders table with clickable headers", async () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sorting={{ manualSorting: false }}
      />,
    );
    const nameHeader = screen.getByText("Name");

    await userEvent.click(nameHeader); // sort to asc

    const firstBodyRow = screen.getAllByRole("row")[1];
    expect(within(firstBodyRow).getByText("Arya")).toBeInTheDocument();

    await userEvent.click(nameHeader); // sort to desc

    const firstBodyRowUpdated = screen.getAllByRole("row")[1];
    expect(within(firstBodyRowUpdated).getByText("Tommen")).toBeInTheDocument();
  });
});

describe("when using manual sorting", () => {
  const mockedOnSortingChange = jest.fn();

  it("calls the provided callback", async () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sorting={{
          manualSorting: true,
          state: [],
          onSortingChange: mockedOnSortingChange,
        }}
      />,
    );

    const nameHeader = screen.getByText("Name");

    await userEvent.click(nameHeader);

    expect(mockedOnSortingChange).toHaveBeenCalledTimes(1);
  });
});

describe("when using onRowClick", () => {
  const clickHandler = jest.fn();
  beforeEach(() => {
    render(
      <DataTable data={data} columns={columns} onRowClick={clickHandler} />,
    );
  });

  it("Executes a callback function", async () => {
    const firstBodyRow = screen.getAllByRole("row")[1];
    await userEvent.click(firstBodyRow);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

describe("when using the column footers", () => {
  beforeEach(() => {
    mockContainerWidth();
    render(
      <DataTable data={royaltyReportData} columns={royaltyReportColumns} />,
    );
  });

  it("renders the footer row with the totals", () => {
    const totalsRowTitle = screen.getByText("Report Totals ($)");
    const totalsRowFirstData = screen.getByText("10,050,400");
    const totalsRowSecondData = screen.getByText("300,000");

    expect(totalsRowTitle).toBeDefined();
    expect(totalsRowFirstData).toBeDefined();
    expect(totalsRowSecondData).toBeDefined();
  });

  describe("when the table has a width > 500px", () => {
    it("renders the footer desktop view", () => {
      const totalsRow = screen.getByTestId("data-table-desktop-footer");

      expect(totalsRow).toBeDefined();
    });
  });

  describe("when the table has a width <= 500px", () => {
    beforeEach(() => {
      mockContainerWidth(499);
      render(
        <DataTable data={royaltyReportData} columns={royaltyReportColumns} />,
      );
    });

    it("renders the footer handheld view", () => {
      const totalsRow = screen.getByTestId("data-table-handheld-footer");

      expect(totalsRow).toBeDefined();
    });
  });
});

describe("when using manual column sizing", () => {
  beforeEach(() => {
    render(<DataTable data={columnSizeData} columns={columSizeColumns} />);
  });

  it("applies the defined widths to headers", () => {
    const firstHeader = screen.getAllByRole("columnheader")[0];

    expect(firstHeader.style.width).toBe("538px");
    expect(firstHeader.style["min-width"]).toBe("438px");
    expect(firstHeader.style["max-width"]).toBe("538px");
  });

  it("applies the defined widths to cells", () => {
    const firstCell = screen.getAllByRole("cell")[0];

    expect(firstCell.style.width).toBe("538px");
    expect(firstCell.style["min-width"]).toBe("438px");
    expect(firstCell.style["max-width"]).toBe("538px");
  });
});

describe("when the table has no data", () => {
  beforeEach(() => {
    render(
      <DataTable
        data={[]}
        columns={columSizeColumns}
        emptyState={<p>No data</p>}
      />,
    );
  });

  it("renders the provided empty state", () => {
    expect(screen.getByText("No data")).toBeDefined();
  });
});

describe("when the table has a loading prop set to true", () => {
  it("Shows the default amount of loaders for each column", async () => {
    render(
      <DataTable
        data={[]}
        pagination={{ manualPagination: false }}
        columns={royaltyReportColumns}
        loading={true}
      />,
    );
    expect(await screen.findAllByTestId(GLIMMER_TEST_ID)).toHaveLength(41);
  });

  it("Shows the amount of loaders based on smallest items per page value", async () => {
    render(
      <DataTable
        data={[]}
        pagination={{ manualPagination: false, itemsPerPage: [20, 30, 40] }}
        columns={royaltyReportColumns}
        loading={true}
      />,
    );
    expect(await screen.findAllByTestId(GLIMMER_TEST_ID)).toHaveLength(81);
  });
});
