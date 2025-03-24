import React, { ReactElement } from "react";
import classnames from "classnames";
import styles from "./Card.module.css";
import colors from "./cardcolors.module.css";
import elevations from "./CardElevations.module.css";
import { CardClickable } from "./CardClickable";
import { CardHeader } from "./CardHeader";
import {
  CardBodyProps,
  CardHeaderProps,
  CardProps,
  HeaderActionProps,
} from "./types";

/**
 * Props for a card that acts as a link.
 * When url is provided, the card becomes clickable and navigates to the specified URL.
 */
type LinkCardProps = CardProps & {
  /**
   * URL that the card would navigate to once clicked.
   */
  url: string;

  /**
   * Makes the URL open in new tab on click.
   */
  external?: boolean;
  onClick?: never;
};

/**
 * Props for a card that has a click handler.
 * When onClick is provided, the card becomes clickable and triggers the handler on click.
 */
type ClickableCardProps = CardProps & {
  /**
   * Event handler that gets called when the card is clicked.
   */
  onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void;
  url?: never;
};

/**
 * Props for a regular card without any click behavior.
 */
type RegularCardProps = CardProps & {
  url?: never;
  onClick?: never;
};

type CardPropOptions = LinkCardProps | ClickableCardProps | RegularCardProps;

/**
 * Header component for the Card.
 * Used in the compound component pattern to provide a consistent header layout.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Text>Header Content</Text>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content</p>
 *   </Card.Body>
 * </Card>
 * ```
 */
function CardHeaderComponent({ children }: CardHeaderProps) {
  return <>{children}</>;
}

/**
 * Body component for the Card.
 * Used in the compound component pattern to provide a consistent content layout.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Text>Header Content</Text>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content</p>
 *   </Card.Body>
 * </Card>
 * ```
 */
function CardBodyComponent({ children }: CardBodyProps) {
  return <>{children}</>;
}

function renderCardContent(
  children: React.ReactNode,
  title?: string,
  header?: string | HeaderActionProps | ReactElement,
) {
  return (
    <>
      <CardHeader title={title} header={header} />
      {children}
    </>
  );
}

function renderCardWrapper(
  className: string,
  content: React.ReactNode,
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
  ) => void,
  url?: string,
  external?: boolean,
) {
  if (onClick) {
    return (
      <CardClickable className={className} onClick={onClick}>
        {content}
      </CardClickable>
    );
  }

  if (url) {
    return (
      <a
        className={className}
        href={url}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export function Card(props: CardPropOptions) {
  const { accent, header, children, title, elevation = "none" } = props;

  const className = classnames(
    styles.card,
    accent && styles.accent,
    ("url" in props || "onClick" in props) && styles.clickable,
    accent && colors[accent],
    elevation !== "none" && elevations[`${elevation}Elevation`],
  );

  const isUsingCompoundPattern = React.Children.toArray(children).some(
    child =>
      React.isValidElement(child) &&
      (child.type === CardHeaderComponent || child.type === CardBodyComponent),
  );

  const content = isUsingCompoundPattern
    ? children
    : renderCardContent(children, title, header);

  return renderCardWrapper(
    className,
    content,
    "onClick" in props ? props.onClick : undefined,
    "url" in props ? props.url : undefined,
    "url" in props && "external" in props ? props.external : undefined,
  );
}

Card.Header = CardHeaderComponent;
Card.Body = CardBodyComponent;
