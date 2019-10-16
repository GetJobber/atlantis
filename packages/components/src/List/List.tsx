import React, { Fragment } from "react";
import { groupBy } from "lodash";
import styles from "./List.css";
import { ListItem, ListItemProps } from "./ListItem";
import { Heading } from "../Heading";

interface ListProps {
  readonly items: ListItemProps[];
  readonly sectioned?: boolean;
}

export function List({ items, sectioned }: ListProps) {
  const sectionedItems = groupBy(items, "section");

  return (
    <ul className={styles.list}>
      {sectioned ? sectionedListItem() : defaultListItem()}
    </ul>
  );

  function sectionedListItem(): React.ReactNode {
    return Object.keys(sectionedItems).map(section => (
      <Fragment key={section}>
        <li className={styles.section}>
          <div className={styles.sectionHeader}>
            <Heading level={4}>{section}</Heading>
          </div>

          <ul className={styles.list}>
            {sectionedItems[section].map(item => (
              <li key={item.id} className={styles.item}>
                <ListItem {...item} />
              </li>
            ))}
          </ul>
        </li>
      </Fragment>
    ));
  }

  function defaultListItem() {
    return items.map(item => (
      <li key={item.id} className={styles.item}>
        <ListItem {...item} />
      </li>
    ));
  }
}
