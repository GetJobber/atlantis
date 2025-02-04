import React from "react";
import classnames from "classnames";
import styles from "./Autocomplete.module.css";
import { AutoCompleteMenuOptionProps, AutocompleteMenuProps } from "./types";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Heading } from "../Heading";

export const AutoCompleteMenuOptionIcon = ({
  isOptionSelected,
  selectedOption,
  option,
}: {
  readonly isOptionSelected: AutoCompleteMenuOptionProps["isOptionSelected"];
  readonly selectedOption: AutoCompleteMenuOptionProps["selectedOption"];
  readonly option: AutoCompleteMenuOptionProps["option"];
}) => {
  return (
    <div className={styles.icon}>
      {isOptionSelected(selectedOption, option) && (
        <Icon name="checkmark" size="small" />
      )}
    </div>
  );
};

export const AutoCompleteMenuOptionLabel = ({
  option,
}: {
  readonly option: AutoCompleteMenuOptionProps["option"];
}) => {
  return (
    <div className={styles.label}>
      <Text>{option?.label}</Text>
      {option?.description !== undefined && (
        <Text variation="subdued">{option.description}</Text>
      )}
    </div>
  );
};

export const AutocompleteMenuOptionDetails = ({
  option,
}: {
  readonly option: AutoCompleteMenuOptionProps["option"];
}) => {
  return (
    <div className={styles.details}>
      <Text>{option?.details}</Text>
    </div>
  );
};

export const AutocompleteMenuOptionTextWrapper = ({
  option,
}: {
  readonly option: AutoCompleteMenuOptionProps["option"];
}) => {
  return (
    <div className={styles.text}>
      <AutoCompleteMenuOptionLabel option={option} />
      {option?.details !== undefined && (
        <AutocompleteMenuOptionDetails option={option} />
      )}
    </div>
  );
};

export const AutocompleteMenuOptionHeading = ({
  option,
}: {
  readonly option: AutoCompleteMenuOptionProps["option"];
}) => {
  return (
    <div key={option?.label} className={styles.heading}>
      <Heading level={5}>{option?.label}</Heading>
    </div>
  );
};

export const AutocompleteMenuOption = ({
  index,
  highlightedIndex,
  addSeparators,
  isGroup,
  option,
  selectedOption,
  isOptionSelected,
  onOptionSelect,
}: AutoCompleteMenuOptionProps) => {
  const optionClass = classnames(styles.option, {
    [styles.active]: index === highlightedIndex,
    [styles.separator]: addSeparators,
  });

  return isGroup(option) ? (
    <AutocompleteMenuOptionHeading option={option} />
  ) : (
    <button
      type="button"
      className={optionClass}
      key={option?.value}
      onMouseDown={onOptionSelect.bind(undefined, option)}
    >
      <AutoCompleteMenuOptionIcon
        selectedOption={selectedOption}
        isOptionSelected={isOptionSelected}
        option={option}
      />
      <AutocompleteMenuOptionTextWrapper option={option} />
    </button>
  );
};

export const AutocompleteMenu = ({
  visible,
  options,
  addSeparators,
  highlightedIndex,
  onOptionSelect,
  selectedOption,
  setMenuRef,
  targetWidth,
  attributes,
  popperStyles,
  isGroup,
  isOptionSelected,
}: AutocompleteMenuProps) => {
  return (
    <div
      className={classnames(styles.options, { [styles.visible]: visible })}
      ref={setMenuRef}
      style={{ ...popperStyles.popper, width: targetWidth }}
      data-elevation={"elevated"}
      {...attributes.popper}
    >
      {options?.map((option, index) => {
        return (
          <AutocompleteMenuOption
            option={option}
            key={index}
            index={index}
            addSeparators={addSeparators}
            highlightedIndex={highlightedIndex}
            onOptionSelect={onOptionSelect}
            selectedOption={selectedOption}
            isGroup={isGroup}
            isOptionSelected={isOptionSelected}
          />
        );
      })}
    </div>
  );
};
