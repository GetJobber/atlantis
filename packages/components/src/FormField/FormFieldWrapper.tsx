import React, { PropsWithChildren, RefObject, useRef } from "react";
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

  // const [labelStyle, setLabelStyle] = useState(getAffixPaddding);

  // useEffect(() => {
  //   setLabelStyle(getAffixPaddding);
  // }, [value]);

  return (
    <>
      <div className={wrapperClasses} style={wrapperInlineStyle}>
        {prefix?.icon && <AffixIcon {...prefix} size={size} />}
        <div className={styles.inputWrapper}>
          {prefix?.label && <AffixLabel {...prefix} labelRef={prefixRef} />}
          <label
            className={styles.label}
            htmlFor={identifier}
            // style={labelStyle}
          >
            {placeholder}
          </label>
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

  // function getAffixPaddding() {
  //   if(!prefix, po)
  //   return value !== ""
  //     ? { paddingLeft: 0, paddingRight: 0 }
  //     : {
  //         paddingLeft: prefixRef?.current?.offsetWidth,
  //         paddingRight: suffixRef?.current?.offsetWidth,
  //       };
  // }
}

interface AffixLabelProps extends Affix {
  labelRef: RefObject<HTMLDivElement>;
  variation?: "prefix" | "suffix";
}

function AffixLabel({ label, variation, labelRef }: AffixLabelProps) {
  const affixLabelClass = classnames(styles.affixLabel, {
    [styles.affixSuffix]: variation === "suffix",
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

function AffixIcon({
  icon,
  onClick,
  variation,
  size,
}: AffixIconProps & XOR<Affix, Suffix>) {
  const affixIconClass = classnames(styles.affixIcon, {
    [styles.affixSuffix]: variation === "suffix",
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
          type="secondary"
          size={iconSize}
        />
      ) : (
        <Icon name={icon} size={iconSize} />
      )}
    </div>
  );
}
