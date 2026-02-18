# ButtonGroup

# Button Group

The ButtonGroup component is used to horizontally group one or more actions
represented by buttons. The layout of the buttons is dependent on the number and
type of actions provided.

Up to 2 primary actions are displayed as buttons, in the order provided.
Additional primary actions are hidden in a `More` menu.

Secondary actions can also be specified which are always displayed in the `More`
menu.

The `More` button opens the additional actions in a `BottomSheet`.

It can optionally display a heading above the Secondary actions bottom sheet. It
can also optionally display a cancel button in the footer, which closes the
sheet.

## Design & usage guidelines

Actions will be displayed in the order provided. Secondary actions will always
be placed in the `More` menu. In general, at least one primary action should be
provided.

Primary actions can optionally specify alternative button types and variations
depending on use case.

## Content guidelines

A ButtonGroup must contain one or more children that are of the type
`ButtonGroup.PrimaryAction` or `ButtonGroup.SecondaryAction`

## Accessibility

Each button within the group will support all the accessibility attributes that
the Button component provides.

The ButtonGroup itself does not have additional accessibility attributes.

## Responsiveness

On wider screens such as on tablets, additional buttons will be shown in the
horizontal list (up to 4), rather than hidden under the "More" button.

Secondary actions are always hidden in "More", regardless of space.

Button labels will overlap multiple lines. All buttons in the group should size
to match the height of the largest button.

## Mockup

<Figma
  collapsable
  url="https://www.figma.com/file/avvgu5SkbBvS8lGVePBsqO/%F0%9F%92%99-Product%2FMobile?node-id=15363%3A35792"
/>

## Props

### Mobile Props

| Prop                      | Type         | Required | Default           | Description                                                                |
| ------------------------- | ------------ | -------- | ----------------- | -------------------------------------------------------------------------- |
| `showCancelInBottomSheet` | `boolean`    | ❌       | `_none_`          | Display a cancel button in the secondary bottom sheet footer.              |
| `bottomSheetHeading`      | `string`     | ❌       | `_none_`          | An optional heading to display in the secondary bottom sheet header.       |
| `onOpenBottomSheet`       | `() => void` | ❌       | `_none_`          | Callback that is called when the secondary actions bottom sheet is opened. |
| `onCloseBottomSheet`      | `() => void` | ❌       | `_none_`          | Callback that is called when the secondary actions bottom sheet is closed. |
| `allowTapWhenOffline`     | `boolean`    | ❌       | `[object Object]` | Allows you to Tap the button while offline                                 |

## Categories

- Actions

## Component Path

`/components/ButtonGroup`

---

_Generated on 2025-08-21T17:35:16.354Z_
