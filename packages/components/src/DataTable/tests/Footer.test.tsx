import React from "react";
// import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { DataTable } from "../DataTable";
import { Pagination } from "../types";

const data = [
  {
    name: "Eddard",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "No",
  },
  {
    name: "Catelyn",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "No",
  },
  {
    name: "Jon Snow",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "Yes",
  },
  {
    name: "Robert",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "No",
  },
  {
    name: "Rickon",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "No",
  },
  {
    name: "Robert",
    house: "Baratheon",
    region: "Stormlands",
    sigil: "Black Stag",
    isAlive: "No",
  },
  {
    name: "Cercei",
    house: "Lannister",
    region: "Westerlands",
    sigil: "Golden Lion",
    isAlive: "Yes",
  },
  {
    name: "Sansa",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "Yes",
  },
  {
    name: "Arya",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "Yes",
  },
  {
    name: "Bran",
    house: "Stark",
    region: "North",
    sigil: "Direwolf",
    isAlive: "Yes",
  },
  {
    name: "Joffrey",
    house: "Baratheon",
    region: "Stormlands",
    sigil: "Black Stag",
    isAlive: "No",
  },
  {
    name: "Myrcella",
    house: "Baratheon",
    region: "Stormlands",
    sigil: "Black Stag",
    isAlive: "Yes",
  },
  {
    name: "Tommen",
    house: "Baratheon",
    region: "Stormlands",
    sigil: "Black Stag",
    isAlive: "Yes",
  },
];
const columns = [
  {
    accessorKey: "name",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "house",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "region",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "sigil",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "isAlive",
    cell: info => info.getValue(),
  },
];
// const setPagination = () => {
//   console.log("Change pagination");
// };
// const setSorting = () => {
//   console.log("Change sorting");
// };
// const pageIndex = 0;
// const pageSize = 10;
// const sorting: Sorting = { manualSorting: false };
const pagination: Pagination = {
  manualPagination: false,
};
// const manualPagination: Pagination = {
//   manualPagination: true,
//   onPaginationChange: setPagination,
//   pageCount: Math.ceil(100 / pageSize),
//   itemsPerPage: [10, 20, 30],
//   totalItems: 100,
//   state: {
//     pageIndex,
//     pageSize,
//   },
// };
// const manualSorting = {
//   manualSorting: true,
//   state: [{ id: "name", desc: false }],
//   onSortingChange: setSorting,
// };

describe("renders a basic table table with footer", () => {
  it("render the footer text", () => {
    render(<DataTable data={data} columns={columns} pagination={pagination} />);
    const heeding = screen.getByText(`Showing 1-10 of ${data.length} items`);
    expect(heeding).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(5);
  });
  // it("changes items per page options when click", () => {
  //   render(<DataTable data={data} columns={columns} pagination={pagination} />);
  //   const test = screen.getByText("20");
  //   // const test = fireEvent.click(screen.getByText("10"));
  //   // fireEvent.click(screen.getByText("20"));
  //   // const heeding = screen.getByText(`Showing 1-13 of ${data.length} items`);
  //   expect(test).toBeInTheDocument();
  // });
});
