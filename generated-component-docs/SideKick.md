# SideKick

## Web Component Code

```tsx
SideKick Layout Container Stack Wrapper Web React import React from "react";
import classNames from "classnames";
import styles from "./SideKick.module.css";
import type { SideKickProps } from "./types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function SideKick({
  children,
  sideWidth,
  contentMinWidth = "50%",
  gap = "var(--space-base)",
  onRight,
  collapseBelow,
  collapsed,
  autoWidth = false,
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: SideKickProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      style={
        {
          "--public-sidekick-side-width": sideWidth,
          "--public-sidekick-min-width": contentMinWidth,
          "--public-sidekick-space": getMappedAtlantisSpaceToken(gap),
          "--public-sidekick-width": autoWidth ? "auto" : "100%",
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(
        styles.sidekick,
        onRight ? styles.right : styles.left,
        sideWidth
          ? onRight
            ? styles.withWidthRight
            : styles.withWidthLeft
          : null,
        collapseBelow && styles[collapseBelow as keyof typeof styles],
        collapsed ? styles.collapsed : undefined,
        UNSAFE_className?.container,
      )}
    >
      {children}
    </Tag>
  );
}

```

## Props

### Web Props

| Prop               | Type                      | Required | Default             | Description                                                                                       |
| ------------------ | ------------------------- | -------- | ------------------- | ------------------------------------------------------------------------------------------------- | ----- | --- | -------- | ------------------------------------------- |
| `sideWidth`        | `string`                  | ❌       | `_none_`            | The width of the sidekick.                                                                        |
| `contentMinWidth`  | `string`                  | ❌       | `50%`               | The minimum width of the content.                                                                 |
| `gap`              | `GapSpacing`              | ❌       | `var(--space-base)` | The amount of space between the sidekick and the content. Semantic tokens are available.          |
| `onRight`          | `boolean`                 | ❌       | `_none_`            | Whether to place the sidekick on the right.                                                       |
| `collapseBelow`    | `"xs"                     | "sm"     | "md"                | "lg"                                                                                              | "xl"` | ❌  | `_none_` | The breakpoint to collapse the sidekick at. |
| `collapsed`        | `boolean`                 | ❌       | `_none_`            | Force the sidekick to collapse. Use this when our breakpoints are not enough control.             |
| `autoWidth`        | `boolean`                 | ❌       | `[object Object]`   | Whether to allow the sidekick to take the width of the content. Defaults to 100%                  |
| `as`               | `CommonAllowedElements`   | ❌       | `_none_`            | The HTML tag to render the container as. Defaults to `div`.                                       |
| `UNSAFE_className` | `{ container?: string; }` | ❌       | `_none_`            | **Use at your own risk:** Custom class names for specific elements. This should only be used as a |

**last resort**. Using this may result in unexpected side effects. More
information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
| | `UNSAFE_style` | `{ container?: CSSProperties; }` | ❌ | `_none_` | **Use at
your own risk:** Custom style for specific elements. This should only be used as
a **last resort**. Using this may result in unexpected side effects. More
information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
| | `dataAttributes` | `{ [key: `data-${string}`]: string; }` | ❌ | `_none_` |
Standard HTML data attributes. Accepts anything in a {{"data-key":"value"}}
format. | | `ariaAttributes` | `AriaAttributes` | ❌ | `_none_` | Standard HTML
aria attributes. Accepts all standard HTML aria attributes. | | `role` |
`AriaRole` | ❌ | `_none_` | Standard HTML role attribute. | | `id` | `string` |
❌ | `_none_` | Standard HTML id attribute. |

## Categories

- Layouts & Structure

## Component Path

`/components/SideKick`

---

_Generated on 2025-08-21T17:35:16.371Z_
