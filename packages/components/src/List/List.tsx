import React from "react";
import classnames from "classnames";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import { Typography } from "@jobber/components/Typography";
import {
  BaseListItemProps,
  ListItem,
  ListItemProps,
} from "@jobber/components/List/ListItem";
import sectionStyles from "./SectionHeader.module.css";
import styles from "./List.module.css";

interface ListProps<T extends BaseListItemProps = ListItemProps> {
  /**
   * Array of the list items.
   */
  readonly items: T[];

  /**
   * A function that will be called for each item instead of the default
   * rendering
   */
  readonly customRenderItem?: (item: T) => React.ReactNode;

  /**
   * Set to true for more control over the item styles. Only modifies styles
   * when used with customRenderItem.
   */
  readonly customItemStyles?: boolean;

  /**
   * A function that will be called for each section heading instead of the default
   * rendering
   */
  readonly customRenderSection?: (sectionName: string) => React.ReactNode;

  /**
   * Set to true for more control over the section heading styles. Only modifies styles
   * when used with customRenderItem.
   */
  readonly customSectionStyles?: boolean;

  /**
   * Defines the HTML ARIA role for the list.
   *
   * * @default "list"
   */
  readonly ariaRole?: string;

  /**
   * An ID of an element that provides the labelling for this list.
   */
  readonly labelledBy?: string;
}

export function List<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  customRenderSection,
  customSectionStyles,
  ariaRole = "list",
  labelledBy,
}: ListProps<T>) {
  const isSectioned = items.some(item => "section" in item && item.section);

  if (isSectioned) {
    return (
      <SectionedList
        items={items}
        customRenderItem={customRenderItem}
        customItemStyles={customItemStyles}
        customRenderSection={customRenderSection}
        customSectionStyles={customSectionStyles}
        ariaRole={ariaRole}
        labelledBy={labelledBy}
      />
    );
  } else {
    return (
      <DisplayList
        items={items}
        customRenderItem={customRenderItem}
        customItemStyles={customItemStyles}
        ariaRole={ariaRole}
        labelledBy={labelledBy}
      />
    );
  }
}

function DisplayList<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  ariaRole,
  labelledBy,
}: ListProps<T>) {
  const omitDefaultStyles = customRenderItem && customItemStyles;
  const itemClassNames = classnames(!omitDefaultStyles && styles.item);
  const roleItem =
    ariaRole === "menu" || ariaRole === "list" ? `${ariaRole}item` : null;

  return (
    <ul className={styles.list} role={ariaRole} aria-labelledby={labelledBy}>
      {items.map(item => (
        <li key={item.id} className={itemClassNames}>
          <ListItem
            {...item}
            customRenderItem={customRenderItem}
            customItemStyles={customItemStyles}
          />
        </li>
      ))}
    </ul>
  );
}

function SectionedList<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  customRenderSection,
  customSectionStyles,
  ariaRole,
  labelledBy,
}: ListProps<T>) {
  const sectionedItems = groupBy(items, item => get(item, "section", "Other"));

  const omitDefaultStyles = customRenderItem && customItemStyles;
  const omitDefaultSectionStyles = customRenderSection && customSectionStyles;
  const itemClassNames = classnames(!omitDefaultStyles && styles.item);
  const sectionHeaderClassNames = classnames(
    !omitDefaultSectionStyles && sectionStyles.sectionHeader,
  );

  const isMenuItem = ariaRole === "menu";

  return (
    <ul className={styles.list}>
      {Object.keys(sectionedItems).map(sectionName => {
        const sectionHeader = customRenderSection ? (
          customRenderSection(sectionName)
        ) : (
          <Typography element="h4" fontWeight="bold" size="large">
            {sectionName}
          </Typography>
        );

        return (
          <li
            key={sectionName}
            className={classnames(!omitDefaultSectionStyles && styles.section)}
          >
            {sectionHeader && (
              <div className={sectionHeaderClassNames}>{sectionHeader}</div>
            )}
            <ul className={styles.list}>
              {sectionedItems[sectionName].map(item => (
                <li key={item.id} className={itemClassNames}>
                  <ListItem
                    {...item}
                    customRenderItem={customRenderItem}
                    customItemStyles={customItemStyles}
                    isMenuItem={isMenuItem}
                  />
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
