import { DocumentNode } from "@apollo/client";
import { act, renderHook } from "@testing-library/react";
import { useCollectionQuery } from "./useCollectionQuery";
import {
  LIST_QUERY,
  LIST_QUERY_WITH_TOTAL_COUNT,
  ListQueryType,
  SUBSCRIPTION_QUERY,
  SubscriptionQueryType,
  buildListRequestMock,
  buildListRequestMockForNextPage,
  buildSubscriptionRequestMock,
  listQueryResponseMock,
  listQueryWithTotalCountResponseMock,
  setListQueryMockHasNextPage,
  subscriptionQueryMock,
  wait,
  wrapper,
} from "./test-utilities";

beforeEach(() => {
  setListQueryMockHasNextPage(true);
  listQueryResponseMock.mockClear();
  subscriptionQueryMock.mockClear();
});

function useCollectionQueryHook(query: DocumentNode) {
  return useCollectionQuery<ListQueryType>({
    query: query,
    getCollectionByPath(data) {
      return data?.conversation?.smsMessages;
    },
  });
}

function useCollectionQueryHookWithSubscription(query: DocumentNode) {
  return useCollectionQuery<ListQueryType, SubscriptionQueryType>({
    query: query,
    getCollectionByPath(data) {
      return data?.conversation?.smsMessages;
    },
    subscription: {
      document: SUBSCRIPTION_QUERY,
      getNodeByPath(conversationData) {
        return conversationData?.conversationMessage?.smsMessage;
      },
    },
  });
}

function useCollectionQueryHookWithSubscriptionAndSearch(
  query: DocumentNode,
  searchTerm: string,
) {
  return useCollectionQuery<ListQueryType, SubscriptionQueryType>({
    query: query,
    queryOptions: {
      variables: {
        searchTerm: searchTerm,
      },
    },
    getCollectionByPath(data) {
      return data?.conversation?.smsMessages;
    },
    subscription: {
      document: SUBSCRIPTION_QUERY,
      getNodeByPath(conversationData) {
        return conversationData?.conversationMessage?.smsMessage;
      },
    },
  });
}

