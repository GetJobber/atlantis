# ButtonDismiss

# Button Dismiss

This private component is used as a dismissal button for public components, such
as Modal and Popover.

## Design & usage guidelines

Use ButtonDismiss when you need a dismiss or close action that matches the
design patterns of Atlantis.

## Related components

ButtonDismiss is built with [Button](/components/Button).

## Accessibility

ButtonDismiss is an icon-only button, so you must provide an aria-label that
describes its' function to assistive technology.

| **✅ Do**       | **❌ Don't**     |
| --------------- | ---------------- |
| "Close modal"   | "X button"       |
| "Close popover" | "text-btn-cross" |

## Web Component Code

```tsx
ButtonDismiss Close Dismiss Remove Web React import React from "react";
import { Button } from "../Button";

export interface ButtonDismissProps {
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
  readonly ariaLabel: string;
}

export function ButtonDismiss({ onClick, ariaLabel }: ButtonDismissProps) {
  return (
    <Button
      ariaLabel={ariaLabel}
      icon="remove"
      onClick={onClick}
      type="tertiary"
      variation="subtle"
    />
  );
}

```

## Props

### Web Props

| Prop        | Type                                        | Required                     | Default  | Description      |
| ----------- | ------------------------------------------- | ---------------------------- | -------- | ---------------- | ---------------- |
| `onClick`   | `(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void` | ❌       | `_none_`         | _No description_ |
| `ariaLabel` | `string`                                    | ✅                           | `_none_` | _No description_ |

## Categories

- Private

## Web Test Code

```typescript
ButtonDismiss Close Dismiss Remove Web React Test Testing Jest import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ButtonDismiss } from ".";

it("renders a ButtonDismiss", () => {
  const { container } = render(
    <ButtonDismiss onClick={undefined} ariaLabel="Close" />,
  );
  expect(container).toMatchSnapshot();
});

test("it should call the handler with the new value", () => {
  const clickHandler = jest.fn();
  const { getByRole } = render(
    <ButtonDismiss onClick={clickHandler} ariaLabel="Close" />,
  );

  fireEvent.click(getByRole("button"));
  expect(clickHandler).toHaveBeenCalled();
});

```

## Component Path

`/components/ButtonDismiss`

---

_Generated on 2025-08-21T17:35:16.354Z_
