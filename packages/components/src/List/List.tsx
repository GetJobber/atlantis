import React from "react";
import classnames from "classnames";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import { Typography } from "@jobber/components/Typography";
import type {
  BaseListItemProps,
  ListItemProps,
} from "@jobber/components/List/ListItem";
import { ListItem } from "@jobber/components/List/ListItem";
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
   * @argument item - The item to render
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
   * @argument sectionName - The name of the section to render
   */
  readonly customRenderSection?: (sectionName: string) => React.ReactNode;

  /**
   * Set to true for more control over the section heading styles. Only modifies styles
   * when used with customRenderItem.
   */
  readonly customSectionStyles?: boolean;

  /**
   * An ID of an element that provides the labelling for this list.
   */
  readonly labelledBy?: string;

  /**
   * A default section header value for items that do not have a section.
   * @default "Other"
   */
  readonly defaultSectionHeader?: string;
}

export function List<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  customRenderSection,
  customSectionStyles,
  defaultSectionHeader = "Other",
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
        defaultSectionHeader={defaultSectionHeader}
        labelledBy={labelledBy}
      />
    );
  } else {
    return (
      <DisplayList
        items={items}
        customRenderItem={customRenderItem}
        customItemStyles={customItemStyles}
        labelledBy={labelledBy}
      />
    );
  }
}

function DisplayList<T extends BaseListItemProps = ListItemProps>({
  items,
  customRenderItem,
  customItemStyles,
  labelledBy,
}: ListProps<T>) {
  const omitDefaultStyles = customRenderItem && customItemStyles;
  const itemClassNames = classnames(!omitDefaultStyles && styles.item);

  return (
    <ul className={styles.list} aria-labelledby={labelledBy}>
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
  defaultSectionHeader,
  labelledBy,
}: ListProps<T>) {
  const sectionedItems = groupBy(items, item =>
    get(item, "section", defaultSectionHeader),
  );

  const omitDefaultStyles = customRenderItem && customItemStyles;
  const omitDefaultSectionStyles = customRenderSection && customSectionStyles;
  const itemClassNames = classnames(!omitDefaultStyles && styles.item);
  const sectionHeaderClassNames = classnames(
    !omitDefaultSectionStyles && sectionStyles.sectionHeader,
  );

  return (
    <ul className={styles.list} aria-labelledby={labelledBy}>
      {Object.keys(sectionedItems).map(sectionName => {
        return (
          <li
            key={sectionName}
            className={classnames(!omitDefaultSectionStyles && styles.section)}
          >
            {getSectionHeader(
              sectionName,
              sectionHeaderClassNames,
              customRenderSection,
            )}
            <ul className={styles.list}>
              {sectionedItems[sectionName].map(item => (
                <li key={item.id} className={itemClassNames}>
                  <ListItem
                    {...item}
                    customRenderItem={customRenderItem}
                    customItemStyles={customItemStyles}
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

function getSectionHeader(
  sectionName: string,
  sectionHeaderClassNames: string,
  customRenderSection?: (sectionName: string) => React.ReactNode,
) {
  const sectionHeader = customRenderSection ? (
    customRenderSection(sectionName)
  ) : (
    <Typography element="h4" fontWeight="bold" size="large">
      {sectionName}
    </Typography>
  );

  return <div className={sectionHeaderClassNames}>{sectionHeader}</div>;
}
