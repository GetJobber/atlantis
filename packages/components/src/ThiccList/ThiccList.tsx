import React, { MouseEvent, useEffect, useState } from "react";
import classNames from "classnames";
import uniq from "lodash/uniq";
import styles from "./ThiccList.css";
import { ThiccListItem } from "./ThiccListItem";
import { ThiccListAction } from "./ThiccListAction";
import { SortOrder, getSortedItems } from "./utils";
import { SideSheet } from "./SideSheet";
import { HeaderLabelType, ThiccListHeader } from "./ThiccListHeader";
import { DataType, data } from "./data";
import { useThiccListContext } from "./ThiccListContext";
import { Button } from "../Button";
import { Grid } from "../Grid";
import { Text } from "../Text";
import { InputText } from "../InputText";
import { AnimatedSwitcher } from "../AnimatedSwitcher";
import { Glimmer } from "../Glimmer";

const sortKey: Record<HeaderLabelType, keyof DataType> = {
  Client: "name",
  Address: "address",
  Status: "status",
  Activity: "lastActiveDate",
};

export function ThiccList() {
  const {
    selectedItems,
    setSelectedItems,
    addOrRemoveSelectedItem,
    setActiveItem,
  } = useThiccListContext();

  const [loading, setLoading] = useState(true); // TODO: replace with real loading state
  const [sortOrder, setSortOrder] = useState<SortOrder>("A-Z");
  const [sortedHeader, setSortedHeader] = useState<HeaderLabelType>("Client");

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const sortedData = getSortedItems(data, sortOrder, sortKey[sortedHeader]);

  return (
    <div className={styles.list}>
      <div className={styles.listHeader}>
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
                switched={Boolean(selectedItems.length)}
                initialChild={<div />}
                switchTo={
                  <div className={styles.batchActions}>
                    <ThiccListAction
                      icon="sendMessage"
                      label="Email"
                      onClick={SideSheet.show}
                    />
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

        <div className={styles.listHeaderTitles}>
          <AnimatedSwitcher
            switched={selectedItems.length > 1}
            initialChild={
              <ThiccListHeader
                sortedHeader={sortedHeader}
                sortOrder={sortOrder}
                onClick={(header, sortBy) => {
                  setSortedHeader(header);
                  setSortOrder(sortBy);
                }}
              />
            }
            switchTo={
              <div className={styles.listHeaderSelection}>
                <Text variation="subdued">{selectedItems.length} selected</Text>
                <Button
                  label="Deselect All"
                  onClick={() => setSelectedItems([])}
                  type="tertiary"
                />
              </div>
            }
          />
        </div>
      </div>
      <div className={styles.listMain}>
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

        {!loading &&
          sortedData.map(item => (
            <ThiccListItem
              isSelected={selectedItems.includes(item.id)}
              onClick={handleClick}
              key={item.id}
              data={item}
            />
          ))}
      </div>
    </div>
  );

  function handleClick(
    item: DataType,
    event: MouseEvent<HTMLButtonElement>,
  ): void {
    if (event.ctrlKey || event.metaKey) {
      addOrRemoveSelectedItem(item);
    } else if (event.shiftKey) {
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      const lastSelectedItemIndex = sortedData.findIndex(
        d => d.id === lastSelectedItem,
      );
      const itemIndex = sortedData.findIndex(d => d.id === item.id);
      const itemsBetween = sortedData.slice(
        Math.min(lastSelectedItemIndex, itemIndex),
        Math.max(lastSelectedItemIndex, itemIndex) + 1,
      );
      setSelectedItems(
        uniq([...selectedItems, ...itemsBetween.map(d => d.id)]),
      );
    } else {
      if (selectedItems.length === 1 && selectedItems.includes(item.id)) {
        return setActiveItem(item);
      }

      addOrRemoveSelectedItem(item, true);
    }
  }
}
