import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import styles from "./Autocomplete.module.css";
import { isGroup } from "./Autocomplete.utils";
import { AnyOption, Option } from "./Autocomplete.types";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Icon } from "../Icon";

export interface MenuOptionProps {
  readonly isHighlighted: boolean;
  readonly option: AnyOption;
  readonly onOptionSelect: (option: AnyOption) => void;
  readonly addSeparators: boolean;
  readonly isSelected: boolean;
}

export function MenuOption({
  isHighlighted,
  option,
  onOptionSelect,
  isSelected,
  addSeparators,
}: MenuOptionProps) {
  if (isGroup(option)) {
    return <MenuOptionGroup option={option} />;
  }

  return (
    <BaseMenuOption
      option={option}
      isHighlighted={isHighlighted}
      onOptionSelect={onOptionSelect}
      addSeparators={addSeparators}
    >
      <MenuOptionContent option={option} isSelected={isSelected} />
    </BaseMenuOption>
  );
}

export function MenuOptionContent({
  option,
  isSelected,
}: {
  readonly option: Option;
  readonly isSelected: boolean;
}) {
  return (
    <>
      <div className={styles.icon}>
        {isSelected && <Icon name="checkmark" size="small" />}
      </div>
      <div className={styles.text}>
        <div className={styles.label}>
          <Text>{option.label}</Text>
          {option.description !== undefined && (
            <Text variation="subdued">{option.description}</Text>
          )}
        </div>
        {option.details !== undefined && (
          <div className={styles.details}>
            <Text>{option.details}</Text>
          </div>
        )}
      </div>
    </>
  );
}

export function MenuOptionGroup({ option }: { readonly option: AnyOption }) {
  return (
    <div className={styles.heading}>
      <Heading level={5}>{option.label}</Heading>
    </div>
  );
}

export interface BaseMenuOptionProps<
  GenericOption extends AnyOption = AnyOption,
> extends PropsWithChildren {
  readonly option: GenericOption;
  readonly onOptionSelect: (option: GenericOption) => void;
  readonly isHighlighted: boolean;
  readonly addSeparators: boolean;
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
}: BaseMenuOptionProps<GenericOption>) {
  const optionClass = classnames(styles.option, {
    [styles.active]: isHighlighted,
    [styles.separator]: addSeparators,
  });

  return (
    <button
      className={optionClass}
      onMouseDown={onOptionSelect.bind(undefined, option)}
    >
      {children}
    </button>
  );
}
