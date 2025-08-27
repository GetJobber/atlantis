# Select

# Select

A Select is used to present a defined list of options to choose from.

## Design & usage guidelines

Nested within the Select component, Option defines the options that can be
selected. For grouping options with section headers, use Select.OptionGroup.

#### Custom grouped menu and browser support

V2 remains a native `<select>` by default. To enable the enhanced grouped menu
styling (bold section headers, edge‑to‑edge dividers and hover backgrounds), set
the `UNSAFE_experimentalStyles` prop on `Select`.

- When `UNSAFE_experimentalStyles` is true and the browser supports
  `appearance: base-select` (Chromium 123+), the select renders with the
  customizable grouped menu.
- In unsupported browsers, or when `UNSAFE_experimentalStyles` is not provided,
  the select remains native while still rendering the same `OptionGroup`
  structure.

#### Option Props

<ArgsTable of={Option} />

#### OptionGroup Props

<ArgsTable of={Select.OptionGroup} />

## States

### Invalid

<Canvas>
  <Select invalid={true}>
    <Option value="sad">Tony</Option>
    <Option value="old">Steve</Option>
  </Select>
</Canvas>

### Disabled

<Canvas>
  <Select disabled={true}>
    <Option value="sad">Tony</Option>
    <Option value="old">Steve</Option>
  </Select>
</Canvas>

## Option Grouping

Use `Select.OptionGroup` to organize options with section headers for better
user experience and visual hierarchy. The `label` prop is required as it
provides the section header text.

### Basic Option Groups

<Canvas>
  <Select version={2} placeholder="Select an option" UNSAFE_experimentalStyles>
    <Select.OptionGroup label="Team A">
      <Select.Option value="alice">Alice</Select.Option>
      <Select.Option value="bob">Bob</Select.Option>
      <Select.Option value="charlie">Charlie</Select.Option>
    </Select.OptionGroup>
    <Select.OptionGroup label="Team B">
      <Select.Option value="diana">Diana</Select.Option>
      <Select.Option value="evan">Evan</Select.Option>
      <Select.Option value="frank">Frank</Select.Option>
    </Select.OptionGroup>
  </Select>
</Canvas>

### Disabled Option Groups

<Canvas>
  <Select version={2} placeholder="Select an option" UNSAFE_experimentalStyles>
    <Select.OptionGroup label="Available Options">
      <Select.Option value="option1">Option 1</Select.Option>
      <Select.Option value="option2">Option 2</Select.Option>
    </Select.OptionGroup>
    <Select.OptionGroup label="Unavailable Options" disabled={true}>
      <Select.Option value="option3">Option 3</Select.Option>
      <Select.Option value="option4">Option 4</Select.Option>
    </Select.OptionGroup>
  </Select>
</Canvas>

## Web Component Code

