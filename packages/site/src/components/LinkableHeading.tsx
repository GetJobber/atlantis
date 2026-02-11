import React from "react";
import classNames from "classnames";
import { Button } from "@jobber/components/Button";
import { showToast } from "@jobber/components/Toast";
import styles from "./LinkableHeading.module.css";

interface LinkableHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  readonly element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const LinkableHeading = ({
  element: Tag,
  children,
  className,
  ...props
}: LinkableHeadingProps) => {
  const isLinkable = props.id?.startsWith("component-view-");
  const urlToCopy = document.location.href + "#" + props.id;

  return (
    <Tag
      {...props}
      className={classNames(
        { [styles.linkableHeading]: isLinkable },
        className,
      )}
    >
      {children}
      {isLinkable && (
        <Button
          icon="copy"
          ariaLabel="Copy"
          size="small"
          type="tertiary"
          variation="subtle"
          UNSAFE_className={{ container: styles.copyButton }}
          onClick={() => {
            navigator.clipboard.writeText(urlToCopy);
            showToast({
              message: `Copied link to clipboard`,
            });
          }}
        />
      )}
    </Tag>
  );
};
