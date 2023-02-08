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
interface CardCommonProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];
}

interface CardHeaderProps {
  readonly title?: never;

  /**
   * The header props of the card.
   */
  readonly header?: HeaderProps;
}

interface CardTitleProps {
  /**
   * @deprecated Use header instead
   */
  readonly title?: string;

  readonly header?: never;
}

type CardProps = CardCommonProps & XOR<CardHeaderProps, CardTitleProps>;

interface HeaderCustomProps {
  readonly customHeader?: React.ReactNode;
}

interface HeaderActionProps {
  readonly title?: string;
  readonly action?: ButtonAction;
}
interface ButtonAction {
  readonly label: string;
  readonly size?: "small" | "base" | "large";
  readonly type?: "primary" | "secondary" | "tertiary";
  readonly icon?: IconNames;
  readonly onClick?: () => void;
}
type LinkCardProps = CardProps & {
  /**
   * URL that the card would navigate to once clicked.
   */
  url: string;

  /**
   * Makes the URL open in new tab on click.
   */
  external?: boolean;
};

type ClickableCardProps = CardProps & {
  onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void;
};

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

  const { showCustomCompHeader, showCardHeader } = checkHeaderVisibility(
    title,
    header,
  );

  const cardContent = (
    <>
      {showCustomCompHeader && header?.customHeader}

      {!showCustomCompHeader && showCardHeader && (
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
          {header?.action?.label && (
            <div className={styles.headerButton}>
              <Button
                label={header.action.label}
                size={header.action.size}
                type={header.action.type}
                icon={header.action.icon}
                onClick={header.action.onClick}
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

function checkHeaderVisibility(
  title?: string,
  header?: HeaderProps,
): {
  showCustomCompHeader: boolean;
  showCardHeader: boolean;
} {
  if (header?.customHeader) {
    return { showCustomCompHeader: true, showCardHeader: true };
  } else if (header?.action || header?.title || title) {
    return { showCustomCompHeader: false, showCardHeader: true };
  }

  return { showCustomCompHeader: false, showCardHeader: false };
}
