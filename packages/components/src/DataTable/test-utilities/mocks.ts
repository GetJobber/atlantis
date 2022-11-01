import { ColumnDef } from "@tanstack/react-table";

interface Data {
  name: string;
  house: string;
  region: string;
  sigil: string;
  isAlive: string;
}

export const data: Data[] = [
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

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    cell: info => info.getValue(),
    header: "Name",
  },
  {
    accessorKey: "house",
    cell: info => info.getValue(),
    header: "House",
  },
  {
    accessorKey: "region",
    cell: info => info.getValue(),
    header: "Region",
  },
  {
    accessorKey: "sigil",
    cell: info => info.getValue(),
    header: "Sigil",
  },
  {
    accessorKey: "isAlive",
    accessorFn: row => (row.name === "Jon Snow" ? "Resurrected" : row.isAlive),
    cell: info => info.getValue(),
    header: "Alive",
  },
];
