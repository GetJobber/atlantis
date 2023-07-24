import React from "react";
import { useCollectionQuery } from "@jobber/hooks";
import styles from "./ThiccList.css";
import {
  LIST_QUERY,
  ListQueryType,
  apolloClient,
  getLoadingState,
} from "./gqlUtils";
import { Button } from "../Button";
import { Content } from "../Content";
import { Grid } from "../Grid";
import { InputText } from "../InputText";
import { Text } from "../Text";
import { FormatRelativeDateTime } from "../FormatRelativeDateTime";

const headers = ["Client", "Address", "Tags", "Status", "Activity"];

export function ThiccList() {
  const {
    data,
    refresh,
    nextPage,
    loadingRefresh,
    loadingNextPage,
    loadingInitialContent,
  } = useCollectionQuery<ListQueryType>({
    query: LIST_QUERY,
    queryOptions: {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      client: apolloClient,
    },
    getCollectionByPath(items) {
      return items?.allPeople;
    },
  });

  const { loadingStatus, loading } = getLoadingState(
    loadingInitialContent,
    loadingRefresh,
    loadingNextPage,
  );

  const items = data?.allPeople.edges || [];
  console.log(items);

  return (
    <Content>
      <Grid>
        <Grid.Cell size={{ xs: 9 }}>
          <div className={styles.filterActions}>
            <Button
              label="Filter Status"
              icon="add"
              iconOnRight
              variation="subtle"
            />
            <Button
              label="Filter Tags"
              icon="add"
              iconOnRight
              variation="subtle"
            />
          </div>
        </Grid.Cell>
        <Grid.Cell size={{ xs: 3 }}>
          <InputText
            placeholder="Search.."
            suffix={{ icon: "search" }}
            size="small"
          />
        </Grid.Cell>
      </Grid>

      <div className={styles.list}>
        <div className={styles.listHeader}>
          <Grid>
            {headers.map((header, i) => (
              <Grid.Cell key={header} size={{ xs: i <= 1 ? 3 : 2 }}>
                <Text size="small" variation="subdued">
                  <b className={styles.listHeaderText}>{header}</b>
                </Text>
              </Grid.Cell>
            ))}
          </Grid>
        </div>

        {items.map(({ node }) => (
          <button key={node.id} className={styles.listContent}>
            <Grid>
              <Grid.Cell size={{ xs: 3 }}>
                <Text>{node.name}</Text>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 3 }}>
                <Text variation="subdued">{node.homeworld.name}</Text>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 2 }}>
                <Text variation="subdued">{node.gender}</Text>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 2 }}>
                <Text variation="subdued">{node.skinColor}</Text>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 2 }}>
                <Text variation="subdued">
                  <FormatRelativeDateTime date={node.created} />
                </Text>
              </Grid.Cell>
            </Grid>
          </button>
        ))}
      </div>
    </Content>
  );
}
