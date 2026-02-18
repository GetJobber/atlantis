# ActionLabel

# Action Label

The ActionLabel is a base component that is widely used in areas that have an
`onPress` action, like a button.

The aim is to reduce the number of inconsistencies when a designer or an
engineer decides to build a pressable component that has text on it. This makes
it easier to maintain consistency in how we visually present tappable actions.

## Design & usage guidelines

ActionLabel supports similar semantic variations as Button:

- default (equivalent to "work")
- learning
- destructive
- subtle

with an additional variation of `onPrimary` which should be used when the
ActionLabel is consumed by a primary Button or other dark surface.

#### Disable pattern

**As a best practice, do not design with disabled button states. **

This has negative impacts on accessibility as well as an increase in complexity
for users to understand why the interface is disabled and how to resolve it.

With that said, if you can't design a flow without a disabled state, you can add
a `disabled` prop to the ActionLabel component.

## Props

### Mobile Props

| Prop        | Type                   | Required | Default           | Description                                                          |
| ----------- | ---------------------- | -------- | ----------------- | -------------------------------------------------------------------- |
| `children`  | `string`               | ❌       | `_none_`          | Text to display                                                      |
| `disabled`  | `boolean`              | ❌       | `[object Object]` | Set the display text to disabled color                               |
| `variation` | `ActionLabelVariation` | ❌       | `interactive`     | The text color                                                       |
| `type`      | `ActionLabelType`      | ❌       | `default`         | Changes the appearance to match the style of where it's getting used |
| `align`     | `TextAlign`            | ❌       | `center`          | Alignment of action label                                            |

## Categories

- Actions

## Component Path

`/components/ActionLabel`

---

_Generated on 2025-08-21T17:35:16.351Z_
