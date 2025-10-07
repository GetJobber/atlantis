# Emphasis

# Emphasis

Use this component to emphasize certain content of a Heading or Text component.
There are variations on Emphasis, each with their own use case and meaning.

## Design & usage guidelines

### Bold

Used to call attention to a piece of text. Bold should indicate that its
contents have
[strong importance, seriousness, or urgency.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong)

<Canvas>
  <Text>
    <Emphasis variation="bold">Save $240</Emphasis> when you choose our Annual
    Plan
  </Text>
</Canvas>

### Italic

Italic emphasis should be used when there is stress emphasis on a word (or
words) which modifies the meaning of the sentence itself.

<Canvas>
  <Text>
    Simon’s here to show <Emphasis variation="italic">you</Emphasis> how Jobber
    works.
  </Text>
</Canvas>

### Highlight

Used to call attention to a specific value prop on a heading. Highlight should
only be used on page titles and subtitle, and is similar in meaning to Bold.

<Canvas>
  <Heading level={1}>
    Get paid <Emphasis variation="highlight">faster</Emphasis>
  </Heading>
</Canvas>

## Web Component Code

```tsx
Emphasis Highlight Strong Bold Italic Web React import type { ReactNode } from "react";
import React from "react";
import type { TypographyOptions } from "../Typography";
import { Typography } from "../Typography";

interface EmphasisProps {
  readonly variation: "bold" | "italic" | "highlight";
  readonly children: ReactNode;
}

export interface VariationMap {
  [variation: string]: TypographyOptions;
}

export function Emphasis({ variation, children }: EmphasisProps) {
  const variationMap: VariationMap = {
    bold: { element: "b", fontWeight: "bold" },
    italic: { element: "em", emphasisType: "italic" },
    highlight: { element: "strong", emphasisType: "highlight" },
  };

  return <Typography {...variationMap[variation]}>{children}</Typography>;
}

```

## Props

### Web Props

| Prop        | Type    | Required | Default      | Description |
| ----------- | ------- | -------- | ------------ | ----------- | -------- | ---------------- |
| `variation` | `"bold" | "italic" | "highlight"` | ✅          | `_none_` | _No description_ |

## Categories

- Text & Typography

## Web Test Code

```typescript
Emphasis Highlight Strong Bold Italic Web React Test Testing Jest import { render } from "@testing-library/react";
import React from "react";
import { Emphasis } from ".";

it("renders a bold text", () => {
  const { container } = render(<Emphasis variation="bold">Save $240</Emphasis>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <b
        class="base bold"
      >
        Save $240
      </b>
    </div>
  `);
});

it("renders an italic text", () => {
  const { container } = render(
    <Emphasis variation="italic">Job note linked to related invoice</Emphasis>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <em
        class="base regular italic"
      >
        Job note linked to related invoice
      </em>
    </div>
  `);
});

it("renders a highlighted text", () => {
  const { container } = render(
    <Emphasis variation="highlight">Highlight me up</Emphasis>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <strong
        class="base regular highlight"
      >
        Highlight me up
      </strong>
    </div>
  `);
});

```

## Component Path

`/components/Emphasis`

---

_Generated on 2025-08-21T17:35:16.360Z_
