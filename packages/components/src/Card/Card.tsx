import React, { ReactElement } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Card.module.css";
import colors from "./cardcolors.module.css";
import elevations from "./CardElevations.module.css";
import { CardClickable } from "./CardClickable";
import { CardHeader } from "./CardHeader";
import {
  CardBodyProps,
  CardCompositionProps,
  CardHeaderProps,
  CardProps,
  HeaderActionProps,
} from "./types";

interface LinkCardProps extends CardProps {
  /**
   * URL that the card would navigate to once clicked.
   */
  url: string;

  /**
   * Makes the URL open in new tab on click.
   */
  external?: boolean;
}

interface ClickableCardProps extends CardProps {
  onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void;
}

type CardPropOptions = XOR<CardProps, XOR<LinkCardProps, ClickableCardProps>>;

function CardHeaderComponent({ children }: CardHeaderProps) {
  return <>{children}</>;
}

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

function CardComponent({
  accent,
  header,
  children,
  onClick,
  title,
  url,
  external = false,
  elevation = "none",
}: CardPropOptions) {
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
      (child.type === CardHeaderComponent || child.type === CardBodyComponent),
  );

  const content = isUsingCompoundPattern
    ? children
    : renderCardContent(children, title, header);

  return renderCardWrapper(className, content, onClick, url, external);
}

const Card = CardComponent as React.FC<CardPropOptions> & CardCompositionProps;

Card.Header = CardHeaderComponent;
Card.Body = CardBodyComponent;

export { Card };
