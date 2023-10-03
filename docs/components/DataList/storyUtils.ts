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
        birthYear: string;
        homeworld: {
          id: string;
          name: string;
          population: number;
          climates: string[];
          terrains: string[];
        };
        species: {
          name: string;
          id: string;
        } | null;
      };
      cursor: string;
    }>;
    totalCount?: number;
  };
}

export interface ListIDsQueryType {
  allPeople: {
    __typename?: "PeopleConnection";
    edges: Array<{
      __typename?: "PeopleEdge";
      node: {
        id: string;
      };
    }>;
  };
}

export type ListEdges = ListQueryType["allPeople"]["edges"];
export type ListNode = ListEdges[number]["node"];

export const LIST_QUERY = gql`
  query ListQuery($cursor: String) {
    allPeople(first: 10, after: $cursor) {
      edges {
        node {
          created
          id
          name
          gender
          hairColor
          skinColor
          birthYear
          homeworld {
            name
            climates
            id
            population
            terrains
          }
          species {
            name
            id
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const LAZY_LIST_IDS_QUERY = gql`
  query ListIDQuery {
    allPeople {
      edges {
        node {
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
