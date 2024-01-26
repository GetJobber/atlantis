import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

interface ListQueryType {
  characters: {
    results: {
      name: string;
    }[];
  };
}
const LIST_QUERY = gql`
  query ListQuery($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
      }
    }
  }
`;
const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export function useFakeQuery(searchTerm: string) {
  return useQuery<ListQueryType>(LIST_QUERY, {
    variables: {
      filter: { name: searchTerm },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    client: apolloClient,
  });
}
