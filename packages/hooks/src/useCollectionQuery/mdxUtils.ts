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
    totalCount?: number;
  };
}

export const LIST_QUERY = gql`
  query ListQuery($cursor: String) {
    allPlanets(first: 4, after: $cursor) {
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

export const propsList = [
  {
    id: 0,
    title: "query",
    caption: "The graphQL query that fetches the collection",
    value: "DocumentNode",
  },
  {
    id: 1,
    title: "queryOptions",
    caption:
      "A list of options for us to pass into the apollo `useQuery` hook. \
       Click to see more query options!",
    url: "https://www.apollographql.com/docs/react/data/queries/#options",
    value: "QueryHookOptions",
  },
  {
    id: 2,
    title: "getCollectionByPath",
    caption:
      "A function that returns the location where the \
      {@link Collection} is located. The collection is the part of the \
      result that needs to be paginated.",
    value: "GetCollectionByPathFunction<TQuery>",
  },
  {
    id: 3,
    title: "subscription (optional)",
    caption:
      "A list of subscription options if \
      you want to create a GraphQL subscription to listen for more content.",
    value: "SubscriptionProps",
  },
];

export const subscriptionPropsList = [
  {
    id: 0,
    title: "document",
    caption:
      "The graphQL subscription that listens for more data. This query \
      should return a single Node that matches the data structure in \
      getCollectionByPath<TQuery>(...).edges.node and \
      getCollectionByPath<TQuery>(...).nodes",
    value: "DocumentNode",
  },
  {
    id: 1,
    title: "options",
    caption:
      " A list of variables to pass into the apollo `subscribeToMore` function.",
    value: "SubscribeToMoreOptions<TSubscription>",
  },
  {
    id: 2,
    title: "getNodeByPath",
    caption:
      " A function that returns the location where the `Node` is \
      located on the TSubscription object. It should return a single Node \
      that matches the data structure in \
      getCollectionByPath<TQuery>(...).edges.node and \
      getCollectionByPath<TQuery>(...).nodes",
    value: "GetNodeByPath<TSubscription>",
  },
];

export const returnValues = [
  {
    id: 0,
    title: "data",
    caption: "The payload returned from the query",
    value: "ListQueryType | undefined",
  },
  {
    id: 1,
    title: "error",
    caption: "Any errors returned from the query",
    value: "ApolloError | undefined",
  },
  {
    id: 2,
    title: "refresh",
    caption: "A funtion that enables you to re-execute the query",
    value: "() => void",
  },
  {
    id: 3,
    title: "nextPage",
    caption:
      "A funtion that helps you fetch the next set of results for a paginated list",
    value: "() => void",
  },
  {
    id: 4,
    title: "loadingRefresh",
    caption: "An indicator that a refresh is in progress",
    value: "boolean",
  },
  {
    id: 5,
    title: "loadingNextPage",
    caption: "An indicator that a fetch more is in progress",
    value: "boolean",
  },
  {
    id: 6,
    title: "loadingInitialContent",
    caption: "An indicator that the initial content is being fetched",
    value: "boolean",
  },
];
