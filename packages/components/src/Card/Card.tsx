import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Card.css";
import cardColors from "./CardColors.css";

interface CardSectionProps {
  readonly children: ReactNode;
}

function CardHeader(props: CardSectionProps) {
  const className = classnames(styles.header, styles.fill);

  return <div className={className} {...props} />;
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
      <span className={styles.title}>{title}</span>
    </CardHeader>
  );
}

interface CardProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof cardColors;
  readonly children: ReactNode | ReactNode[];
}

export function Card({ accent, children }: CardProps) {
  const className = classnames(
    styles.card,
    accent && styles.accent,
    accent && cardColors[accent],
  );

  return <div className={className}>{children}</div>;
}
