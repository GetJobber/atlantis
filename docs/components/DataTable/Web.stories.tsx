import React, { useMemo, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import sortBy from "lodash/sortBy";
import { DataTable } from "@jobber/components/DataTable";
import { Menu } from "@jobber/components/Menu";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { DataDump } from "@jobber/components/DataDump";
import { Typography } from "@jobber/components/Typography";
import { Heading } from "@jobber/components/Heading";

export default {
  title: "Components/Lists and Tables/DataTable/Web",
  component: DataTable,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          lodash: ["sortBy"],
          "@jobber/components/Typography": ["Typography"],
          "@jobber/components/Text": ["Text"],
        },
      },
    },
  },
} as ComponentMeta<typeof DataTable>;

const BasicTemplate: ComponentStory<typeof DataTable> = args => (
  <DataTable {...args} />
);

const exampleData = [
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  data: exampleData,
  columns: [
    {
      accessorKey: "name",
    },
    {
      accessorKey: "house",
    },
    {
      accessorKey: "region",
    },
    {
      accessorKey: "sigil",
    },
    {
      accessorKey: "isAlive",
    },
  ],
};

const WithActionsTemplate: ComponentStory<typeof DataTable> = args => (
  <DataTable
    {...args}
    columns={[
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
        cell: info => info.getValue(),
        header: "Alive",
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Menu
            activator={
              <Button
                variation="subtle"
                type="tertiary"
                icon="more"
                ariaLabel="more"
              />
            }
            items={[
              {
                actions: [
                  {
                    label: "Alert",
                    icon: "alert",
                    onClick: () => {
                      alert(JSON.stringify(row.original, null, 2));
                    },
                  },
                ],
              },
            ]}
          />
        ),
      },
    ]}
  />
);

export const WithActions = WithActionsTemplate.bind({});
WithActions.args = {
  data: exampleData,
};

export const ClientSidePagination = BasicTemplate.bind({});
ClientSidePagination.args = {
  data: exampleData,
  stickyHeader: true,
  height: 400,
  pagination: { manualPagination: false, itemsPerPage: [10, 20, 30] },
  sorting: { manualSorting: false },
  onRowClick: row => alert(JSON.stringify(row.original, null, 2)),
  columns: [
    {
      accessorKey: "name",
      cell: info => info.getValue(),
      header: "Name",
      enableSorting: false,
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
      cell: info => info.getValue(),
      header: "Alive",
    },
  ],
};

const HorizontalScrollingTemplate: ComponentStory<typeof DataTable> = args => (
  <div style={{ maxWidth: 400 }}>
    <DataTable
      {...args}
      columns={[
        {
          accessorKey: "name",
          header: () => <Text variation="success">Name</Text>,
        },
        {
          accessorKey: "house",
          header: () => <Text variation="success">House</Text>,
        },
        {
          accessorKey: "region",
          header: () => <Text variation="success">Region</Text>,
        },
        {
          accessorKey: "sigil",
          header: () => <Text variation="success">Sigil</Text>,
        },
        {
          accessorKey: "isAlive",
          cell: info => (info.getValue() == "Yes" ? "✅" : "❌"),
          header: () => <Text variation="success">Alive</Text>,
        },
      ]}
    />
  </div>
);

export const HorizontalScrolling = HorizontalScrollingTemplate.bind({});
HorizontalScrolling.args = {
  data: exampleData,
  pinFirstColumn: true,
};

const ManualSortingTemplate: ComponentStory<typeof DataTable> = args => {
  const [sortingState, setSortingState] = useState([
    { id: "name", desc: false },
  ]);
  const defaultData = args.data;
  const sortedData = useMemo(() => {
    if (sortingState.length == 0) return defaultData;
    return sortingState[0].desc
      ? sortBy(defaultData, [sortingState[0].id]).reverse()
      : sortBy(defaultData, [sortingState[0].id]);
  }, [sortingState]);
  return (
    <div>
      <DataDump label="Sorting State" data={sortingState} defaultOpen />
      <DataTable
        {...args}
        data={sortedData}
        sorting={{
          manualSorting: true,
          state: sortingState,
          onSortingChange: setSortingState,
          enableSortingRemoval: true,
        }}
      />
    </div>
  );
};

export const ManualSorting = ManualSortingTemplate.bind({});
ManualSorting.args = {
  height: 400,
  pagination: { manualPagination: false, itemsPerPage: [10, 20, 30] },
  sorting: { manualSorting: false },
  data: exampleData,
  columns: [
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
  ],
};

