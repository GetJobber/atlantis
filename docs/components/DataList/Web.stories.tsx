import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import uniq from "lodash/uniq";
import { useCollectionQuery } from "@jobber/hooks/useCollectionQuery";
import { DataList, DataListItemType } from "@jobber/components/DataList";
import { Grid } from "@jobber/components/Grid";
import { InlineLabel, InlineLabelColors } from "@jobber/components/InlineLabel";
import { Content } from "@jobber/components/Content";
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
      loading={args.loading || loadingInitialContent}
      totalCount={totalCount}
      data={(args.data as typeof mappedData) || mappedData}
      headers={{
        label: "Name",
        home: "Home world",
        tags: "Attributes",
        gender: "Gender",
        created: "Created",
      }}
    >
      <DataList.Layout size="md">
        {(item: DataListItemType<typeof mappedData>) => (
          <Grid alignItems="center">
            <Grid.Cell size={{ xs: 5 }}>
              <Grid alignItems="center">
                <Grid.Cell size={{ xs: 8 }}>
                  {item.label}
                  {item.species}
                </Grid.Cell>
                <Grid.Cell size={{ xs: 4 }}>{item.home}</Grid.Cell>
              </Grid>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 4 }}>{item.tags}</Grid.Cell>
            <Grid.Cell size={{ xs: 1 }}>{item.gender}</Grid.Cell>
            <Grid.Cell size={{ xs: 2 }}>{item.created}</Grid.Cell>
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
        message="Character list is looking empty"
        action={{
          label: "New Character",
          onClick: () => alert("New client triggered"),
        }}
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
