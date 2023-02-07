import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Card.css";
import colors from "./colors.css";
import { CardClickable } from "./CardClickable";
import { Heading } from "../Heading";

interface CardProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];

  /**
   * The title of the card.
   */
  readonly title?: string;
}

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
      {title && (
        <div className={styles.header}>
          <Heading level={3}>{title}</Heading>
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
