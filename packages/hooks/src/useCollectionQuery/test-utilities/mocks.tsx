import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import React from "react";
import { v1 as uuidv1 } from "uuid";
import { LIST_QUERY, SUBSCRIPTION_QUERY } from "./queries";

export function wrapper(mocks: MockedResponse[]) {
  function ApolloMockedProvider({
    children,
  }: {
    children: React.ReactElement;
  }) {
    return (
      <MockedProvider addTypename={true} mocks={mocks}>
        {children}
      </MockedProvider>
    );
  }

  return ApolloMockedProvider as React.FunctionComponent;
}

let listQueryHasNextPage = true;
export const listQueryResponseMock = jest.fn(id => {
  return {
    data: {
      conversation: {
        __typename: "Conversation",
        smsMessages: {
          __typename: "SMSMessageConnection",
          edges: [
            {
              __typename: "SMSMessageEdge",
              node: {
                __typename: "SMSMessage",
                id: id || uuidv1(),
              },
            },
          ],
          nodes: [
            {
              __typename: "SMSMessage",
              id: id || uuidv1(),
            },
          ],
          pageInfo: {
            __typename: "PageInfo",
            endCursor: "MZ",
            hasNextPage: listQueryHasNextPage,
          },
          totalCount: 42,
        },
      },
    },
  };
});

export const subscriptionQueryMock = jest.fn(id => {
  return {
    data: {
      conversationMessage: {
        __typename: "conversationMessage",
        id: "other stuff",
        smsMessage: {
          __typename: "SMSMessageData",
          id: id,
        },
      },
    },
  };
});

export function buildListRequestMock(
  id?: string | undefined,
  searchTerm?: string | undefined,
) {
  return {
    request: {
      query: LIST_QUERY,
      variables: { searchTerm: searchTerm },
    },
    result: () => listQueryResponseMock(id),
  };
}

export function buildSubscriptionRequestMock(id?: string | undefined) {
  return {
    request: {
      query: SUBSCRIPTION_QUERY,
    },
    result: () => subscriptionQueryMock(id),
    delay: 100,
  };
}

export function buildListRequestMockForNextPage(id?: string | undefined) {
  return {
    request: {
      query: LIST_QUERY,
      variables: { cursor: "MZ" },
    },
    result: () => listQueryResponseMock(id),
  };
}

export function setListQueryMockHasNextPage(hasNextPage: boolean) {
  listQueryHasNextPage = hasNextPage;
}
