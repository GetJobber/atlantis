import React, { ReactElement, ReactNode } from "react";
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

type HeaderProps = string | HeaderActionProps | ReactElement;

interface CardProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];
  /**
   * @deprecated
   * The title of the card. Use header instead.
   *
   */
  readonly title?: string;

  /**
   * The header props of the card.
   */
  readonly header?: HeaderProps;
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

  const cardContent = (
    <>
      {CardHeader && CardHeader()}
      {children}
    </>
  );

  function CardHeader() {
    // Case 1: Deprecated Title
    if (title) {
      return (
        <div className={styles.header}>
          {title && <Heading level={3}>{title}</Heading>}
        </div>
      );
    }
    // Case 2: String Header
    if (typeof header === "string") {
      return (
        <div className={styles.header}>
          {header && <Heading level={3}>{header}</Heading>}
        </div>
      );
    }
    // Case 3: Custom Header
    if (React.isValidElement(header)) {
      return header;
    }
    // Case 4: Default Header Props
    return (
      !!header && (
        <div className={styles.header}>
          {header?.title && <Heading level={3}>{header?.title}</Heading>}
          {header?.action && <Button {...header?.action} />}
        </div>
      )
    );
  }

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
