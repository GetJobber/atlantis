import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { useChildComponent } from "../../hooks";
import styles from "../../Chip.css";

export function ChipSuffix({
  children,
  className,
  onClick: onClickSuffix,
  testID,
  ariaLabel,
}: ChipSuffixProps) {
  let singleChild = useChildComponent(children, d => d.type === Icon);

  if (!allowedSuffixIcons.includes(singleChild?.props?.name)) {
    singleChild = undefined;
  }

  if (onClickSuffix) {
    return (
      <button
        className={styles.clickableSuffix}
        onClick={event => {
          event.stopPropagation();
          onClickSuffix(event);
        }}
        data-testid={testID}
        aria-label={ariaLabel}
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
  readonly ariaLabel?: string;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const allowedSuffixIcons = ["cross", "add", "checkmark", "arrowDown"];
