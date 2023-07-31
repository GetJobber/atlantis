import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./ThiccList.css";
import { ThiccListItem } from "./ThiccListItem";
import { ThiccListAction } from "./ThiccListAction";
import { SortOrder, getSortedItems } from "./utils";
import { SideSheet } from "./SideSheet";
import { HeaderLabelType, ThiccListHeader } from "./ThiccListHeader";
import { DataType, data } from "./data";
import { Button } from "../Button";
import { Grid } from "../Grid";
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
  const [loading, setLoading] = useState(true); // TODO: replace with real loading state
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("A-Z");
  const [sortedHeader, setSortedHeader] = useState<HeaderLabelType>("Client");

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

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
                switched={Boolean(selectedItem.length)}
                initialChild={<div />}
                switchTo={
                  <div className={styles.batchActions}>
                    <div onClick={SideSheet.show}>
                      <ThiccListAction icon="sendMessage" label="Email" />
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

        <div className={styles.listHeaderTitles}>
          <ThiccListHeader
            sortedHeader={sortedHeader}
            sortOrder={sortOrder}
            onClick={(header, sortBy) => {
              setSortedHeader(header);
              setSortOrder(sortBy);
            }}
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
          getSortedItems(data, sortOrder, sortKey[sortedHeader]).map(item => (
            <ThiccListItem
              isSelected={selectedItem.includes(item.id)}
              onClick={handleClick}
              onDoubleClick={d => {
                console.log(d);
                alert("Congrats, you double clicked!");
              }}
              key={item.id}
              data={item}
            />
          ))}
      </div>
    </div>
  );

  function handleClick(item: DataType): void {
    if (selectedItem.includes(item.id)) {
      setSelectedItem(selectedItem.filter(id => id !== item.id));
    } else {
      setSelectedItem([...selectedItem, item.id]);
    }
  }
}
