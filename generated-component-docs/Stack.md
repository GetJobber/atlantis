# Stack

## Web Component Code

```tsx
Stack Layout Container Stack Wrapper Web React import React from "react";
import classNames from "classnames";
import styles from "./Stack.module.css";
import type { StackProps } from "./types";
import {
  getMappedAtlantisSpaceToken,
  spaceTokens,
} from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function Stack({
  gap = spaceTokens.base,
  recursive,
  splitAfter,
  children,
  align,
  autoWidth = false,
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: StackProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      style={
        {
          "--public-stack-split": splitAfter,
          "--public-stack-space": getMappedAtlantisSpaceToken(gap),
          "--public-stack-width": autoWidth ? "auto" : "100%",
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(
        styles.stack,
        recursive ? styles.recursive : styles.topOnly,
        splitAfter
          ? styles[`splitAfter-${splitAfter}` as keyof typeof styles]
          : undefined,
        align === "center" ? styles.center : undefined,
        align === "start" ? styles.start : undefined,
        align === "end" ? styles.end : undefined,
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

| Prop         | Type         | Required | Default            | Description                                                              |
| ------------ | ------------ | -------- | ------------------ | ------------------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- | ---------------------------------------------------------------------------- |
| `gap`        | `GapSpacing` | ❌       | `spaceTokens.base` | The amount of space between the children. Semantic tokens are available. |
| `splitAfter` | `1           | 2        | 3                  | 4                                                                        | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15` | ❌  | `_none_` | Setting this will push the stack down to the bottom of the parent container, |

after the number of children provided (1-15). Requires parent to have height
greater than the sum of the children. | | `recursive` | `boolean` | ❌ |
`_none_` | Whether to recursively apply the stack spacing to all the children,
not just the top-level. | | `align` | `"start" | "center" | "end"` | ❌ |
`_none_` | The alignment of the stack. | | `autoWidth` | `boolean` | ❌ |
`[object Object]` | Whether to allow the stack to take the width of the content.
Defaults to 100% | | `as` | `CommonAllowedElements` | ❌ | `_none_` | The HTML
tag to render the container as. Defaults to `div`. | | `UNSAFE_className` |
`{ container?: string; }` | ❌ | `_none_` | **Use at your own risk:** Custom
class names for specific elements. This should only be used as a **last
resort**. Using this may result in unexpected side effects. More information in
the
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

`/components/Stack`

---

_Generated on 2025-08-21T17:35:16.371Z_
