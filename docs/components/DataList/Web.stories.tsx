/* eslint-disable max-statements */
import React, { useMemo, useState } from "react";
import uniq from "lodash/uniq";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useCollectionQuery } from "@jobber/hooks/useCollectionQuery";
import {
  DataList,
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
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { LIST_QUERY, ListQueryType, apolloClient } from "./storyUtils";

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

const DataListStory = (args: {
  data?: unknown;
  title: string;
  headerVisibility?: { xs: boolean; md: boolean };
  loadingState?: "initial" | "filtering" | "loadingMore" | "none";
}) => {
  const { data, nextPage, loadingNextPage, loadingInitialContent } =
    useCollectionQuery<ListQueryType>({
      query: LIST_QUERY,
      queryOptions: {
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first",
        client: apolloClient,
      },

      getCollectionByPath(items) {
        return items?.allPeople;
      },
    });

  const items = data?.allPeople.edges || [];
  const totalCount = data?.allPeople.totalCount || null;
  const mappedData = items.map(({ node }) => ({
    id: node.id,
    label: node.name,
    species: node.species?.name,
    home: node.homeworld.name,
    eyeColor: (
      <InlineLabel color={getColor(node.eyeColor)}>{node.eyeColor}</InlineLabel>
    ),
    tags: uniq([
      node.birthYear,
      ...(node.hairColor?.split(", ") || []),
      ...(node.skinColor?.split(", ") || []),
      ...node.homeworld.climates,
      ...node.homeworld.terrains,
    ]),
    homePopulation: node.homeworld.population?.toLocaleString(),
    lastActivity: new Date(node.created),
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
      onLoadMore={nextPage}
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
        placeholder="Search characters..."
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
        message="Character list is looking empty"
        action={
          <Button
            label="New character"
            onClick={() => alert("Create a new character")}
          />
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
    if (loadingInitialContent) return "initial";
    if (loadingNextPage) return "loadingMore";

    return args.loadingState;
  }
};

export const Basic: StoryObj<typeof DataList> = {
  render: () => (
    <DataListStory
      title="All characters"
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

  function removeAllFilters() {
    setSelectedFilters(selectedFiltersInitialState);
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

  const LIST_QUERY1 = useMemo(
    () => gql`
      query ListQuery($cursor: String) {
        allPeople(first: 10, after: $cursor) {
          edges {
            node {
              created
              id
              name
              eyeColor
              hairColor
              skinColor
              birthYear
              homeworld {
                name
                climates
                id
                population
                terrains
              }
              species {
                name
                id
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    `,
    [],
  );

  const apolloClient1 = useMemo(
    () =>
      new ApolloClient({
        uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
        cache: new InMemoryCache(),
      }),
    [],
  );

  const { data } = useCollectionQuery<ListQueryType>({
    query: LIST_QUERY1,
    queryOptions: {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      client: apolloClient1,
    },

    getCollectionByPath(items) {
      return items?.allPeople;
    },
  });

  const items = data?.allPeople.edges || [];
  const totalCount = data?.allPeople.totalCount || null;

  const mappedData = items.map(({ node }) => ({
    id: node.id,
    label: node.name,
    species: node.species?.name,
    home: node.homeworld.name,
    eyeColor: node.eyeColor,
    tags: uniq([
      node.birthYear,
      ...(node.hairColor?.split(", ") || []),
      ...(node.skinColor?.split(", ") || []),
      ...node.homeworld.climates,
      ...node.homeworld.terrains,
    ]),
    homePopulation: node.homeworld.population?.toLocaleString(),
    lastActivity: new Date(node.created),
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
          onClick={removeAllFilters}
        />
      </DataList.Filters>

      <DataList.Search
        onSearch={search => console.log(search)}
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
  title: "All characters",
  headerVisibility: { xs: false, md: true },
  headers: {
    label: "Name",
    home: "Home world",
    tags: "Attributes",
    eyeColor: "Eye color",
  },
};
ClearAllFilters.parameters = {
  previewTabs: {
    code: {
      hidden: false,
      extraImports: {
        lodash: ["uniq"],
        "@apollo/client": ["gql", "ApolloClient", "InMemoryCache"],
        "@jobber/hooks/useCollectionQuery": ["useCollectionQuery"],
      },
    },
  },
};

export const EmptyState: StoryObj<typeof DataList> = {
  render: () => (
    <DataListStory
      data={[]}
      title="All characters"
      headerVisibility={{ xs: false, md: true }}
    />
  ),
};
