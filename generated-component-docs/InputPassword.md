# InputPassword

# Input Password

InputPassword is used to display a secure password input field.

## Design & usage guidelines

Use InputPassword for authentication flows where the user is required to enter a
password.

If you are building an experience for authentication that does not require
character-masking or are looking for more information regarding `validations`,
refer to
[InputText](../?path=/docs/components-forms-and-inputs-inputtext--docs#validation-message).

## Web Component Code

```tsx
InputPassword Password Input Web React import React, { useState } from "react";
import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import { FormField } from "../FormField";

interface InputPasswordProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "autocomplete"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
      | "defaultValue"
    > {
  readonly value?: string;
  onChange?(newValue: string): void;
  /**
   * Display toggle to change the visibility of the password input
   * @default false
   */
  readonly hasVisibility?: boolean;
}

export function InputPassword(props: InputPasswordProps) {
  const { hasVisibility = false } = props;
  const [visible, setVisibility] = useState(false);

  return (
    <FormField
      {...props}
      {...(hasVisibility && {
        suffix: {
          ariaLabel: visible ? "Hide password" : "Show password",
          icon: visible ? "eye" : "eyeCrossed",
          onClick: () => setVisibility(!visible),
        },
      })}
      type={visible ? "text" : "password"}
      onChange={handleChange}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);
  }
}

```

## Props

### Web Props

| Prop            | Type                         | Required | Default  | Description                                                             |
| --------------- | ---------------------------- | -------- | -------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| `value`         | `string`                     | ❌       | `_none_` | Set the component to the given value.                                   |
| `onChange`      | `(newValue: string) => void` | ❌       | `_none_` | onChange handler that provides the new value (or event)                 |
| `hasVisibility` | `boolean`                    | ❌       | `false`  | Display toggle to change the visibility of the password input           |
| `id`            | `string`                     | ❌       | `_none_` | A unique identifier for the input.                                      |
| `align`         | `"center"                    | "right"` | ❌       | `_none_`                                                                | Determines the alignment of the text inside the input. |
| `description`   | `ReactNode`                  | ❌       | `_none_` | Further description of the input, can be used for a hint.               |
| `disabled`      | `boolean`                    | ❌       | `_none_` | Disable the input                                                       |
| `showMiniLabel` | `boolean`                    | ❌       | `true`   | Controls the visibility of the mini label that appears inside the input |

when a value is entered. By default, the placeholder text moves up to become a
mini label. Set to false to disable this behavior. | | `invalid` | `boolean` |
❌ | `_none_` | Highlights the field red to indicate an error. | | `inline` |
`boolean` | ❌ | `_none_` | Adjusts the form field to go inline with a content.
This also silences the given `validations` prop. You'd have to used the
`onValidate` prop to capture the message and render it somewhere else using the
`InputValidation` component. | | `loading` | `boolean` | ❌ | `_none_` | Show a
spinner to indicate loading | | `name` | `string` | ❌ | `_none_` | Name of the
input. | | `onValidation` | `(message: string) => void` | ❌ | `_none_` |
Callback to get the the status and message when validating a field @param
message | | `placeholder` | `string` | ❌ | `_none_` | Text that appears inside
the input when empty and floats above the value as a mini label once the user
enters a value. When showMiniLabel is false, this text only serves as a standard
placeholder and disappears when the user types. | | `size` | `"small" | "large"`
| ❌ | `_none_` | Adjusts the interface to either have small or large spacing. |
| `clearable` | `Clearable` | ❌ | `_none_` | Add a clear action on the input
that clears the value.

You should always use `while-editing` if you want the input to be clearable. if
the input value isn't editable (i.e. `InputTime`) you can set it to `always`. |
| `version` | `1` | ❌ | `_none_` | Experimental: Determine which version of the
FormField to use. Right now this isn't used but it will be used in the future to
allow us to release new versions of our form inputs without breaking existing
functionality. | | `autocomplete` | `boolean | AutocompleteTypes` | ❌ |
`_none_` | Determines if browser form autocomplete is enabled. Note that
"one-time-code" is experimental and should not be used without consultation.
"address-line1" and "address-line2" are used for billing address information. |
| `onEnter` | `(event: React.KeyboardEvent) => void` | ❌ | `_none_` | A
callback to handle "Enter" keypress. This will only run if Enter is the only
key. Will not run if Shift or Control are being held. | | `onFocus` |
`(event?: React.FocusEvent) => void` | ❌ | `_none_` | Focus callback. | |
`onBlur` | `(event?: React.FocusEvent) => void` | ❌ | `_none_` | Blur callback.
| | `inputRef` |
`RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>` | ❌ |
`_none_` | _No description_ | | `validations` | `RegisterOptions` | ❌ |
`_none_` | Show an error message above the field. This also highlights the the
field red if an error message shows up. | | `defaultValue` | `string | Date` |
❌ | `_none_` | Initial value of the input. Only use this when you need to
pre-populate the field with a data that is not controlled by the components
state. If a state is controlling the value, use the `value` prop instead. |

### Mobile Props

| Prop                                                                             | Type                                                              | Required                                            | Default                             | Description                                                                                      |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- | -------- | -------- | ------------ | --------------- | ------ | --- | -------- | --------------------------------------------------------------------- |
| `usePrivacyEye`                                                                  | `boolean`                                                         | ❌                                                  | `true`                              | Determines if InputPassword uses privacy eye suffix                                              |
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
| `value`                                                                          | `string`                                                          | ❌                                                  | `_none_`                            | Set the component to a given value                                                               |
| `defaultValue`                                                                   | `string`                                                          | ❌                                                  | `_none_`                            | Default value for when component is uncontrolled                                                 |
| `autoFocus`                                                                      | `boolean`                                                         | ❌                                                  | `_none_`                            | Automatically focus the input after it is rendered                                               |
| `validations`                                                                    | `Partial<{ required: string                                       | ValidationRule<boolean>; min: ValidationRule<string | number>; max: ValidationRule<string | number>; ... 12 more ...; deps: string                                                           | string[]; }>`                                                                     | ❌               | `_none_`                           | Shows an error message below the field and highlight the field red when value is invalid |
| `onChangeText`                                                                   | `(newValue: string) => void`                                      | ❌                                                  | `_none_`                            | Simplified callback that only provides the new value                                             |
| @param newValue                                                                  |
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

_Android Only_ | | `multiline` | `boolean` | ❌ | `_none_` | Determines if
inputText will span multiple lines. Default is `false`

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
form | | `testID` | `string` | ❌ | `_none_` | Used to locate this view in
end-to-end tests | | `spellCheck` | `boolean` | ❌ | `_none_` | Determines
whether spell check is used. Turn it off to hide empty autoCorrect suggestions
when autoCorrect is off.

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
InputPassword Password Input Web React Test Testing Jest import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { InputPassword } from ".";

describe("<InputPassword />", () => {
  it("renders an input type password", () => {
    const { container } = render(<InputPassword value="123" />);
    expect(container).toMatchSnapshot();
  });

  it("renders a show/hide password button", () => {
    const { getByLabelText } = render(
      <InputPassword value="123" hasVisibility />,
    );
    expect(getByLabelText("Show password")).toBeInTheDocument();
  });

  it("should call the handler with a value", () => {
    const changeHandler = jest.fn();
    const newValue = "password";
    const placeholder = "Count";

    const { getByLabelText } = render(
      <InputPassword
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

  describe("hasVisibility", () => {
    it("should toggle visible on click", async () => {
      const { getByLabelText, container } = render(
        <InputPassword value="password" hasVisibility />,
      );
      expect(
        container.querySelector("input[type='password']"),
      ).toBeInTheDocument();

      fireEvent.click(getByLabelText("Show password"));
      expect(container.querySelector("input[type='text']")).toBeInTheDocument();
      expect(
        container.querySelector("input[type='password']"),
      ).not.toBeInTheDocument();

      fireEvent.click(getByLabelText("Hide password"));
      expect(
        container.querySelector("input[type='password']"),
      ).toBeInTheDocument();
      expect(
        container.querySelector("input[type='text']"),
      ).not.toBeInTheDocument();
    });
  });
});

```

## Component Path

`/components/InputPassword`

---

_Generated on 2025-08-21T17:35:16.366Z_
