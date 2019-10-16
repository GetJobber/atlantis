import React from "react";
import classnames from "classnames";
import styles from "./List.css";
import { Icon, IconColorNames, IconNames } from "../Icon";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { Typography } from "../Typography";
import { Markdown } from "../Markdown";

export interface ListItemProps {
  /**
   * Numeric value of a list item.
   */
  readonly amount?: string;

  /**
   * List item content. This accepts a string for a simple component and an
   * array for a multi line content.
   * This supports basic markdown node types such as `_italic_` and `**bold**`.
   */
  readonly content: string | string[];

  /**
   * A date related to the list item.
   */
  readonly date?: string;

  /**
   * This turns the list item into a clickable link.
   */
  readonly href?: string;

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
  readonly id: number;

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
   * Callback when a list item gets clicked.
   */
  onClick?(): void;
}

export function ListItem({
  amount,
  content,
  date,
  href,
  icon,
  iconColor,
  id,
  isActive,
  onClick,
  title,
}: ListItemProps) {
  const actionClasses = classnames(
    styles.action,
    isActive && styles.isActive,
    (onClick || href) && styles.hoverable,
  );
  const Wrapper = onClick ? "button" : "a";

  const buttonProps = {
    ...(onClick && { role: "button", type: "button" }),
  };

  return (
    <Wrapper
      id={id.toString()}
      className={actionClasses}
      href={href}
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

        {date && (
          <Text variation="subdued">
            <Typography element="span" size="small" emphasisType="italic">
              {date}
            </Typography>
          </Text>
        )}
      </div>

      {amount && (
        <div className={styles.amount}>
          <Text>
            <Typography element="b" textColor="blue" fontWeight="bold">
              {amount}
            </Typography>
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
