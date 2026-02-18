# Container

## Web Component Code

```tsx
Container Layout Container Stack Query Web React import React from "react";
import classNames from "classnames";
import styles from "./Container.module.css";
import type { ContainerApplyProps, ContainerProps } from "./types";

export const Container = ({
  children,
  name,
  className,
  as: Tag = "div",
  autoWidth = false,
  dataAttributes,
  ariaAttributes,
  role,
  id,
}: ContainerProps) => {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      style={
        {
          "--public-container-name": name,
          "--public-container-width": autoWidth ? "auto" : "100%",
        } as React.CSSProperties
      }
      className={classNames(styles.container, className)}
    >
      {children}
    </Tag>
  );
};

Container.Apply = function Apply({
  children,
  className,
  style = {},
  autoWidth = false,
}: ContainerApplyProps) {
  return (
    <div
      style={
        {
          ...style,
          "--public-container-apply-width": autoWidth ? "auto" : "100%",
        } as React.CSSProperties
      }
      className={classNames(className, styles.apply)}
    >
      {children}
    </div>
  );
};
export * from "./Container";

```

## Props

### Web Props

| Prop             | Type                                   | Required | Default           | Description                                                                                      |
| ---------------- | -------------------------------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| `name`           | `string`                               | ✅       | `_none_`          | The name of the container. This allows you to name your container query, but it's not necessary. |
| `className`      | `string`                               | ❌       | `_none_`          | The class name for the container. This allows you to target the container with CSS.              |
| `autoWidth`      | `boolean`                              | ❌       | `[object Object]` | Whether to allow the container to take the width of the content. Defaults to 100%                |
| `as`             | `CommonAllowedElements`                | ❌       | `_none_`          | The HTML tag to render the container as. Defaults to `div`.                                      |
| `dataAttributes` | `{ [key: `data-${string}`]: string; }` | ❌       | `_none_`          | Standard HTML data attributes. Accepts anything in a {{"data-key":"value"}} format.              |
| `ariaAttributes` | `AriaAttributes`                       | ❌       | `_none_`          | Standard HTML aria attributes. Accepts all standard HTML aria attributes.                        |
| `role`           | `AriaRole`                             | ❌       | `_none_`          | Standard HTML role attribute.                                                                    |
| `id`             | `string`                               | ❌       | `_none_`          | Standard HTML id attribute.                                                                      |

## Categories

- Layouts & Structure

## Component Path

`/components/Container`

---

_Generated on 2025-08-21T17:35:16.374Z_
