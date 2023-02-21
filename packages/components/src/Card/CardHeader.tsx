import React from "react";
import { ActionProps, CardProps } from "./types";
import styles from "./Card.css";
import { Heading } from "../Heading";
import { Button, ButtonProps } from "../Button";
import { Menu, MenuProps } from "../Menu";

/**
 * Intended to be used in the Card component.
 * Use `<Card header={header} />` component instead.
 */
export function CardHeader({
  title,
  header,
}: Pick<CardProps, "title" | "header">) {
  if (title || typeof header === "string") {
    return (
      <div className={styles.header}>
        {<Heading level={3}>{title || header}</Heading>}
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
      <div className={styles.header}>
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
