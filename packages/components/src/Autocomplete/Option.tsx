import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import styles from "./Autocomplete.module.css";
import { isOptionGroup } from "./Autocomplete.utils";
import { AnyOption, Option } from "./Autocomplete.types";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Icon } from "../Icon";

export interface MenuOptionProps {
  readonly isHighlighted: boolean;
  readonly option: AnyOption;
  readonly onOptionSelect: (option?: AnyOption) => void;
  /**
   * Whether to add separators between the options.
   */
  readonly addSeparators: boolean;
  readonly isSelected: boolean;
  readonly UNSAFE_className?: {
    option?: BaseMenuOptionProps["UNSAFE_className"];
    content?: MenuOptionContentProps["UNSAFE_className"];
    groupOption?: MenuGroupOptionProps["UNSAFE_className"];
  };
  readonly UNSAFE_style?: {
    option?: BaseMenuOptionProps["UNSAFE_style"];
    content?: MenuOptionContentProps["UNSAFE_style"];
    groupOption?: MenuGroupOptionProps["UNSAFE_style"];
  };
}

/**
 * The rendering of the default MenuOption
 */
export function MenuOption({
  isHighlighted,
  option,
  onOptionSelect,
  isSelected,
  addSeparators,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: MenuOptionProps) {
  if (isOptionGroup(option)) {
    return (
      <MenuGroupOptions
        UNSAFE_className={UNSAFE_className.groupOption}
        option={option}
        UNSAFE_style={UNSAFE_style.groupOption}
      />
    );
  }

  return (
    <BaseMenuOption
      UNSAFE_className={UNSAFE_className.option}
      UNSAFE_style={UNSAFE_style.option}
      option={option}
      isHighlighted={isHighlighted}
      onOptionSelect={onOptionSelect}
      addSeparators={addSeparators}
    >
      <MenuOptionContent
        option={option}
        isSelected={isSelected}
        UNSAFE_className={UNSAFE_className.content}
        UNSAFE_style={UNSAFE_style.content}
      />
    </BaseMenuOption>
  );
}
interface MenuOptionContentProps {
  readonly UNSAFE_className?: {
    readonly icon?: string;
    readonly text?: string;
    readonly details?: string;
    readonly label?: string;
  };
  readonly UNSAFE_style?: {
    readonly icon?: React.CSSProperties;
    readonly text?: React.CSSProperties;
    readonly label?: React.CSSProperties;
    readonly details?: React.CSSProperties;
  };
  readonly option: Option;
  readonly isSelected: boolean;
}

export function MenuOptionContent({
  option,
  isSelected,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: MenuOptionContentProps) {
  const iconClassName = classnames(styles.icon, UNSAFE_className.icon);
  const textClassName = classnames(styles.text, UNSAFE_className.text);
  const labelClassName = classnames(styles.label, UNSAFE_className.label);
  const detailsClassName = classnames(styles.details, UNSAFE_className.details);

  return (
    <>
      <div className={iconClassName} style={UNSAFE_style.icon}>
        {isSelected && <Icon name="checkmark" size="small" />}
      </div>
      <div className={textClassName} style={UNSAFE_style.text}>
        <div className={labelClassName} style={UNSAFE_style.label}>
          <Text>{option.label}</Text>
          {option.description !== undefined && (
            <Text variation="subdued">{option.description}</Text>
          )}
        </div>
        {option.details !== undefined && (
          <div className={detailsClassName} style={UNSAFE_style.details}>
            <Text>{option.details}</Text>
          </div>
        )}
      </div>
    </>
  );
}

export interface MenuGroupOptionProps {
  readonly option: AnyOption;
  readonly UNSAFE_className?: { heading?: string };
  readonly UNSAFE_style?: { heading?: React.CSSProperties };
}

/**
 * The rendering of the default MenuGroupOption
 */
export function MenuGroupOptions({
  option,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: MenuGroupOptionProps) {
  return (
    <BaseMenuGroupOption
      UNSAFE_className={UNSAFE_className.heading}
      UNSAFE_style={UNSAFE_style.heading}
    >
      <Heading level={5}>{option.label}</Heading>
    </BaseMenuGroupOption>
  );
}

/**
 * The base component for the MenuGroupOption
 */
export interface BaseMenuGroupOptionProps extends PropsWithChildren {
  readonly UNSAFE_className?: string;
  readonly UNSAFE_style?: React.CSSProperties;
}

export function BaseMenuGroupOption({
  children,
  UNSAFE_className = "",
  UNSAFE_style = {},
}: BaseMenuGroupOptionProps) {
  const headingClassName = classnames(styles.heading, UNSAFE_className);

  return (
    <div className={headingClassName} style={UNSAFE_style}>
      {children}
    </div>
  );
}

export interface BaseMenuOptionProps<
  GenericOption extends AnyOption = AnyOption,
> extends PropsWithChildren {
  readonly option?: GenericOption;
  readonly onOptionSelect?: (option?: GenericOption) => void;
  readonly isHighlighted: boolean;
  readonly addSeparators: boolean;
  readonly UNSAFE_className?: string;
  readonly UNSAFE_style?: React.CSSProperties;
}

/**
 * Renders the base option component. The component takes children and renders them inside a button.
 */
export function BaseMenuOption<GenericOption extends AnyOption = AnyOption>({
  option,
  isHighlighted,
  onOptionSelect,
  addSeparators,
  children,
  UNSAFE_className = "",
  UNSAFE_style = {},
}: BaseMenuOptionProps<GenericOption>) {
  const optionClass = classnames(
    styles.option,
    {
      [styles.active]: isHighlighted,
      [styles.separator]: addSeparators,
    },
    UNSAFE_className,
  );

  return (
    <button
      role="option"
      type="button"
      className={optionClass}
      data-autocomplete-menu
      onMouseDown={onOptionSelect?.bind(undefined, option)}
      style={UNSAFE_style}
    >
      {children}
    </button>
  );
}