```tsx
Select Dropdown Picker Menu Web React import type { ReactNode } from "react";
import React from "react";

interface InputSelectProps {
  readonly children?: ReactNode;
  readonly disabled?: boolean;

  /**
   * The content of this attribute represents the value to be submitted with the
   * form, should this option be selected.
   */
  readonly value?: string;
}

function SelectOption({ children, disabled, value }: InputSelectProps) {
  return (
    <option disabled={disabled} value={value}>
      {children}
    </option>
  );
}

/**
 * Whatever mechanism that docz is using to parse out props fails if this
 * component is called Option internally. We have opened an issue with them
 * to find out more information.
 */
export { SelectOption as Option };
import React from "react";
import type { ReactNode } from "react";

export interface OptionGroupProps {
  readonly children?: ReactNode;
  readonly label: string;
  readonly disabled?: boolean;

  /**
   * Use at your own risk: Custom classnames for specific elements. This should only be used as a
   * last resort. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   *
   * Additional details: The provided class names are applied to the root `<optgroup>` element.
   * Only effective when `Select` version={2} is used with `UNSAFE_experimentalStyles`.
   */
  readonly UNSAFE_className?: string;
  /**
   * Use at your own risk: Custom style for specific elements. This should only be used as a
   * last resort. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   *
   * Additional details: Styles are applied directly to the root `<optgroup>` element via
   * `UNSAFE_style.container`. Only effective when `Select` version={2} is used with
   * `UNSAFE_experimentalStyles`.
   */
  readonly UNSAFE_style?: { container?: React.CSSProperties };
}

export function OptionGroup({
  children,
  label,
  disabled,
  UNSAFE_className,
  UNSAFE_style,
}: OptionGroupProps) {
  return (
    <optgroup
      label={label}
      disabled={disabled}
      className={UNSAFE_className}
      style={UNSAFE_style?.container}
    >
      {children}
    </optgroup>
  );
}
import React, { useId, useRef } from "react";
import omit from "lodash/omit";
import classnames from "classnames";
import type { SelectRebuiltProps } from "./Select.types";
import { useSelectActions } from "./hooks/useSelectActions";
import { useSelectFormField } from "./hooks/useSelectFormField";
import styles from "./Select.module.css";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";

export function SelectRebuilt(props: SelectRebuiltProps) {
  const selectRef =
    (props.inputRef as React.RefObject<HTMLSelectElement>) ??
    useRef<HTMLSelectElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputStyle } = useFormFieldWrapperStyles({
    ...omit(props, ["version"]),
  });

  const id = useSelectId(props);

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus } = useSelectActions({
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  });

  const inputProps = omit(props, [
    "onChange",
    "onBlur",
    "onFocus",
    "size",
    "placeholder",
    "version",
  ]);

  const { fieldProps, descriptionIdentifier } = useSelectFormField({
    ...inputProps,
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
  });

  return (
    <FormFieldWrapper
      disabled={props.disabled}
      size={props.size}
      align={props.align}
      inline={props.inline}
      autofocus={props.autofocus}
      name={name}
      wrapperRef={wrapperRef}
      error={props.error ?? ""}
      invalid={props.invalid}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      description={props.description}
      type="select"
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      clearable="never"
      maxLength={props.maxLength}
    >
      <>
        <select
          {...fieldProps}
          ref={selectRef}
          className={classnames(
            inputStyle,
            props.UNSAFE_experimentalStyles && styles.select,
          )}
        >
          {props.children}
        </select>
        <FormFieldPostFix variation="select" className={styles.selectPostfix} />
      </>
    </FormFieldWrapper>
  );
}

function useSelectId(props: SelectRebuiltProps) {
  const generatedId = useId();

  return props.id || generatedId;
}
import React from "react";
import omit from "lodash/omit";
import type { SelectLegacyProps } from "./Select.types";
import type { FormFieldProps } from "../FormField";
import { FormField } from "../FormField";

export function Select(props: SelectLegacyProps) {
  const formFieldProps: FormFieldProps = omit(
    {
      ...props,
    },
    ["version"],
  );

  return <FormField type="select" {...formFieldProps} />;
}
import React from "react";
import { Select as SelectLegacy } from "./Select";
import { SelectRebuilt } from "./Select.rebuilt";
import { Option } from "./Option";
import { OptionGroup } from "./OptionGroup";
import {
  type SelectLegacyProps,
  type SelectRebuiltProps,
} from "./Select.types";

export { Option } from "./Option";
export type SelectShimProps = SelectLegacyProps | SelectRebuiltProps;

function isNewSelectProps(props: SelectShimProps): props is SelectRebuiltProps {
  return props.version === 2;
}

export function Select(props: SelectShimProps) {
  if (isNewSelectProps(props)) {
    return <SelectRebuilt {...props} />;
  } else {
    return <SelectLegacy {...props} />;
  }
}

Select.Option = Option;
Select.OptionGroup = OptionGroup;

export type { SelectRebuiltProps, SelectLegacyProps };

```

## Props

### Web Props

