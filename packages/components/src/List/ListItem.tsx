import React from "react";
import classnames from "classnames";
import type { IconColorNames, IconNames } from "@jobber/design";
import styles from "./ListItem.module.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { Typography } from "../Typography";
import { Markdown } from "../Markdown";
import { Emphasis } from "../Emphasis";

export interface BaseListItemProps {
  /**
   * The ID of the list item. This is important for React to handle efficient
   * re-rendering of list items.
   */
  readonly id: number | string;
}

export interface ListItemProps extends BaseListItemProps {
  /**
   * Subdued text under the `content` prop.
   */
  readonly caption?: string;

  /**
   * List item content. This accepts a string for a simple content and an array
   * for a multi line content.
   * This supports basic markdown node types such as `_italic_` and `**bold**`.
   */
  readonly content?: string | string[];

  /**
   * Shows an icon on the left side of the contents.
   */
  readonly icon?: IconNames;

  /**
   * Changes the color of the icons.
   */
  readonly iconColor?: IconColorNames;

  /**
   * Highlights the list item with the lightest green icon. This communicates
   * that the line item needs attention.
   */
  readonly isActive?: boolean;

  /**
   * This determines how and when to group the list items
   */
  readonly section?: string;

  /**
   * Adds a heading.
   */
  readonly title?: string;

  /**
   * This turns the list item into a clickable link.
   */
  readonly url?: string;

  /**
   * A numeric value of a row. This always shows up in the right side of the row
   * with a text aligned to the right.
   */
  readonly value?: string;

  /**
   * Callback when a list item gets clicked.
   */
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

export function ListItem<T extends BaseListItemProps = ListItemProps>(
  props: T &
    ListItemProps & {
      readonly customRenderItem?: (item: T) => React.ReactNode;
      readonly customItemStyles?: boolean;
    },
) {
  const actionClasses = classnames(
    styles.action,
    props.isActive && styles.isActive,
    (props.onClick || props.url) && styles.hoverable,
    props.customRenderItem && !props.customItemStyles && styles.customItem,
  );
  const Wrapper = props.url ? "a" : "button";

  const buttonProps = {
    ...(Wrapper === "button" && { role: "button", type: "button" as const }),
  };

  return (
    <Wrapper
      id={props.id.toString()}
      className={actionClasses}
      href={props.url}
      onClick={props.onClick}
      {...buttonProps}
    >
      {props.customRenderItem ? (
        props.customRenderItem(props)
      ) : (
        <DefaultRenderItem {...props} />
      )}
    </Wrapper>
  );
}

function DefaultRenderItem(props: ListItemProps) {
  return (
    <div className={styles.defaultContent}>
      {props.icon && (
        <div className={styles.icon}>
          <Icon name={props.icon} color={props.iconColor} />
        </div>
      )}

      <div className={styles.info}>
        {props.title && <Heading level={5}>{props.title}</Heading>}
        {props.content && <Description content={props.content} />}

        {props.caption && (
          <Text variation="subdued">
            <Typography element="span" size="small" emphasisType="italic">
              {props.caption}
            </Typography>
          </Text>
        )}
      </div>

      {props.value && (
        <div className={styles.amount}>
          <Text>
            <Emphasis variation="bold">{props.value}</Emphasis>
          </Text>
        </div>
      )}
    </div>
  );
}

function Description({ content }: Pick<Required<ListItemProps>, "content">) {
  if (content instanceof Array) {
    return (
      <>
        {content.map((item, i) => (
          <Text key={i}>
            <span className={styles.truncate}>
              <Markdown content={item} basicUsage={true} />
            </span>
          </Text>
        ))}
      </>
    );
  } else {
    return (
      <Text>
        <span className={styles.truncate}>
          <Markdown content={content} basicUsage={true} />
        </span>
      </Text>
    );
  }
}
