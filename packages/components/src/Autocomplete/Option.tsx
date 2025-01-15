import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import styles from "./Autocomplete.module.css";
import { isGroup } from "./Autocomplete.utils";
import { AnyOption } from "./Autocomplete.types";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Icon } from "../Icon";

export interface MenuOptionProps {
  readonly isHighlighted: boolean;
  readonly option: AnyOption;
  readonly onOptionSelect: (option: AnyOption) => void;
  readonly isSelected: boolean;
  readonly addSeparators: boolean;
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

function MenuOptionContent({
  option,
  isSelected,
}: {
  readonly option: AnyOption;
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

function MenuOptionGroup({ option }: { readonly option: AnyOption }) {
  return (
    <div className={styles.heading}>
      <Heading level={5}>{option.label}</Heading>
    </div>
  );
}

type BaseMenuOptionProps = PropsWithChildren<
  Omit<MenuOptionProps, "isSelected">
>;

/**
 * Renders the base option component. The component takes children and renders them inside a button.
 */
export function BaseMenuOption({
  option,
  isHighlighted,
  onOptionSelect,
  addSeparators,
  children,
}: BaseMenuOptionProps) {
  const optionClass = classnames(styles.option, {
    [styles.active]: isHighlighted,
    [styles.separator]: addSeparators,
  });

  return (
    <button
      className={optionClass}
      key={option.value}
      onMouseDown={onOptionSelect.bind(undefined, option)}
    >
      {children}
    </button>
  );
}
