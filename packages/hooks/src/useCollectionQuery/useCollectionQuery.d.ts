import { ApolloError, DocumentNode, QueryHookOptions, SubscribeToMoreOptions } from "@apollo/client";
import { Node } from "./uniqueNodes";
import { Edge } from "./uniqueEdges";
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
type GetCollectionByPathFunction<TQuery> = (data: TQuery | undefined) => Collection | undefined;
type GetNodeByPath<TSubscription> = (data: TSubscription | undefined) => Node | undefined;
export declare function useCollectionQuery<TQuery, TSubscription = undefined>({ query, queryOptions, getCollectionByPath, subscription, }: UseCollectionQueryArguments<TQuery, TSubscription>): CollectionQueryResult<TQuery>;
export declare function isAlreadyUpdated(outputCollection: Collection, newNode: Node): boolean;
export {};
