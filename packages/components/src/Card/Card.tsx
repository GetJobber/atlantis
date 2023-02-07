import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { IconNames } from "@jobber/design";
import styles from "./Card.css";
import colors from "./colors.css";
import { CardClickable } from "./CardClickable";
import { Button } from "../Button";
import { Typography } from "../Typography";

export type HeaderProps = XOR<HeaderActionProps, HeaderCustomProps>;
interface CardProps {
  /**
   * The header props of the card.
   */
  readonly header?: HeaderProps;

  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];

  /**
   * The title of the card. (deprecated)
   */
  readonly title?: string;
}

interface HeaderCustomProps {
  readonly customHeader?: React.ReactNode;
}

interface HeaderActionProps {
  readonly title?: string;
  readonly action?: ActionItem;
}

// | {
//     readonly onPress?: never;
//     readonly actionItem?: never;
//   }
// | {
//     readonly onPress: () => void;
//     readonly actionItem: ActionItem;
//   };

interface IconAction {
  readonly iconName: IconNames;
}

interface ButtonAction {
  readonly label: string;
  readonly size?: "small" | "base" | "large";
  readonly type?: "primary" | "secondary" | "tertiary";
  readonly icon?: IconNames;
  readonly onPress?: () => void;
}

export type ActionItem = XOR<IconAction, ButtonAction>;

interface LinkCardProps extends CardProps {
  /**
   * URL that the card would navigate to once clicked.
   */
  url: string;

  /**
   * Makes the URL open in new tab on click.
   */
  external?: boolean;
}

interface ClickableCardProps extends CardProps {
  onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void;
}

type CardPropOptions = XOR<CardProps, XOR<LinkCardProps, ClickableCardProps>>;

export function Card({
  accent,
  header,
  children,
  onClick,
  title,
  url,
  external = false,
}: CardPropOptions) {
  const className = classnames(
    styles.card,
    accent && styles.accent,
    (url || onClick) && styles.clickable,
    accent && colors[accent],
  );

  const cardContent = (
    <>
      {header?.customHeader && header.customHeader}
      {(header?.title || title || header?.action) && (
        <div className={styles.header}>
          <div>
            <Typography
              element="h3"
              size="large"
              textCase="uppercase"
              fontWeight="extraBold"
              textColor="heading"
            >
              {header?.title || title}
            </Typography>
          </div>
          {!title && header?.title && header?.action && header?.action?.label && (
            <div className={styles.button}>
              <Button
                label={header.action.label}
                size={header.action.size}
                type={header.action.type}
                icon={header.action.icon}
                onClick={header.action.onPress}
              />
            </div>
          )}
        </div>
      )}
      {children}
    </>
  );

  if (onClick) {
    return (
      <CardClickable className={className} onClick={onClick}>
        {cardContent}
      </CardClickable>
    );
  } else if (url) {
    return (
      <a
        className={className}
        href={url}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {cardContent}
      </a>
    );
  } else {
    return <div className={className}>{cardContent}</div>;
  }
}
