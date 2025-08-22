# Flex

# Flex

Flex is a component that allows you to easily create a flexible layout.

## Design & usage guidelines

The Flex component facilitates the rendering of multiple child components into a
grid layout with as many rows as needed. Each column of the Flex grid can be
programmed to take the smallest space possible or grow depending on available
space. Once the number of child components exceeds the length of the template
array, new rows will be created to accomodate the extra children, styled
similarily to the children above.

It is also possible to nest grids within each other. This can be helpful when
wanting to apply different grid styles to different groups of children. For
example, nested grids with different `align` and `template` props can be used to
further control the layout of the children.

## Related components

Use [Grid](/components/Grid) to create grid layouts. Using Flex inside of Grid
gives you the ability to achieve complex layouts without needing custom
wrappers.

Use [Content](/components/Content) to evenly space elements in a simple
one-directional layout.

## Web Component Code

```tsx
Flex Layout Stack Container Web React import type { CSSProperties, PropsWithChildren } from "react";
import React from "react";
// import chunk from "lodash/chunk";
import classnames from "classnames";
import type { ColumnKeys, Direction, Spacing } from "./Flex.types";
import styles from "./Flex.module.css";

interface FlexProps extends PropsWithChildren {
  /**
   * Determine how the children gets laid out
   *
   * **Supported keys**
   * - `"grow"` - Grows to the space available. If all children are set to
   *   grow, then they'll have equal width.
   * - `"shrink"` - Shrinks to the smallest size possible. Normally the size of
   *   the child.
   */
  readonly template: ColumnKeys[];

  /**
   * Adjusts the alignment of the Flex children.
   */
  readonly align?: "start" | "end" | "center";

  /**
   * The spacing between the children.
   *
   *  @default "base"
   */
  readonly gap?: Spacing;

  /**
   * The direction of the content.
   *
   * @default "row"
   */

  readonly direction?: Direction;
}

export function Flex({
  align = "center",
  children,
  direction = "row",
  gap = "base",
  template,
}: FlexProps) {
  return (
    <div
      className={classnames(styles.flexible, {
        [styles[`${gap}Gap`]]: Boolean(gap),
        [styles[`${align}Align`]]: Boolean(align),
      })}
      style={generateGridStylesFromTemplate(direction, template)}
    >
      {children}
    </div>
  );
}

function generateGridStylesFromTemplate(
  direction: Direction,
  layoutTemplate: ColumnKeys[],
): CSSProperties {
  const containerStyles: CSSProperties = {};
  const templateKeys = {
    row: "gridTemplateColumns",
    column: "gridTemplateRows",
  } as const;
  const templateValues = {
    grow: "1fr",
    shrink: "max-content",
  } as const;

  containerStyles[templateKeys[direction]] = layoutTemplate
    .map(key => templateValues[key])
    .join(" ");

  return containerStyles;
}

```

## Props

### Web Props

| Prop       | Type           | Required | Default  | Description                              |
| ---------- | -------------- | -------- | -------- | ---------------------------------------- |
| `template` | `ColumnKeys[]` | ✅       | `_none_` | Determine how the children gets laid out |

**Supported keys**

- `"grow"` - Grows to the space available. If all children are set to grow, then
  they'll have equal width.
- `"shrink"` - Shrinks to the smallest size possible. Normally the size of the
  child. | | `align` | `"start" | "end" | "center"` | ❌ | `center` | Adjusts
  the alignment of the Flex children. | | `gap` |
  `"none" | "minuscule" | "smallest" | "smaller" | "small" | "slim" | "base" | "large" | "larger" | "largest" | "extravagant"`
  | ❌ | `base` | The spacing between the children. | | `direction` |
  `Direction` | ❌ | `row` | The direction of the content. |

### Mobile Props

| Prop       | Type           | Required | Default | Description                                                                  |
| ---------- | -------------- | -------- | ------- | ---------------------------------------------------------------------------- |
| `template` | `ColumnKeys[]` | ❌       | `[]`    | Determine how the children gets laid out on the flex grid. If there are more |

Children than elements in the template, it will render multiple rows.

**Supported keys**

- `"grow"` - Grows to the space available. If all children are set to grow, then
  they'll have equal width.
- `"shrink"` - Shrinks to the smallest size possible. Normally the size of the
  child.

By default, this will set every children to grow in equal widths. | | `align` |
`FlexAlignType` | ❌ | `center` | It works the same way as `alignItems` style
with flex. | | `gap` |
`"none" | "smallest" | "smaller" | "small" | "base" | "large"` | ❌ | `base` |
The spacing between the children. |

## Categories

- Layouts & Structure

## Web Test Code

```typescript
Flex Layout Stack Container Web React Test Testing Jest import React from "react";
import { render } from "@testing-library/react";
import { Flex } from ".";

describe("Flex", () => {
  it("renders the flexible container", () => {
    const { container } = render(
      <Flex template={["grow", "shrink"]}>
        <h1>Foo</h1>
        <p>Bar</p>
      </Flex>,
    );

    const flex = container.firstChild;
    expect(flex).toHaveClass("flexible");
  });

  it("sets the template columns if direction is row", () => {
    const { container } = render(
      <Flex template={["grow", "shrink"]}>
        <h1>Foo</h1>
        <p>Bar</p>
      </Flex>,
    );

    const flex = container.firstChild;
    expect(flex).toHaveStyle({
      gridTemplateColumns: "1fr max-content",
    });
  });

  it("sets the template rows if direction is column", () => {
    const { container } = render(
      <Flex direction="column" template={["grow", "shrink"]}>
        <h1>Foo</h1>
        <p>Bar</p>
      </Flex>,
    );

    const flex = container.firstChild;
    expect(flex).toHaveStyle({
      gridTemplateRows: "1fr max-content",
    });
  });

  it("sets the gap between children", () => {
    const { container } = render(
      <Flex template={["grow", "shrink"]} gap="small">
        <h1>Foo</h1>
        <p>Bar</p>
      </Flex>,
    );

    const flex = container.firstChild;
    expect(flex).toHaveClass("smallGap");
  });

  it("sets the alignment of children", () => {
    const { container } = render(
      <Flex template={["grow", "shrink"]} align="end">
        <h1>Foo</h1>
        <p>Bar</p>
      </Flex>,
    );

    const flex = container.firstChild;
    expect(flex).toHaveClass("endAlign");
  });
});

```

## Component Path

`/components/Flex`

---

_Generated on 2025-08-21T17:35:16.360Z_