describe("useCollectionQuery", () => {
  describe.each`
    testCase                 | query                          | responseMock
    ${"excludes totalCount"} | ${LIST_QUERY}                  | ${listQueryResponseMock}
    ${"includes totalCount"} | ${LIST_QUERY_WITH_TOTAL_COUNT} | ${listQueryWithTotalCountResponseMock}
  `("when the query run $testCase", ({ query, responseMock }) => {
    describe("when useCollectionQuery is first called", () => {
      describe("when nextPage is called while it's still loading initial content", () => {
        it("should not trigger a the next page to be fetched", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
            ]),
          });

          act(() => {
            result.current.nextPage();
          });

          await act(wait);
          expect(responseMock).toHaveBeenCalledTimes(1);
        });
      });

      describe("when refresh is called while it's still loading initial content", () => {
        it("should not trigger a refresh", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMock(query, responseMock),
            ]),
          });

          act(() => {
            result.current.refresh();
          });

          await act(wait);
          expect(responseMock).toHaveBeenCalledTimes(1);
        });
      });

      describe("when there is no error", () => {
        it("should update data", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([buildListRequestMock(query, responseMock)]),
          });

          await act(wait);

          expect(
            result.current.data?.conversation?.smsMessages?.edges?.length,
          ).toBe(1);
        });

        it("should set initialLoading while loading data", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([buildListRequestMock(query, responseMock)]),
          });

          expect(result.current.loadingInitialContent).toBe(true);

          await act(wait);
        });
      });
    });

    describe("#nextPage", () => {
      describe("when nextPage is called while it's still loadingNextPage", () => {
        it("should not trigger a nextPage", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
            ]),
          });

          await act(wait);
          act(() => {
            result.current.nextPage();
          });

          act(() => {
            result.current.nextPage();
          });

          await act(wait);

          expect(
            result.current.data?.conversation?.smsMessages?.edges?.length,
          ).toBe(2);
        });
      });

      describe("when refresh is called while it's still loadingNextPage", () => {
        it("should trigger a refresh", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMock(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
            ]),
          });

          await act(wait);

          act(() => {
            result.current.nextPage();
          });

          act(() => {
            result.current.refresh();
          });

          expect(result.current.loadingRefresh).toBe(true);

          await act(wait);
        });
      });

      describe("when there is no more data to fetch", () => {
        it("should not fetch more data", async () => {
          setListQueryMockHasNextPage(false);

          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
            ]),
          });

          await act(wait);
          act(() => {
            result.current.nextPage();
          });

          await act(wait);

          expect(responseMock).toHaveBeenCalledTimes(1);
        });
      });

      describe("when there is no error", () => {
        it("should update data", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
            ]),
          });

          await act(wait);
          act(() => {
            result.current.nextPage();
          });

          await act(wait);

          expect(
            result.current.data?.conversation?.smsMessages?.edges?.length,
          ).toBe(2);
        });

        it("should set loadingNextPage while loading data", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
            ]),
          });

          await act(wait);

          act(() => {
            result.current.nextPage();
          });

          expect(result.current.loadingNextPage).toBe(true);

          await act(wait);
        });
      });
    });

    describe("#refresh", () => {
      describe("when refresh is called while it's still loadingRefresh", () => {
        it("should not trigger a refresh", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMock(query, responseMock),
              buildListRequestMock(query, responseMock),
            ]),
          });

          await act(wait);

          act(() => {
            result.current.refresh();
          });

          act(() => {
            result.current.refresh();
          });

          await act(wait);

          expect(responseMock).toHaveBeenCalledTimes(2);
        });
      });

      describe("when nextPage is called while it's still loadingRefresh", () => {
        it("should not trigger a nextPage", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMock(query, responseMock),
              buildListRequestMockForNextPage(query, responseMock),
            ]),
          });

          await act(wait);

          act(() => {
            result.current.refresh();
          });

          act(() => {
            result.current.nextPage();
          });

          expect(result.current.loadingNextPage).toBe(false);

          await act(wait);
        });
      });

      describe("when there is no error", () => {
        it("should set loadingRefresh while loading data", async () => {
          const { result } = renderHook(() => useCollectionQueryHook(query), {
            wrapper: wrapper([
              buildListRequestMock(query, responseMock),
              buildListRequestMock(query, responseMock),
            ]),
          });

          await act(wait);

          act(() => {
            result.current.refresh();
          });

          expect(result.current.loadingRefresh).toBe(true);

          await act(wait);
        });
      });
    });

    describe("#subscribeToMore", () => {
      describe("when hook receives update from item not in collection", () => {
        it("it should add new item to collection", async () => {
          const { result, rerender } = renderHook(
            () => useCollectionQueryHookWithSubscription(query),
            {
              wrapper: wrapper([
                buildListRequestMock(query, responseMock, "1"),
                buildSubscriptionRequestMock("2"),
              ]),
            },
          );

          // Wait for initial load
          await act(() => {
            rerender();
          });

          // Wait for subscription
          await act(() => wait(200));
          await act(() => {
            rerender();
          });

          expect(
            result?.current?.data?.conversation?.smsMessages?.edges?.length,
          ).toBe(2);
        });
      });

      describe("when hook receives update from item already in collection", () => {
        it("it should return the existing collection", async () => {
          const { result, rerender } = renderHook(
            () => useCollectionQueryHookWithSubscription(query),
            {
              wrapper: wrapper([
                buildListRequestMock(query, responseMock, "1"),
                buildSubscriptionRequestMock("1"),
              ]),
            },
          );

          // Wait for initial load
          await act(rerender);

          // Wait for subscription
          await act(() => wait(200));

          expect(
            result?.current?.data?.conversation?.smsMessages?.edges?.length,
          ).toBe(1);
        });
      });

      describe("when hook receives `update` but is currently searching a collection", () => {
        it("should return the existing collection without adding the subscribed content", async () => {
          const searchTerm = "FooBar";
          const { result, rerender } = renderHook(
            () =>
              useCollectionQueryHookWithSubscriptionAndSearch(
                query,
                searchTerm,
              ),
            {
              wrapper: wrapper([
                buildListRequestMock(query, responseMock, "1", searchTerm),
                buildSubscriptionRequestMock("1"),
              ]),
            },
          );

          // Wait for initial load
          await act(rerender);

          // Wait for subscription
          await act(() => wait(200));

          expect(
            result?.current?.data?.conversation?.smsMessages?.edges?.length,
          ).toBe(1);
        });
      });
    });
  });
});
