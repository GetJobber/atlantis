import React, { Fragment } from "react";
import { groupBy } from "lodash";
import styles from "./List.css";
import { ListItem, ListItemProps } from "./ListItem";
import { Heading } from "../Heading";

interface ListProps {
  readonly items: ListItemProps[];
  readonly sectionedBy?: keyof ListItemProps;
}

export function List({ items, sectionedBy }: ListProps) {
  const sectionedItems = groupBy(items, item => {
    // clean me
    if (sectionedBy) {
      return item[sectionedBy];
    } else {
      return;
    }
  });

  return (
    <ul className={styles.list}>
      {sectionedBy ? sectionedListItem() : defaultListItem()}
    </ul>
  );

  function sectionedListItem(): React.ReactNode {
    return Object.keys(sectionedItems).map(section => (
      <Fragment key={section}>
        <li className={styles.sectionHeader}>
          <Heading level={4}>{section}</Heading>
        </li>
        {sectionedItems[section].map(item => (
          <li key={item.id} className={styles.item}>
            <ListItem
              amount={item.amount}
              content={item.content}
              date={item.date}
              href={item.href}
              icon={item.icon}
              iconColor={item.iconColor}
              id={item.id}
              isActive={item.isActive}
              onClick={item.onClick}
              title={item.title}
            />
          </li>
        ))}
      </Fragment>
    ));
  }

  function defaultListItem() {
    return items.map(item => (
      <li key={item.id} className={styles.item}>
        <ListItem
          amount={item.amount}
          content={item.content}
          date={item.date}
          href={item.href}
          icon={item.icon}
          iconColor={item.iconColor}
          id={item.id}
          isActive={item.isActive}
          onClick={item.onClick}
          title={item.title}
        />
      </li>
    ));
  }
}
