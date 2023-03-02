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
  const heading = title || header;

  if (React.isValidElement(heading)) return header;
  if (heading) {
    const titleString = typeof heading === "string" ? heading : heading.title;

    return (
      <div className={styles.header}>
        {titleString && <Heading level={3}>{titleString}</Heading>}
        {typeof heading === "object" && renderHeaderAction(heading?.action)}
      </div>
    );
  }

  return <></>;
}

function renderHeaderAction(action?: ActionProps) {
  if (action?.type === Button) {
    const props: ButtonProps = {
      type: "tertiary",
      ...action.props,
      size: "small",
    } as ButtonProps;
    return action && <Button {...props} />;
  }

  if (action?.type === Menu) {
    return action && <Menu {...(action.props as MenuProps)} />;
  }

  return <></>;
}
