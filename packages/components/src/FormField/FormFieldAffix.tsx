import React from "react";
import type { RefObject } from "react";
import classnames from "classnames";
import type { XOR } from "ts-xor";
import type { Affix, FormFieldProps, Suffix } from "./FormFieldTypes";
import styles from "./FormField.module.css";
import { Button } from "../Button";
import { Icon } from "../Icon";

interface AffixLabelProps extends Affix {
  readonly labelRef: RefObject<HTMLDivElement | null>;
  readonly variation?: "prefix" | "suffix";
}

/**
 * @internal Reach out to UX Foundations if using this component since it is possible it might change
 */
export function AffixLabel({
  label,
  variation = "prefix",
  labelRef,
}: AffixLabelProps) {
  const affixLabelClass = classnames(styles.affixLabel, {
    [styles.suffix]: variation === "suffix",
  });
  if (!label) return null;

  return (
    <div ref={labelRef} className={affixLabelClass}>
      {label}
    </div>
  );
}

/**
 * @internal Reach out to UX Foundations if using this component since it is possible it might change
 */
interface AffixIconProps extends Pick<FormFieldProps, "size"> {
  readonly variation?: "prefix" | "suffix";
}

export function AffixIcon({
  icon,
  onClick,
  ariaLabel,
  variation = "prefix",
  size,
}: AffixIconProps & XOR<Affix, Suffix>) {
  const affixIconClass = classnames(styles.affixIcon, {
    [styles.suffix]: variation === "suffix",
  });

  const iconSize = size === "small" ? "small" : "base";

  if (!icon) return null;

  return (
    <div className={affixIconClass}>
      {onClick ? (
        <Button
          /**
           * We can cast the ariaLabel here as a `Suffix`
           * requires an ariaLabel if there is an action
           */
          ariaLabel={ariaLabel as string}
          icon={icon}
          onClick={onClick}
          variation="subtle"
          type="tertiary"
          size={iconSize}
        />
      ) : (
        <Icon name={icon} size={iconSize} color="greyBlue" />
      )}
    </div>
  );
}
