# Content

# Content

Content is a container component that provides it's child elements with
consistent vertical or horizontal spacing and padding.

This is useful for when you want to include internal details like text within a
parent component, such as a [Card](/components/Card), while maintaining
consistent spacing between the elements.

## Design & usage guidelines

Content should be used whenever you have a container with children that requires
consistent spacing between the elements.

## Related components

Use [Flex](/components/Flex) and [Grid](/components/Grid) to create more complex
layouts.

## Accessibility

Content supports the use of semantic HTML5 region elements like `<main>`,
`<section>`, `<article>` etc. to further enhance accessibility when used
appropriately. Consider using these if the Content represents a meaningful
region or section of your content. The default tag is a `<div>`.

Children of the Content component should be presented in a logical order, and
follow a sensible hierarchy that can be followed by screen readers.

## Web Component Code

```tsx
Content Stack Layout Container Wrapper Spacing Web React import type { ReactNode } from "react";
import { createElement } from "react";
import classnames from "classnames";
import spacings from "./Spacing.module.css";
import styles from "./Content.module.css";

interface ContentProps {
  readonly children: ReactNode | ReactNode[];
  /**
   * The amount of vertical spacing between the children
   *
   * @default base
   */
  readonly spacing?: keyof typeof spacings;

  /**
   * Change the wrapping element to be one of the available
   * semantic tags.
   *
   * @default "div"
   */
  readonly type?:
    | "section"
    | "aside"
    | "header"
    | "footer"
    | "article"
    | "main"
    | "div";
}

export function Content({
  children,
  spacing = "base",
  type = "div",
}: ContentProps) {
  const className = classnames(styles.padded, spacings[spacing]);

  return createElement(type, { className }, children);
}

```

## Props

### Web Props

| Prop           | Type       | Required | Default  | Description |
| -------------- | ---------- | -------- | -------- | ----------- | --------- | --------------------------------------------------- | ------ | --- | ----- | ------------------------------------------------------ |
| `spacing`      | `string    | number   | symbol`  | ❌          | `base`    | The amount of vertical spacing between the children |
| `type`         | `"section" | "aside"  | "header" | "footer"    | "article" | "main"                                              | "div"` | ❌  | `div` | Change the wrapping element to be one of the available |
| semantic tags. |

### Mobile Props

| Prop           | Type                 | Required    | Default  | Description                                                                                 |
| -------------- | -------------------- | ----------- | -------- | ------------------------------------------------------------------------------------------- | ---------------- |
| `children`     | `ReactNode`          | ✅          | `_none_` | The child or children that will be given spacing.                                           |
| `spacing`      | `Spacing`            | ❌          | `base`   | The amount of spacing that content will give.                                               |
| `childSpacing` | `Spacing`            | ❌          | `base`   | The amount of spacing that will be applied between children.                                |
| `direction`    | `"horizontal"        | "vertical"` | ❌       | `vertical`                                                                                  | _No description_ |
| `UNSAFE_style` | `ContentUnsafeStyle` | ❌          | `_none_` | **Use at your own risk:** Custom style for specific elements. This should only be used as a |

**last resort**. Using this may result in unexpected side effects. More
information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
|

## Categories

- Layouts & Structure

## Web Test Code

```typescript
Content Stack Layout Container Wrapper Spacing Web React Test Testing Jest import React from "react";
import { render } from "@testing-library/react";
import { Content } from ".";

it("renders a Content", () => {
  const { queryByText } = render(<Content>Wazaaaaa</Content>);

  expect(queryByText("Wazaaaaa")).toBeInTheDocument();
});

it("renders a Content with a large spacing", () => {
  const { queryByText } = render(
    <Content spacing="large">Space me up!</Content>,
  );
  const content = queryByText("Space me up!");

  expect(content).toBeInTheDocument();
  expect(content).toHaveClass("padded large");
});

it("renders a Content with a small spacing", () => {
  const { queryByText } = render(
    <Content spacing="small">Space me down!</Content>,
  );
  const content = queryByText("Space me down!");

  expect(content).toBeInTheDocument();
  expect(content).toHaveClass("padded small");
});

it("renders with a semantic tag when a valid type is set", () => {
  const { queryByRole } = render(
    <Content type="article">
      <h2>My Article</h2>
      <p>Wow, what an article!</p>
    </Content>,
  );
  const article = queryByRole("article");

  expect(article).toBeInTheDocument();
  expect(article).toHaveClass("padded base");
});

```

## Component Path

`/components/Content`

---

_Generated on 2025-08-21T17:35:16.357Z_
