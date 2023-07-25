// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export interface ListQueryType {
  allPeople: {
    __typename?: "PeopleConnection";
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: Array<{
      __typename?: "PeopleEdge";
      node: {
        created: string;
        id: string;
        name: string;
        gender: string;
        hairColor: string;
        skinColor: string;
        homeworld: {
          name: string;
          id: string;
          population: number;
        };
      };
      cursor: string;
    }>;
    totalCount?: number;
  };
}

export type ListEdges = ListQueryType["allPeople"]["edges"];
export type ListNode = ListEdges[number]["node"];

export const LIST_QUERY = gql`
  query ListQuery($cursor: String) {
    allPeople(after: $cursor) {
      edges {
        node {
          created
          id
          name
          gender
          hairColor
          skinColor
          homeworld {
            name
            id
            population
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const apolloClient = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache(),
});

interface LoadingState {
  loadingStatus: string;
  loading: boolean;
}

export function getLoadingState(
  loadingInitialContent: boolean,
  loadingRefresh: boolean,
  loadingNextPage: boolean,
): LoadingState {
  if (loadingInitialContent) {
    return {
      loading: true,
      loadingStatus: "Initial Loading",
    };
  }
  if (loadingRefresh) {
    return {
      loading: true,
      loadingStatus: "Refreshing",
    };
  }
  if (loadingNextPage) {
    return {
      loading: true,
      loadingStatus: "Fetching More",
    };
  }
  return {
    loading: false,
    loadingStatus: "Loaded",
  };
}
