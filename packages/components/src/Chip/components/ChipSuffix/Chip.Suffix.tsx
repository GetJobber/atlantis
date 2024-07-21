import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({
  children,
  className,
  onClick: onSuffixClick,
  testID,
}: ChipSuffixProps) {
  let singleChild = useChildComponent(children, d => d.type === Icon);

  if (!allowedSuffixIcons.includes(singleChild?.props?.name)) {
    singleChild = undefined;
  }

  if (onSuffixClick) {
    return (
      <button
        className={styles.suffixClick}
        onClick={ev => {
          ev.stopPropagation();
          onSuffixClick(ev);
        }}
        data-testid={testID}
      >
        {singleChild}
      </button>
    );
  } else {
    return (
      <span
        className={classNames(
          styles.suffix,
          className,
          !singleChild && styles.empty,
        )}
      >
        {singleChild}
      </span>
    );
  }
}

export interface ChipSuffixProps extends PropsWithChildren {
  readonly className?: string;
  readonly testID?: string;
  readonly onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark", "arrowDown"];
