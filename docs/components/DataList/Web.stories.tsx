/* eslint-disable max-statements */
import React, { useState } from "react";
import uniq from "lodash/uniq";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import {
  DataList,
  DataListEmptyStateProps,
  DataListItemType,
  DataListSelectedType,
  DataListSorting,
} from "@jobber/components/DataList";
import { Grid } from "@jobber/components/Grid";
import { InlineLabel, InlineLabelColors } from "@jobber/components/InlineLabel";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { DatePicker } from "@jobber/components/DatePicker";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";
import { Combobox, type ComboboxOption } from "@jobber/components/Combobox";
import { Flex } from "@jobber/components/Flex";
// eslint-disable-next-line import/no-internal-modules
import { useDebounce } from "@jobber/components/utils/useDebounce";

const meta: Meta = {
  title: "Components/Lists and Tables/DataList/Web",
  component: DataList,
  parameters: {
    viewMode: "story",
  },
  decorators: [
    // Detach from Storybook's layout
    (Story, { viewMode }) => {
      if (viewMode === "docs") return <Story />;

      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "0px 16px 16px",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

const mockedData = [
  {
    id: "1",
    label: "Peregrine Falcon",
    species: "Falcon",
    home: "Worldwide",
    eyeColor: "Yellow",
    tags: ["Fast", "Predator", "Bird of Prey"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-01-01"),
  },
  {
    id: "2",
    label: "Bald Eagle",
    species: "Eagle",
    home: "North America",
    eyeColor: "Yellow",
    tags: ["National Bird", "Predator", "Bird of Prey"],
    homePopulation: "70,000",
    lastActivity: new Date("2023-02-01"),
  },
  {
    id: "3",
    label: "Golden Eagle",
    species: "Eagle",
    home: "Northern Hemisphere",
    eyeColor: "Brown",
    tags: ["Powerful", "Predator", "Bird of Prey"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-03-01"),
  },
  {
    id: "4",
    label: "Snowy Owl",
    species: "Owl",
    home: "Arctic",
    eyeColor: "Yellow",
    tags: ["Nocturnal", "Predator", "Bird of Prey"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-04-01"),
  },
  {
    id: "5",
    label: "Scarlet Macaw",
    species: "Parrot",
    home: "Central and South America",
    eyeColor: "Yellow",
    tags: ["Colorful", "Intelligent", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-05-01"),
  },
  {
    id: "6",
    label: "Kingfisher",
    species: "Kingfisher",
    home: "Worldwide",
    eyeColor: "Brown",
    tags: ["Diving", "Fisher", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-06-01"),
  },
  {
    id: "7",
    label: "Peacock",
    species: "Peafowl",
    home: "India",
    eyeColor: "Brown",
    tags: ["Colorful", "Display", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-07-01"),
  },
  {
    id: "8",
    label: "Albatross",
    species: "Albatross",
    home: "Southern Ocean",
    eyeColor: "Brown",
    tags: ["Large", "Seabird", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-08-01"),
  },
  {
    id: "9",
    label: "Puffin",
    species: "Puffin",
    home: "North Atlantic",
    eyeColor: "Orange",
    tags: ["Diving", "Seabird", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-09-01"),
  },
  {
    id: "10",
    label: "Flamingo",
    species: "Flamingo",
    home: "Worldwide",
    eyeColor: "Yellow",
    tags: ["Wading", "Colorful", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-10-01"),
  },
  {
    id: "11",
    label: "Toucan",
    species: "Toucan",
    home: "Central and South America",
    eyeColor: "Brown",
    tags: ["Colorful", "Large Beak", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-11-01"),
  },
  {
    id: "12",
    label: "Penguin",
    species: "Penguin",
    home: "Antarctica",
    eyeColor: "Brown",
    tags: ["Flightless", "Swimmer", "Bird"],
    homePopulation: "Unknown",
    lastActivity: new Date("2023-12-01"),
  },
];

const DataListStory = (args: {
  data?: unknown;
  title: string;
  headerVisibility?: { xs: boolean; md: boolean };
  loadingState?: "initial" | "filtering" | "loadingMore" | "none";
}) => {
  const items = mockedData;
  const totalCount = mockedData.length;
  const mappedData = items.map(node => ({
    id: node.id,
    label: node.label,
    species: node.species,
    home: node.home,
    eyeColor: (
      <InlineLabel color={getColor(node.eyeColor)}>{node.eyeColor}</InlineLabel>
    ),
    tags: uniq(node.tags),
    homePopulation: node.homePopulation,
    lastActivity: node.lastActivity,
  }));

  const [selected, setSelected] = useState<DataListSelectedType<string>>();
  const [sortingState, setSortingState] = useState<DataListSorting>();

  return (
    <DataList
      {...args}
      loadingState={getLoadingState()}
      totalCount={totalCount}
      data={(args.data as typeof mappedData) || mappedData}
      headers={{
        label: "Name",
        home: "Home world",
        tags: "Attributes",
        eyeColor: "Eye color",
        lastActivity: "Last activity",
      }}
      selected={selected}
      onSelect={setSelected}
      onSelectAll={setSelected}
      sorting={{
        state: sortingState,
        onSort: sorting => {
          console.log(sorting);
          setSortingState(sorting);
        },
        sortable: [
          {
            key: "label",
            sortType: "dropdown",
            options: [
              {
                id: "firstName",
                label: "First name (A-Z)",
                order: "asc",
              },
              {
                id: "firstName",
                label: "First name (Z-A)",
                order: "desc",
              },
              { id: "lastName", label: "Last name (A-Z)", order: "asc" },
              {
                id: "lastName",
                label: "Last name (Z-A)",
                order: "desc",
              },
            ],
          },
          {
            key: "home",
            sortType: "dropdown",
            options: [
              {
                id: "homeWorld",
                label: "Home world (A-Z)",
                order: "asc",
              },
              {
                id: "homeWorld",
                label: "Home world (Z-A)",
                order: "desc",
              },
              {
                id: "homePopulation",
                label: "Population (A-Z)",
                order: "asc",
              },
              {
                id: "homePopulation",
                label: "Population (Z-A)",
                order: "desc",
              },
            ],
          },
          {
            key: "lastActivity",
            sortType: "toggle",
            options: [
              {
                id: "lastActivity",
                label: "Last activity (Newest)",
                order: "desc",
              },
              {
                id: "lastActivity",
                label: "Last activity (Oldest)",
                order: "asc",
              },
            ],
          },
        ],
      }}
    >
      <DataList.Filters>
        <Chip
          label={"Filter eye color"}
          onClick={() => alert("Run filter by eye color query")}
        >
          <Chip.Suffix>
            <Icon name="add" size="small" />
          </Chip.Suffix>
        </Chip>
        <Chip
          label={"Filter attributes"}
          onClick={() => alert("Run filter by attributes query")}
        >
          <Chip.Suffix>
            <Icon name="add" size="small" />
          </Chip.Suffix>
        </Chip>
        <DatePicker
          onChange={date => alert(`Filter by created date: ${date}`)}
          activator={
            <Chip label="Select date">
              <Chip.Prefix>
                <Icon name="calendar" />
              </Chip.Prefix>
            </Chip>
          }
        />
      </DataList.Filters>

      <DataList.Search
        onSearch={search => console.log(search)}
        placeholder="Search birds..."
      />

      <DataList.ItemActions onClick={handleActionClick}>
        <DataList.ItemAction
          visible={item => item.species !== "Droid"}
          icon="edit"
          label="Edit"
          onClick={handleActionClick}
        />
        <DataList.ItemAction
          icon="sendMessage"
          label={item => `Message ${item.label}`}
          onClick={handleActionClick}
        />
        <DataList.ItemAction
          label="Create new..."
          onClick={handleActionClick}
        />
        <DataList.ItemAction
          label="Add attribute..."
          onClick={handleActionClick}
        />
        <DataList.ItemAction
          icon="trash"
          label="Delete"
          destructive={true}
          onClick={handleActionClick}
        />
        <DataList.ItemAction
          label="Go to Jobber.com"
          actionUrl="https://www.jobber.com"
        />
      </DataList.ItemActions>

      <DataList.BatchActions>
        <DataList.BatchAction
          icon="edit"
          label="Edit"
          onClick={handleBulkActionClick}
        />
        <DataList.BatchAction
          icon="sendMessage"
          label="Message"
          onClick={handleBulkActionClick}
        />
        <DataList.BatchAction
          label="Create new..."
          icon="add"
          onClick={handleBulkActionClick}
        />
        <DataList.BatchAction
          label="Add attribute..."
          onClick={handleBulkActionClick}
        />
        <DataList.BatchAction
          icon="trash"
          label="Delete"
          destructive={true}
          onClick={handleBulkActionClick}
        />
      </DataList.BatchActions>

      <DataList.Layout size="md">
        {(item: DataListItemType<typeof mappedData>) => (
          <Grid alignItems="center">
            <Grid.Cell size={{ xs: 5 }}>
              <Grid alignItems="center">
                <Grid.Cell size={{ xs: 6 }}>
                  {item.label}
                  {item.species}
                </Grid.Cell>
                <Grid.Cell size={{ xs: 6 }}>{item.home}</Grid.Cell>
              </Grid>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 4 }}>{item.tags}</Grid.Cell>
            <Grid.Cell size={{ xs: 1 }}>{item.eyeColor}</Grid.Cell>
            <Grid.Cell size={{ xs: 2 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  textAlign: "right",
                }}
              >
                {item.lastActivity}
              </div>
            </Grid.Cell>
          </Grid>
        )}
      </DataList.Layout>

      <DataList.Layout size="xs">
        {(item: DataListItemType<typeof mappedData>) => (
          <Content spacing="small">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: item.species
                  ? "max-content auto max-content"
                  : "auto max-content",
                gap: 8,
                alignItems: "center",
              }}
            >
              {item.label}
              {item.species}
              {item.eyeColor}
            </div>
            {item.tags}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto max-content",
                gap: 8,
                alignItems: "center",
              }}
            >
              {item.lastActivity}
              <DataList.LayoutActions />
            </div>
          </Content>
        )}
      </DataList.Layout>

      <DataList.EmptyState
        type="empty"
        message="Bird list is looking empty"
        action={
          <Button label="New bird" onClick={() => alert("Create a new bird")} />
        }
      />

      <DataList.EmptyState
        type="filtered"
        message="No results for selected filters"
        action={
          <Button
            label="Clear filters"
            onClick={() => alert("Filters cleared")}
          />
        }
      />
    </DataList>
  );

  function handleActionClick(item: (typeof mappedData)[number]) {
    alert(`You clicked the action for ${item?.label}`);
  }

  function handleBulkActionClick() {
    console.log("You clicked on a bulk action", selected);
  }

  function getColor(eyeColor: string): InlineLabelColors {
    const colorMap: { [key: string]: InlineLabelColors } = {
      blue: "lightBlue",
      black: "blueDark",
      yellow: "yellow",
      red: "red",
      hazel: "orange",
      orange: "orange",
      green: "green",
      gold: "yellow",
      pink: "pink",
      unknown: "greyBlue",
    };

    return colorMap[eyeColor] || "greyBlue";
  }

  function getLoadingState() {
    return args.loadingState;
  }
};

export const Basic: StoryObj<typeof DataList> = {
  render: () => (
    <DataListStory
      title="All birds"
      headerVisibility={{ xs: false, md: true }}
    />
  ),
};

export const ClearAllFilters: StoryFn<typeof DataList> = args => {
  interface SelectedFilters {
    home: ComboboxOption[];
    eyeColor: ComboboxOption[];
  }

  interface Filter {
    key: keyof SelectedFilters;
    label: string;
    options: string[];
    isSelected: boolean;
    selectedFilters: ComboboxOption[];
  }

  type Entries<T> = {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];

  const selectedFiltersInitialState: SelectedFilters = {
    home: [],
    eyeColor: [],
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    selectedFiltersInitialState,
  );

  const [searchValue, setSearchValue] = useState("");

  const debouncedRequest = useDebounce((search: string) => {
    console.log("debounced search request", search);
  }, 300);

  function removeAllFilters() {
    setSelectedFilters(selectedFiltersInitialState);
    setSearchValue("");
  }

  function handleRemoveIndividualFilterGroup(type: keyof SelectedFilters) {
    setSelectedFilters({
      ...selectedFilters,
      [type]: [],
    });
  }

  function handleSelectFilters(
    type: keyof SelectedFilters,
    filters: ComboboxOption[],
  ) {
    setSelectedFilters({
      ...selectedFilters,
      [type]: filters,
    });
  }

  const items = mockedData;
  const totalCount = mockedData.length;

  const mappedData = items.map(node => ({
    id: node.id,
    label: node.label,
    species: node.species,
    home: node.home,
    eyeColor: node.eyeColor,
    tags: uniq(node.tags),
    homePopulation: node.homePopulation,
    lastActivity: node.lastActivity,
  }));

  const homeFilters = [...new Set(mappedData.map(({ home }) => home))];
  const eyeColorFilters = [
    ...new Set(mappedData.map(({ eyeColor }) => eyeColor)),
  ];

  const FILTERS_MAP: { [K in keyof SelectedFilters]: Filter } = {
    home: {
      key: "home",
      label: "Home world",
      options: homeFilters,
      isSelected: selectedFilters.home.length > 0,
      selectedFilters: selectedFilters.home,
    },
    eyeColor: {
      key: "eyeColor",
      label: "Eye color",
      options: eyeColorFilters,
      isSelected: selectedFilters.eyeColor.length > 0,
      selectedFilters: selectedFilters.eyeColor,
    },
  };

  return (
    <DataList {...args} totalCount={totalCount} data={mappedData}>
      <DataList.Filters>
        <>
          {(
            Object.entries(selectedFilters) as Entries<typeof selectedFilters>
          ).map(([key, value]) => (
            <Combobox
              key={key}
              label={FILTERS_MAP[key].label}
              selected={value}
              onSelect={(filters: ComboboxOption[]) =>
                handleSelectFilters(key as keyof SelectedFilters, filters)
              }
              multiSelect
            >
              <Combobox.Activator>
                <Chip
                  label={
                    FILTERS_MAP[key].isSelected
                      ? FILTERS_MAP[key].selectedFilters
                          .map(({ label }) => label)
                          .join(", ")
                      : ""
                  }
                  heading={FILTERS_MAP[key].label}
                  variation={FILTERS_MAP[key].isSelected ? "base" : "subtle"}
                >
                  <Chip.Suffix
                    {...(FILTERS_MAP[key].isSelected
                      ? {
                          onClick: () =>
                            handleRemoveIndividualFilterGroup(
                              key as keyof SelectedFilters,
                            ),
                        }
                      : {})}
                  >
                    <Icon
                      name={FILTERS_MAP[key].isSelected ? "cross" : "add"}
                      size="small"
                    />
                  </Chip.Suffix>
                </Chip>
              </Combobox.Activator>

              {FILTERS_MAP[key].options.map((option: string) => (
                <Combobox.Option key={option} id={option} label={option} />
              ))}
            </Combobox>
          ))}
        </>

        <Button
          label="Clear filters"
          type="tertiary"
          variation="subtle"
          onClick={removeAllFilters}
        />
      </DataList.Filters>

      <DataList.Search
        value={searchValue}
        onSearch={search => {
          setSearchValue(search);
          debouncedRequest(search);
        }}
        placeholder="Search data..."
      />
      <DataList.Layout size="md">
        {item => (
          <Grid alignItems="center">
            <Grid.Cell size={{ xs: 5 }}>
              <Grid alignItems="center">
                <Grid.Cell size={{ xs: 6 }}>
                  {item.label}
                  {item.species}
                </Grid.Cell>
                <Grid.Cell size={{ xs: 6 }}>{item.home}</Grid.Cell>
              </Grid>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 4 }}>{item.tags}</Grid.Cell>
            <Grid.Cell size={{ xs: 1 }}>{item.eyeColor}</Grid.Cell>
            <Grid.Cell size={{ xs: 2 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  textAlign: "right",
                }}
              >
                {item.lastActivity}
              </div>
            </Grid.Cell>
          </Grid>
        )}
      </DataList.Layout>
      <DataList.Layout size="xs">
        {item => (
          <Content spacing="small">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: item.species
                  ? "max-content auto max-content"
                  : "auto max-content",
                gap: 8,
                alignItems: "center",
              }}
            >
              {item.label}
              {item.species}
              {item.eyeColor}
            </div>
            {item.tags}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto max-content",
                gap: 8,
                alignItems: "center",
              }}
            >
              {item.lastActivity}
              <DataList.LayoutActions />
            </div>
          </Content>
        )}
      </DataList.Layout>
    </DataList>
  );
};

ClearAllFilters.args = {
  title: "All birds",
  headerVisibility: { xs: false, md: true },
  headers: {
    label: "Name",
    home: "Home world",
    tags: "Attributes",
    eyeColor: "Eye color",
    lastActivity: "Last activity",
  },
};
ClearAllFilters.parameters = {
  previewTabs: {
    code: {
      hidden: false,
      extraImports: {
        lodash: ["uniq"],
      },
    },
  },
};

export const EmptyState: StoryObj<typeof DataList> = {
  render: () => (
    <DataListStory
      data={[]}
      title="All birds"
      headerVisibility={{ xs: false, md: true }}
    />
  ),
};

export const CustomRenderEmptyState: StoryFn<typeof DataList> = args => {
  return (
    <DataList {...args} totalCount={args.data?.length}>
      <DataList.Layout size="md">
        {item => (
          <Grid alignItems="center">
            <Grid.Cell size={{ xs: 5 }}>
              <Grid alignItems="center">
                <Grid.Cell size={{ xs: 6 }}>
                  {item.label}
                  {item.species}
                </Grid.Cell>
                <Grid.Cell size={{ xs: 6 }}>{item.home}</Grid.Cell>
              </Grid>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 4 }}>{item.tags}</Grid.Cell>
            <Grid.Cell size={{ xs: 1 }}>{item.eyeColor}</Grid.Cell>
            <Grid.Cell size={{ xs: 2 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  textAlign: "right",
                }}
              >
                {item.lastActivity}
              </div>
            </Grid.Cell>
          </Grid>
        )}
      </DataList.Layout>
      <DataList.Layout size="xs">
        {item => (
          <Content spacing="small">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: item.species
                  ? "max-content auto max-content"
                  : "auto max-content",
                gap: 8,
                alignItems: "center",
              }}
            >
              {item.label}
              {item.species}
              {item.eyeColor}
            </div>
            {item.tags}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto max-content",
                gap: 8,
                alignItems: "center",
              }}
            >
              {item.lastActivity}
              <DataList.LayoutActions />
            </div>
          </Content>
        )}
      </DataList.Layout>
      <DataList.EmptyState
        type="empty"
        message="Bird list is looking empty"
        customRender={({
          message,
        }: Omit<DataListEmptyStateProps, "customRender">) => (
          <div>
            <h3>{message}</h3>
            <Flex template={["grow", "shrink"]} direction="column">
              <Button
                label="Create a new bird"
                onClick={() => alert("Create")}
              />
              <Button
                label="Clear filters"
                type="secondary"
                onClick={() => alert("Clear filters")}
              />
            </Flex>
          </div>
        )}
      />
    </DataList>
  );
};

CustomRenderEmptyState.args = {
  title: "All birds",
  headerVisibility: { xs: false, md: true },
  headers: {
    label: "Name",
    home: "Home world",
    tags: "Attributes",
    eyeColor: "Eye color",
    lastActivity: "Last activity",
  },
  data: [],
};

CustomRenderEmptyState.parameters = {
  previewTabs: {
    code: {
      hidden: false,
    },
  },
};
