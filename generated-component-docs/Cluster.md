# Cluster

## Web Component Code

```tsx
Cluster Grid Columns Rows Web React import React from "react";
import classNames from "classnames";
import styles from "./Cluster.module.css";
import type { ClusterProps } from "./types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function Cluster({
  children,
  justify,
  align,
  gap,
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
}: ClusterProps) {
  const spaceMapped = getMappedAtlantisSpaceToken(gap);

  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      style={
        {
          "--public-cluster-justify": justify,
          "--public-cluster-align": align,
          "--public-cluster-space": spaceMapped,
          "--public-cluster-width": autoWidth ? "auto" : "100%",
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(
        styles.cluster,
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

| Prop               | Type                      | Required | Default           | Description                                                                                                        |
| ------------------ | ------------------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ | --------------- | -------- | ----------------------------------------------- | ----------------------------------------------------- |
| `justify`          | `"start"                  | "end"    | "center"          | "space-between"                                                                                                    | "space-around"` | ❌       | `_none_`                                        | The horizontal justification of the cluster elements. |
| `align`            | `"start"                  | "end"    | "center"          | "stretch"`                                                                                                         | ❌              | `_none_` | The vertical alignment of the cluster elements. |
| `gap`              | `GapSpacing`              | ❌       | `_none_`          | The amount of space between the cluster elements. Semantic tokens are available.                                   |
| `collapseBelow`    | `"xs"                     | "sm"     | "md"              | "lg"                                                                                                               | "xl"`           | ❌       | `_none_`                                        | The breakpoint below which the cluster will collapse. |
| `collapsed`        | `boolean`                 | ❌       | `_none_`          | Force the cluster to collapse. Use this when our breakpoints are not enough control.                               |
| `autoWidth`        | `boolean`                 | ❌       | `[object Object]` | Enabling this prevents the cluster from taking 100% of the width of the parent and instead flows with the content. |
| `as`               | `CommonAllowedElements`   | ❌       | `_none_`          | The HTML tag to render the cluster as.                                                                             |
| `UNSAFE_className` | `{ container?: string; }` | ❌       | `_none_`          | **Use at your own risk:** Custom class names for specific elements. This should only be used as a                  |

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

`/components/Cluster`

---

_Generated on 2025-08-21T17:35:16.355Z_
