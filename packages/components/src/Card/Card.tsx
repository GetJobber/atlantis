import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Card.css";
import colors from "./colors.css";
import { CardClickable } from "./CardClickable";
import { Typography } from "../Typography";

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
  url: string;
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
          <Typography
            element="h3"
            size="large"
            textCase="uppercase"
            fontWeight="extraBold"
          >
            {title}
          </Typography>
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
      <a className={className} href={url}>
        {cardContent}
      </a>
    );
  } else {
    return <div className={className}>{cardContent}</div>;
  }
}
