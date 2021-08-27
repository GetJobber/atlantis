import React, { ReactNode, createRef } from "react";
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
  onClick(event: React.MouseEvent<HTMLElement>): void;
}

type CardPropOptions = XOR<CardProps, XOR<LinkCardProps, ClickableCardProps>>;

export function Card({
  accent,
  children,
  onClick,
  title,
  url,
}: CardPropOptions) {
  const cardRef = createRef<HTMLDivElement>();
  const className = classnames(
    styles.card,
    accent && styles.accent,
    (url || onClick) && styles.clickable,
    accent && colors[accent],
  );

  const cardCntent = (
    <>
      {title && <Title title={title} />}
      {children}
    </>
  );

  if (url) {
    return (
      <a className={className} href={url}>
        {cardCntent}
      </a>
    );
  } else {
    return (
      <div
        className={className}
        ref={cardRef}
        onClick={onClick}
        onKeyUp={handleKeyup}
        role="button"
        tabIndex={0}
      >
        {cardCntent}
      </div>
    );
  }

  function handleKeyup(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      cardRef.current?.click();
    }
  }
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
