import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export interface ListQueryType {
  allPlanets: {
    __typename?: "PlanetsConnection";
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: Array<{
      __typename?: "PlanetsEdge";
      node: {
        __typename?: "Planet";
        name: "string";
        id: "string";
      };
      cursor: string;
    }>;
    totalCount: number;
  };
}

export const LIST_QUERY = gql`
  query ListQuery($cursor: String) {
    allPlanets(first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          name
          id
        }
        cursor
      }
      totalCount
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
