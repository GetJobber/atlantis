import React from "react";
import classnames from "classnames";
import { camelCase, get, groupBy } from "lodash";
import styles from "./List.css";
import sectionColors from "./SectionHeaderColors.css";
import { ListItem, ListItemProps } from "./ListItem";
import { Typography } from "../Typography";

interface ListProps {
  /**
   * Array of the list items.
   *
   * {@link https://atlantis.frend.space/components/list#list-item-props List Item Props}
   */
  readonly items: ListItemProps[];

  /**
   * Automatically colors the section header to match Jobbers system if a
   * section is present.
   *
   * @default true
   */
  readonly jobberSectionColors?: boolean;
}

export function List({ items, jobberSectionColors = true }: ListProps) {
  const isSectioned = items.some(item => item.section);
  if (isSectioned) {
    return (
      <SectionedList items={items} jobberSectionColors={jobberSectionColors} />
    );
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

function SectionedList({ items, jobberSectionColors }: ListProps) {
  const sectionedItems = groupBy(items, item => get(item, "section", "Other"));

  return (
    <ul className={styles.list}>
      {Object.keys(sectionedItems).map(sectionName => (
        <li key={sectionName} className={styles.section}>
          <div
            className={getSectionHeaderColor(sectionName, jobberSectionColors)}
          >
            <Typography element="h4" fontWeight="bold" size="large">
              {sectionName}
            </Typography>
          </div>

          <ul className={styles.list}>
            {sectionedItems[sectionName].map(item => (
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

function getSectionHeaderColor(name: string, withColors?: boolean) {
  const camelizedName = camelCase(name) as keyof typeof sectionColors;
  return classnames(
    styles.sectionHeader,
    withColors && sectionColors[camelizedName],
  );
}
