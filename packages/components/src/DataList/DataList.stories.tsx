// TODO: Move this to docs folder once we write the docs
import React from "react";
// Temporary fix for initial build of DataList
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCollectionQuery } from "@jobber/hooks/useCollectionQuery";
import { DataList } from "./DataList";
import { DataListItemType } from "./DataList.types";
import {
  LIST_QUERY,
  ListQueryType,
  apolloClient,
  // getLoadingState,
} from "./storyUtils";
import { Grid } from "../Grid";

export default {
  title: "Components/Lists and Tables/DataList/Web",
  component: DataList,
  parameters: {
    viewMode: "story",
  },
  // Comment this out to make it show up in storybook
  // excludeStories: ["Basic", "EmptyState"],
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
    // nextPage,
    // loadingRefresh,
    // loadingNextPage,
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

  /* For when we start creating a loading state */
  // const { loading } = getLoadingState(
  //   loadingInitialContent,
  //   loadingRefresh,
  //   loadingNextPage,
  // );

  const items = data?.allPeople.edges || [];
  const mappedData = items.map(({ node }) => ({
    label: node.name,
    home: node.homeworld.name,
    tags: [
      node.gender,
      node.hairColor?.split(", "),
      node.skinColor?.split(", "),
    ],
    homePopulation: node.homeworld.population?.toLocaleString(),
    created: new Date(node.created),
  }));

  return (
    <DataList
      loading={loadingInitialContent}
      totalCount={null}
      {...args}
      data={(args.data as typeof mappedData) || mappedData}
      headers={{
        label: "Name",
        home: "Home world",
        tags: "Attributes",
        homePopulation: "Home world population",
        created: "Created",
      }}
    >
      <DataList.Layout>
        {(item: DataListItemType<typeof mappedData>) => (
          <Grid alignItems="center">
            <Grid.Cell size={{ xs: 5 }}>
              <Grid alignItems="center">
                <Grid.Cell size={{ xs: 6 }}>{item.label}</Grid.Cell>
                <Grid.Cell size={{ xs: 6 }}>{item.home}</Grid.Cell>
              </Grid>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 2 }}>{item.homePopulation}</Grid.Cell>
            <Grid.Cell size={{ xs: 3 }}>{item.tags}</Grid.Cell>
            <Grid.Cell size={{ xs: 2 }}>{item.created}</Grid.Cell>
          </Grid>
        )}
      </DataList.Layout>

      <DataList.EmptyState
        message="This is empty"
        action={{
          label: "Do a thing",
          onClick: () => alert("A thing has been done"),
        }}
      />
    </DataList>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  title: "All Clients",
  loading: false,
};
export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
};