| Prop          | Type        | Required | Default  | Description                                                                |
| ------------- | ----------- | -------- | -------- | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| `maxLength`   | `number`    | ❌       | `_none_` | Changes the width to roughly the same size as the maximum character length |
| `id`          | `string`    | ❌       | `_none_` | A unique identifier for the input.                                         |
| `align`       | `"center"   | "right"` | ❌       | `_none_`                                                                   | Determines the alignment of the text inside the input. |
| `description` | `ReactNode` | ❌       | `_none_` | Further description of the input, can be used for a hint.                  |
| `disabled`    | `boolean`   | ❌       | `_none_` | Disable the input                                                          |
| `invalid`     | `boolean`   | ❌       | `_none_` | Highlights the field red to indicate an error.                             |
| `inline`      | `boolean`   | ❌       | `_none_` | Adjusts the form field to go inline with a content. This also silences the |

given `validations` prop. You'd have to used the `onValidate` prop to capture
the message and render it somewhere else using the `InputValidation` component.
| | `name` | `string` | ❌ | `_none_` | Name of the input. | | `onValidation` |
`(message: string) => void` | ❌ | `_none_` | Callback to get the the status and
message when validating a field @param message | | `placeholder` | `string` | ❌
| `_none_` | Text that appears inside the input when empty and floats above the
value as a mini label once the user enters a value. When showMiniLabel is false,
this text only serves as a standard placeholder and disappears when the user
types. | | `size` | `"small" | "large"` | ❌ | `_none_` | Adjusts the interface
to either have small or large spacing. | | `value` | `string | number | Date` |
❌ | `_none_` | Set the component to the given value. | | `onChange` |
`(newValue: string | number | boolean | Date, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void`
| ❌ | `_none_` | onChange handler that provides the new value (or event) @param
newValue @param event | | `autofocus` | `boolean` | ❌ | `_none_` | Determines
if the input should be auto-focused, using the HTML attribute | | `onEnter` |
`(event: React.KeyboardEvent) => void` | ❌ | `_none_` | A callback to handle
"Enter" keypress. This will only run if Enter is the only key. Will not run if
Shift or Control are being held. | | `onBlur` |
`(event?: React.FocusEvent) => void` | ❌ | `_none_` | Blur callback. | |
`onFocus` | `(event?: React.FocusEvent) => void` | ❌ | `_none_` | Focus
callback. | | `inputRef` |
`RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>` | ❌ |
`_none_` | _No description_ | | `wrapperRef` | `RefObject<HTMLDivElement>` | ❌
| `_none_` | _No description_ | | `validations` | `RegisterOptions` | ❌ |
`_none_` | Show an error message above the field. This also highlights the the
field red if an error message shows up. | | `children` | `ReactNode` | ❌ |
`_none_` | If you need to pass in a children. For example, `<options>` inside
`<select>`. | | `prefix` | `Affix` | ❌ | `_none_` | Adds a prefix label and
icon to the field | | `suffix` |
`{ onClick: () => void; readonly ariaLabel: string; readonly icon: IconNames; readonly label?: string; } | { onClick?: never; ariaLabel?: never; readonly label?: string; readonly icon?: IconNames; }`
| ❌ | `_none_` | Adds a suffix label and icon with an optional action to the
field | | `defaultValue` | `string | Date` | ❌ | `_none_` | Initial value of
the input. Only use this when you need to pre-populate the field with a data
that is not controlled by the components state. If a state is controlling the
value, use the `value` prop instead. | | `version` | `1` | ❌ | `_none_` |
Experimental: Determine which version of the FormField to use. Right now this
isn't used but it will be used in the future to allow us to release new versions
of our form inputs without breaking existing functionality. |

### Mobile Props

