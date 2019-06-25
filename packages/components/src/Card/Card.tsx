import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
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

interface LinkCardProps extends CardProps {
  href: string;
}

interface ClickableCardProps extends CardProps {
  onClick(): void;
}

type CardPropOptions = XOR<CardProps, XOR<LinkCardProps, ClickableCardProps>>;

export function Card({ accent, children, href, onClick }: CardPropOptions) {
  const className = classnames(
    styles.card,
    accent && styles.accent,
    (href || onClick) && styles.clickable,
    accent && cardColors[accent],
  );

  interface InternalProps {
    children: ReactNode | ReactNode[];
    className: string;
    href?: string;
    onClick?(): void;
  }

  const Tag = href ? "a" : "div";
  const props: InternalProps = { children, className };

  if (href) {
    props.href = href;
  }

  if (onClick) {
    props.onClick = onClick;
  }

  return <Tag {...props} />;
}

<Card>Foo</Card>;
