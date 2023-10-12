import React, { Fragment, useReducer } from "react";
import { View } from "react-native";
import isEmpty from "lodash/isEmpty";
import reduce from "lodash/reduce";
import { XOR } from "ts-xor";
import { styles } from "./CheckboxGroup.style";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { CheckboxElement, CheckboxGroupState } from "./types";
import {
  checkboxGroupReducer,
  initCheckboxGroupState,
} from "./CheckboxGroupReducer";
import { FormField } from "../FormField";
import { Divider } from "../Divider";

interface CommonCheckboxGroupProps extends Omit<CheckboxProps, "onChange"> {
  /**
   * Checkbox items
   */
  readonly children: CheckboxElement[];

  readonly state?: CheckboxGroupState;

  onChange?(groupChecks: CheckboxGroupState): void;
}
interface ControlledCheckboxGroupProps extends CommonCheckboxGroupProps {
  state: CheckboxGroupState;
  onChange(groupChecks: CheckboxGroupState): void;
}
interface UncontrolledCheckboxGroupProps extends CommonCheckboxGroupProps {
  name: string;
}
interface ChildCheckboxObject {
  [key: string]: React.ReactElement<CheckboxProps>;
}

export type CheckboxGroupProps = XOR<
  UncontrolledCheckboxGroupProps,
  ControlledCheckboxGroupProps
>;

export function CheckboxGroup({
  children,
  state,
  onChange,
  name,
  ...rest
}: CheckboxGroupProps): JSX.Element {
  if (state !== undefined && onChange !== undefined) {
    return (
      <CheckboxGroupInternal
        state={state}
        onChange={onChange}
        name={name}
        {...rest}
      >
        {children}
      </CheckboxGroupInternal>
    );
  }

  if (name) {
    return (
      <FormField name={name}>
        {field => {
          return (
            <CheckboxGroupInternal
              name={field.name}
              state={field.value}
              onChange={newValue => {
                onChange?.(newValue);
                field.onChange(newValue);
              }}
              {...rest}
            >
              {children}
            </CheckboxGroupInternal>
          );
        }}
      </FormField>
    );
  }
  throw new Error("CheckboxGroup passed invalid props");
}

function CheckboxGroupInternal({
  label,
  disabled,
  children,
  state,
  accessibilityLabel,
  onChange,
  name: parentName,
}: ControlledCheckboxGroupProps): JSX.Element {
  const childrenNames = React.Children.map(children, child => {
    const name = throwErrorIfItHasNoName(child.props.name);

    return name;
  });
  const isNested = !!label;
  const [internalCheckedValues, dispatch] = useReducer(
    checkboxGroupReducer,
    childrenNames,
    initCheckboxGroupState,
  );
  const actualCheckedValues = !isEmpty(state) ? state : internalCheckedValues;

  const handleChange = (data: CheckboxGroupState) => {
    dispatch({ type: "Update", data });
    onChange?.(data);
  };
  const indeterminate = checkIndeterminateStatus(actualCheckedValues);

  function cloneChildCheckbox(
    checkbox: React.ReactElement<CheckboxProps>,
  ): React.ReactElement<CheckboxProps> {
    const name = throwErrorIfItHasNoName(checkbox.props.name);
    const childDisabled = disabled || checkbox.props.disabled;

    const childrenHandleChange = (checked: boolean) => {
      const childrenNextValue = {
        ...actualCheckedValues.childrenChecked,
        [name]: checked,
      };
      const parentNextValue = reduce(childrenNextValue, getParentChecked, true);
      checkbox.props.onChange?.(checked);
      handleChange({
        childrenChecked: childrenNextValue,
        parentChecked: parentNextValue,
      });
    };

    return React.cloneElement(checkbox, {
      onChange: childrenHandleChange,
      checked: actualCheckedValues.childrenChecked[name],
      disabled: childDisabled,
    });
  }

  const checkboxObject: ChildCheckboxObject = React.Children.toArray(
    children,
  ).reduce((childCheckboxObject: ChildCheckboxObject, child) => {
    if (!React.isValidElement<CheckboxProps>(child)) {
      return childCheckboxObject;
    }

    const name = throwErrorIfItHasNoName(child.props.name);

    return {
      ...childCheckboxObject,
      [name]: cloneChildCheckbox(child),
    };
  }, {});

  function getParentChecked(
    acc: boolean,
    value: boolean,
    childName: string,
  ): boolean {
    const currentCheckbox = checkboxObject[childName];

    if (currentCheckbox?.props?.disabled) {
      return acc;
    }

    return acc && value;
  }

  return (
    <View>
      {isNested ? (
        <>
          <Checkbox
            name={parentName}
            label={label}
            accessibilityLabel={accessibilityLabel || label}
            indeterminate={indeterminate}
            checked={actualCheckedValues.parentChecked || false}
            onChange={value => {
              const newValues = reduce(
                actualCheckedValues.childrenChecked,
                (acc, currentCheckboxValue, childName) => {
                  const currentCheckbox = checkboxObject[childName];

                  return currentCheckbox?.props?.disabled
                    ? {
                        ...acc,
                        [childName]: currentCheckboxValue,
                      }
                    : {
                        ...acc,
                        [childName]: value,
                      };
                },
                {},
              );
              const parentChecked = reduce(newValues, getParentChecked, value);
              onChange({ childrenChecked: newValues, parentChecked });
            }}
            disabled={disabled}
          />
          <Divider />
        </>
      ) : undefined}
      <View />
      <View style={isNested ? styles.nestedCheckboxes : {}}>
        {Object.values(checkboxObject).map((checkbox, index) => {
          return (
            <Fragment key={index}>
              {checkbox}
              {index !== children.length - 1 && <Divider />}
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}

function throwErrorIfItHasNoName(name?: string): string {
  if (!name) {
    throw new Error(
      "You must provide a name to checkboxes in a checkbox group",
    );
  }

  return name;
}

function checkIndeterminateStatus(checkedValues: CheckboxGroupState): boolean {
  const checkedValuesAsArray = Object.values(checkedValues.childrenChecked);

  if (checkedValuesAsArray.length === 1) {
    return false;
  }

  return !checkedValuesAsArray.every((value, i, arr) => value === arr[0]);
}
