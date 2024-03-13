import { gql } from "@apollo/client";

export const LIST_QUERY = gql`
  query ConversationMessages($cursor: string, $searchTerm: string) {
    conversation(id: "MQ==") {
      smsMessages(first: 1, after: $cursor, searchTerm: $searchTerm) {
        edges {
          node {
            __typename
            id
          }
        }
        nodes {
          __typename
          id
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const LIST_QUERY_WITH_TOTAL_COUNT = gql`
  query ConversationMessages($cursor: string, $searchTerm: string) {
    conversation(id: "MQ==") {
      smsMessages(first: 1, after: $cursor, searchTerm: $searchTerm) {
        edges {
          node {
            __typename
            id
          }
        }
        nodes {
          __typename
          id
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  }
`;

export interface ListQueryType {
  __typename?: "Query";
  conversation?: {
    __typename?: "Conversation";
    smsMessages: {
      edges: Array<{
        __typename?: "SMSMessageConnection";
        node: {
          __typename?: "SMSMessage";
          id: string;
        };
        cursor: string;
      }>;
      nodes: Array<{
        __typename?: "SMSMessage";
        id: string;
      }>;
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
      totalCount?: number;
    };
  };
}

export const SUBSCRIPTION_QUERY = gql`
  subscription ConversationMessage($conversationId: EncodedId!) {
    conversationMessage(conversationId: $conversationId) {
      smsMessage {
        __typename
        id
      }
    }
  }
`;

export interface SubscriptionQueryType {
  __typename?: "Subscription";
  conversationMessage?: {
    smsMessage: {
      __typename?: "SMSMessage";
      id: string;
    };
  };
}
