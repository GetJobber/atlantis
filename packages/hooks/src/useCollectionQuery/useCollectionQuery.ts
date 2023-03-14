import {
  ApolloError,
  DocumentNode,
  QueryHookOptions,
  SubscribeToMoreOptions,
  useQuery,
} from "@apollo/client";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { config } from "@jobber/formatters";
import { Node, uniqueNodes } from "./uniqueNodes";
import { Edge, createEdge, uniqueEdges } from "./uniqueEdges";
import { useIsMounted } from "../useIsMounted";

interface UseCollectionQueryArguments<TQuery, TSubscription> {
  /**
   * The graphQL query that fetches the collection
   */
  query: DocumentNode;

  /**
   * A list of options for us to pass into the apollo `useQuery` hook
   */
  queryOptions?: QueryHookOptions<TQuery>;

  /**
   * A function that returns the location where the {@link Collection} is located.
   *
   * The collection is the part of the result that needs to be paginated.
   */
  getCollectionByPath: GetCollectionByPathFunction<TQuery>;

  /**
   *  A list of subscription options if you want to create a GraphQL
   *  subscription to listen for more content.
   */
  subscription?: ListSubscription<TSubscription>;
}

interface ListSubscription<TSubscription> {
  /**
   * The graphQL subscription that listens for more data. This query should
   * return a single Node that matches the data structure in
   * `getCollectionByPath<TQuery>(...).edges.node` and
   * `getCollectionByPath<TQuery>(...).nodes
   */
  document: DocumentNode;

  /**
   * A list of variables to pass into the apollo `subscribeToMore` function.
   */
  options?: Pick<SubscribeToMoreOptions<TSubscription>, "variables">;

  /**
   * A function that returns the location where the `Node` is located on the
   * `TSubscription` object.
   *
   * It should return a single Node that matches the data structure in
   * `getCollectionByPath<TQuery>(...).edges.node` and
   * `getCollectionByPath<TQuery>(...).nodes
   */
  getNodeByPath: GetNodeByPath<TSubscription>;
}

interface Collection {
  edges?: Edge[];
  nodes?: Node[];
  pageInfo: {
    endCursor?: string | undefined;
    hasNextPage: boolean;
    [otherProperties: string]: unknown;
  };
  totalCount?: number;
  [otherProperties: string]: unknown;
}

interface CollectionQueryResult<TQuery> {
  data: TQuery | undefined;
  error: ApolloError | undefined;
  loadingRefresh: boolean;
  loadingNextPage: boolean;
  loadingInitialContent: boolean;
  refresh(): void;
  nextPage(): void;
}

type GetCollectionByPathFunction<TQuery> = (
  data: TQuery | undefined,
) => Collection | undefined;

type GetNodeByPath<TSubscription> = (
  data: TSubscription | undefined,
) => Node | undefined;

export function useCollectionQuery<TQuery, TSubscription = undefined>({
  query,
  queryOptions,
  getCollectionByPath,
  subscription,
}: UseCollectionQueryArguments<
  TQuery,
  TSubscription
>): CollectionQueryResult<TQuery> {
  const { data, loading, refetch, error, fetchMore, subscribeToMore } =
    useQuery<TQuery>(query, queryOptions);

  const isMounted = useIsMounted();
  const [loadingRefresh, setLoadingRefresh] = useState<boolean>(false);
  const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false);
  const loadingInitialContent = loading && !loadingRefresh && !loadingNextPage;
  const isSearching = !!queryOptions?.variables?.searchTerm;

  const refresh = useCallback(() => {
    if (loadingInitialContent || loadingRefresh) {
      return;
    }

    setLoadingRefresh(true);

    fetchMore({
      // a workaround fix for the error described in this post
      // https://github.com/apollographql/apollo-client/issues/7491#issuecomment-767985363
      // These changes can be reverted once we can update to version 3.4
      // (the current release candidate)
      variables: {},
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev,
    })
      .catch(err => config.errorNotifier("Refetch Error", err))
      .finally(() => {
        if (isMounted.current) {
          setLoadingRefresh(false);
        }
      });
  }, [
    loadingInitialContent,
    loadingRefresh,
    setLoadingRefresh,
    refetch,
    isMounted,
  ]);

  const nextPage = useCallback(() => {
    if (loadingInitialContent || loadingRefresh || loadingNextPage) {
      return;
    }

    const pageInfo = getCollectionByPath(data)?.pageInfo;

    if (!pageInfo || !pageInfo.hasNextPage) {
      return;
    }

    setLoadingNextPage(true);

    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) =>
        fetchMoreUpdateQueryHandler(prev, fetchMoreResult, getCollectionByPath),
    })
      .catch(err => config.errorNotifier("FetchMore Error", err))
      .finally(() => {
        if (isMounted.current) {
          setLoadingNextPage(false);
        }
      });
  }, [
    data,
    loadingInitialContent,
    loadingRefresh,
    fetchMore,
    loadingNextPage,
    setLoadingNextPage,
    getCollectionByPath,
    isMounted,
  ]);

  useEffect(
    () => {
      if (subscription == undefined) return;

      const subscriptionOptions = subscription.options || {};

      return subscribeToMore<TSubscription>({
        ...subscriptionOptions,
        document: subscription.document,
        updateQuery: (prev, { subscriptionData }) =>
          subscribeToMoreHandler(
            isSearching,
            prev,
            getCollectionByPath,
            subscriptionData?.data,
            subscription.getNodeByPath,
          ),
        onError: err => config.errorNotifier("Subscribe to More Error", err),
      });
    },
    // Disabling this linter so we can force this only run once. If we didn't
    // do this we would need to ensure subscription, subscribeToMore, and getNodeByPath
    // all use useCallback.
    [queryOptions?.variables?.searchTerm],
  );

  return {
    data,
    error,
    refresh,
    loadingRefresh,
    nextPage,
    loadingNextPage,
    loadingInitialContent,
  };
}

