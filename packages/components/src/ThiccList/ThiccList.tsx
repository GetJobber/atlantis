import React, { useState } from "react";
import { useCollectionQuery } from "@jobber/hooks";
import classNames from "classnames";
import styles from "./ThiccList.css";
import {
  LIST_QUERY,
  ListNode,
  ListQueryType,
  apolloClient,
  getLoadingState,
} from "./gqlUtils";
import { ThiccListItem } from "./ThiccListItem";
import { ThiccListAction } from "./ThiccListAction";
import { SortOrder, getSortedItems } from "./utils";
import { SideSheet } from "./SideSheet";
import { Button } from "../Button";
import { Content } from "../Content";
import { Grid } from "../Grid";
import { InputText } from "../InputText";
import { Text } from "../Text";
import { AnimatedSwitcher } from "../AnimatedSwitcher";
import { Glimmer } from "../Glimmer";

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

  const { loading } = getLoadingState(
    loadingInitialContent,
    loadingRefresh,
    loadingNextPage,
  );

  const items = data?.allPeople.edges || [];
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("A-Z");
  const sortIcon = sortOrder === "A-Z" ? "⏷" : "⏶";

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
            <AnimatedSwitcher
              switched={Boolean(selectedItem.length)}
              initialChild={<div />}
              switchTo={
                <div className={styles.batchActions}>
                  <div onClick={SideSheet.show}>
                    <ThiccListAction icon="sendMessage" label="Send message" />
                  </div>
                  <ThiccListAction icon="addNote" label="Add note" />
                  <ThiccListAction icon="export" label="Export" />
                  <ThiccListAction icon="more" label="More actions" />
                </div>
              }
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
          <Grid alignItems="center">
            {headers.map((header, i) => (
              <Grid.Cell key={header} size={{ xs: i <= 1 ? 3 : 2 }}>
                {i === 0 ? (
                  <button
                    className={styles.listHeaderButton}
                    onClick={() =>
                      setSortOrder(sortOrder === "A-Z" ? "Z-A" : "A-Z")
                    }
                  >
                    <Text size="small" variation="subdued">
                      <b className={styles.listHeaderText}>
                        {header}, {sortOrder} {sortIcon}
                      </b>
                    </Text>
                  </button>
                ) : (
                  <Text size="small" variation="subdued">
                    <b className={styles.listHeaderText}>{header}</b>
                  </Text>
                )}
              </Grid.Cell>
            ))}
          </Grid>
        </div>

        {loading &&
          [...Array(10).keys()].map(num => (
            <div
              key={num}
              className={classNames(styles.listContent, styles.listContentItem)}
            >
              <Grid>
                <Grid.Cell size={{ xs: 3 }}>
                  <Glimmer />
                </Grid.Cell>
                <Grid.Cell size={{ xs: 3 }}>
                  <Glimmer />
                </Grid.Cell>
                <Grid.Cell size={{ xs: 2 }}>
                  <Glimmer />
                </Grid.Cell>
                <Grid.Cell size={{ xs: 2 }}>
                  <Glimmer />
                </Grid.Cell>
                <Grid.Cell size={{ xs: 2 }}>
                  <Glimmer />
                </Grid.Cell>
              </Grid>
            </div>
          ))}

        {getSortedItems(items, sortOrder).map(({ node }) => (
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
