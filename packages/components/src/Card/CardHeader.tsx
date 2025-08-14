import React from "react";
import type { ActionProps, CardProps, HeaderActionProps } from "./types";
import styles from "./Card.module.css";
import { Heading } from "../Heading";
import { Button, type ButtonProps } from "../Button";
import { Menu, type MenuProps } from "../Menu";

/**
 * Intended to be used in the Card component.
 * Use `<Card header={header} />` component instead.
 */
export function CardHeader({
  title,
  header,
}: Pick<CardProps, "title" | "header">) {
  const heading = title || header;

  if (React.isValidElement(heading)) return <>{heading}</>;

  if (heading) {
    const titleString =
      typeof heading === "string"
        ? heading
        : (heading as HeaderActionProps).title;

    return (
      <div className={styles.header}>
        {titleString && <Heading level={2}>{titleString}</Heading>}
        {typeof heading === "object" &&
          renderHeaderAction((heading as HeaderActionProps)?.action)}
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