| Prop                                                            | Type                               | Required                                            | Default                             | Description                                                         |
| --------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------- | -------------------------- | --- | -------- | -------------------------------------------------------- |
| `value`                                                         | `string`                           | ❌                                                  | `_none_`                            | Current value of the component                                      |
| `defaultValue`                                                  | `string`                           | ❌                                                  | `_none_`                            | Default value for when the component is uncontrolled                |
| `placeholder`                                                   | `string`                           | ❌                                                  | `_none_`                            | Adds a first option to let users select a "no value".               |
| Placeholder item selected by default until a selection is made. |
| `label`                                                         | `string`                           | ❌                                                  | `_none_`                            | Label text shown above the selection.                               |
| `assistiveText`                                                 | `string`                           | ❌                                                  | `_none_`                            | Help text shown below the control.                                  |
| `onChange`                                                      | `(newValue?: string) => void`      | ❌                                                  | `_none_`                            | Callback that provides the new value when the selection changes     |
| `disabled`                                                      | `boolean`                          | ❌                                                  | `_none_`                            | Disables input selection                                            |
| `invalid`                                                       | `boolean`                          | ❌                                                  | `_none_`                            | Indicates the current selection is invalid                          |
| `accessibilityLabel`                                            | `string`                           | ❌                                                  | `_none_`                            | VoiceOver will read this string when a user selects the element     |
| `accessibilityHint`                                             | `string`                           | ❌                                                  | `_none_`                            | Helps users understand what will happen when they perform an action |
| `name`                                                          | `string`                           | ❌                                                  | `_none_`                            | Name of the input.                                                  |
| `children`                                                      | `ReactElement<SelectOption, string | JSXElementConstructor<any>>[]`                      | ✅                                  | `_none_`                                                            | The options to select from |
| `validations`                                                   | `Partial<{ required: string        | ValidationRule<boolean>; min: ValidationRule<string | number>; max: ValidationRule<string | number>; ... 12 more ...; deps: string                              | string[]; }>`              | ❌  | `_none_` | The validations that will mark this component as invalid |
| `testID`                                                        | `string`                           | ❌                                                  | `_none_`                            | Used to locate this view in end-to-end tests.                       |

## Categories

- Selections

## Web Test Code

