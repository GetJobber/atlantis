import React from "react";
import renderer from "react-test-renderer";
import { DataTable } from ".";

it("renders a table", () => {
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
  const tree = renderer
    .create(<DataTable data={data} columns={columns} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
