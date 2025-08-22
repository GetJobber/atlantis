# InlineLabel

# Inline Label

InlineLabel is a generic badging element that can be used to distinguish a
labeling element from other typographic content.

## Design & usage guidelines

Inline labels can be used fairly broadly, but the application of
[color](/design/colors) should be handled with intent. Use of color along with a
descriptive label can help the user understand the meaning of an item.

### Counts

<Canvas>
  <Box direction="row" alignItems="baseline" gap="small">
    <Text>Unread</Text>
    <InlineLabel color="red">+99</InlineLabel>
  </Box>
</Canvas>

### Trends

<Canvas>
  <InlineLabel color="red">↓ 15</InlineLabel>
  <InlineLabel color="green">↑ 25</InlineLabel>
</Canvas>

### Tags

<Canvas>
  <Box direction="row" alignItems="center" gap="smaller">
    <InlineLabel>Preferred customer</InlineLabel>
    <InlineLabel>Northeast</InlineLabel>
    <InlineLabel>Residential</InlineLabel>
    <InlineLabel>Electrical</InlineLabel>
    <InlineLabel>10OFF promo</InlineLabel>
  </Box>
</Canvas>

### Labels that need to be distinguished from other typographic element

<Canvas>
  <Box direction="row" alignItems="center" gap="small">
    <Heading level={2}>New feature</Heading>
    <InlineLabel size="large">Beta</InlineLabel>
  </Box>
</Canvas>

## Related components

[StatusLabel](/components/StatusLabel) should be used when you're conveying the
"status" of something.

## Variants

### Sizes

#### Large

<Canvas>
  <InlineLabel size="large" color="blue">
    Beta
  </InlineLabel>
</Canvas>

#### Larger

<Canvas>
  <InlineLabel size="larger" color="green">
    99+
  </InlineLabel>
</Canvas>

### Colors

| Inline Label                                               | Color         |
| :--------------------------------------------------------- | :------------ |
| <InlineLabel color="greyBlue">GreyBlue</InlineLabel>       | `greyBlue`    |
| <InlineLabel color="red">Red</InlineLabel>                 | `red`         |
| <InlineLabel color="orange">Orange</InlineLabel>           | `orange`      |
| <InlineLabel color="green">Green</InlineLabel>             | `green`       |
| <InlineLabel color="blue">Blue</InlineLabel>               | `blue`        |
| <InlineLabel color="yellow">Yellow</InlineLabel>           | `yellow`      |
| <InlineLabel color="lime">Lime</InlineLabel>               | `lime`        |
| <InlineLabel color="purple">Purple</InlineLabel>           | `purple`      |
| <InlineLabel color="pink">Pink</InlineLabel>               | `pink`        |
| <InlineLabel color="teal">Teal</InlineLabel>               | `teal`        |
| <InlineLabel color="yellowGreen">YellowGreen</InlineLabel> | `yellowGreen` |
| <InlineLabel color="blueDark">BlueDark</InlineLabel>       | `blueDark`    |
| <InlineLabel color="lightBlue">LightBlue</InlineLabel>     | `lightBlue`   |
| <InlineLabel color="indigo">Indigo</InlineLabel>           | `indigo`      |

## Web Component Code

```tsx
InlineLabel Tag Label Chip Badge Pill Status Label Status Web React import type { ReactNode } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./InlineLabel.module.css";
import { Typography } from "../Typography";

export type InlineLabelColors =
  | "greyBlue"
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "lime"
  | "purple"
  | "pink"
  | "teal"
  | "yellowGreen"
  | "blueDark"
  | "lightBlue"
  | "indigo";

interface InlineLabelProps {
  /**
   * The size of the label
   * @default base
   */
  readonly size?: "base" | "large" | "larger";
  /**
   * The color of the label
   * @default "greyBlue"
   */
  readonly color?: InlineLabelColors;
  readonly children: ReactNode;
}

interface SizeMapProps {
  [key: string]: "small" | "base" | "large";
}

export function InlineLabel({
  size = "base",
  color = "greyBlue",
  children,
}: InlineLabelProps) {
  const className = classnames(styles.inlineLabel, styles[size], styles[color]);

  const sizeMapper: SizeMapProps = {
    base: "small",
    large: "large",
    larger: "large",
  };

  return (
    <span className={className}>
      <Typography element="span" size={sizeMapper[size]}>
        {children}
      </Typography>
    </span>
  );
}

```

## Props

### Web Props

| Prop    | Type                | Required | Default    | Description            |
| ------- | ------------------- | -------- | ---------- | ---------------------- | ------ | --------------------- |
| `size`  | `"base"             | "large"  | "larger"`  | ❌                     | `base` | The size of the label |
| `color` | `InlineLabelColors` | ❌       | `greyBlue` | The color of the label |

## Categories

- Status & Feedback

## Web Test Code

```typescript
InlineLabel Tag Label Chip Badge Pill Status Label Status Web React Test Testing Jest import { render } from "@testing-library/react";
import React from "react";
import { InlineLabel } from ".";

it("renders correctly", () => {
  const { container } = render(<InlineLabel>My Label</InlineLabel>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <span
        class="inlineLabel base greyBlue"
      >
        <span
          class="base regular small"
        >
          My Label
        </span>
      </span>
    </div>
  `);
});

```

## Component Path

`/components/InlineLabel`

---

_Generated on 2025-08-21T17:35:16.363Z_
