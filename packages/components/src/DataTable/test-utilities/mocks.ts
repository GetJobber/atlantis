import { ColumnDef } from "@tanstack/react-table";

interface Data {
  name: string;
  house: string;
  region: string;
  sigil: string;
  isAlive: string;
}

interface RankingData {
  name: string;
  points: string;
  chance: number;
  power: string;
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

export const columnSizeData: RankingData[] = [
  {
    name: "Daenerys Stormborn of House Targaryen, the First of Her Name, Queen of the Andals and the First Men, Protector of the Seven Kingdoms, the Mother of Dragons, the Khaleesi of the Great Grass Sea, the Unburnt, the Breaker of Chains.",
    points: "1,000,000",
    chance: 5,
    power: "50,000",
  },
  {
    name: "Aegon “The Conqueror” Targaryen and Rhaenys Targaryen",
    points: "2,000,000",
    chance: 5,
    power: "40,000",
  },
  {
    name: "Jaehaerys “The Old King” Targaryen and Alysanne Targaryen",
    points: "1,250,000",
    chance: 8,
    power: "20,000",
  },
];

export const columSizeColumns = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    footer: "Totals",
    enableResizing: false,
    cell: (info: { getValue: () => unknown }) => info.getValue(),
    size: 538,
    minSize: 438,
    maxSize: 538,
  },
  {
    id: "points",
    accessorKey: "points",
    header: "Points",
    footer: "10,050,400",
    cell: (info: { getValue: () => unknown }) => info.getValue(),
    size: 268,
    minSize: 168,
    maxSize: 268,
  },
  {
    id: "chance",
    accessorKey: "chance",
    header: "Chance (%)",
    cell: (info: { getValue: () => unknown }) => info.getValue(),
    size: 268,
    minSize: 168,
    maxSize: 268,
  },
  {
    id: "power",
    accessorKey: "power",
    header: "Power",
    footer: "300,000",
    cell: (info: { getValue: () => unknown }) => info.getValue(),
    size: 268,
    minSize: 168,
    maxSize: 268,
  },
];
