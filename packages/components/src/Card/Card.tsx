import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { isEmpty } from "lodash";
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

type HeaderProps = string | HeaderActionProps | ReactNode;

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

  const { showCardHeader, isCustomHeader, titleToDisplay } =
    prepareHeaderVisibility(title, header);

  const cardContent = (
    <>
      {isCustomHeader && header}
      {!isCustomHeader && showCardHeader && (
        <div className={styles.header}>
          <Heading level={3}>{titleToDisplay}</Heading>
          {header &&
            typeof header === "object" &&
            "action" in header &&
            header.action?.label && <Button {...header.action} />}
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

function getHeaderTitle(
  title?: string,
  header?: HeaderProps,
): string | undefined {
  if (header) {
    if (typeof header === "string") {
      return header;
    } else if (typeof header === "object" && "title" in header) {
      return header.title;
    }
  }

  return title;
}

function prepareHeaderVisibility(
  title?: string,
  header?: HeaderProps,
): {
  showCardHeader: boolean;
  isCustomHeader: boolean;
  titleToDisplay: string | undefined;
} {
  let isCustomHeader = false,
    showCardHeader = false;

  if (title || header) {
    showCardHeader = true;
  }

  if (
    header &&
    !isEmpty(header) &&
    typeof header === "object" &&
    !("title" in header) &&
    !("action" in header)
  ) {
    isCustomHeader = true;
  }

  return {
    showCardHeader: showCardHeader,
    isCustomHeader: isCustomHeader,
    titleToDisplay: getHeaderTitle(title, header),
  };
}
