# InputNumber

# InputNumber

InputNumber is used in forms that accept numbers as an answer.

## Design & usage guidelines

This is best suited for input data that benefits from being modified in
increments, such as quantity, price, or days (ie 2 days -> 3 days).

While some types of data may technically be numbers, they can be ill-suited for
using a number input. For example, phone numbers and credit card numbers provide
no value to the user by offering an incrementer.

## Web Component Code

```tsx
InputNumber Number Input Numeric Input Web React import type { FocusEvent } from "react";
import React, { createRef, forwardRef, useImperativeHandle } from "react";
import {
  FieldError as AriaFieldError,
  NumberField as AriaNumberField,
  Text as AriaText,
  Group,
  Input,
  Label,
} from "react-aria-components";
import classnames from "classnames";
import styles from "./InputNumber.rebuilt.module.css";
import type { InputNumberRebuiltProps } from "./InputNumber.rebuilt.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

const defaultFormatOptions: Intl.NumberFormatOptions = {
  notation: "standard",
  style: "decimal",
};

export interface InputNumberRebuiltRef {
  blur(): void;
  focus(): void;
}

export const InputNumberRebuilt = forwardRef(
  (props: InputNumberRebuiltProps, ref: React.Ref<InputNumberRebuiltRef>) => {
    const inputRef = createRef<HTMLInputElement>();

    const mergedFormatOptions = {
      ...defaultFormatOptions,
      ...props.formatOptions,
    };

    function handleChange(
      newValue: number,
      event?: React.ChangeEvent<HTMLInputElement>,
    ) {
      props.onChange && props.onChange(newValue, event);
    }

    useImperativeHandle(ref, () => ({
      blur: () => {
        const input = inputRef.current;

        if (input) {
          input.blur();
        }
      },
      focus: () => {
        const input = inputRef.current;

        if (input) {
          input.focus();
        }
      },
    }));

    const {
      align,
      description,
      disabled,
      error,
      inline,
      invalid,
      placeholder,
      readonly,
      showMiniLabel = true,
      size,
      minValue,
      maxValue,
      ...ariaNumberFieldProps
    } = props;

    const stringDescription = typeof description === "string";

    return (
      <AriaNumberField
        {...ariaNumberFieldProps}
        className={classnames(styles.container, inline && styles.inline)}
        formatOptions={mergedFormatOptions}
        isDisabled={disabled}
        isInvalid={invalid}
        isReadOnly={readonly}
        minValue={minValue}
        maxValue={maxValue}
        onBlur={e => props.onBlur?.(e as FocusEvent<HTMLInputElement>)}
        onFocus={e => props.onFocus?.(e as FocusEvent<HTMLInputElement>)}
        onChange={handleChange}
      >
        <Group
          className={classnames(
            styles.wrapper,
            align && styles[align],
            invalid && styles.invalid,
            disabled && styles.disabled,
          )}
        >
          <div className={styles.horizontalWrapper}>
            <div
              className={classnames(
                styles.inputWrapper,
                disabled && styles.disabled,
                !showMiniLabel && styles.hideLabel,
                size && styles[size],
              )}
            >
              <Input
                className={styles.input}
                placeholder=" " // used for CSS minilabel
                ref={inputRef}
              />
              <Label className={styles.label}>{placeholder}</Label>
            </div>
          </div>
        </Group>
        {description && (
          <AriaText
            className={styles.description}
            elementType="div"
            slot="description"
          >
            {stringDescription ? (
              <Text size="small" variation="subdued">
                {description}
              </Text>
            ) : (
              description
            )}
          </AriaText>
        )}
        {error && (
          <AriaFieldError className={styles.fieldError}>
            <Icon color="critical" name="alert" size="small" />
            <Text size="small" variation="error">
              {error}
            </Text>
          </AriaFieldError>
        )}
      </AriaNumberField>
    );
  },
);
InputNumberRebuilt.displayName = "InputNumberRebuilt";
import type { ReactNode } from "react";
import type React from "react";
import type { CommonFormFieldProps, FormFieldProps } from "../FormField";

export type InputNumberVersion = 1 | 2 | undefined;

export interface InputNumberRebuiltProps
  extends Omit<CommonFormFieldProps, "version">,
    Pick<
      FormFieldProps,
      "onFocus" | "onBlur" | "inputRef" | "readonly" | "size"
    > {
  readonly align?: "center" | "right"; // todo add left and make it default
  readonly autocomplete?: boolean;
  readonly autoFocus?: boolean;
  readonly defaultValue?: number;
  readonly description?: ReactNode;
  readonly error?: string;
  readonly formatOptions?: Intl.NumberFormatOptions;
  readonly identifier?: string;
  readonly inline?: boolean;
  readonly invalid?: boolean;
  readonly maxValue?: number;
  readonly minValue?: number;
  readonly onChange?: (
    newValue: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  readonly showMiniLabel?: boolean;
  readonly value?: number;
  /**
   * Version 2 is highly experimental. Avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;
}

export interface InputNumberRebuiltRef {
  focus: () => void;
  blur: () => void;
}
import type { Ref } from "react";
import React, { createRef, forwardRef, useImperativeHandle } from "react";
import type { RegisterOptions } from "react-hook-form";
import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import { FormField } from "../FormField";

export interface InputNumberProps
  extends Omit<CommonFormFieldProps, "version">,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "autocomplete"
      | "max"
      | "min"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
      | "readonly"
      | "defaultValue"
      | "keyboard"
      | "prefix"
      | "suffix"
    > {
  readonly value?: number;
  /**
   * Experimental:
   * Determine which version of the FormField to use.
   */
  readonly version?: 1;
}

export interface InputNumberRef {
  blur(): void;
  focus(): void;
}

function InputNumberInternal(
  props: InputNumberProps,
  ref: Ref<InputNumberRef>,
) {
  const inputRef = createRef<HTMLTextAreaElement | HTMLInputElement>();

  useImperativeHandle(ref, () => ({
    blur: () => {
      const input = inputRef.current;

      if (input) {
        input.blur();
      }
    },
    focus: () => {
      const input = inputRef.current;

      if (input) {
        input.focus();
      }
    },
  }));

  return (
    <FormField
      {...props}
      type="number"
      inputRef={inputRef}
      onChange={handleChange}
      validations={{
        ...props.validations,
        validate: customValidators(props.validations?.validate),
      }}
    />
  );

  function customValidators(
    validators?: RegisterOptions["validate"],
  ): RegisterOptions["validate"] {
    if (validators == null) {
      return getOverLimitMessage;
    } else if (typeof validators === "function") {
      return {
        customValidation: validators,
        getOverLimitMessage,
      };
    }

    return {
      ...validators,
      getOverLimitMessage,
    };
  }

  function handleChange(newValue: number) {
    props.onChange && props.onChange(newValue);
  }

  function getOverLimitMessage(
    value: InputNumberProps["value"],
  ): string | true {
    const isOverMax = props.max != undefined && value && value > props.max;
    const isUnderMin = props.min != undefined && value && value < props.min;

    if (isOverMax || isUnderMin || (value && value.toString() === "")) {
      if (props.min != undefined && props.max === undefined) {
        return `Enter a number that is greater than or equal to ${props.min}`;
      } else if (props.max != undefined && props.min === undefined) {
        return `Enter a number that is less than or equal to ${props.max}`;
      } else if (props.min != undefined && props.max != undefined) {
        return `Enter a number between ${props.min} and ${props.max}`;
      }
    }

    return true;
  }
}

export const InputNumber = forwardRef(InputNumberInternal);
import React, { type ForwardedRef, forwardRef } from "react";
import { InputNumberRebuilt } from "./InputNumber.rebuilt";
import {
  InputNumber as InputNumberLegacy,
  type InputNumberProps as InputNumberLegacyProps,
  type InputNumberRef as InputNumberLegacyRef,
} from "./InputNumber";
import {
  type InputNumberRebuiltProps,
  type InputNumberRebuiltRef,
} from "./InputNumber.rebuilt.types";

export type InputNumberProps =
  | ({
      version: 2;
    } & InputNumberRebuiltProps)
  | ({
      version?: 1;
    } & InputNumberLegacyProps);

function isNewInputNumberProps(
  props: InputNumberProps,
): props is InputNumberRebuiltProps {
  return props.version === 2;
}

type InputNumberRef = InputNumberRebuiltRef | InputNumberLegacyRef;

export const InputNumber = forwardRef(function InputNumberShim(
  props: InputNumberProps,
  ref: ForwardedRef<InputNumberRef>,
) {
  if (isNewInputNumberProps(props)) {
    return (
      <InputNumberRebuilt
        {...props}
        ref={ref as ForwardedRef<InputNumberRebuiltRef>}
      />
    );
  } else {
    return (
      <InputNumberLegacy
        {...props}
        ref={ref as ForwardedRef<InputNumberLegacyRef>}
      />
    );
  }
});

export type { InputNumberRef, InputNumberRebuiltProps, InputNumberLegacyProps };

```