```typescript
Select Dropdown Picker Menu Web React Test Testing Jest import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Option } from "./Option";
import { SelectRebuilt } from "./Select.rebuilt";
import { OptionGroup } from "./OptionGroup";

describe("SelectRebuilt", () => {
  it("renders a SelectRebuilt with no options", () => {
    const { container } = render(<SelectRebuilt version={2} />);
    expect(container).toMatchSnapshot();
  });

  it("renders a SelectRebuilt with one option", () => {
    const { container } = render(
      <SelectRebuilt version={2}>
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders a SelectRebuilt with many options", () => {
    const { container } = render(
      <SelectRebuilt version={2}>
        <Option>Foo</Option>
        <Option>Bar</Option>
        <Option>Baz</Option>
        <Option>Quux</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly as small", () => {
    const { container } = render(
      <SelectRebuilt version={2} size="small">
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly as large", () => {
    const { container } = render(
      <SelectRebuilt version={2} size="large">
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when disabled", () => {
    const { container } = render(
      <SelectRebuilt version={2} disabled>
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when invalid", () => {
    const { container } = render(
      <SelectRebuilt version={2} invalid>
        <Option>Foo</Option>
      </SelectRebuilt>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the value when set", () => {
    render(
      <SelectRebuilt version={2} value="bar">
        <Option value="foo">Foo</Option>
        <Option value="bar">Bar</Option>
      </SelectRebuilt>,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("bar");
  });

  it("should set the selected value when given 'value'", () => {
    const expectedValue = "baz";

    render(
      <SelectRebuilt version={2} value={expectedValue}>
        <Option value="foo">Foo</Option>
        <Option value="bar">Bar</Option>
        <Option value="baz">Baz</Option>
      </SelectRebuilt>,
    );

    const selectElement = screen.getByRole("combobox");

    // Verify the value is correctly set
    expect(selectElement).toHaveValue(expectedValue);

    // Verify the correct option is selected
    const select = selectElement as HTMLSelectElement;
    expect(select.options[select.selectedIndex]).toHaveTextContent("Baz");
  });

  describe("Action handlers", () => {
    it("should pass the new value to the onChange handler when the selected option changes", async () => {
      const changeHandler = jest.fn();
      const expectedValue = "bar";

      render(
        <SelectRebuilt version={2} onChange={changeHandler}>
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");
      await userEvent.selectOptions(selectElement, expectedValue);

      expect(changeHandler).toHaveBeenCalledWith(
        expectedValue,
        expect.any(Object),
      );
    });

    it("should call onChange with the correct value when selecting a different option", async () => {
      const changeHandler = jest.fn();

      render(
        <SelectRebuilt version={2} onChange={changeHandler} value="foo">
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
          <Option value="baz">Baz</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");

      // Initial value should be "foo"
      expect(selectElement).toHaveValue("foo");

      // Change to "baz"
      await userEvent.selectOptions(selectElement, "baz");

      // Handler should be called with the new value
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith("baz", expect.any(Object));
    });

    it("should call onFocus when the select is focused", async () => {
      const focusHandler = jest.fn();

      render(
        <SelectRebuilt version={2} onFocus={focusHandler}>
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");
      await userEvent.click(selectElement);

      expect(focusHandler).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when the select loses focus", async () => {
      const blurHandler = jest.fn();

      render(
        <>
          <SelectRebuilt version={2} onBlur={blurHandler}>
            <Option value="foo">Foo</Option>
            <Option value="bar">Bar</Option>
          </SelectRebuilt>
          <button type="button" data-testid="other-element">
            Other element
          </button>
        </>,
      );

      // First focus the select element
      const selectElement = screen.getByRole("combobox");
      await userEvent.click(selectElement);

      // Then focus another element to trigger blur
      const otherElement = screen.getByTestId("other-element");
      await userEvent.click(otherElement);

      expect(blurHandler).toHaveBeenCalledTimes(1);
    });

    describe("combined events", () => {
      it("should handle focus event correctly", async () => {
        const focusHandler = jest.fn();

        render(
          <SelectRebuilt version={2} onFocus={focusHandler} value="foo">
            <Option value="foo">Foo</Option>
            <Option value="bar">Bar</Option>
            <Option value="baz">Baz</Option>
          </SelectRebuilt>,
        );

        const selectElement = screen.getByRole("combobox");
        await userEvent.click(selectElement);
        expect(focusHandler).toHaveBeenCalledTimes(1);
      });

      it("should handle change event correctly", async () => {
        const changeHandler = jest.fn();

        render(
          <SelectRebuilt version={2} onChange={changeHandler} value="foo">
            <Option value="foo">Foo</Option>
            <Option value="bar">Bar</Option>
            <Option value="baz">Baz</Option>
          </SelectRebuilt>,
        );

        const selectElement = screen.getByRole("combobox");
        await userEvent.selectOptions(selectElement, "bar");
        expect(changeHandler).toHaveBeenCalledTimes(1);
        expect(changeHandler).toHaveBeenCalledWith("bar", expect.any(Object));
      });

      it("should handle blur event correctly", async () => {
        const blurHandler = jest.fn();

        render(
          <>
            <SelectRebuilt version={2} onBlur={blurHandler} value="foo">
              <Option value="foo">Foo</Option>
              <Option value="bar">Bar</Option>
              <Option value="baz">Baz</Option>
            </SelectRebuilt>
            <button type="button" data-testid="other-element">
              Other element
            </button>
          </>,
        );

        // Focus the select element
        const selectElement = screen.getByRole("combobox");
        await userEvent.click(selectElement);

        // Click on another element to trigger blur
        const otherElement = screen.getByTestId("other-element");
        await userEvent.click(otherElement);

        expect(blurHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("inputRef", () => {
    it("forwards inputRef to the select element", () => {
      const ref = React.createRef<HTMLSelectElement>();

      render(
        <SelectRebuilt version={2} inputRef={ref}>
          <Option>Foo</Option>
        </SelectRebuilt>,
      );

      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it("can access native select methods through inputRef", () => {
      const ref = React.createRef<HTMLSelectElement>();

      render(
        <SelectRebuilt version={2} inputRef={ref}>
          <Option>Foo</Option>
        </SelectRebuilt>,
      );

      const selectElement = screen.getByRole("combobox");
      expect(ref.current).toBe(selectElement);

      ref.current?.focus();
      expect(selectElement).toHaveFocus();

      ref.current?.blur();
      expect(selectElement).not.toHaveFocus();
    });
  });

  describe("OptionGroup integration", () => {
    it("renders an optgroup with accessible label", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Group A">
            <Option value="one">One</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = screen.getByRole("group", { name: "Group A" });
      expect(group).toBeInTheDocument();
      expect(group).toHaveAccessibleName("Group A");
    });

    it("renders children options within a group", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Group B">
            <Option value="one">One</Option>
            <Option value="two">Two</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      expect(screen.getByRole("option", { name: "One" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Two" })).toBeInTheDocument();
    });

    it("supports disabled optgroup state", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Disabled Group" disabled>
            <Option value="x">X</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = screen.getByRole("group", { name: "Disabled Group" });
      expect(group).toBeDisabled();
    });

    it("applies UNSAFE_className to the optgroup container", () => {
      const { container } = render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Custom Group" UNSAFE_className="custom-class">
            <Option value="x">X</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = container.querySelector("optgroup");
      expect(group).toHaveClass("custom-class");
    });

    it("applies UNSAFE_style.container to the optgroup", () => {
      render(
        <SelectRebuilt version={2}>
          <OptionGroup
            label="Styled Group"
            UNSAFE_style={{ container: { fontWeight: "bold" } }}
          >
            <Option value="x">X</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );

      const group = screen.getByRole("group", { name: "Styled Group" });
      expect(group).toHaveStyle({ fontWeight: "bold" });
    });

    it("does not apply custom select class unless experimental styles are enabled", () => {
      const { container: nativeContainer } = render(
        <SelectRebuilt version={2}>
          <OptionGroup label="Group">
            <Option value="1">One</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );
      const nativeSelect = nativeContainer.querySelector("select");
      expect(nativeSelect).not.toHaveClass("select");

      const { container: customContainer } = render(
        <SelectRebuilt version={2} UNSAFE_experimentalStyles>
          <OptionGroup label="Group">
            <Option value="1">One</Option>
          </OptionGroup>
        </SelectRebuilt>,
      );
      const customSelect = customContainer.querySelector("select");
      expect(customSelect).toHaveClass("select");
    });
  });
});
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Select } from "./Select";
import { Option } from "./Option";

it("renders a Select with no options", () => {
  const { container } = render(<Select />);
  expect(container).toMatchSnapshot();
});

// It seems dumb to test this, but the children type is
// ReactNode | ReactNode[] and it complains that ReactNode[] needs more than one
// element if you try to use just that as the type.
it("renders a Select with one option", () => {
  const { container } = render(
    <Select>
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders a Select with many options", () => {
  const { container } = render(
    <Select>
      <Option>Foo</Option>
      <Option>Bar</Option>
      <Option>Baz</Option>
      <Option>Quux</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly as small", () => {
  const { container } = render(
    <Select size="small">
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly as large", () => {
  const { container } = render(
    <Select size="large">
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly when disabled", () => {
  const { container } = render(
    <Select disabled>
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders correctly when invalid", () => {
  const { container } = render(
    <Select invalid>
      <Option>Foo</Option>
    </Select>,
  );
  expect(container).toMatchSnapshot();
});

it("renders the defaultValue when set.", () => {
  const { container } = render(
    <Select defaultValue="bar">
      <Option value="foo">Foo</Option>
      <Option value="bar">Bar</Option>
    </Select>,
  );

  const select = container.querySelector("select") as HTMLSelectElement;

  expect(select.options[select.selectedIndex].value).toBe("bar");
});

it("renders the value when set.", () => {
  const { container } = render(
    <Select value="bar">
      <Option value="foo">Foo</Option>
      <Option value="bar">Bar</Option>
    </Select>,
  );

  const select = container.querySelector("select") as HTMLSelectElement;

  expect(select.options[select.selectedIndex].value).toBe("bar");
});

it("should pass the new value to the onChange handler when the selected option changes.", () => {
  const changeHandler = jest.fn();

  const expectedValue = "bar";

  const { container } = render(
    <Select onChange={changeHandler}>
      <Option value="foo">Foo</Option>
      <Option value="bar">Bar</Option>
    </Select>,
  );

  const select = container.querySelector("select") as HTMLSelectElement;

  fireEvent.change(select, {
    target: { value: expectedValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(expectedValue, expect.any(Object));
});

```

## Component Path

`/components/Select`

---

_Generated on 2025-08-21T17:35:16.371Z_
