import React from "react";
import { get, groupBy } from "lodash";
import styles from "./List.css";
import { ListItem, ListItemProps } from "./ListItem";
import { Heading } from "../Heading";

interface ListProps {
  /**
   * Array of the list items.
   *
   * {@link https://atlantis.frend.space/components/list#list-item-props List Item Props}
   */
  readonly items: ListItemProps[];
}

export function List({ items }: ListProps) {
  const isSectioned = items.some(item => item.section);
  if (isSectioned) {
    return <SectionedList items={items} />;
  } else {
    return <DisplayList items={items} />;
  }
}

function DisplayList({ items }: Pick<ListProps, "items">) {
  return (
    <ul className={styles.list}>
      {items.map(item => (
        <li key={item.id} className={styles.item}>
          <ListItem {...item} />
        </li>
      ))}
    </ul>
  );
}

function SectionedList({ items }: Pick<ListProps, "items">) {
  const sectionedItems = groupBy(items, item => get(item, "section", "Other"));

  return (
    <ul className={styles.list}>
      {Object.keys(sectionedItems).map(section => (
        <li key={section} className={styles.section}>
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
      ))}
    </ul>
  );
}
