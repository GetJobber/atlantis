import React from "react";
import classnames from "classnames";
import { IconColorNames, IconNames } from "@jobber/design";
import styles from "./ListItem.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { Typography } from "../Typography";
import { Markdown } from "../Markdown";
import { Emphasis } from "../Emphasis";

export interface ListItemProps {
  /**
   * Subdued text under the `content` prop.
   */
  readonly caption?: string;

  /**
   * List item content. This accepts a string for a simple content and an array
   * for a multi line content.
   * This supports basic markdown node types such as `_italic_` and `**bold**`.
   */
  readonly content: string | string[];

  /**
   * Shows an icon on the left side of the contents.
   */
  readonly icon?: IconNames;

  /**
   * Changes the color of the icons.
   */
  readonly iconColor?: IconColorNames;

  /**
   * The ID of the list item. This will be helpful to know the selected list
   * items when a batch action is implemented.
   */
  readonly id: number | string;

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

export function ListItem({
  caption,
  content,
  icon,
  iconColor,
  id,
  isActive,
  onClick,
  title,
  url,
  value,
}: ListItemProps) {
  const actionClasses = classnames(
    styles.action,
    isActive && styles.isActive,
    (onClick || url) && styles.hoverable,
  );
  const Wrapper = url ? "a" : "button";

  const buttonProps = {
    ...(Wrapper === "button" && { role: "button", type: "button" as const }),
  };

  return (
    <Wrapper
      id={id.toString()}
      className={actionClasses}
      href={url}
      onClick={onClick}
      {...buttonProps}
    >
      {icon && (
        <div className={styles.icon}>
          <Icon name={icon} color={iconColor} />
        </div>
      )}

      <div className={styles.info}>
        {title && <Heading level={5}>{title}</Heading>}
        <Description content={content} />

        {caption && (
          <Text variation="subdued">
            <Typography element="span" size="small" emphasisType="italic">
              {caption}
            </Typography>
          </Text>
        )}
      </div>

      {value && (
        <div className={styles.amount}>
          <Text>
            <Emphasis variation="bold">{value}</Emphasis>
          </Text>
        </div>
      )}
    </Wrapper>
  );
}

function Description({ content }: Pick<ListItemProps, "content">) {
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
