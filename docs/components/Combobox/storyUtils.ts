import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export interface ListQueryType {
  characters: {
    results: {
      name: string;
    }[];
  };
}

export const LIST_QUERY = gql`
  query ListQuery($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
      }
    }
  }
`;

export const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});
