import { ColumnDef } from "@tanstack/react-table";

interface Data {
  name: string;
  house: string;
  region: string;
  sigil: string;
  isAlive: string;
}

interface RoyaltyReportData {
  franchiseName: string;
  payment: string;
  royaltyRate: number;
  royaltyAmount: string;
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

export const royaltyReportColumns: ColumnDef<RoyaltyReportData>[] = [
  {
    id: "franchiseName",
    accessorKey: "franchiseName",
    header: "Franchise Name",
    footer: "Report Totals ($)",
  },
  {
    id: "payment",
    accessorKey: "payment",
    header: "Payment ($)",
    footer: "10,050,400",
  },
  {
    id: "royaltyRate",
    accessorKey: "royaltyRate",
    header: "Royalty Rate (%)",
  },
  {
    id: "royaltyAmount",
    accessorKey: "royaltyAmount",
    header: "Royalty Amount ($)",
    footer: "300,000",
  },
];

export const royaltyReportData: RoyaltyReportData[] = [
  {
    franchiseName: "The Patch Boys of Macon and Warner Robins",
    payment: "1,000,000",
    royaltyRate: 5,
    royaltyAmount: "50,000",
  },
  {
    franchiseName: "The Patch Boys of San Antonio",
    payment: "2,000,000",
    royaltyRate: 5,
    royaltyAmount: "40,000",
  },
  {
    franchiseName: "The Patch Boys of Phoenix",
    payment: "1,250,000",
    royaltyRate: 8,
    royaltyAmount: "20,000",
  },
];
