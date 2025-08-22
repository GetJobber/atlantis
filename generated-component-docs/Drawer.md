# Drawer

# Drawer

Drawers are temporary sidebars that allow users to view supplementary content.
Users can interact with the main content while the drawer is visible.

## Related components

Use [SideDrawer](/components/SideDrawer) if you need to overlay the page's
content and block user interaction with the page, while still maintaining
visibilty of the page's primary contents.

Use [Modal](/components/Modal) if you need to overlay the page's content and
block user interaction with the page, and do not need the user to have visibilty
of the page's primary contents.

Use [Card](/components/Card) to group content inline, within the main view, in a
non-dismissible way.

## Accessibility

Drawer is built using an
[aside element](https://www.w3.org/TR/html52/sections.html#the-aside-element) to
indicate to assistive technology that the content within the Drawer is

> tangentially related to the content of the parenting sectioning content, and
> which could be considered separate from that content. (W3 Org)

For drawer toggle elements, use `aria-controls` attribute on the trigger and an
`id` for the drawer element.

### DrawerGrid (Experimental)

A `DrawerGrid` wraps the content and the drawer component. It allows the content
to fill the available space when a user toggles the drawer.

## Web Component Code

```tsx
Drawer Aside Panel Flyout Web React import type { ReactNode } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./Drawer.module.css";
import { Heading } from "../Heading";
import { ButtonDismiss } from "../ButtonDismiss";

interface DrawerProps {
  readonly id?: string;
  readonly children: ReactNode | ReactNode[];
  readonly title: string;
  /**
   * @default true
   */
  readonly open?: boolean;
  onRequestClose(): void;

  /**
   * Initial open value of the drawer. Only use this when you need to pre-populate
   * the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
}

export function Drawer({
  title,
  children,
  open = true,
  onRequestClose,
  id,
}: DrawerProps) {
  const drawerClassNames = classnames(styles.container, open && styles.open);

  return (
    <aside
      className={drawerClassNames}
      data-testid="drawer-container"
      aria-label={title}
      aria-hidden={!open}
      id={id}
    >
      <div className={styles.drawer}>
        <Header title={title} onRequestClose={onRequestClose} />
        <div className={styles.contentScroll}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </aside>
  );
}

interface HeaderProps {
  readonly title: string;
  onRequestClose?(): void;
}

function Header({ title, onRequestClose }: HeaderProps) {
  return (
    <div className={styles.header} data-testid="drawer-header">
      <div className={styles.heading}>
        <Heading level={2}>{title}</Heading>
      </div>
      <ButtonDismiss
        onClick={onRequestClose}
        ariaLabel={`Close ${title || "drawer"}`}
      />
    </div>
  );
}
import type { ReactElement } from "react";
import React from "react";
import styles from "./DrawerGrid.module.css";

interface DrawerGridProps {
  readonly children: ReactElement | ReactElement[];
}

export function DrawerGrid({ children }: DrawerGridProps) {
  return <div className={styles.drawerGrid}>{children}</div>;
}

```

## Props

### Web Props

| Prop             | Type         | Required | Default  | Description      |
| ---------------- | ------------ | -------- | -------- | ---------------- |
| `id`             | `string`     | ❌       | `_none_` | _No description_ |
| `title`          | `string`     | ✅       | `_none_` | _No description_ |
| `open`           | `boolean`    | ❌       | `true`   | _No description_ |
| `onRequestClose` | `() => void` | ✅       | `_none_` | _No description_ |

## Categories

- Layouts & Structure

## Web Test Code

```typescript
Drawer Aside Panel Flyout Web React Test Testing Jest import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Drawer } from ".";

describe("Drawer", () => {
  it("should render the drawer", () => {
    const title = "A drawer with content";
    const content = "Drawer Content";
    const { getByText, getByTestId, getByLabelText } = render(
      <Drawer title={title} open onRequestClose={jest.fn}>
        {content}
      </Drawer>,
    );
    expect(getByTestId("drawer-header")).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
    expect(getByLabelText(`Close ${title}`)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  describe("when open", () => {
    describe("when clicking on dismiss button", () => {
      it("should trigger request close", () => {
        const onRequestCloseFn = jest.fn();
        const { getByLabelText } = render(
          <Drawer title="My drawer" open onRequestClose={onRequestCloseFn}>
            {"Drawer Content"}
          </Drawer>,
        );
        fireEvent.click(getByLabelText("Close My drawer"));
        expect(onRequestCloseFn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when closed", () => {
    it("should hide the drawer", () => {
      const content = "Drawer Content";
      const { getByTestId } = render(
        <Drawer title="A closed drawer" open={false} onRequestClose={jest.fn}>
          {content}
        </Drawer>,
      );
      expect(
        getByTestId("drawer-container").classList.contains("open"),
      ).toBeFalsy();
    });
  });
});

```

## Component Path

`/components/Drawer`

---

_Generated on 2025-08-21T17:35:16.360Z_
