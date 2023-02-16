import React from "react";
import { ActionProps, CardProps } from "./types";
import { Heading } from "../Heading";
import { Button, ButtonProps } from "../Button";
import { Menu, MenuProps } from "../Menu";

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
  if (typeof header === "string") {
    return (
      <div className={className}>
        {header && <Heading level={3}>{header}</Heading>}
      </div>
    );
  }
  // header is a custom component
  if (React.isValidElement(header)) {
    return header;
  }
  // header is an action
  if (header?.action) {
    return (
      <div className={className}>
        {header?.title && <Heading level={3}>{header?.title}</Heading>}
        {renderHeaderAction(header.action)}
      </div>
    );
  }

  return <></>;
}

function renderHeaderAction(action: ActionProps) {
  if (action.type === Button) {
    const props: ButtonProps = {
      type: "tertiary",
      ...action.props,
      size: "small",
    } as ButtonProps;
    return action && <Button {...props} />;
  }

  if (action.type === Menu) {
    return action && <Menu {...(action.props as MenuProps)} />;
  }
  return <></>;
}
