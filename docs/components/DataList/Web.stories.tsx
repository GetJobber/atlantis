import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import uniq from "lodash/uniq";
import { useLazyQuery } from "@apollo/client";
import { useCollectionQuery } from "@jobber/hooks/useCollectionQuery";
import {
  DataList,
  DataListItemType,
  DataListSorting,
} from "@jobber/components/DataList";
import { Grid } from "@jobber/components/Grid";
import { InlineLabel, InlineLabelColors } from "@jobber/components/InlineLabel";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { DatePicker } from "@jobber/components/DatePicker";
import {
  LAZY_LIST_IDS_QUERY,
  LIST_QUERY,
  ListIDsQueryType,
  ListQueryType,
  apolloClient,
} from "./storyUtils";

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
  const [selected, setSelected] = useState<string[]>([]);

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

  const [getIDs, { loading: loadingIDs }] = useLazyQuery<ListIDsQueryType>(
    LAZY_LIST_IDS_QUERY,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      client: apolloClient,
    },
  );

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

  const [sortingState, setSortingState] = useState<DataListSorting | undefined>(
    undefined,
  );

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
      selected={selected}
      onSelect={setSelected}
      onSelectAll={handleSelectAll}
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

      <DataList.ItemActions onClick={item => console.log(item)}>
        <DataList.Action icon="edit" label="Edit" onClick={handleActionClick} />
        <DataList.Action
          icon="sendMessage"
          label="Message"
          onClick={handleActionClick}
        />
        <DataList.Action label="Create new..." onClick={handleActionClick} />
        <DataList.Action label="Add attribute..." onClick={handleActionClick} />
        <DataList.Action
          icon="trash"
          label="Delete"
          destructive={true}
          onClick={handleActionClick}
        />
      </DataList.ItemActions>

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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto max-content",
                gap: 8,
                alignItems: "center",
              }}
            >
              {item.created}
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
    alert(`You clicked the action for ${item.label}`);
  }

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
    if (loadingNextPage || loadingIDs) return "loadingMore";
    return args.loadingState;
  }

  async function handleSelectAll() {
    if (totalCount === selected.length) return setSelected([]);

    const idsQuery = await getIDs();
    const edges = idsQuery?.data?.allPeople?.edges;
    if (!edges) return;

    const ids = edges.map(({ node }) => node.id);
    setSelected(ids);
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
