import classnames from "classnames";
import React from "react";
import styles from "./CustomFieldItem.css";
import {
  CustomFieldConfiguration,
  CustomFieldConfigurationArea,
  CustomFieldConfigurationDropdown,
  CustomFieldConfigurationNumeric,
  CustomFieldConfigurationValueType,
} from "../__fixtureMockTypes";
import { Icon } from "../../Icon";
import { InlineLabel } from "../../InlineLabel";
import { Text } from "../../Text";

export interface CustomFieldItemProps {
  customField: CustomFieldConfiguration;
  onEditCustomField: (customField: CustomFieldConfiguration) => void;
}
export function CustomFieldItem({
  customField,
  onEditCustomField,
}: CustomFieldItemProps) {
  return (
    <div
      key={`CustomFieldItem${customField.id}`}
      className={classnames(styles.customFieldItemContainer)}
    >
      <div className={classnames(styles.customFieldItemDragAnchor)}>
        <Icon name="sort" />
      </div>
      <div className={classnames(styles.customFieldItemContentArea)}>
        <div className={classnames(styles.customFieldItemName)}>
          <a onClick={() => onEditCustomField(customField)}>
            {customField.name}
          </a>
        </div>
        <div className={classnames(styles.customFieldItemDescription)}>
          <CustomFieldDescription customField={customField} />
        </div>
      </div>
    </div>
  );
}

function CustomFieldDescription({
  customField,
}: Pick<CustomFieldItemProps, "customField">) {
  return (
    <Text>
      {customField.transferable && <InlineLabel> Transferable </InlineLabel>}{" "}
      {getDescription(customField)}
    </Text>
  );
}

// eslint-disable-next-line max-statements
function getDescription(customField: CustomFieldConfiguration) {
  if (customField.valueType === CustomFieldConfigurationValueType.LINK) {
    return `Stores a link`;
  }

  if (customField.valueType === CustomFieldConfigurationValueType.TRUE_FALSE) {
    return `Stores a true or false value`;
  }

  if (customField.valueType === CustomFieldConfigurationValueType.TEXT) {
    return `Stores a text value`;
  }

  if (customField.valueType === CustomFieldConfigurationValueType.AREA) {
    return `Stores an area in square ${
      (customField as CustomFieldConfigurationArea).unit
    }s`;
  }

  if (customField.valueType === CustomFieldConfigurationValueType.DROPDOWN) {
    // TODO: WE MIGHT NEED TO ADD BLANKS TO THIS LIST
    return `Can hold one of the following ${(
      customField as CustomFieldConfigurationDropdown
    ).dropdownOptions.join(",")}`;
  }

  if (customField.valueType === CustomFieldConfigurationValueType.NUMERIC) {
    return `Stores the number of ${
      (customField as CustomFieldConfigurationNumeric).unit
    }s`;
  }

  return "Stores a value " + customField.valueType;
}
