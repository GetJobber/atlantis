import React from "react";
import styles from "./List.css";
import { ListItem, ListItemProps } from "./ListItem";

interface ListProps {
  readonly items: ListItemProps[];
}

export function List({ items }: ListProps) {
  return (
    <ul className={styles.list}>
      {items.map(cont => (
        <li key={cont.id} className={styles.item}>
          <ListItem
            amount={cont.amount}
            content={cont.content}
            date={cont.date}
            icon={cont.icon}
            iconColor={cont.iconColor}
            id={cont.id}
            title={cont.title}
            href={cont.href}
            onClick={cont.onClick}
          />
        </li>
      ))}
    </ul>
  );
}