/**
 * The following method uses an `output` variable, and indirectly modifies it through the `outputCollection` variable.
 * This type of indirect modification is prone to bugs, but I couldn't think of a better way to write this code.
 *
 * Here's what I was balancing:
 * 1. We need to copy the structure of prev to ensure that when we're combining two objects, we're not losing properties
 * 2. We need to extract a key from an unknown path that's given to us by getCollectionByPath and then we need to modify
 *    that, and ensure that it's properly set on the cloned output object.
 * 3. We want to keep the interface to this hook as simple and easy to use as possible
 *
 * The alternative approaches that were rejected:
 * 1. We replace the getCollectionByPath with a keyPath string. (Eg. "data.conversation.message") and then we use lodash
 *    `get` and `set` which should remove all the object manipulation. But, this approach loses us the type safety that
 *    getCollectionByPath gives us
 * 2. We could add a setCollection function to the list of arguments for this hook. This leaves us with type safety but
 *    makes the `useCollectionQuery` interface more complicated by adding arguments
 */
function fetchMoreUpdateQueryHandler<TQuery>(
  prev: TQuery,
  fetchMoreResult: TQuery | undefined,
  getCollectionByPath: GetCollectionByPathFunction<TQuery>,
): TQuery {
  const nextCollection = getCollectionByPath(fetchMoreResult);
  const output = cloneDeep(prev);
  const outputCollection = getCollectionByPath(output);

  if (outputCollection === undefined || nextCollection === undefined) {
    return output;
  }

  if (outputCollection.nodes && nextCollection.nodes) {
    outputCollection.nodes = getUpdatedNodes(
      outputCollection.nodes,
      nextCollection.nodes,
    );
  }
  if (outputCollection.edges && nextCollection.edges) {
    outputCollection.edges = getUpdatedEdges(
      outputCollection.edges,
      nextCollection.edges,
    );
  }

  Object.assign(outputCollection, {
    pageInfo: cloneDeep(nextCollection.pageInfo),
    ...getTotalCount(nextCollection.totalCount),
  });

  return output;
}

function subscribeToMoreHandler<TQuery, TSubscription>(
  isSearching: boolean,
  prev: TQuery,
  getCollectionByPath: GetCollectionByPathFunction<TQuery>,
  subscriptionData: TSubscription | undefined,
  getNodeByPath: GetNodeByPath<TSubscription>,
): TQuery {
  const node = getNodeByPath(subscriptionData);
  const output = cloneDeep(prev);
  const outputCollection = getCollectionByPath(output);

  if (outputCollection == undefined || node == undefined) return output;

  if (isAlreadyUpdated(outputCollection, node) || isSearching) {
    return prev;
  }

  if (outputCollection.nodes) {
    outputCollection.nodes = getUpdatedNodes(
      outputCollection.nodes,
      [node],
      false,
    );
  }
  if (outputCollection.edges) {
    outputCollection.edges = getUpdatedEdges(
      outputCollection.edges,
      [createEdge(node)],
      false,
    );
  }

  Object.assign(outputCollection, {
    pageInfo: cloneDeep(outputCollection.pageInfo),
    ...getTotalCount(outputCollection.totalCount, 1),
  });

  return output;
}

interface TotalCountReturn {
  totalCount?: number;
}

function getTotalCount(
  totalCount: number | undefined,
  additionalCount = 0,
): TotalCountReturn {
  return totalCount !== undefined
    ? { totalCount: totalCount + additionalCount }
    : {};
}

export function isAlreadyUpdated(outputCollection: Collection, newNode: Node) {
  let edgesAlreadyUpdated = true;
  let nodesAlreadyUpdated = true;

  if (outputCollection.edges) {
    edgesAlreadyUpdated = outputCollection.edges.some(edge => {
      return edge.node.id === newNode.id;
    });
  }

  if (outputCollection.nodes) {
    nodesAlreadyUpdated = outputCollection.nodes.some(node => {
      return node.id === newNode.id;
    });
  }

  return edgesAlreadyUpdated && nodesAlreadyUpdated;
}

function getUpdatedEdges(
  prevEdges: Edge[],
  nextEdges: Edge[],
  appendToEnd = true,
) {
  const newEdges = appendToEnd
    ? [...prevEdges, ...nextEdges]
    : [...nextEdges, ...prevEdges];
  return uniqueEdges(newEdges);
}

function getUpdatedNodes(
  prevNodes: Node[],
  nextNodes: Node[],
  appendToEnd = true,
) {
  const newNodes = appendToEnd
    ? [...prevNodes, ...nextNodes]
    : [...nextNodes, ...prevNodes];
  return uniqueNodes(newNodes);
}
