import classnames from "classnames";
import React, { RefObject } from "react";
import { XOR } from "ts-xor";
import { Affix, FormFieldProps, Suffix } from "./FormFieldTypes";
import styles from "./FormField.css";
import { Button } from "../Button";
import { Icon } from "../Icon";

interface AffixLabelProps extends Affix {
  labelRef: RefObject<HTMLDivElement>;
  variation?: "prefix" | "suffix";
}

export function AffixLabel({
  label,
  variation = "prefix",
  labelRef,
}: AffixLabelProps) {
  const affixLabelClass = classnames(styles.affixLabel, {
    [styles.suffix]: variation === "suffix",
  });

  return (
    <div ref={labelRef} className={affixLabelClass}>
      {label}
    </div>
  );
}
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
    [styles.hasAction]: onClick,
  });

  const iconSize = size === "small" ? "small" : "base";

  if (!icon) return <></>;

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
        <Icon name={icon} size={iconSize} />
      )}
    </div>
  );
}
