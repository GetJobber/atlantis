import React from "react";
import { CardProps } from ".";
import { Heading } from "../Heading";
import { Button, ButtonProps } from "../Button";

interface CardHeaderProps extends Pick<CardProps, "title" | "header"> {
  className: string;
}

/**
 * Intended to be used in the Card component.
 * Use `<Card header={header} />` component instead.
 */
export function CardHeader({ className, title, header }: CardHeaderProps) {
  // Case 1: Deprecated Title
  if (title) {
    return (
      <div className={className}>
        {title && <Heading level={3}>{title}</Heading>}
      </div>
    );
  }
  // Case 2: String Header
  if (typeof header === "string") {
    return (
      <div className={className}>
        {header && <Heading level={3}>{header}</Heading>}
      </div>
    );
  }
  // Case 3: Custom Header
  if (React.isValidElement(header)) {
    return header;
  }
  // Case 4: Default Header Props
  if (header) {
    const props: ButtonProps = {
      type: "tertiary",
      ...header.action,
      size: "small",
    } as ButtonProps;

    return (
      <div className={className}>
        {header?.title && <Heading level={3}>{header?.title}</Heading>}
        {header?.action && <Button {...props} />}
      </div>
    );
  }
  return <></>;
}