## Props

### Web Props

| Prop                                             | Type        | Required | Default  | Description                                                             |
| ------------------------------------------------ | ----------- | -------- | -------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| `value`                                          | `number`    | ❌       | `_none_` | Set the component to the given value.                                   |
| `version`                                        | `1`         | ❌       | `_none_` | Experimental:                                                           |
| Determine which version of the FormField to use. |
| `id`                                             | `string`    | ❌       | `_none_` | A unique identifier for the input.                                      |
| `align`                                          | `"center"   | "right"` | ❌       | `_none_`                                                                | Determines the alignment of the text inside the input. |
| `description`                                    | `ReactNode` | ❌       | `_none_` | Further description of the input, can be used for a hint.               |
| `disabled`                                       | `boolean`   | ❌       | `_none_` | Disable the input                                                       |
| `showMiniLabel`                                  | `boolean`   | ❌       | `true`   | Controls the visibility of the mini label that appears inside the input |

when a value is entered. By default, the placeholder text moves up to become a
mini label. Set to false to disable this behavior. | | `invalid` | `boolean` |
❌ | `_none_` | Highlights the field red to indicate an error. | | `inline` |
`boolean` | ❌ | `_none_` | Adjusts the form field to go inline with a content.
This also silences the given `validations` prop. You'd have to used the
`onValidate` prop to capture the message and render it somewhere else using the
`InputValidation` component. | | `loading` | `boolean` | ❌ | `_none_` | Show a
spinner to indicate loading | | `name` | `string` | ❌ | `_none_` | Name of the
input. | | `onChange` |
`(newValue: string | number | boolean | Date, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void`
| ❌ | `_none_` | onChange handler that provides the new value (or event) @param
newValue @param event | | `onValidation` | `(message: string) => void` | ❌ |
`_none_` | Callback to get the the status and message when validating a field
@param message | | `placeholder` | `string` | ❌ | `_none_` | Text that appears
inside the input when empty and floats above the value as a mini label once the
user enters a value. When showMiniLabel is false, this text only serves as a
standard placeholder and disappears when the user types. | | `size` |
`"small" | "large"` | ❌ | `_none_` | Adjusts the interface to either have small
or large spacing. | | `clearable` | `Clearable` | ❌ | `_none_` | Add a clear
action on the input that clears the value.

