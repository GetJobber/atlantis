import type { ReactElement } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./Card.module.css";
import colors from "./cardcolors.module.css";
import elevations from "./CardElevations.module.css";
import { CardClickable } from "./CardClickable";
import { CardHeader } from "./CardHeader";
import type {
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
  readonly external?: never;
};

/**
 * Props for a regular card without any click behavior.
 */
type RegularCardProps = CardProps & {
  url?: never;
  onClick?: never;
  readonly external?: never;
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
function CardHeaderCompoundComponent({ children }: CardHeaderProps) {
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
function CardBodyCompoundComponent({ children }: CardBodyProps) {
  return <>{children}</>;
}

function renderCardContent(
  children: React.ReactNode,
  title?: string,
  header?: string | HeaderActionProps | ReactElement,
  UNSAFE_className?: { header?: string },
  UNSAFE_style?: { header?: React.CSSProperties },
) {
  return (
    <>
      <CardHeader
        title={title}
        header={header}
        UNSAFE_className={{ header: UNSAFE_className?.header }}
        UNSAFE_style={{ header: UNSAFE_style?.header }}
      />
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
  UNSAFE_className?: string,
  UNSAFE_style?: React.CSSProperties,
) {
  const combinedClassName = classnames(className, UNSAFE_className);

  if (onClick) {
    return (
      <CardClickable
        className={combinedClassName}
        onClick={onClick}
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      >
        {content}
      </CardClickable>
    );
  }

  if (url) {
    return (
      <a
        className={combinedClassName}
        href={url}
        style={UNSAFE_style}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={combinedClassName} style={UNSAFE_style}>
      {content}
    </div>
  );
}

export function Card(props: CardPropOptions) {
  const {
    accent,
    header,
    children,
    title,
    elevation = "none",
    onClick,
    url,
    external,
    UNSAFE_className = {},
    UNSAFE_style = {},
  } = props;

  const className = classnames(
    styles.card,
    accent && styles.accent,
    (url || onClick) && styles.clickable,
    accent && colors[accent],
    elevation !== "none" && elevations[`${elevation}Elevation`],
  );

  const isUsingCompoundPattern = React.Children.toArray(children).some(
    child =>
      React.isValidElement(child) &&
      (child.type === CardHeaderCompoundComponent ||
        child.type === CardBodyCompoundComponent),
  );

  const content = isUsingCompoundPattern
    ? children
    : renderCardContent(
        children,
        title,
        header,
        UNSAFE_className,
        UNSAFE_style,
      );

  return renderCardWrapper(
    className,
    content,
    onClick,
    url,
    external,
    UNSAFE_className.container,
    UNSAFE_style.container,
  );
}

Card.Header = CardHeaderCompoundComponent;
Card.Body = CardBodyCompoundComponent;
