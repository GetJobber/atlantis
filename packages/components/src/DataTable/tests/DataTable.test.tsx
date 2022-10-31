import React from "react";
import renderer from "react-test-renderer";
import { DataTable } from "../DataTable";
import { Pagination, Sorting } from "../types";

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
const setPagination = () => {
  console.log("Change pagination");
};
const setSorting = () => {
  console.log("Change sorting");
};
const pageIndex = 0;
const pageSize = 10;
const sorting: Sorting = { manualSorting: false };
const pagination: Pagination = {
  manualPagination: false,
};
const manualPagination: Pagination = {
  manualPagination: true,
  onPaginationChange: setPagination,
  pageCount: Math.ceil(100 / pageSize),
  itemsPerPage: [10, 20, 30],
  totalItems: 100,
  state: {
    pageIndex,
    pageSize,
  },
};
const manualSorting = {
  manualSorting: true,
  state: [{ id: "name", desc: false }],
  onSortingChange: setSorting,
};

it("renders a basic table table", () => {
  const tree = renderer
    .create(<DataTable data={data} columns={columns} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a table table with pagination", () => {
  const tree = renderer
    .create(<DataTable data={data} columns={columns} pagination={pagination} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a table table with sorting enable", () => {
  const tree = renderer
    .create(<DataTable data={data} columns={columns} sorting={sorting} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a table table with manual pagination", () => {
  const tree = renderer
    .create(
      <DataTable
        data={data}
        columns={columns}
        sorting={sorting}
        pagination={manualPagination}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a table table with manual sorting", () => {
  const tree = renderer
    .create(<DataTable data={data} columns={columns} sorting={manualSorting} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
