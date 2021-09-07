import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Card.css";
import colors from "./colors.css";
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

  interface InternalProps {
    className: string;
    href?: string;
    role?: "button";
    tabIndex?: 0;
    onClick?(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void;
  }

  const Tag = url ? "a" : "div";
  const props: InternalProps = { className };

  if (url) {
    props.href = url;
  }

  if (onClick) {
    props.onClick = onClick;
    props.role = "button";
    props.tabIndex = 0;
  }

  return (
    <Tag {...props}>
      {title && <Title title={title} />}
      {children}
    </Tag>
  );
}

interface TitleProps {
  /**
   * The title for the card.
   */
  readonly title: string;
}

function Title({ title }: TitleProps) {
  const className = classnames(styles.header);

  return (
    <div className={className}>
      <Typography
        element="h3"
        size="large"
        textCase="uppercase"
        fontWeight="extraBold"
      >
        {title}
      </Typography>
    </div>
  );
}
