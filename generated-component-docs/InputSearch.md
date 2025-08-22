# InputSearch

# InputSearch

The InputSearch component allows the user to input a keyword to search from
associated data. It handles debouncing for improved performance when making
queries.

## Design & usage guidelines

InputSearch will provide a consistent experience for users searching for
content. It uses familiar iconography and interactions to make searching a
simpler experience.

## Content guidelines

The label for InputSearch should help guide the user to find their results. It
can be helpful to direct the user to use certain types of queries for a given
search, such as "Search by clients and properties".

It is recommended to use the `search` icon as a prefix to aid users in
recognizing the functionality of the input.

InputSearch will take up the full available width of its container.

## Accessibility

Most of the accessibility concerns for InputSearch are handled by `InputText`.
It is announced as an input and the label and value are read to assistive
technology. Users can navigate to the clear button to remove the entered value.

## Mockup

<Figma
  collapsable
  url="https://www.figma.com/file/avvgu5SkbBvS8lGVePBsqO/Product%2FMobile?node-id=25435%3A166491"
/>

## Props

### Mobile Props

| Prop                                                                                          | Type                                    | Required | Default  | Description                                                                                      |
| --------------------------------------------------------------------------------------------- | --------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------ |
| `onChange`                                                                                    | `(newValue: string) => void`            | ✅       | `_none_` | A callback function that handles the update of the new value of the property value.              |
| `onDebouncedChange`                                                                           | `(searchValue: string) => void`         | ✅       | `_none_` | A callback function that handles the API call to search the value. This is where the             |
| wait value is applied to the debounce function to give a delay in each input and API request. |
| `value`                                                                                       | `string`                                | ✅       | `_none_` | Set the component to a given value                                                               |
| `wait`                                                                                        | `number`                                | ❌       | `300`    | A numeric value to represents the milliseconds in delaying the function to populate              |
| the data source when the 'value' changed.                                                     |
| `accessibilityHint`                                                                           | `string`                                | ❌       | `_none_` | An accessibility hint helps users understand what will happen when they perform an action on the |
| accessibility element when that result is not clear from the accessibility label              |
| `accessibilityLabel`                                                                          | `string`                                | ❌       | `_none_` | VoiceOver will read this string when a user selects the associated element                       |
| `autoFocus`                                                                                   | `boolean`                               | ❌       | `_none_` | Automatically focus the input after it is rendered                                               |
| `placeholder`                                                                                 | `string`                                | ❌       | `_none_` | Hint text that goes above the value once the field is filled out                                 |
| `prefix`                                                                                      | `{ icon?: IconNames; label?: string; }` | ❌       | `_none_` | Symbol to display before the text input                                                          |
| `ref`                                                                                         | `LegacyRef<InputTextRef>`               | ❌       | `_none_` | Allows getting a ref to the component instance.                                                  |

Once the component unmounts, React will set `ref.current` to `null` (or call the
ref with `null` if you passed a callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

## Categories

- Forms & Inputs

## Component Path

`/components/InputSearch`

---

_Generated on 2025-08-21T17:35:16.366Z_
