import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Card.css";
import cardColors from "./CardColors.css";

interface CardSectionProps {
  readonly children: ReactNode;
}

function CardHeader(props: CardSectionProps) {
  return <div className={styles.header} {...props} />;
}

interface CardTitleProps {
  /**
   * The title for the card.
   */
  readonly title: string;
}

export function CardTitle({ title }: CardTitleProps) {
  return (
    <CardHeader>
      <span className={styles.cardTitle}>{title}</span>
    </CardHeader>
  );
}

export function CardContent(props: CardSectionProps) {
  return <div className={styles.content} {...props} />;
}

interface CardProps {
  /**
   * A simple card will automatically contain only a single `CardContent`
   * section that wraps any passed content.
   * @default false
   */
  readonly simple?: boolean;
  /**
   * The `accentColor`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof cardColors;
  readonly children: ReactNode | ReactNode[];
}

export function Card({ simple = false, accent, children }: CardProps) {
  const className = classnames(
    styles.card,
    accent && styles.accent,
    accent && cardColors[accent],
  );

  let inside = children;

  if (simple) {
    inside = <CardContent>{children}</CardContent>;
  }

  return <div className={className}>{inside}</div>;
}
