# EmptyState

# Empty State

EmptyState is a component we show when there is nothing here for the user. This
component should be used for lists with no content, search with no results,
error states etc.
[Here is a document](https://jobber.atlassian.net/wiki/spaces/DES/pages/2103541908/Empty+states)
that explores this in more detail.

## Design & usage guidelines

By considering and accounting for often “un-happy” paths in the user’s journey,
we can allow the user to learn how to use Jobber more effectively, guide them
out of troublesome scenarios, and ensure that they never feel like they’ve hit a
dead-end in the product.

For more detail you can read about our
[Empty State patterns.](https://jobber.atlassian.net/wiki/spaces/DES/pages/2103541908/Empty+states)

## Content guidelines

An Empty State can display an Icon, text-based title, text-based description,
and 1–2 actions in Buttons.

If there is an icon that is relevant to helping the user understand the Empty
State, and the layout has space to comfortably accommodate it, you can use an
icon to help add an element of “glanceability”.

When providing a title, ensure that it is succinct. It should not take up more
than 1 line on a small (320px) device, so the user can quickly assess what's
going on.

A description can be longer and provide more context or instruction, but as with
the title, keep it brief as possible so the user can spend less time reading and
more time getting into a happier state.

Action labels should be–you guessed it–short and succinct. Labels should be
clear about what will happen when the Button is pressed.

## Accessibility

Icons are not read out by assistive technology as they are decorative in nature.

Title has a role of Heading and will be announced as such to assistive
technology like "Heading - \{title content\}".

Description has a role of Text and will be read to assistive technology without
any modifiers.

Actions have a role of Button and will be announced as such to assistive
technology.

## Responsiveness

Empty State will take up as much width as possible - all UI elements will remain
in the centre as the width increases or decreases. Text-based elements will
reflow to a second line if enough content is provided.

## Mockup

<Figma
  collapsable
  url="https://www.figma.com/file/avvgu5SkbBvS8lGVePBsqO/%F0%9F%92%99-Product%2FMobile?node-id=15092%3A14985"
/>

## Props

### Mobile Props

| Prop              | Type        | Required  | Default  | Description                       |
| ----------------- | ----------- | --------- | -------- | --------------------------------- | ------ | ---------- | -------------- | ----------------- | ------ | ----------- | ------- | -------- | ----- | ------ | -------- | ------------- | --------------- | ----------------- | --- | ------ | ------------------------- |
| `icon`            | `IconNames` | ❌        | `_none_` | Icon to display.                  |
| `iconColor`       | `"task"     | "warning" | "icon"   | "white"                           | "grey" | "greyBlue" | "greyBlueDark" | "greyBlueLighter" | "blue" | "lightBlue" | "green" | "yellow" | "red" | "navy" | "orange" | "interactive" | ... 33 more ... | "brandHighlight"` | ❌  | `blue` | Color of Icon to display. |
| `title`           | `string`    | ❌        | `_none_` | Title of the empty state.         |
| `description`     | `string`    | ❌        | `_none_` | Description of the empty state.   |
| `primaryAction`   | `Action`    | ❌        | `_none_` | Handler for the primary action.   |
| `secondaryAction` | `Action`    | ❌        | `_none_` | Handler for the secondary action. |

## Categories

- Status & Feedback

## Component Path

`/components/EmptyState`

---

_Generated on 2025-08-21T17:35:16.360Z_
