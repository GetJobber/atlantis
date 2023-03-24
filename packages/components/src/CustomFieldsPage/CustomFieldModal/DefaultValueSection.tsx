import classnames from "classnames";
import React from "react";
import styles from "./CustomFieldModal.css";
import { useCustomFieldFormValueState } from "./useCustomFieldFormValueState";
import { Button } from "../../Button";
import { InputGroup } from "../../InputGroup";
import { InputNumber } from "../../InputNumber";
import { InputText } from "../../InputText";
import { Option, Select } from "../../Select";
import {
  CustomFieldConfigurationArea,
  CustomFieldConfigurationDropdown,
  CustomFieldConfigurationNumeric,
  CustomFieldConfigurationText,
  CustomFieldConfigurationTrueFalse,
  CustomFieldConfigurationValueType,
} from "../__fixtureMockTypes";

interface DefaultValueProps {
  formValueState: ReturnType<typeof useCustomFieldFormValueState>;
}
export function DefaultValueSection({ formValueState }: DefaultValueProps) {
  const valueType = formValueState.valueType;

  if (valueType == CustomFieldConfigurationValueType.NUMERIC) {
    return <DefaultValueNumeric formValueState={formValueState} />;
  }
  if (valueType == CustomFieldConfigurationValueType.AREA) {
    return <DefaultValueArea formValueState={formValueState} />;
  }
  if (valueType == CustomFieldConfigurationValueType.DROPDOWN) {
    return <DefaultValueDropDown formValueState={formValueState} />;
  }
  if (valueType == CustomFieldConfigurationValueType.TEXT) {
    return <DefaultValueText formValueState={formValueState} />;
  }
  if (valueType == CustomFieldConfigurationValueType.TRUE_FALSE) {
    return <DefaultValueTrueFalse formValueState={formValueState} />;
  }

  return <></>;
}

function DefaultValueNumeric({ formValueState }: DefaultValueProps) {
  return (
    <>
      <InputGroup flowDirection="horizontal">
        <InputNumber
          name={"defaultValueNumericNumber"}
          placeholder="Default Value"
          value={formValueState.defaultValue as number}
          onChange={value =>
            formValueState.setDefaultValue((value || 0) as number)
          }
        />
        <InputText
          name={"defaultValueNumericUnit"}
          placeholder="Unit"
          value={formValueState.unit as string}
          onChange={value =>
            formValueState.setUnit(
              value as CustomFieldConfigurationNumeric["unit"],
            )
          }
        />
      </InputGroup>
    </>
  );
}

function DefaultValueArea({ formValueState }: DefaultValueProps) {
  const defaultValue = formValueState.defaultValue as
    | CustomFieldConfigurationArea["defaultValue"]
    | undefined;

  return (
    <>
      <label>Default values</label>
      <InputGroup flowDirection="horizontal">
        <InputNumber
          name={"defaultValueAreaLength"}
          placeholder="Length"
          value={defaultValue?.length}
          onChange={value =>
            formValueState.setDefaultValue({
              length: value as number,
              width: defaultValue?.width || 0,
            })
          }
        />
        <InputNumber
          name={"defaultValueAreaWidth"}
          placeholder="Width"
          value={defaultValue?.width}
          onChange={value =>
            formValueState.setDefaultValue({
              length: defaultValue?.length || 0,
              width: value as number,
            })
          }
        />
        <InputText
          name={"defaultValueAreaUnit"}
          placeholder="Unit"
          value={formValueState.unit as string}
          onChange={value =>
            formValueState.setUnit(
              value as CustomFieldConfigurationArea["unit"],
            )
          }
        />
      </InputGroup>
    </>
  );
}

function DefaultValueText({ formValueState }: DefaultValueProps) {
  return (
    <>
      <InputText
        name={"defaultValueText"}
        placeholder="Default value"
        value={formValueState.defaultValue as string}
        onChange={value =>
          formValueState.setDefaultValue(
            value as CustomFieldConfigurationText["defaultValue"],
          )
        }
      />
    </>
  );
}

function DefaultValueTrueFalse({ formValueState }: DefaultValueProps) {
  const defaultValue =
    formValueState.defaultValue == undefined
      ? undefined
      : JSON.stringify(formValueState.defaultValue);

  return (
    <>
      <label>Default value</label>
      <Select
        name="defaultValueTrueFalse"
        value={defaultValue}
        onChange={value =>
          formValueState.setDefaultValue(
            JSON.parse(
              value as string,
            ) as CustomFieldConfigurationTrueFalse["defaultValue"],
          )
        }
      >
        <Option value={"true"}>Yes</Option>
        <Option value={"false"}>No</Option>
      </Select>
    </>
  );
}

function DefaultValueDropDown({ formValueState }: DefaultValueProps) {
  const dropdownOptions =
    formValueState.dropdownOptions == undefined
      ? undefined
      : (JSON.parse(
          JSON.stringify(formValueState.dropdownOptions),
        ) as CustomFieldConfigurationDropdown["dropdownOptions"]);
  const options = dropdownOptions || ["", ""];

  function onOptionChange(index: number, option: string) {
    options[index] = option;
    formValueState.setDropdownOptions(options);
    formValueState.setDefaultValue(options[0]);
  }

  function onOptionAdded() {
    options.push("");
    formValueState.setDropdownOptions(options);
    formValueState.setDefaultValue(options[0]);
  }

  return (
    <>
      <label>Options for dropdown</label>
      <ol className={classnames(styles.dropdownOptionsOrderedList)}>
        {options.map((option, index) => (
          <li key={`dropdownOptionsInput${index}`}>
            <InputText
              name={`dropdownOptionsInput${index}`}
              placeholder={index == 0 ? "Default option" : "Option"}
              value={options[index]}
              onChange={value => onOptionChange(index, value as string)}
            />
          </li>
        ))}
      </ol>
      <Button
        label="Add Another Option"
        size="small"
        variation="subtle"
        onClick={onOptionAdded}
      />
    </>
  );
}
