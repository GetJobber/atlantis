# Grid

# Grid

Helps create a layout that conforms to a 12-point grid system.

## Design & usage guidelines

The Grid is divided up into 12 columns. The `Grid.Cell` child sets how many of
the 12 columns it takes as a width via `size`. The `Grid.Cell` also includes
breakpoints of `xs`, `sm`, `md`, `lg`, and `xl`. Those sizes strictly follow our
[Design Breakpoints](/design/breakpoints).

As an example, let's say you have a
[three column grid](../?path=/story/components-layouts-and-structure-grid-web--three-columns)
that goes side by side with a 50/25/25 split on medium-sized screens and up.
But, on a small-sized screen, it stacks on top of each other.

The way you'd achieve that is to:

- Set the `Grid.Cell` child to have a size for `xs` and `md`
  - example: `{ xs: number, md: number }`
- All `xs` would be set to `12` so it fills the whole width and automatically
  stacks on extra-small and small screens
- The `md` would then get
  - `6` on Column 1
  - `3` on Column 2
  - `3` on Column 3
- If you sum up the values for `md`, you'd get 12.
  - If you set the last column to be 4, it'll sum up to 13 and pushes that last
    column down

## Related components

Use [Flex](/components/Flex) inside of Grid to create complex layouts without
needing custom wrappers.

Use [Content](/components/Content) to evenly space elements in a simple
one-directional layout.

### Visualizing the grid lines

If you use a Chromium browser like Google Chrome, Arc, or Safari, you can follow
Chrome's
[Inspect CSS grid layouts](https://developer.chrome.com/docs/devtools/css/grid/)
by using the dev tools.

## Web Component Code

```tsx
Grid Layout Columns Web React import type { ReactNode } from "react";
import React from "react";
import classNames from "classnames";
import styles from "./Grid.module.css";
import alignments from "./GridAlign.module.css";
import { GridCell } from "./GridCell";
import type { GapSpacing } from "../sharedHelpers/types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export interface GridProps {
  /**
   * Add spacing between elements. Can be a boolean for default spacing,
   * or a semantic token for custom spacing.
   * @default true
   *
   * @deprecated The boolean type for the 'gap' prop is deprecated and will be removed in a future version.
   * Please use a GapSpacing token (e.g., 'small', 'base', 'large') for fixed spacing.
   * Using 'true' applies default responsive spacing. Using 'false' results in no gap.
   */
  readonly gap?: boolean | GapSpacing;

  /**
   * Adjust the alignment of columns. We only support a few select properties
   * from `align-items` due to the nature of the other properties acting the
   * same. Read more about [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) property values.
   */
  readonly alignItems?: keyof typeof alignments;

  /**
   * `Grid.Cell` children
   */
  readonly children: ReactNode;
}

export const GRID_TEST_ID = "ATL-Grid";

function getGapStyles(gap: boolean | GapSpacing): {
  className?: string;
  style?: React.CSSProperties;
} {
  if (typeof gap === "boolean") {
    if (gap === true) {
      return { className: styles.gap };
    }

    return {};
  }

  const gapValue = getMappedAtlantisSpaceToken(gap);

  if (gapValue) {
    return { style: { gap: gapValue } };
  }

  return {};
}

export function Grid({
  alignItems = "start",
  gap = true,
  children,
}: GridProps) {
  const { className: gapClass, style: gapStyle } = getGapStyles(gap);

  return (
    <div
      data-testid={GRID_TEST_ID}
      className={classNames(styles.grid, alignments[alignItems], gapClass)}
      style={gapStyle}
    >
      {children}
    </div>
  );
}

Grid.Cell = GridCell;

```

## Props

### Web Props

| Prop  | Type     | Required    | Default | Description |
| ----- | -------- | ----------- | ------- | ----------- | ------------------------------------------------------------------- |
| `gap` | `boolean | GapSpacing` | ❌      | `true`      | Add spacing between elements. Can be a boolean for default spacing, |

or a semantic token for custom spacing. @deprecated The boolean type for the
'gap' prop is deprecated and will be removed in a future version. Please use a
GapSpacing token (e.g., 'small', 'base', 'large') for fixed spacing. Using
'true' applies default responsive spacing. Using 'false' results in no gap. | |
`alignItems` | `string | number | symbol` | ❌ | `start` | Adjust the alignment
of columns. We only support a few select properties from `align-items` due to
the nature of the other properties acting the same. Read more about
[align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
property values. | | `children` | `ReactNode` | ✅ | `_none_` | `Grid.Cell`
children |

## Categories

- Layouts & Structure

## Web Test Code

```typescript
Grid Layout Columns Web React Test Testing Jest import React from "react";
import { render, screen } from "@testing-library/react";
import { GRID_TEST_ID, Grid } from ".";
import type alignments from "./GridAlign.module.css";
import styles from "./Grid.module.css";
import { spaceTokens } from "../sharedHelpers/getMappedAtlantisSpaceToken";
import type { Spaces } from "../sharedHelpers/types";

const children = [
  <Grid.Cell key="1" size={{ xs: 12, sm: 8, md: 6, lg: 4, xl: 3 }}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
    doloribus maiores dignissimos animi minus non debitis aperiam molestiae quod
    temporibus?
  </Grid.Cell>,
  <Grid.Cell key="2" size={{ xs: 12, sm: 4, md: 6, lg: 8, xl: 7 }}>
    Hello There
  </Grid.Cell>,
];

describe("Grid", () => {
  it("should render a grid with the correct default class names", () => {
    render(<Grid>{children}</Grid>);
    const element = screen.getByTestId(GRID_TEST_ID);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("grid start");
  });

  describe("gap", () => {
    it("should have default gap spacing when gap is true", () => {
      render(<Grid>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).toHaveClass(styles.gap);
    });

    it("should have no gap when gap is false", () => {
      render(<Grid gap={false}>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).not.toHaveStyle({ gap: expect.any(String) });
    });

    describe("GapSpacing tokens", () => {
      it.each<[Spaces]>([
        ["none"],
        ["small"],
        ["base"],
        ["large"],
        ["minuscule"],
        ["slim"],
        ["smallest"],
        ["smaller"],
        ["larger"],
        ["largest"],
        ["extravagant"],
      ])("should apply the correct spacing for gap='%s'", gapValue => {
        render(<Grid gap={gapValue}>{children}</Grid>);
        const element = screen.getByTestId(GRID_TEST_ID);
        expect(element).toHaveStyle({ gap: spaceTokens[gapValue] });
      });
    });
  });

  describe("align", () => {
    it.each<[keyof typeof alignments]>([
      ["center"],
      ["start"],
      ["end"],
      ["stretch"],
    ])("should render %s", expectedAlign => {
      render(<Grid alignItems={expectedAlign}>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).toHaveClass(expectedAlign);
    });
  });
});

```

## Component Path

`/components/Grid`

---

_Generated on 2025-08-21T17:35:16.362Z_
