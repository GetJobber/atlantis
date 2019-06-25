import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Card.css";
import colors from "./colors.css";

interface CardSectionProps {
  readonly children: ReactNode;
}

function Header(props: CardSectionProps) {
  const className = classnames(styles.header, styles.fill);

  return <div className={className} {...props} />;
}

interface CardTitleProps {
  /**
   * The title for the card.
   */
  readonly title: string;
}

export function Title({ title }: CardTitleProps) {
  return (
    <Header>
      <span className={styles.title}>{title}</span>
    </Header>
  );
}

interface CardProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];
}

interface LinkCardProps extends CardProps {
  url: string;
}

interface ClickableCardProps extends CardProps {
  onClick(): void;
}

type CardPropOptions = XOR<CardProps, XOR<LinkCardProps, ClickableCardProps>>;

export function Card({ accent, children, url, onClick }: CardPropOptions) {
  const className = classnames(
    styles.card,
    accent && styles.accent,
    (url || onClick) && styles.clickable,
    accent && colors[accent],
  );

  interface InternalProps {
    children: ReactNode | ReactNode[];
    className: string;
    href?: string;
    onClick?(): void;
  }

  const Tag = url ? "a" : "div";
  const props: InternalProps = { children, className };

  if (url) {
    props.href = url;
  }

  if (onClick) {
    props.onClick = onClick;
  }

  return <Tag {...props} />;
}
