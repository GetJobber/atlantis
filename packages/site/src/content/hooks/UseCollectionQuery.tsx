import { List } from "@jobber/components/List";
import { Button } from "@jobber/components/Button";
import { Spinner } from "@jobber/components/Spinner";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { useCollectionQuery } from "@jobber/hooks/useCollectionQuery";
import {
  LIST_QUERY,
  apolloClient,
  getLoadingState,
} from "@jobber/hooks/useCollectionQuery/mdxUtils";

export function UseCollectionQuery() {
  const {
    data,
    refresh,
    nextPage,
    loadingRefresh,
    loadingNextPage,
    loadingInitialContent,
  } = useCollectionQuery({
    // useCollectionQuery should be called with the query type, and
    // optionally, the subscription type. The Canvas errors with
    // typing included, so typing has been removed in this example.
    // Please see the first example for appropriate typing.
    query: LIST_QUERY,
    queryOptions: {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      client: apolloClient,
    },
    getCollectionByPath(items) {
      return items.allPlanets;
    },
  });
  const { loadingStatus, loading } = getLoadingState(
    loadingInitialContent,
    loadingRefresh,
    loadingNextPage,
  );
  let items = [];

  if (data) {
    items = data.allPlanets.edges.map(edge => {
      return {
        section: "Star Wars Planets",
        id: edge.node.id,
        icon: "starFill",
        iconColor: "green",
        content: edge.node.name,
      };
    });
  }

  return (
    <>
      <InlineLabel size="large">{loadingStatus}</InlineLabel>
      {loading && <Spinner size="small" inline={true} />}
      <List items={items} />
      <Button
        label={"Refresh"}
        onClick={() => {
          refresh();
        }}
      />
      <Button
        label={"Fetch More"}
        onClick={() => {
          nextPage();
        }}
      />
    </>
  );
}
