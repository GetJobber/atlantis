# InputText

# Input Text

Input text is used in forms that accept short or long answers from users.

## Design & usage guidelines

### Controlled

Use this to allow users to provide short answers.

export const ControlledExample = () => { const [age, setAge] =
useState("Veintisiete"); return ( <InputText
      value={age}
      onChange={setAge}
      name="age"
      placeholder="Age in words"
    /> ); };

<Canvas>
  <ControlledExample />
</Canvas>

<Disclosure title="Show code">
```tsx
const ControlledExample = () => {
  const [age, setAge] = useState("Veintisiete");
  return (
    <InputText
      value={age}
      onChange={setAge}
      name="age"
      placeholder="Age in words"
    />
  );
};
```
</Disclosure>

### Multiline

Use this to allow users to provide long answers. The default number of rows is
three. Note that `loading={true}` is unimplemented for multiline input text.

For web, you can set a minimum and maximum number of rows. See:
[Web/rows example](../?path=/story/components-forms-and-inputs-inputtext-web--multiline).

<Canvas>
  <InputText multiline={true} placeholder="Describe your age" />
</Canvas>

### Prefix/suffix

Use a prefix or suffix when additional visual cues about an input's function may
be helpful.

Some fields have common visual patterns such as "search" having a magnifying
glass icon, "Select" having a downwards arrow, or currency inputs having a
currency symbol. These signifiers reinforce the purpose of the input to increase
[Recognition over Recall](https://www.nngroup.com/articles/ten-usability-heuristics/)
and align the input with
[Consistency and Standards](https://www.nngroup.com/articles/ten-usability-heuristics/).
With clearer guidance around the purpose of inputs, the user is able to better
focus on the task at hand.

<Canvas>
  <Content>
    <InputText
      defaultValue="1,000,000"
      placeholder="Invoice Total"
      prefix={{ label: "$", icon: "invoice" }}
      suffix={{ label: ".00" }}
    />
    <InputText
      placeholder="Search"
      prefix={{ icon: "search" }}
      suffix={{
        icon: "cross",
        ariaLabel: "clear search",
        onClick: () => alert("This could clear a search value"),
      }}
    />
  </Content>
</Canvas>

### Validation message

You can add your own custom validation messages on a field to assist the user in
successfully completing a form. This doesn't _replace_ server-side validation,
but minimizes the need for it as the user should be set up for success by proper
guidance pre-submission before any "bad" data gets to the server.

Follow the
[product vocabulary](../?path=/docs/content-product-vocabulary--docs#general-phrasing)
for guidance on writing helpful error messages.

<Canvas>
  <InputText
    placeholder="What's your age"
    validations={{
      required: {
        value: true,
        message: "You have to tell us your age",
      },
      validate: val => {
        if (val.length > 0 && !isNaN(val)) {
          return "Type your age in words please.";
        }
        if (val.length >= 10) {
          return "That seems too old.";
        }
        return true;
      },
    }}
  />
</Canvas>

## States

### Disabled

<Canvas>
  <InputText
    placeholder="Credit card"
    value="**** **** **** 1234"
    disabled={true}
  />
</Canvas>

### Invalid

For mobile, you can pass a string to the `invalid` prop to display an error.
See:
[Mobile/invalid example](../?path=/story/components-forms-and-inputs-inputtext-mobile--invalid).

<Canvas>
  <InputText placeholder="Email" value="atlantis" invalid={true} />
</Canvas>

### External label

You can use `FormFieldLabel` to provide a label outside of the input. The
`showMiniLabel` prop on `InputText` can be used to hide the mini label that
appears when a value is provided.

<style>
  {`
  .fullWidth {
    width: 100%;
  }
`}
</style>

<Canvas>
  <div className="fullWidth">
    <FormFieldLabel external={true} htmlFor="ext-input">
      External label
    </FormFieldLabel>
    <InputText
      showMiniLabel={false}
      placeholder="You can still have a placeholder"
      id="ext-input"
    />
  </div>
</Canvas>

### Keyboard

Determine what default keyboard appears on mobile.

<Canvas>
  <InputText placeholder="Describe your age" keyboard="numeric" />
</Canvas>

## Web Component Code

```tsx
InputText Textfield Text Input Input Textbox Textarea Field Web React import React, { forwardRef, useId } from "react";
import omit from "lodash/omit";
import type { InputTextRebuiltProps } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import { useInputTextActions } from "./useInputTextActions";
import type { UseInputTextFormFieldReturn } from "./useInputTextFormField";
import { useInputTextFormField } from "./useInputTextFormField";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

export const InputTextSPAR = forwardRef(function InputTextInternal(
  props: InputTextRebuiltProps,
  inputRefs: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  const inputTextRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const legacyPropHelper = {
    ...props,
    version: 1,
  };

  const id = useInputTextId(props);

  const { rowRange } = useTextAreaResize({
    rows: props.rows,
    value: props.value,
    inputRef: inputTextRef,
    wrapperRef: wrapperRef,
  });

  const type = props.multiline ? "textarea" : "text";

  const { inputStyle } = useFormFieldWrapperStyles(legacyPropHelper);

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus, handleKeyDown, handleClear } =
    useInputTextActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      onKeyDown: props.onKeyDown,
      onEnter: props.onEnter,
      inputRef: inputTextRef,
    });

  const inputProps = omit(props, [
    "onChange",
    "onBlur",
    "onFocus",
    "onEnter",
    "size",
    "placeholder",
    "multiline",
    "prefix",
    "suffix",
    "version",
  ]);

  const { fieldProps, descriptionIdentifier } = useInputTextFormField({
    ...inputProps,
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
  });

  return (
    <FormFieldWrapper
      disabled={props.disabled}
      size={props.size}
      align={props.align}
      inline={props.inline}
      autofocus={props.autoFocus}
      name={name}
      wrapperRef={wrapperRef}
      error={props.error ?? ""}
      invalid={Boolean(props.error || props.invalid)}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      description={props.description}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      type={props.multiline ? "textarea" : "text"}
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      rows={rowRange.min}
      toolbar={props.toolbar}
      toolbarVisibility={props.toolbarVisibility}
    >
      <>
        {type === "textarea" ? (
          <TextArea
            fieldProps={fieldProps}
            rowRange={rowRange}
            inputRefs={[inputRefs, inputTextRef]}
            value={props.value}
            inputStyle={inputStyle}
          />
        ) : (
          <TextInput
            fieldProps={fieldProps}
            inputRefs={[inputRefs, inputTextRef]}
            value={props.value}
            inputStyle={inputStyle}
          />
        )}
        <FormFieldPostFix
          variation="spinner"
          visible={props.loading ?? false}
        />
        {props.children}
      </>
    </FormFieldWrapper>
  );
});

function useInputTextId(props: InputTextRebuiltProps) {
  const generatedId = useId();

  return props.id || generatedId;
}

function TextArea({
  fieldProps,
  rowRange,
  inputRefs,
  value,
  inputStyle,
}: {
  readonly fieldProps: UseInputTextFormFieldReturn["fieldProps"];
  readonly rowRange: ReturnType<typeof useTextAreaResize>["rowRange"];
  readonly inputRefs: React.Ref<HTMLTextAreaElement | HTMLInputElement>[];
  readonly value: string;
  readonly inputStyle: string;
}) {
  return (
    <textarea
      {...fieldProps}
      rows={rowRange.min}
      ref={mergeRefs(inputRefs)}
      className={inputStyle}
      value={value}
    />
  );
}

function TextInput({
  fieldProps,
  inputRefs,
  value,
  inputStyle,
}: {
  readonly fieldProps: UseInputTextFormFieldReturn["fieldProps"];
  readonly inputRefs: React.Ref<HTMLTextAreaElement | HTMLInputElement>[];
  readonly value: string;
  readonly inputStyle: string;
}) {
  return (
    <input
      {...fieldProps}
      ref={mergeRefs(inputRefs)}
      className={inputStyle}
      value={value}
    />
  );
}
import type { Ref } from "react";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import type { InputTextLegacyProps, InputTextRef } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import type { FieldActionsRef } from "../FormField";
import { FormField } from "../FormField";

function InputTextInternal(
  props: InputTextLegacyProps,
  ref: Ref<InputTextRef>,
) {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const actionsRef = useRef<FieldActionsRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { resize, rowRange } = useTextAreaResize({
    rows: props.rows,
    value: props.value,
    inputRef,
    wrapperRef,
  });

  useImperativeHandle(ref, () => ({
    insert: (text: string) => {
      insertText(text);
    },
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
    scrollIntoView: arg => {
      const input = inputRef.current;

      if (input) {
        input.scrollIntoView(arg);
      }
    },
  }));

  return (
    <FormField
      {...props}
      type={props.multiline ? "textarea" : "text"}
      inputRef={inputRef}
      actionsRef={actionsRef}
      wrapperRef={wrapperRef}
      onChange={handleChange}
      rows={rowRange.min}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);

    resize();
  }

  function insertText(text: string) {
    const input = inputRef.current;

    if (input) {
      insertAtCursor(input, text);

      const newValue = input.value;
      actionsRef.current?.setValue(newValue);
      props.onChange && props.onChange(newValue);
    }
  }
}

export const InputText = forwardRef(InputTextInternal);

function insertAtCursor(
  input: HTMLTextAreaElement | HTMLInputElement,
  newText: string,
) {
  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;
  const text = input.value;
  const before = text.substring(0, start);
  const after = text.substring(end, text.length);
  input.value = before + newText + after;
  input.selectionStart = input.selectionEnd = start + newText.length;
  input.focus();
}
import type { ForwardedRef } from "react";
import React, { forwardRef } from "react";
import { InputText as InputTextLegacy } from "./InputText";
import { InputTextSPAR } from "./InputText.rebuilt";
import {
  type InputTextLegacyProps,
  type InputTextRebuiltProps,
  type InputTextRef,
} from "./InputText.types";

export type InputTextShimProps = InputTextLegacyProps | InputTextRebuiltProps;

function isNewInputTextProps(
  props: InputTextShimProps,
): props is InputTextRebuiltProps {
  return props.version === 2;
}

export const InputText = forwardRef(function InputTextShim(
  props: InputTextShimProps,
  ref: ForwardedRef<HTMLTextAreaElement | HTMLInputElement | InputTextRef>,
) {
  if (isNewInputTextProps(props)) {
    return (
      <InputTextSPAR
        {...props}
        ref={ref as ForwardedRef<HTMLTextAreaElement | HTMLInputElement>}
      />
    );
  } else {
    return (
      <InputTextLegacy {...props} ref={ref as ForwardedRef<InputTextRef>} />
    );
  }
});

export type { InputTextRef, InputTextRebuiltProps, InputTextLegacyProps };

```

## Props

### Web Props

| Prop        | Type      | Required  | Default  | Description                                   |
| ----------- | --------- | --------- | -------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `multiline` | `boolean` | ❌        | `_none_` | Use this when you're expecting a long answer. |
| `rows`      | `number   | RowRange` | ❌       | `_none_`                                      | Specifies the visible height of a long answer form field. Can be in the |

form of a single number to set a static height, or an object with a min and max
keys indicating the minimum number of visible rows, and the maximum number of
visible rows. | | `id` | `string` | ❌ | `_none_` | A unique identifier for the
input. | | `align` | `"center" | "right"` | ❌ | `_none_` | Determines the
alignment of the text inside the input. | | `description` | `ReactNode` | ❌ |
`_none_` | Further description of the input, can be used for a hint. | |
`disabled` | `boolean` | ❌ | `_none_` | Disable the input | | `showMiniLabel` |
`boolean` | ❌ | `true` | Controls the visibility of the mini label that appears
inside the input when a value is entered. By default, the placeholder text moves
up to become a mini label. Set to false to disable this behavior. | | `invalid`
| `boolean` | ❌ | `_none_` | Highlights the field red to indicate an error. | |
`inline` | `boolean` | ❌ | `_none_` | Adjusts the form field to go inline with
a content. This also silences the given `validations` prop. You'd have to used
the `onValidate` prop to capture the message and render it somewhere else using
the `InputValidation` component. | | `loading` | `boolean` | ❌ | `_none_` |
Show a spinner to indicate loading | | `name` | `string` | ❌ | `_none_` | Name
of the input. | | `onChange` |
`(newValue: string | number | boolean | Date, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void`
| ❌ | `_none_` | onChange handler that provides the new value (or event) @param
newValue @param event | | `onValidation` | `(message: string) => void` | ❌ |
`_none_` | Callback to get the the status and message when validating a field
@param message | | `placeholder` | `string` | ❌ | `_none_` | Text that appears
inside the input when empty and floats above the value as a mini label once the
user enters a value. When showMiniLabel is false, this text only serves as a
standard placeholder and disappears when the user types. | | `size` |
`"small" | "large"` | ❌ | `_none_` | Adjusts the interface to either have small
or large spacing. | | `value` | `string | number | Date` | ❌ | `_none_` | Set
the component to the given value. | | `clearable` | `Clearable` | ❌ | `_none_`
| Add a clear action on the input that clears the value.

You should always use `while-editing` if you want the input to be clearable. if
the input value isn't editable (i.e. `InputTime`) you can set it to `always`. |
| `version` | `1` | ❌ | `_none_` | Experimental: Determine which version of the
FormField to use. Right now this isn't used but it will be used in the future to
allow us to release new versions of our form inputs without breaking existing
functionality. | | `autofocus` | `boolean` | ❌ | `_none_` | Determines if the
input should be auto-focused, using the HTML attribute | | `maxLength` |
`number` | ❌ | `_none_` | Maximum character length for an input. This also
changes the width to roughly the same size as the max length. This is to
communicate that the user that on certain cases, they can only type a limited
amount of characters. | | `readonly` | `boolean` | ❌ | `_none_` | Prevents
users from editing the value. | | `autocomplete` | `boolean | AutocompleteTypes`
| ❌ | `_none_` | Determines if browser form autocomplete is enabled. Note that
"one-time-code" is experimental and should not be used without consultation.
"address-line1" and "address-line2" are used for billing address information. |
| `keyboard` | `"numeric" | "decimal"` | ❌ | `_none_` | Determines what kind of
keyboard appears on mobile web. | | `onEnter` |
`(event: React.KeyboardEvent) => void` | ❌ | `_none_` | A callback to handle
"Enter" keypress. This will only run if Enter is the only key. Will not run if
Shift or Control are being held. | | `onFocus` |
`(event?: React.FocusEvent) => void` | ❌ | `_none_` | Focus callback. | |
`onBlur` | `(event?: React.FocusEvent) => void` | ❌ | `_none_` | Blur callback.
| | `inputRef` |
`RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>` | ❌ |
`_none_` | _No description_ | | `validations` | `RegisterOptions` | ❌ |
`_none_` | Show an error message above the field. This also highlights the the
field red if an error message shows up. | | `defaultValue` | `string | Date` |
❌ | `_none_` | Initial value of the input. Only use this when you need to
pre-populate the field with a data that is not controlled by the components
state. If a state is controlling the value, use the `value` prop instead. | |
`prefix` | `Affix` | ❌ | `_none_` | Adds a prefix label and icon to the field |
| `suffix` |
`{ onClick: () => void; readonly ariaLabel: string; readonly icon: IconNames; readonly label?: string; } | { onClick?: never; ariaLabel?: never; readonly label?: string; readonly icon?: IconNames; }`
| ❌ | `_none_` | Adds a suffix label and icon with an optional action to the
field | | `toolbar` | `any` | ❌ | `_none_` | Toolbar to render content below
the input. | | `toolbarVisibility` | `"while-editing" | "always"` | ❌ |
`_none_` | Determines the visibility of the toolbar. | | `ref` |
`LegacyRef<InputTextRef>` | ❌ | `_none_` | Allows getting a ref to the
component instance. Once the component unmounts, React will set `ref.current` to
`null` (or call the ref with `null` if you passed a callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

### Mobile Props

| Prop                                                                             | Type                                                              | Required                                            | Default                             | Description                                                                                      |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------- | -------- | ------------ | --------------- | ------ | --- | -------- | --------------------------------------------------------------------- |
| `invalid`                                                                        | `string                                                           | boolean`                                            | ❌                                  | `_none_`                                                                                         | Highlights the field red and shows message below (if string) to indicate an error |
| `disabled`                                                                       | `boolean`                                                         | ❌                                                  | `_none_`                            | Disable the input                                                                                |
| `readonly`                                                                       | `boolean`                                                         | ❌                                                  | `_none_`                            | Makes the input read-only                                                                        |
| `name`                                                                           | `string`                                                          | ❌                                                  | `_none_`                            | Name of the input.                                                                               |
| `placeholder`                                                                    | `string`                                                          | ❌                                                  | `_none_`                            | Hint text that goes above the value once the field is filled out                                 |
| `assistiveText`                                                                  | `string`                                                          | ❌                                                  | `_none_`                            | Text that helps the user understand the input                                                    |
| `keyboard`                                                                       | `"default"                                                        | "numeric"                                           | "phone-pad"                         | "email-address"                                                                                  | "numbers-and-punctuation"                                                         | "decimal-pad"`   | ❌                                 | `_none_`                                                                                 | Determines what keyboard is shown |
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
| `autoComplete`                                                                   | `"name"                                                           | "additional-name"                                   | "address-line1"                     | "address-line2"                                                                                  | "birthdate-day"                                                                   | "birthdate-full" | "birthdate-month"                  | "birthdate-year"                                                                         | "cc-csc"                          | "cc-exp" | "cc-exp-day" | ... 45 more ... | "off"` | ❌  | `_none_` | Determines which content to suggest on auto complete, e.g.`username`. |

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
`always`. | | `testID` | `string` | ❌ | `_none_` | Used to locate this view in
end-to-end tests | | `secureTextEntry` | `boolean` | ❌ | `_none_` | Use secure
text entry | | `spellCheck` | `boolean` | ❌ | `_none_` | Determines whether
spell check is used. Turn it off to hide empty autoCorrect suggestions when
autoCorrect is off.

_iOS Only_ | | `styleOverride` | `InputTextStyleOverride` | ❌ | `_none_` |
Custom styling to override default style of the input text | | `toolbar` |
`React.ReactNode` | ❌ | `_none_` | Add a toolbar below the input field for
actions like rewriting the text. | | `toolbarVisibility` |
`"while-editing" | "always"` | ❌ | `_none_` | Change the behaviour of when the
toolbar becomes visible. | | `loading` | `boolean` | ❌ | `_none_` | Show
loading indicator. | | `loadingType` | `"spinner" | "glimmer"` | ❌ | `_none_` |
Change the type of loading indicator to spinner or glimmer. | | `ref` |
`LegacyRef<InputTextRef>` | ❌ | `_none_` | Allows getting a ref to the
component instance. Once the component unmounts, React will set `ref.current` to
`null` (or call the ref with `null` if you passed a callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

## Categories

- Forms & Inputs

## Web Test Code

```typescript
InputText Textfield Text Input Input Textbox Textarea Field Web React Test Testing Jest import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { InputText } from ".";
import type { InputTextRef } from "./InputText.types";

describe("InputText Version 1", () => {
  it("renders a regular input for text and numbers", () => {
    const { container } = render(<InputText placeholder="Favourite colour" />);
    expect(container).toMatchSnapshot();
  });

  it("renders a textarea", () => {
    const { container } = render(
      <InputText placeholder="Describe your favourite colour?" multiline />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders a textarea with 4 rows", () => {
    const { container } = render(
      <InputText
        placeholder="Describe your favourite colour?"
        multiline
        rows={4}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should call the handler with the new value", async () => {
    const placeholder = "I hold places.";
    const newValue =
      "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
    const newerValue =
      "They always say time changes things, but you actually have to change them yourself.";
    const changeHandler = jest.fn();

    const { getByLabelText } = render(
      <InputText
        name="Got milk?"
        onChange={changeHandler}
        placeholder={placeholder}
      />,
    );

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newValue);

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newerValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newerValue);
  });

  it("should handle inserting text", () => {
    const initial = "Got milk?";
    const result = `${initial}YUP`;
    const secondResult = `${initial}YUPsure`;

    const textRef = React.createRef<InputTextRef>();
    const changeHandler = jest.fn();

    render(
      <InputText value={initial} onChange={changeHandler} ref={textRef} />,
    );

    textRef.current?.insert("YUP");
    expect(changeHandler).toHaveBeenCalledWith(result);

    textRef.current?.insert("sure");
    expect(changeHandler).toHaveBeenCalledWith(secondResult);
  });

  describe("focusing", () => {
    it("should focus input text", () => {
      const placeholder = "Got milk?";

      const textRef = React.createRef<InputTextRef>();

      const { getByLabelText } = render(
        <InputText placeholder={placeholder} ref={textRef} />,
      );

      textRef.current?.focus();
      expect(getByLabelText(placeholder)).toHaveFocus();
    });

    it("supports the autofocus attribute", async () => {
      const placeholder = "Got milk?";

      const { getByLabelText } = render(
        <InputText placeholder={placeholder} autofocus />,
      );

      expect(getByLabelText(placeholder)).toHaveFocus();
    });
  });

  it("should scroll into view input text", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(<InputText placeholder={placeholder} ref={textRef} />);

    textRef.current?.scrollIntoView();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  describe("toolbar", () => {
    describe("without toolbar", () => {
      it("should not render toolbar", () => {
        render(<InputText placeholder="Favourite colour" />);
        expect(
          screen.queryByTestId("ATL-InputText-Toolbar"),
        ).not.toBeInTheDocument();
      });
    });
    describe("with toolbar and toolbarVisibility always", () => {
      it("should always render toolbar", () => {
        render(
          <InputText
            placeholder="Favourite movie"
            toolbar={<h1>Bar Of Tool</h1>}
            toolbarVisibility="always"
          />,
        );
        expect(screen.getByTestId("ATL-InputText-Toolbar")).toBeInTheDocument();
      });
    });

    describe("with toolbar and toolbarVisibility focus-within", () => {
      it("should only render toolbar when focused", () => {
        render(
          <InputText
            placeholder="Favourite movie"
            toolbar={<h1>Bar Of Tool</h1>}
          />,
        );
        expect(
          screen.queryByTestId("ATL-InputText-Toolbar"),
        ).not.toBeInTheDocument();

        const input = screen.getByLabelText("Favourite movie");
        fireEvent.focus(input);

        expect(screen.getByTestId("ATL-InputText-Toolbar")).toBeInTheDocument();
      });
    });
    describe("with multiline", () => {
      describe("with toolbar and toolbarVisibility focus-within", () => {
        it("should only render toolbar when focused", () => {
          render(
            <InputText
              placeholder="Favourite movie"
              toolbar={<h1>Bar Of Tool</h1>}
              multiline
            />,
          );
          expect(
            screen.queryByTestId("ATL-InputText-Toolbar"),
          ).not.toBeInTheDocument();

          const input = screen.getByLabelText("Favourite movie");
          fireEvent.focus(input);

          expect(
            screen.getByTestId("ATL-InputText-Toolbar"),
          ).toBeInTheDocument();
        });
      });
    });
  });
});

describe("InputText V2", () => {
  const value = "";
  it("renders a regular input for text and numbers", () => {
    const { container } = render(
      <InputText
        value={value}
        version={2}
        placeholder="Describe your favourite colour?"
        multiline
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("renders a textarea with 4 rows", () => {
    const { container } = render(
      <InputText
        value={value}
        version={2}
        placeholder="Describe your favourite colour?"
        multiline
        rows={4}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should call the handler with the new value", async () => {
    const placeholder = "I hold places.";
    const newValue =
      "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
    const newerValue =
      "They always say time changes things, but you actually have to change them yourself.";
    const changeHandler = jest.fn();

    const { getByLabelText } = render(
      <InputText
        name="Got milk?"
        value={value}
        version={2}
        onChange={changeHandler}
        placeholder={placeholder}
      />,
    );

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newValue, expect.anything());

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newerValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newerValue, expect.anything());
  });

  it("should render text description", () => {
    const description = "This is a description";
    render(
      <InputText
        value={value}
        version={2}
        placeholder="Favourite colour"
        description={description}
      />,
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should render markup description", () => {
    const testId = "i-am-a-description";
    const element = <div data-testid={testId} />;
    render(
      <InputText
        value={value}
        version={2}
        placeholder="Favourite colour"
        description={element}
      />,
    );
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  describe("focusing", () => {
    it("should focus input text", () => {
      const placeholder = "Got milk?";

      const textRef = React.createRef<InputTextRef>();

      const { getByLabelText } = render(
        <InputText
          placeholder={placeholder}
          ref={textRef}
          version={2}
          value={value}
        />,
      );

      textRef.current?.focus();
      expect(getByLabelText(placeholder)).toHaveFocus();
    });

    it("supports the autofocus attribute", async () => {
      const placeholder = "Got milk?";

      const { getByLabelText } = render(
        <InputText
          placeholder={placeholder}
          autoFocus
          version={2}
          value={value}
        />,
      );

      expect(getByLabelText(placeholder)).toHaveFocus();
    });
  });

  it("should scroll into view input text", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(
      <InputText
        version={2}
        value={value}
        placeholder={placeholder}
        ref={textRef}
      />,
    );

    textRef.current?.scrollIntoView();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  describe("toolbar", () => {
    describe("without toolbar", () => {
      it("should not render toolbar", () => {
        render(
          <InputText
            placeholder="Favourite colour"
            version={2}
            value={value}
          />,
        );
        expect(
          screen.queryByTestId("ATL-InputText-Toolbar"),
        ).not.toBeInTheDocument();
      });
    });
    describe("with toolbar and toolbarVisibility always", () => {
      it("should always render toolbar", () => {
        render(
          <InputText
            placeholder="Favourite movie"
            version={2}
            value={value}
            toolbar={<h1>Bar Of Tool</h1>}
            toolbarVisibility="always"
          />,
        );
        expect(screen.getByTestId("ATL-InputText-Toolbar")).toBeInTheDocument();
      });
    });

    describe("with toolbar and toolbarVisibility focus-within", () => {
      it("should only render toolbar when focused", () => {
        render(
          <InputText
            version={2}
            value={value}
            placeholder="Favourite movie"
            toolbar={<h1>Bar Of Tool</h1>}
          />,
        );
        expect(
          screen.queryByTestId("ATL-InputText-Toolbar"),
        ).not.toBeInTheDocument();

        const input = screen.getByLabelText("Favourite movie");
        fireEvent.focus(input);

        expect(screen.getByTestId("ATL-InputText-Toolbar")).toBeInTheDocument();
      });
    });
    describe("with multiline", () => {
      describe("with toolbar and toolbarVisibility focus-within", () => {
        it("should only render toolbar when focused", () => {
          render(
            <InputText
              version={2}
              value={value}
              placeholder="Favourite movie"
              toolbar={<h1>Bar Of Tool</h1>}
              multiline
            />,
          );
          expect(
            screen.queryByTestId("ATL-InputText-Toolbar"),
          ).not.toBeInTheDocument();

          const input = screen.getByLabelText("Favourite movie");
          fireEvent.focus(input);

          expect(
            screen.getByTestId("ATL-InputText-Toolbar"),
          ).toBeInTheDocument();
        });
      });
    });
  });
});

```

## Component Path

`/components/InputText`

---

_Generated on 2025-08-21T17:35:16.366Z_
