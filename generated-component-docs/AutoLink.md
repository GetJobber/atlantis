# AutoLink

# Auto Link

The AutoLink component is a base component that utilizes the
[autolinker](https://github.com/gregjacobs/Autolinker.js/) package to find urls,
phone numbers and emails within a chunk of text. When these linkable items are
found, they are converted to links that can be interacted with.

This component makes use of the Text component to display both the plain text
and the links discovered.

In the event a phone number is pressed, after completing the call the user will
be returned to the app. The same applies when using the detected email.

## Design & usage guidelines

The AutoLink will detect linkable items within text and allow the user to
interact with them. You can use flags to determine if you want to ignore certain
types of links, such as ignoring phone numbers.

This is intended for scenarios where you do not know if the text to display will
contain links within it. A common use case for this would be when dealing with
user input.

## Props

### Mobile Props

| Prop                | Type      | Required | Default  | Description                                                                |
| ------------------- | --------- | -------- | -------- | -------------------------------------------------------------------------- |
| `children`          | `string`  | ✅       | `_none_` | Text to display.                                                           |
| `phone`             | `boolean` | ❌       | `_none_` | Flag for linking phone numbers in text                                     |
| `email`             | `boolean` | ❌       | `_none_` | Flag for linking emails in text                                            |
| `urls`              | `boolean` | ❌       | `_none_` | Flag for linking urls in text                                              |
| `bottomTabsVisible` | `boolean` | ❌       | `true`   | Determines the placement of the toast that gets shown onLongPress          |
| `selectable`        | `boolean` | ❌       | `true`   | Lets the user select text, to use the native copy and paste functionality. |

## Categories

- Text & Typography

## Component Path

`/components/AutoLink`

---

_Generated on 2025-08-21T17:35:16.352Z_
