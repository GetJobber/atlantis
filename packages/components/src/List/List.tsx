import React from "react";
import { groupBy } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./List.css";
import { ListItem, ListItemProps } from "./ListItem";
import { Heading } from "../Heading";

interface ListProps {
  readonly items: ListItemProps[];
  readonly sectioned?: boolean;
}

export function List({ items, sectioned }: ListProps) {
  if (sectioned) {
    return <SectionedList items={items} />;
  } else {
    return <DisplayList items={items} />;
  }
}

function DisplayList({ items }: Pick<ListProps, "items">) {
  return (
    <ul className={styles.list}>
      <AnimatePresence initial={false}>
        {items.map(item => (
          <motion.li
            key={item.id}
            className={styles.item}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            positionTransition={{
              duration: 0.2,
            }}
            transition={{
              type: "spring",
              duration: 0.2,
              damping: 20,
              stiffness: 300,
            }}
          >
            <ListItem {...item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function SectionedList({ items }: Pick<ListProps, "items">) {
  const sectionedItems = groupBy(items, "section");

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
