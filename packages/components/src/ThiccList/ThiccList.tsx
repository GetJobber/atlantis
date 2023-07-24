import React from "react";
import { useCollectionQuery } from "@jobber/hooks";
import styles from "./ThiccList.css";
import {
  LIST_QUERY,
  ListNode,
  ListQueryType,
  apolloClient,
  getLoadingState,
} from "./gqlUtils";
import { ThiccListItem } from "./ThiccListItem";
import { ThiccListActions } from "./ThiccListActions";
import { Button } from "../Button";
import { Content } from "../Content";
import { Grid } from "../Grid";
import { InputText } from "../InputText";
import { Text } from "../Text";

const headers = ["Client", "Address", "Tags", "Status", "Activity"];

export function ThiccList() {
  const {
    data,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refresh,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loadingStatus, loading } = getLoadingState(
    loadingInitialContent,
    loadingRefresh,
    loadingNextPage,
  );

  const items = data?.allPeople.edges || [];
  const [selectedItem, setSelectedItem] = React.useState<string[]>([]);

  return (
    <Content>
      <Grid>
        <Grid.Cell size={{ xs: 9 }}>
          <div className={styles.actions}>
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
            {(true || Boolean(selectedItem.length)) && (
              <div>
                <ThiccListActions />
              </div>
            )}
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
          <ThiccListItem
            isSelected={selectedItem.includes(node.id)}
            onClick={handleClick}
            onDoubleClick={d => {
              console.log(d);
              alert("Congrats, you double clicked!");
            }}
            key={node.id}
            data={node}
          />
        ))}
      </div>
    </Content>
  );

  function handleClick(item: ListNode): void {
    if (selectedItem.includes(item.id)) {
      setSelectedItem(selectedItem.filter(id => id !== item.id));
    } else {
      setSelectedItem([...selectedItem, item.id]);
    }
  }
}
