import { useState } from "react";
import { CustomFieldOrCustomFieldInitialValues } from "./useHandleSave";
import {
  CustomFieldAppliesTo,
  CustomFieldConfiguration,
  CustomFieldConfigurationArea,
  CustomFieldConfigurationDropdown,
  CustomFieldConfigurationNumeric,
  CustomFieldConfigurationValueType,
} from "../__fixtureMockTypes";

export function useCustomFieldFormValueState(
  initialValues: CustomFieldOrCustomFieldInitialValues,
) {
  const [appliesTo, setAppliesTo] = useState<CustomFieldAppliesTo>(
    initialValues.appliesTo || CustomFieldAppliesTo.ALL_CLIENTS,
  );

  const [transferable, setTransferable] = useState<boolean>(
    initialValues.transferable || false,
  );

  const [name, setName] = useState<string>(initialValues.name || "");
  const [valueType, setValueType] = useState<CustomFieldConfigurationValueType>(
    initialValues.valueType || CustomFieldConfigurationValueType.TEXT,
  );
  const [defaultValue, setDefaultValue] = useState<
    CustomFieldConfiguration["defaultValue"] | undefined
  >(initialValues.defaultValue || undefined);

  const [unit, setUnit] = useState<
    | CustomFieldConfigurationNumeric["unit"]
    | CustomFieldConfigurationArea["unit"]
    | undefined
  >(getInitialUnit(initialValues));

  const [dropdownOptions, setDropdownOptions] = useState<
    CustomFieldConfigurationDropdown["dropdownOptions"] | undefined
  >(getInitialDropdownOptions(initialValues));

  return {
    setAppliesTo,
    setTransferable,
    setName,
    setValueType,
    setDefaultValue,
    setUnit,
    setDropdownOptions,
    appliesTo,
    transferable,
    name,
    valueType,
    defaultValue,
    unit,
    dropdownOptions,
  };
}

function getInitialUnit(initialValues: Partial<CustomFieldConfiguration>) {
  if (
    initialValues.__typename == "CustomFieldConfigurationNumeric" ||
    initialValues.__typename == "CustomFieldConfigurationArea"
  ) {
    return initialValues.unit;
  }

  return undefined;
}

function getInitialDropdownOptions(
  initialValues: Partial<CustomFieldConfiguration>,
) {
  if (initialValues.__typename == "CustomFieldConfigurationDropdown") {
    return initialValues.dropdownOptions;
  }

  return undefined;
}
