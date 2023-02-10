import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Card.css";
import colors from "./colors.css";
import { CardClickable } from "./CardClickable";
import { Button, ButtonProps } from "../Button";
import { Heading } from "../Heading";

interface CardCommonProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];
}

interface HeaderActionProps {
  /**
   * The title of the card.
   */
  readonly title?: string;
  /**
   * The action props that renders into a button on the card header.
   */
  readonly action?: ButtonProps;
}

interface HeaderCustomProps {
  /**
   * The custom component to be rendered on the card header.
   */
  readonly customHeader?: React.ReactNode;
}

type HeaderProps = XOR<HeaderActionProps, HeaderCustomProps>;

interface CardHeaderProps {
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
}

type CardProps = CardCommonProps & XOR<CardHeaderProps, CardTitleProps>;

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
          <Heading level={3}>{header?.title || title}</Heading>
          {header?.action?.label && <Button {...header.action} />}
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
