import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import uniq from "lodash/uniq";
import { useCollectionQuery } from "@jobber/hooks/useCollectionQuery";
import {
  DataList,
  DataListItemType,
  DataListSortingState,
} from "@jobber/components/DataList";
import { Grid } from "@jobber/components/Grid";
import { InlineLabel, InlineLabelColors } from "@jobber/components/InlineLabel";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { DatePicker } from "@jobber/components/DatePicker";
import { LIST_QUERY, ListQueryType, apolloClient } from "./storyUtils";

export default {
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
} as ComponentMeta<typeof DataList>;

const Template: ComponentStory<typeof DataList> = args => {
  const {
    data,
    /* See useCollectionQuery for example on how to load more */
    // refresh,
    nextPage,
    // loadingRefresh,
    loadingNextPage,
    loadingInitialContent,
  } = useCollectionQuery<ListQueryType>({
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

  const [sortingState, setSortingState] = useState<DataListSortingState>({
    key: "label",
    direction: "asc",
  });

  const items = data?.allPeople.edges || [];
  const totalCount = data?.allPeople.totalCount || null;
  const mappedData = items.map(({ node }) => ({
    id: node.id,
    label: node.name,
    species: node.species?.name,
    home: node.homeworld.name,
    gender: (
      <InlineLabel color={getColor(node.gender)}>{node.gender}</InlineLabel>
    ),
    tags: uniq([
      node.birthYear,
      ...(node.hairColor?.split(", ") || []),
      ...(node.skinColor?.split(", ") || []),
      ...node.homeworld.climates,
      ...node.homeworld.terrains,
    ]),
    homePopulation: node.homeworld.population?.toLocaleString(),
    created: new Date(node.created),
  }));

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
        gender: "Gender",
        created: "Created",
      }}
      onLoadMore={nextPage}
      sorting={{
        state: sortingState,
        onSort: sorting => {
          console.log(sorting);
          setSortingState(sorting);
        },
        sortable: ["label", "home"],
      }}
    >
      <DataList.Filters>
        <Button
          label="Filter gender"
          variation="subtle"
          icon="add"
          iconOnRight={true}
          onClick={() => alert("Run filter by gender query")}
        />
        <Button
          label="Filter attributes"
          variation="subtle"
          icon="add"
          iconOnRight={true}
          onClick={() => alert("Run filter by attributes query")}
        />
        <DatePicker
          onChange={date => alert(`Filter by created date: ${date}`)}
          activator={
            <Button
              icon="calendar"
              ariaLabel="Select date"
              variation="subtle"
            />
          }
        />
      </DataList.Filters>

      <DataList.Search
        onSearch={search => console.log(search)}
        placeholder="Search characters..."
      />

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
            <Grid.Cell size={{ xs: 1 }}>{item.gender}</Grid.Cell>
            <Grid.Cell size={{ xs: 2 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  textAlign: "right",
                }}
              >
                {item.created}
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
              {item.gender}
            </div>
            {item.tags}
            {item.created}
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

  function getColor(gender: string): InlineLabelColors | undefined {
    switch (gender) {
      case "male":
        return "lightBlue";
      case "female":
        return "pink";
      default:
        return "greyBlue";
    }
  }

  function getLoadingState() {
    if (loadingInitialContent) return "initial";
    if (loadingNextPage) return "loadingMore";
    return args.loadingState;
  }
};

export const Basic = Template.bind({});
Basic.args = {
  title: "All Characters",
  headerVisibility: { xs: false, md: true },
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
  title: "All Characters",
  headerVisibility: { xs: false, md: true },
};