const WithFooterRowTemplate: ComponentStory<typeof DataTable> = args => (
  <DataTable
    {...args}
    columns={[
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        footer: "Totals",
      },
      {
        id: "points",
        accessorKey: "points",
        header: () => (
          <div style={{ display: "flex", flex: 1 }}>
            <Typography align="end" fontWeight="bold">
              Points
            </Typography>
          </div>
        ),
        footer: () => (
          <Typography align="end" fontWeight="bold">
            10,050,400
          </Typography>
        ),
        cell: info => (
          <Typography align="end">{<>{info.getValue()}</>}</Typography>
        ),
      },
      {
        id: "chance",
        accessorKey: "chance",
        header: () => (
          <div style={{ display: "flex", flex: 1 }}>
            <Typography align="end" fontWeight="bold">
              Chance (%)
            </Typography>
          </div>
        ),
        cell: info => (
          <Typography align="end">
            <>{info.getValue()}</>
          </Typography>
        ),
      },
      {
        id: "power",
        accessorKey: "power",
        header: () => (
          <div style={{ display: "flex", flex: 1 }}>
            <Typography align="end" fontWeight="bold">
              Power
            </Typography>
          </div>
        ),
        footer: () => (
          <Typography align="end" fontWeight="bold">
            300,000
          </Typography>
        ),
        cell: info => (
          <Typography align="end">
            <>{info.getValue()}</>
          </Typography>
        ),
      },
    ]}
  />
);

export const WithFooterRow = WithFooterRowTemplate.bind({});
WithFooterRow.args = {
  data: [
    {
      name: "Eddard",
      points: "1,000,000",
      chance: 5,
      power: "50,000",
    },
    {
      name: "Catelyn",
      points: "2,000,000",
      chance: 5,
      power: "40,000",
    },
    {
      name: "Jon",
      points: "1,250,000",
      chance: 8,
      power: "20,000",
    },
    {
      name: "Robert",
      points: "1,000,000",
      chance: 5,
      power: "50,000",
    },
    {
      name: "Rickon",
      points: "2,000,000",
      chance: 5,
      power: "40,000",
    },
    {
      name: "Robert",
      points: "1,250,000",
      chance: 8,
      power: "20,000",
    },
    {
      name: "Cersei",
      points: "1,000,000",
      chance: 5,
      power: "50,000",
    },
    {
      name: "Sansa",
      points: "2,000,000",
      chance: 5,
      power: "40,000",
    },
    {
      name: "Arya",
      points: "1,250,000",
      chance: 8,
      power: "20,000",
    },
    {
      name: "Bran",
      points: "1,000,000",
      chance: 5,
      power: "50,000",
    },
  ],
};

const EmptyStateTemplate: ComponentStory<typeof DataTable> = args => (
  <DataTable
    {...args}
    emptyState={
      <div>
        <Heading level={5}>No items found</Heading>
        <Text>Update your search or filter selection</Text>
      </div>
    }
  />
);

export const EmptyState = EmptyStateTemplate.bind({});
EmptyState.args = {
  height: 400,
  data: [],
  columns: [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "age",
      accessorKey: "age",
      header: "Age",
    },
  ],
};

const LoadingTemplate: ComponentStory<typeof DataTable> = args => (
  <DataTable
    {...args}
    columns={[
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        footer: "Totals",
        cell: info => (
          <Typography align="end">{<>{info.getValue()}</>}</Typography>
        ),
        size: 538,
        minSize: 438,
        maxSize: 538,
      },
      {
        id: "points",
        accessorKey: "points",
        header: () => (
          <div style={{ display: "flex", flex: 1 }}>
            <Typography align="end" fontWeight="bold">
              Points
            </Typography>
          </div>
        ),
        footer: () => (
          <Typography align="end" fontWeight="bold">
            10,050,400
          </Typography>
        ),
        cell: info => (
          <Typography align="end">{<>{info.getValue()}</>}</Typography>
        ),
        size: 268,
        minSize: 168,
        maxSize: 268,
      },
      {
        id: "chance",
        accessorKey: "chance",
        header: () => (
          <div style={{ display: "flex", flex: 1 }}>
            <Typography align="end" fontWeight="bold">
              Chance (%)
            </Typography>
          </div>
        ),
        cell: info => (
          <Typography align="end">{<>{info.getValue()}</>}</Typography>
        ),
        size: 268,
        minSize: 168,
        maxSize: 268,
      },
      {
        id: "power",
        accessorKey: "power",
        header: () => (
          <div style={{ display: "flex", flex: 1 }}>
            <Typography align="end" fontWeight="bold">
              Power
            </Typography>
          </div>
        ),
        footer: () => (
          <Typography align="end" fontWeight="bold">
            300,000
          </Typography>
        ),
        cell: info => (
          <Typography align="end">{<>{info.getValue()}</>}</Typography>
        ),
        size: 268,
        minSize: 168,
        maxSize: 268,
      },
    ]}
  />
);

export const LoadingState = LoadingTemplate.bind({});
LoadingState.args = {
  pagination: { manualPagination: false, itemsPerPage: [20, 30, 40] },
  sorting: { manualSorting: false },
  height: 600,
  loading: true,
  data: [],
};
