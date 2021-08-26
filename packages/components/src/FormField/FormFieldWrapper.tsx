import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { Affix, FormFieldProps, Suffix } from "./FormFieldTypes";
import styles from "./FormField.css";
import { InputValidation } from "../InputValidation";
import { Icon } from "../Icon";
import { Button } from "../Button";

interface FormFieldWrapperProps extends FormFieldProps {
  error: string;
  identifier: string;
}

interface LabelPadding {
  paddingLeft: number | string | undefined;
  paddingRight: number | string | undefined;
}

export function FormFieldWrapper({
  align,
  placeholder,
  value,
  children,
  invalid,
  error,
  size,
  prefix,
  suffix,
  max,
  maxLength,
  type,
  disabled,
  inline,
  identifier,
}: PropsWithChildren<FormFieldWrapperProps>) {
  const wrapperClasses = classnames(
    styles.wrapper,
    size && styles[size],
    align && styles[align],
    {
      [styles.miniLabel]:
        (placeholder && value !== "") || (placeholder && type === "select"),
      [styles.textarea]: type === "textarea",
      [styles.invalid]: invalid ?? error,
      [styles.disabled]: disabled,
      [styles.inline]: inline,
      [styles.maxLength]: maxLength,
      [styles.select]: type === "select",
    },
  );

  const wrapperInlineStyle = {
    ["--formField-maxLength" as string]: maxLength || max,
  };

  const prefixRef = useRef() as RefObject<HTMLDivElement>;
  const suffixRef = useRef() as RefObject<HTMLDivElement>;

  const [labelStyle, setLabelStyle] = useState<LabelPadding>({
    paddingLeft: undefined,
    paddingRight: undefined,
  });

  useEffect(() => {
    setLabelStyle(getAffixPaddding);
  }, [value]);

  return (
    <>
      <div className={wrapperClasses} style={wrapperInlineStyle}>
        {prefix?.icon && <AffixIcon {...prefix} size={size} />}
        <div className={styles.inputWrapper}>
          <label
            className={styles.label}
            htmlFor={identifier}
            style={
              prefixRef?.current || suffixRef?.current ? labelStyle : undefined
            }
          >
            {placeholder}
          </label>
          {prefix?.label && <AffixLabel {...prefix} labelRef={prefixRef} />}
          {children}
          {suffix?.label && (
            <AffixLabel {...suffix} labelRef={suffixRef} variation="suffix" />
          )}
        </div>
        {suffix?.icon && (
          <AffixIcon {...suffix} variation="suffix" size={size} />
        )}
      </div>
      {error && !inline && <InputValidation message={error} />}
    </>
  );

  function getAffixPaddding() {
    const newPadding: LabelPadding = {
      paddingLeft: undefined,
      paddingRight: undefined,
    };

    if (prefixRef?.current) {
      const { offsetWidth } = prefixRef?.current;
      newPadding.paddingLeft =
        value !== ""
          ? undefined
          : `calc(${offsetWidth}px + var(--space-small))`;
    }

    if (suffixRef?.current) {
      const { offsetWidth } = suffixRef?.current;
      newPadding.paddingRight =
        value !== ""
          ? undefined
          : `calc(${offsetWidth}px + var(--space-small))`;
    }

    return newPadding;
  }
}

interface AffixLabelProps extends Affix {
  labelRef: RefObject<HTMLDivElement>;
  variation?: "prefix" | "suffix";
}

function AffixLabel({
  label,
  variation = "prefix",
  labelRef,
}: AffixLabelProps) {
  const affixLabelClass = classnames(styles.affixLabel, styles[variation]);

  return (
    <div ref={labelRef} className={affixLabelClass}>
      {label}
    </div>
  );
}
interface AffixIconProps extends Pick<FormFieldProps, "size"> {
  readonly variation?: "prefix" | "suffix";
}

function AffixIcon({
  icon,
  onClick,
  variation = "prefix",
  size,
}: AffixIconProps & XOR<Affix, Suffix>) {
  const affixIconClass = classnames(styles.affixIcon, styles[variation], {
    [styles.hasAction]: onClick,
  });

  const iconSize = size === "small" ? "small" : "base";

  if (!icon) return <></>;

  return (
    <div className={affixIconClass}>
      {onClick ? (
        <Button
          ariaLabel="Input action"
          icon={icon}
          onClick={onClick}
          type="tertiary"
          size={iconSize}
        />
      ) : (
        <Icon name={icon} size={iconSize} color="greyBlue" />
      )}
    </div>
  );
}
