import { ApolloClient, InMemoryCache } from "@apollo/client";

export interface ListQueryType {
  data: {
    __typename?: "Root";
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
        };
        cursor: string;
      }>;
      totalCount: number;
    };
  };
}

export const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache(),
});