You should always use `while-editing` if you want the input to be clearable. if
the input value isn't editable (i.e. `InputTime`) you can set it to `always`. |
| `maxLength` | `number` | ❌ | `_none_` | Maximum character length for an
input. This also changes the width to roughly the same size as the max length.
This is to communicate that the user that on certain cases, they can only type a
limited amount of characters. | | `autocomplete` | `boolean | AutocompleteTypes`
| ❌ | `_none_` | Determines if browser form autocomplete is enabled. Note that
"one-time-code" is experimental and should not be used without consultation.
"address-line1" and "address-line2" are used for billing address information. |
| `max` | `number` | ❌ | `_none_` | Specifies the maximum numerical or date
value that a user can type | | `min` | `number` | ❌ | `_none_` | Simplified
onChange handler that only provides the new value. @param newValue Specifies the
minimum numerical or date value that a user can type | | `onEnter` |
`(event: React.KeyboardEvent) => void` | ❌ | `_none_` | A callback to handle
"Enter" keypress. This will only run if Enter is the only key. Will not run if
Shift or Control are being held. | | `onFocus` |
`(event?: React.FocusEvent) => void` | ❌ | `_none_` | Focus callback. | |
`onBlur` | `(event?: React.FocusEvent) => void` | ❌ | `_none_` | Blur callback.
| | `inputRef` |
`RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>` | ❌ |
`_none_` | _No description_ | | `validations` | `RegisterOptions` | ❌ |
`_none_` | Show an error message above the field. This also highlights the the
field red if an error message shows up. | | `readonly` | `boolean` | ❌ |
`_none_` | Prevents users from editing the value. | | `defaultValue` |
`string | Date` | ❌ | `_none_` | Initial value of the input. Only use this when
you need to pre-populate the field with a data that is not controlled by the
components state. If a state is controlling the value, use the `value` prop
instead. | | `keyboard` | `"numeric" | "decimal"` | ❌ | `_none_` | Determines
what kind of keyboard appears on mobile web. | | `prefix` | `Affix` | ❌ |
`_none_` | Adds a prefix label and icon to the field | | `suffix` |
`{ onClick: () => void; readonly ariaLabel: string; readonly icon: IconNames; readonly label?: string; } | { onClick?: never; ariaLabel?: never; readonly label?: string; readonly icon?: IconNames; }`
| ❌ | `_none_` | Adds a suffix label and icon with an optional action to the
field | | `ref` | `LegacyRef<InputNumberRef>` | ❌ | `_none_` | Allows getting a
ref to the component instance. Once the component unmounts, React will set
`ref.current` to `null` (or call the ref with `null` if you passed a callback
ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

### Mobile Props

| Prop                                                                             | Type                                                              | Required                                            | Default                             | Description                                                                                      |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- | -------- | -------- | ------------ | --------------- | ------ | --- | -------- | --------------------------------------------------------------------- |
| `value`                                                                          | `number`                                                          | ❌                                                  | `_none_`                            | _No description_                                                                                 |
| `defaultValue`                                                                   | `number`                                                          | ❌                                                  | `_none_`                            | _No description_                                                                                 |
| `onChange`                                                                       | `(newValue?: string                                               | number) => void`                                    | ❌                                  | `_none_`                                                                                         | _No description_                                                                  |
| `keyboard`                                                                       | `NumberKeyboard`                                                  | ❌                                                  | `_none_`                            | _No description_                                                                                 |
| `testID`                                                                         | `string`                                                          | ❌                                                  | `_none_`                            | Used to locate this view in end-to-end tests                                                     |
| `toolbar`                                                                        | `React.ReactNode`                                                 | ❌                                                  | `_none_`                            | Add a toolbar below the input field for actions like rewriting the text.                         |
| `toolbarVisibility`                                                              | `"always"                                                         | "while-editing"`                                    | ❌                                  | `_none_`                                                                                         | Change the behaviour of when the toolbar becomes visible.                         |
| `loading`                                                                        | `boolean`                                                         | ❌                                                  | `_none_`                            | Show loading indicator.                                                                          |
| `loadingType`                                                                    | `"spinner"                                                        | "glimmer"`                                          | ❌                                  | `_none_`                                                                                         | Change the type of loading indicator to spinner or glimmer.                       |
| `invalid`                                                                        | `string                                                           | boolean`                                            | ❌                                  | `_none_`                                                                                         | Highlights the field red and shows message below (if string) to indicate an error |
| `disabled`                                                                       | `boolean`                                                         | ❌                                                  | `_none_`                            | Disable the input                                                                                |
| `readonly`                                                                       | `boolean`                                                         | ❌                                                  | `_none_`                            | Makes the input read-only                                                                        |
| `name`                                                                           | `string`                                                          | ❌                                                  | `_none_`                            | Name of the input.                                                                               |
| `placeholder`                                                                    | `string`                                                          | ❌                                                  | `_none_`                            | Hint text that goes above the value once the field is filled out                                 |
| `assistiveText`                                                                  | `string`                                                          | ❌                                                  | `_none_`                            | Text that helps the user understand the input                                                    |
| `autoFocus`                                                                      | `boolean`                                                         | ❌                                                  | `_none_`                            | Automatically focus the input after it is rendered                                               |
| `validations`                                                                    | `Partial<{ required: string                                       | ValidationRule<boolean>; min: ValidationRule<string | number>; max: ValidationRule<string | number>; ... 12 more ...; deps: string                                                           | string[]; }>`                                                                     | ❌               | `_none_`                           | Shows an error message below the field and highlight the field red when value is invalid |
| `onSubmitEditing`                                                                | `(event?: SyntheticEvent<Element, Event>) => void`                | ❌                                                  | `_none_`                            | Callback that is called when the text input's submit button is pressed                           |
| @param event                                                                     |
| `onFocus`                                                                        | `(event?: NativeSyntheticEvent<TextInputFocusEventData>) => void` | ❌                                                  | `_none_`                            | Callback that is called when the text input is focused                                           |
| @param event                                                                     |
| `onBlur`                                                                         | `() => void`                                                      | ❌                                                  | `_none_`                            | Callback that is called when the text input is blurred                                           |
| `accessibilityLabel`                                                             | `string`                                                          | ❌                                                  | `_none_`                            | VoiceOver will read this string when a user selects the associated element                       |
| `accessibilityHint`                                                              | `string`                                                          | ❌                                                  | `_none_`                            | An accessibility hint helps users understand what will happen when they perform an action on the |
| accessibility element when that result is not clear from the accessibility label |
| `autoCorrect`                                                                    | `boolean`                                                         | ❌                                                  | `_none_`                            | Turn off autocorrect                                                                             |
| `autoCapitalize`                                                                 | `"characters"                                                     | "words"                                             | "sentences"                         | "none"`                                                                                          | ❌                                                                                | `_none_`         | Determines where to autocapitalize |
| `autoComplete`                                                                   | `"name"                                                           | "additional-name"                                   | "address-line1"                     | "address-line2"                                                                                  | "birthdate-day"                                                                   | "birthdate-full" | "birthdate-month"                  | "birthdate-year"                                                                         | "cc-csc" | "cc-exp" | "cc-exp-day" | ... 45 more ... | "off"` | ❌  | `_none_` | Determines which content to suggest on auto complete, e.g.`username`. |

Default is `off` which disables auto complete

_Android Only_ | | `textContentType` |
`"name" | "none" | "nickname" | "password" | "username" | "URL" | "addressCity" | "addressCityAndState" | "addressState" | "countryName" | "creditCardNumber" | "creditCardExpiration" | ... 33 more ... | "shipmentTrackingNumber"`
| ❌ | `_none_` | Determines which content to suggest on auto complete,
e.g.`username`. Default is `none` which disables auto complete

_iOS Only_ | | `multiline` | `boolean` | ❌ | `_none_` | Determines if inputText
will span multiple lines. Default is `false`

https://reactnative.dev/docs/textinput#multiline | | `prefix` |
`{ icon?: IconNames; label?: string; }` | ❌ | `_none_` | Symbol to display
before the text input | | `suffix` |
`{ icon?: IconNames; label?: string; onPress?: () => void; }` | ❌ | `_none_` |
Symbol to display after the text input | | `transform` |
`{ input?: (v: any) => string; output?: (v: string) => any; }` | ❌ | `_none_` |
transform object is used to transform the internal TextInput value It's useful
for components like InputNumber where we want to transform the internal value to
a number. "input" is a function that transform the value to the string format
that should be shown to the user "output" is a function that transform the
string representation of the value to the value that is sent to onChange and the
form | | `clearable` | `Clearable` | ❌ | `_none_` | Add a clear action on the
input that clears the value.

You should always use `while-editing` if you want the input to be clearable. if
the input value isn't editable (i.e. `InputDateTime`) you can set it to
`always`. | | `secureTextEntry` | `boolean` | ❌ | `_none_` | Use secure text
entry | | `spellCheck` | `boolean` | ❌ | `_none_` | Determines whether spell
check is used. Turn it off to hide empty autoCorrect suggestions when
autoCorrect is off.

_iOS Only_ | | `styleOverride` | `InputTextStyleOverride` | ❌ | `_none_` |
Custom styling to override default style of the input text | | `ref` |
`LegacyRef<InputTextRef>` | ❌ | `_none_` | Allows getting a ref to the
component instance. Once the component unmounts, React will set `ref.current` to
`null` (or call the ref with `null` if you passed a callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

## Categories

- Forms & Inputs

## Web Test Code

```typescript
InputNumber Number Input Numeric Input Web React Test Testing Jest import React from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { InputNumberRef } from ".";
import { InputNumber } from ".";

it("renders an input type number", () => {
  const { getByLabelText } = render(
    <InputNumber
      version={2}
      value={123}
      placeholder="My number"
      minValue={0}
      maxValue={200}
    />,
  );
  expect(getByLabelText("My number")).toBeVisible();
});

test("it should call the handler with a number value", async () => {
  const changeHandler = jest.fn();
  const newValue = 100;
  const placeholder = "Count";

  const { getByLabelText } = render(
    <InputNumber
      version={2}
      onChange={changeHandler}
      placeholder={placeholder}
      name={placeholder}
    />,
  );
  const input = getByLabelText(placeholder);
  await userEvent.clear(input);
  await userEvent.type(input, newValue.toString());
  await userEvent.tab();
  expect(changeHandler).toHaveBeenCalledWith(newValue, undefined);
});

test("it should handle focus", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const placeholder = "Number";

  const { getByLabelText } = render(
    <InputNumber placeholder={placeholder} ref={inputRef} version={2} />,
  );

  act(() => {
    inputRef?.current?.focus();
  });
  expect(document.activeElement).toBe(getByLabelText(placeholder));
});

test("it should handle blur", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const blurHandler = jest.fn();

  render(<InputNumber ref={inputRef} onBlur={blurHandler} version={2} />);

  act(() => {
    inputRef?.current?.focus();
    inputRef?.current?.blur();
  });
  expect(blurHandler).toHaveBeenCalledTimes(1);
});

test("it should clamp value to maxValue when value exceeds maxValue", () => {
  const { getByRole } = render(
    <InputNumber version={2} value={25} maxValue={20} placeholder="Number" />,
  );

  const input = getByRole("textbox", { name: "Number" });
  expect(input).toBeVisible();
  expect(input).toHaveValue("20");
});

test("it should clamp value to minValue when value is below minValue", () => {
  const { getByRole } = render(
    <InputNumber version={2} value={5} minValue={10} placeholder="Number" />,
  );

  const input = getByRole("textbox", { name: "Number" });
  expect(input).toBeVisible();
  expect(input).toHaveValue("10");
});

test("it should render element description directly without wrapping in paragraph", () => {
  const customDescription = (
    <div data-testid="custom-description">Custom element description</div>
  );

  const { getByTestId } = render(
    <InputNumber
      version={2}
      placeholder="Number"
      description={customDescription}
    />,
  );

  const descriptionElement = getByTestId("custom-description");
  expect(descriptionElement).toBeVisible();
  expect(descriptionElement.parentElement).not.toBeInstanceOf(
    HTMLParagraphElement,
  );
});
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import type { InputNumberRef } from ".";
import { InputNumber } from ".";

it("renders an input type number", () => {
  const { container } = render(<InputNumber value={123} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper"
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="horizontalWrapper"
          >
            <div
              class="inputWrapper"
            >
              <div
                class="childrenWrapper"
                tabindex="-1"
              >
                <input
                  class="input"
                  id=":r0:"
                  name="generatedName--:r0:"
                  type="number"
                  value="123"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

test("it should call the handler with a number value", () => {
  const changeHandler = jest.fn();
  const newValue = 100;
  const placeholder = "Count";

  const { getByLabelText } = render(
    <InputNumber
      onChange={changeHandler}
      placeholder={placeholder}
      name={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);
});

test("it should call the validation with empty string as a success", () => {
  const validationHandler = jest.fn();

  render(
    <InputNumber
      value={100}
      min={99}
      max={100}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith("");
});

test("it should call the validation with a range error", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={101}
      min={99}
      max={100}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number between 99 and 100",
    );
  });
});

test("it should call the validation with a max length error", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={101}
      max={100}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number that is less than or equal to 100",
    );
  });
});

test("it should call the validation with a min length error", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={98}
      min={99}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number that is greater than or equal to 99",
    );
  });
});

test("validation passes if number is correct", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={98}
      min={99}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number that is greater than or equal to 99",
    );
  });

  fireEvent.change(input, { target: { value: 101 } });
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith("");
  });
});

test("allows custom validation", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={12}
      min={10}
      onValidation={validationHandler}
      placeholder="Count to 10"
      validations={{
        max: {
          value: 1,
          message: "only one number",
        },
      }}
    />,
  );

  const input = getByLabelText("Count to 10");

  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith("only one number");
  });
});

test("it should call the custom validate function if provided", async () => {
  const validationHandler = jest.fn();
  const expectedValidationValue = Math.floor(
    Math.random() * Number.MAX_SAFE_INTEGER,
  );
  const { getByLabelText } = render(
    <InputNumber
      value={expectedValidationValue}
      placeholder="Custom validation function"
      validations={{
        validate: validationHandler,
      }}
    />,
  );

  const input = getByLabelText("Custom validation function");

  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      expectedValidationValue,
      expect.any(Object),
    );
    // Received: 12, {"generatedName--123e4567-e89b-12d3-a456-426655440063": 12}
  });
});

test("it should use the custom validate object if provided", async () => {
  const validationHandler = jest.fn();
  const validationHandler2 = jest.fn();
  const expectedValidationValue = Math.floor(
    Math.random() * Number.MAX_SAFE_INTEGER,
  );

  const { getByLabelText } = render(
    <InputNumber
      value={expectedValidationValue}
      placeholder="Custom validation function"
      validations={{
        validate: {
          validationHandler,
          validationHandler2,
        },
      }}
    />,
  );

  const input = getByLabelText("Custom validation function");

  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      expectedValidationValue,
      expect.anything(),
    );
    expect(validationHandler2).toHaveBeenCalledWith(
      expectedValidationValue,
      expect.anything(),
    );
  });
});

test("it should call the min validation if the custom validation passes", async () => {
  const { getByLabelText, getByText } = render(
    <InputNumber
      value={98}
      min={99}
      validations={{
        validate: {
          alwaysPasses: () => true,
        },
      }}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(
      getByText("Enter a number that is greater than or equal to 99"),
    ).toBeInTheDocument();
  });
});

test("it should call the max validation if the custom validation passes", async () => {
  const { getByLabelText, getByText } = render(
    <InputNumber
      value={101}
      max={100}
      validations={{
        validate: {
          alwaysPasses: () => true,
        },
      }}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(
      getByText("Enter a number that is less than or equal to 100"),
    ).toBeInTheDocument();
  });
});

test("it should handle focus", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const placeholder = "Number";

  const { getByLabelText } = render(
    <InputNumber placeholder={placeholder} ref={inputRef} />,
  );

  inputRef.current.focus();
  expect(document.activeElement).toBe(getByLabelText(placeholder));
});

test("it should handle blur", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const blurHandler = jest.fn();

  render(<InputNumber ref={inputRef} onBlur={blurHandler} />);

  inputRef.current.focus();
  inputRef.current.blur();
  expect(blurHandler).toHaveBeenCalledTimes(1);
});

it("should set inputMode to decimal", () => {
  const { getByLabelText } = render(
    <InputNumber keyboard="decimal" placeholder="Allow Decimals" />,
  );
  const input = getByLabelText("Allow Decimals");

  expect(input.inputMode).toEqual("decimal");
});

it("should set inputMode to numeric", () => {
  const { getByLabelText } = render(
    <InputNumber keyboard="numeric" placeholder="Numeric" />,
  );
  const input = getByLabelText("Numeric");

  expect(input.inputMode).toEqual("numeric");
});

it("should set not inputMode by default", () => {
  const { getByLabelText } = render(<InputNumber placeholder="Unset" />);
  const input = getByLabelText("Unset");

  expect(input.inputMode).toBeFalsy();
});

```

## Component Path

`/components/InputNumber`

---

_Generated on 2025-08-21T17:35:16.365Z_
