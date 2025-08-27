# InputPressable

# Input Pressable

InputPressable is a component that is used to trigger an action when pressed.

## Design & usage guidelines

This component matches InputText in terms of visual design, but functionality is
tied to a press action instead of an input. As a result, this component can
launch a native modal or external library such as the DateTimePicker, instead of
acting as an input that triggers a keyboard when tapped.

### States

A
[disabled](../?path=/story/components-forms-and-inputs-inputpressable-mobile--disabled)
InputPressable cannot be pressed and is visually muted to indicate that it is
disabled.

An
[invalid](../?path=/story/components-forms-and-inputs-inputpressable-mobile--invalid)
state is indicated by a red input line and an error message. The error message
is displayed below the input.

To make an InputPressable
[clearable](../?path=/story/components-forms-and-inputs-inputpressable-mobile--clearable)
you need to pass the `clearable` prop set as `always`. The reason for this is
that InputPressable isn't an input that is focused in the same way an InputText
would be. When you want to have an input be clearable you will also need to
provide an `onClear` that will clear the input's value.

## Props

### Mobile Props

| Prop                 | Type                                                       | Required                                                | Default  | Description                                                         |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------- | -------- | ------------------------------------------------------------------- | ------------------------------------------ |
| `value`              | `string`                                                   | ❌                                                      | `_none_` | Current value of the component                                      |
| `placeholder`        | `string`                                                   | ❌                                                      | `_none_` | Placeholder item shown until a selection is made                    |
| `disabled`           | `boolean`                                                  | ❌                                                      | `_none_` | Disables input selection                                            |
| `focused`            | `boolean`                                                  | ❌                                                      | `_none_` | Indicates if the input is focused                                   |
| `error`              | `FieldError`                                               | ❌                                                      | `_none_` | Indicates if there is an validation error                           |
| `invalid`            | `string                                                    | boolean`                                                | ❌       | `_none_`                                                            | Indicates the current selection is invalid |
| `onPress`            | `() => void`                                               | ❌                                                      | `_none_` | Callback that is called when the text input is focused              |
| @param event         |
| `accessibilityLabel` | `string`                                                   | ❌                                                      | `_none_` | VoiceOver will read this string when a user selects the element     |
| `accessibilityHint`  | `string`                                                   | ❌                                                      | `_none_` | Helps users understand what will happen when they perform an action |
| `prefix`             | `{ icon?: IconNames; label?: string; }`                    | ❌                                                      | `_none_` | Symbol to display before the text input                             |
| `suffix`             | `{ icon: IconNames; label?: string; onPress: () => void; } | { onPress?: never; icon?: IconNames; label?: string; }` | ❌       | `_none_`                                                            | Symbol to display after the text input     |
| `clearable`          | `Clearable`                                                | ❌                                                      | `_none_` | Add a clear action on the input that clears the value.              |

Since the input value isn't editable (i.e. `InputDateTime`) you can set it to
`always`. If you set it to `always` you must also provide an onClear to clear
the input's value | | `onClear` | `() => void` | ❌ | `_none_` | Callback called
when the user clicks the ClearAction button. Should clear the value passed. To
disallow clearing set the clearable prop to never | | `ref` | `LegacyRef<Text>`
| ❌ | `_none_` | Allows getting a ref to the component instance. Once the
component unmounts, React will set `ref.current` to `null` (or call the ref with
`null` if you passed a callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

## Categories

- Forms & Inputs

## Component Path

`/components/InputPressable`

---

_Generated on 2025-08-21T17:35:16.366Z_
