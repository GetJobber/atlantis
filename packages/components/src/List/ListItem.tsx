import React from "react";
import classnames from "classnames";
import styles from "./List.css";
import { Icon, IconColorNames, IconNames } from "../Icon";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { Typography } from "../Typography";
import { Markdown } from "../Markdown";

export interface ListItemProps {
  readonly amount?: string;
  readonly content: string;
  readonly date?: string;
  readonly href?: string;
  readonly icon?: IconNames;
  readonly iconColor?: IconColorNames;
  readonly id: number;
  readonly isActive?: boolean;
  readonly section?: string;
  readonly title?: string;
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

  return (
    <Wrapper
      id={id.toString()}
      className={actionClasses}
      href={href}
      onClick={onClick}
    >
      {icon && (
        <div className={styles.icon}>
          <Icon name={icon} color={iconColor} />
        </div>
      )}

      <div className={styles.info}>
        {title && <Heading level={5}>{title}</Heading>}

        <Text>
          <span className={styles.truncate}>
            <Markdown content={content} basicUsage={true} />
          </span>
        </Text>

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
