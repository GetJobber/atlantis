import gql from "graphql-tag";

export const LIST_QUERY = gql`
  query ConversationMessages($cursor: string) {
    conversation(id: "MQ==") {
      smsMessages(first: 1, after: $cursor) {
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
      totalCount: number;
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
