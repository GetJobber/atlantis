import { act, renderHook } from "@testing-library/react-hooks";
import { useCollectionQuery } from "./useCollectionQuery";
import {
  LIST_QUERY,
  ListQueryType,
  SUBSCRIPTION_QUERY,
  SubscriptionQueryType,
  buildListRequestMock,
  buildListRequestMockForNextPage,
  buildSubscriptionRequestMock,
  listQueryResponseMock,
  setListQueryMockHasNextPage,
  subscriptionQueryMock,
  wait,
  wrapper,
} from "./__mocks__";

beforeEach(() => {
  setListQueryMockHasNextPage(true);
  listQueryResponseMock.mockClear();
  subscriptionQueryMock.mockClear();
});

function useCollectionQueryHook() {
  return useCollectionQuery<ListQueryType>({
    query: LIST_QUERY,
    getCollectionByPath(data) {
      return data?.conversation?.smsMessages;
    },
  });
}

function useCollectionQueryHookWithSubscription() {
  return useCollectionQuery<ListQueryType, SubscriptionQueryType>({
    query: LIST_QUERY,
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

describe("when useCollectionQuery is first called", () => {
  describe("when nextPage is called while it's still loading initial content", () => {
    it("should not trigger a the next page to be fetched", async () => {
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMockForNextPage(),
        ]),
      });

      act(() => {
        result.current.nextPage();
      });

      await act(wait);
      expect(listQueryResponseMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("when refresh is called while it's still loading initial content", () => {
    it("should not trigger a refresh", async () => {
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([buildListRequestMock(), buildListRequestMock()]),
      });

      act(() => {
        result.current.refresh();
      });

      await act(wait);
      expect(listQueryResponseMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("when there is no error", () => {
    it("should update data", async () => {
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([buildListRequestMock()]),
      });

      await act(wait);

      expect(
        result.current.data?.conversation?.smsMessages?.edges?.length,
      ).toBe(1);
    });

    it("should set initialLoading while loading data", async () => {
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([buildListRequestMock()]),
      });

      expect(result.current.loadingInitialContent).toBe(true);

      await act(wait);
    });
  });
});

describe("#nextPage", () => {
  describe("when nextPage is called while it's still loadingNextPage", () => {
    it("should not trigger a nextPage", async () => {
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMockForNextPage(),
          buildListRequestMockForNextPage(),
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
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMock(),
          buildListRequestMockForNextPage(),
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

      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMockForNextPage(),
        ]),
      });

      await act(wait);
      act(() => {
        result.current.nextPage();
      });

      await act(wait);

      expect(listQueryResponseMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("when there is no error", () => {
    it("should update data", async () => {
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMockForNextPage(),
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
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMockForNextPage(),
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
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMock(),
          buildListRequestMock(),
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

      expect(listQueryResponseMock).toHaveBeenCalledTimes(2);
    });
  });

  describe("when nextPage is called while it's still loadingRefresh", () => {
    it("should not trigger a nextPage", async () => {
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([
          buildListRequestMock(),
          buildListRequestMock(),
          buildListRequestMockForNextPage(),
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
      const { result } = renderHook(() => useCollectionQueryHook(), {
        wrapper: wrapper([buildListRequestMock(), buildListRequestMock()]),
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
      const { result, waitForNextUpdate } = renderHook(
        () => useCollectionQueryHookWithSubscription(),
        {
          wrapper: wrapper([
            buildListRequestMock("1"),
            buildSubscriptionRequestMock("2"),
          ]),
        },
      );

      // Wait for initial load
      await act(waitForNextUpdate);

      // Wait for subscription
      await act(waitForNextUpdate);

      expect(
        result?.current?.data?.conversation?.smsMessages?.edges?.length,
      ).toBe(2);
    });
  });

  describe("when hook receives upate from item already in collection", () => {
    it("it should return the existing collection", async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useCollectionQueryHookWithSubscription(),
        {
          wrapper: wrapper([
            buildListRequestMock("1"),
            buildSubscriptionRequestMock("1"),
          ]),
        },
      );

      // Wait for initial load
      await act(waitForNextUpdate);

      // Wait for subscription
      await act(() => wait(200));

      expect(
        result?.current?.data?.conversation?.smsMessages?.edges?.length,
      ).toBe(1);
    });
  });
});
