# Menu

# Menu

A toggleable menu that holds a list of actions. Where `InputSelect` is used to
select an item from a list Menu is used to display a dismissible menu of actions
the user can perform.

## Content guidelines

Menu action labels should be sentence-cased. This means in general, capitalize
only the first letter of the label unless there is a proper noun (such as a
person's name) in the label.

Jobber features, such as jobs, quotes, and invoices, are not proper nouns and
[should not be capitalized.](/content/product-vocabulary)

| ✅ Do                            | ❌ Don't                         |
| -------------------------------- | -------------------------------- |
| Send as text message             | Send As Text Message             |
| Collect signature                | COLLECT SIGNATURE                |
| Assign Jasmine Williams to visit | Assign jasmine williams to visit |

## Web Component Code

```tsx
Menu Dropdown Web React import type { CSSProperties, MouseEvent, ReactElement, RefObject } from "react";
import React, { useId, useRef, useState } from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useWindowDimensions } from "@jobber/hooks/useWindowDimensions";
import type { IconColorNames, IconNames } from "@jobber/design";
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import styles from "./Menu.module.css";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { formFieldFocusAttribute } from "../FormField/hooks/useFormFieldFocus";
import { calculateMaxHeight } from "../utils/maxHeight";

const SMALL_SCREEN_BREAKPOINT = 490;
const MENU_OFFSET = 6;
const MENU_MAX_HEIGHT_PERCENTAGE = 72;

const variation = {
  overlayStartStop: { opacity: 0 },
  startOrStop: (placement: string | undefined) => {
    let y = 10;

    if (placement?.includes("bottom")) y *= -1;
    if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) y = 150;

    return { opacity: 0, y };
  },
  done: { opacity: 1, y: 0 },
};

export interface MenuProps {
  /**
   * Custom menu activator. If this is not provided a default [… More] will be used.
   */
  readonly activator?: ReactElement;
  /**
   * Collection of action items.
   */
  readonly items: SectionProps[];

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    menu?: string;
    header?: string;
    action?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    menu?: CSSProperties;
    header?: CSSProperties;
    action?: CSSProperties;
  };
}

export interface SectionProps {
  /**
   * Defines the section header to further explain the group of actions.
   */
  header?: string;

  /**
   * List of actions.
   */
  actions: ActionProps[];
}

// eslint-disable-next-line max-statements
export function Menu({
  activator,
  items,
  UNSAFE_className,
  UNSAFE_style,
}: MenuProps) {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  const { width } = useWindowDimensions();

  const buttonID = useId();
  const menuID = useId();

  const fullWidth = activator?.props?.fullWidth || false;

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  // useRefocusOnActivator must come before useFocusTrap for them both to work
  useRefocusOnActivator(visible);
  const menuRef = useFocusTrap<HTMLDivElement>(visible);

  const { refs, floatingStyles, context } = useFloating({
    open: visible,
    onOpenChange: setVisible,
    placement: "bottom-start",
    strategy: "fixed",
    middleware: [
      offset(MENU_OFFSET),
      flip({ fallbackPlacements: ["bottom-end", "top-start", "top-end"] }),
      size({
        apply({ availableHeight, elements }) {
          // The inner element is the scrollable menu that requires the max height
          const menuElement = elements.floating.querySelector(
            '[role="menu"]',
          ) as HTMLElement;

          if (menuElement) {
            const viewportHeight = window.innerHeight;
            const maxHeightVh =
              (viewportHeight * MENU_MAX_HEIGHT_PERCENTAGE) / 100;

            const maxHeight = calculateMaxHeight(availableHeight, {
              maxHeight: maxHeightVh,
            });

            Object.assign(menuElement.style, {
              maxHeight: `${maxHeight}px`,
            });
          }
        },
      }),
    ],
    elements: {
      reference: referenceElement,
    },
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const positionAttributes =
    width >= SMALL_SCREEN_BREAKPOINT
      ? {
          style: floatingStyles,
        }
      : {};

  if (!activator) {
    activator = (
      <Button
        fullWidth={true}
        label="More Actions"
        icon="more"
        type="secondary"
      />
    );
  }

  return (
    <div className={wrapperClasses} onClick={handleParentClick}>
      <div ref={setReferenceElement}>
        {React.cloneElement(activator, {
          onClick: toggle(activator.props.onClick),
          id: buttonID,
          ariaControls: menuID,
          ariaExpanded: visible,
          ariaHaspopup: true,
        })}
      </div>
      <MenuPortal>
        <AnimatePresence>
          {visible && (
            <>
              <motion.div
                className={styles.overlay}
                onClick={toggle()}
                variants={variation}
                initial="overlayStartStop"
                animate="done"
                exit="overlayStartStop"
                transition={{
                  type: "tween",
                  duration: 0.15,
                }}
              />
              <div
                ref={refs.setFloating}
                className={styles.floatingContainer}
                {...getFloatingProps()}
                {...positionAttributes}
                {...formFieldFocusAttribute}
              >
                {items.length > 0 && (
                  <motion.div
                    className={classnames(styles.menu, UNSAFE_className?.menu)}
                    role="menu"
                    data-elevation={"elevated"}
                    aria-labelledby={buttonID}
                    id={menuID}
                    onClick={hide}
                    variants={variation}
                    initial="startOrStop"
                    animate="done"
                    exit="startOrStop"
                    custom={context?.placement}
                    ref={menuRef}
                    transition={{
                      type: "tween",
                      duration: 0.25,
                    }}
                    style={UNSAFE_style?.menu}
                  >
                    {items.map((item, key: number) => (
                      <div key={key} className={styles.section}>
                        {item.header && (
                          <SectionHeader
                            text={item.header}
                            UNSAFE_style={UNSAFE_style?.header}
                            UNSAFE_className={UNSAFE_className?.header}
                          />
                        )}

                        {item.actions.map(action => (
                          <Action
                            UNSAFE_style={UNSAFE_style?.action}
                            UNSAFE_className={UNSAFE_className?.action}
                            sectionLabel={item.header}
                            key={action.label}
                            {...action}
                          />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </MenuPortal>
    </div>
  );

  function toggle(callbackPassthrough?: (event?: MouseEvent) => void) {
    return (event: MouseEvent) => {
      setVisible(!visible);
      callbackPassthrough && callbackPassthrough(event);
    };
  }

  function hide() {
    setVisible(false);
  }

  function handleParentClick(event: MouseEvent<HTMLDivElement>) {
    // Since the menu is being rendered within the same parent as the activator,
    // we need to stop the click event from bubbling up. If the Menu component
    // gets added within a parent that has a click handler, any click on the
    // menu will trigger the parent's click handler.
    event.stopPropagation();
  }
}

interface SectionHeaderProps {
  readonly text: string;
  readonly UNSAFE_style?: CSSProperties;
  readonly UNSAFE_className?: string;
}

function SectionHeader({
  text,
  UNSAFE_style,
  UNSAFE_className,
}: SectionHeaderProps) {
  return (
    <div
      className={classnames(styles.sectionHeader, UNSAFE_className)}
      aria-hidden={true}
      style={UNSAFE_style}
    >
      <Typography
        element="h6"
        size="base"
        textColor="textSecondary"
        fontWeight="regular"
        textCase="none"
      >
        {text}
      </Typography>
    </div>
  );
}

export interface ActionProps {
  /**
   * Action label
   */
  readonly label: string;

  /**
   * Parent Section Label
   */
  readonly sectionLabel?: string;

  /**
   * Visual cue for the action label
   */
  readonly icon?: IconNames;

  /**
   * Color for the icon. Defaults to "icon".
   */
  readonly iconColor?: IconColorNames;

  /**
   * Visual style for the action button
   */
  readonly destructive?: boolean;

  /**
   * Inline style overrides for the action button
   */
  readonly UNSAFE_style?: CSSProperties;

  /**
   * Style class overrides for the action button
   */
  readonly UNSAFE_className?: string;

  /**
   * Callback when an action gets clicked
   */
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

function Action({
  label,
  sectionLabel,
  icon,
  iconColor,
  destructive,
  UNSAFE_style,
  UNSAFE_className,
  onClick,
}: ActionProps) {
  const actionButtonRef = useRef() as RefObject<HTMLButtonElement>;
  const buttonClasses = classnames(styles.action, {
    [styles.destructive]: destructive,
  });

  return (
    <button
      role="menuitem"
      type="button"
      className={classnames(buttonClasses, UNSAFE_className)}
      key={label}
      onClick={onClick}
      ref={actionButtonRef}
      style={UNSAFE_style}
    >
      {icon && (
        <div>
          <Icon color={destructive ? "destructive" : iconColor} name={icon} />
        </div>
      )}
      <Typography element="span" fontWeight="semiBold" textColor="text">
        {sectionLabel && (
          <span className={styles.screenReaderOnly}>{sectionLabel}</span>
        )}
        {label}
      </Typography>
    </button>
  );
}

function MenuPortal({ children }: { readonly children: React.ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return <FloatingPortal>{children}</FloatingPortal>;
}

```

## Props

### Web Props

| Prop               | Type                                                   | Required                     | Default  | Description                                                                                       |
| ------------------ | ------------------------------------------------------ | ---------------------------- | -------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `activator`        | `ReactElement<any, string                              | JSXElementConstructor<any>>` | ❌       | `_none_`                                                                                          | Custom menu activator. If this is not provided a default [… More] will be used. |
| `items`            | `SectionProps[]`                                       | ✅                           | `_none_` | Collection of action items.                                                                       |
| `UNSAFE_className` | `{ menu?: string; header?: string; action?: string; }` | ❌                           | `_none_` | **Use at your own risk:** Custom class names for specific elements. This should only be used as a |

**last resort**. Using this may result in unexpected side effects. More
information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
| | `UNSAFE_style` |
`{ menu?: CSSProperties; header?: CSSProperties; action?: CSSProperties; }` | ❌
| `_none_` | **Use at your own risk:** Custom style for specific elements. This
should only be used as a **last resort**. Using this may result in unexpected
side effects. More information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
|

### Mobile Props

| Prop              | Type                | Required | Default  | Description      |
| ----------------- | ------------------- | -------- | -------- | ---------------- |
| `menuOptions`     | `MenuOptionProps[]` | ❌       | `_none_` | _No description_ |
| `customActivator` | `Element`           | ❌       | `_none_` | _No description_ |

## Categories

- Navigation

## Web Test Code

```typescript
Menu Dropdown Web React Test Testing Jest import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from ".";
import { Button } from "../Button";

describe("Menu", () => {
  it("renders", () => {
    const { container } = render(
      <Menu
        items={[
          {
            header: "Send as...",
            actions: [
              {
                label: "Text Message",
                icon: "sms",
              },
              {
                label: "Email",
                icon: "email",
              },
            ],
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  describe("when clicking on the activator", () => {
    it("should open the menu", async () => {
      const header = "Mark as...";
      const actionLabel = "Awaiting Response";
      const clickHandler = jest.fn();
      const actions = [
        {
          header: header,
          actions: [{ label: actionLabel, onClick: clickHandler }],
        },
      ];
      const { getByRole } = render(<Menu items={actions} />);
      await userEvent.click(getByRole("button"));
      await waitFor(() => {
        expect(getByRole("menuitem")).toBeInTheDocument();
      });
    });
  });

  describe("when clicking on menu item", () => {
    it("should close the menu and trigger onClick", async () => {
      const header = "Mark as...";
      const actionLabel = "Awaiting Response";
      const clickHandler = jest.fn();
      const actions = [
        {
          header: header,
          actions: [{ label: actionLabel, onClick: clickHandler }],
        },
      ];
      const { getByRole, queryByRole } = render(<Menu items={actions} />);

      await userEvent.click(getByRole("button"));
      await userEvent.click(getByRole("menuitem"));
      expect(clickHandler).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(queryByRole("menuitem")).not.toBeInTheDocument();
      });
    });
  });

  describe("when menu is opened and escape is pressed", () => {
    const actionLabel = "Text Message";
    it("should close the menu", async () => {
      const { getByRole, queryByRole } = render(
        <Menu
          items={[
            {
              header: "Send as...",
              actions: [
                {
                  label: actionLabel,
                  icon: "sms",
                },
                {
                  label: "Email",
                  icon: "email",
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(getByRole("button"));
      await userEvent.keyboard("{Escape}");
      await waitFor(() => {
        expect(queryByRole("menuitem")).not.toBeInTheDocument();
      });
    });
  });

  describe("with custom activator", () => {
    it("renders", () => {
      const { container } = render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              header: "Send as...",
              actions: [
                {
                  label: "Text Message",
                  icon: "sms",
                },
                {
                  label: "Email",
                  icon: "email",
                },
              ],
            },
          ]}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it("should passthrough the onClick action", async () => {
    const clickHandler = jest.fn();

    const { getByRole } = render(
      <Menu
        activator={<Button label="Menu" onClick={clickHandler} />}
        items={[]}
      />,
    );

    await userEvent.click(getByRole("button"));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  describe("icon colors", () => {
    it("should default to --color-icon", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              actions: [
                {
                  label: "Down",
                  icon: "arrowDown",
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("arrowDown");
      expect(iconSvg.style.fill).toBe("var(--color-icon)");
    });

    it("should respect special icon colors", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              actions: [
                {
                  label: "New job",
                  icon: "job",
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("job");
      const pathElement = iconSvg.querySelector("path");
      expect(pathElement).toHaveStyle("fill: var(--color-job)");
    });

    it("should allow overriding icon colors", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              actions: [
                {
                  label: "New job",
                  icon: "job",
                  iconColor: "icon",
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("job");
      const pathElement = iconSvg.querySelector("path");
      expect(pathElement).toHaveStyle("fill: var(--color-icon)");
    });

    it("should use destructive icon color when action is marked as destructive", async () => {
      render(
        <Menu
          activator={<Button label="Menu" />}
          items={[
            {
              header: "Danger Zone",
              actions: [
                {
                  label: "Delete Item",
                  icon: "trash",
                  destructive: true,
                },
              ],
            },
          ]}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const iconSvg = screen.getByTestId("trash");
      const pathElement = iconSvg.querySelector("path");
      expect(pathElement).toHaveStyle("fill: var(--color-destructive)");
    });
  });

  describe("UNSAFE props", () => {
    it("should apply UNSAFE_className and UNSAFE_style to menu when opened", async () => {
      render(
        <Menu
          items={[
            {
              actions: [{ label: "Test" }],
            },
          ]}
          UNSAFE_className={{ menu: "custom-menu-class" }}
          UNSAFE_style={{ menu: { color: "blue" } }}
        />,
      );

      await userEvent.click(screen.getByRole("button"));

      const menu = screen.getByRole("menu");
      expect(menu).toHaveClass("custom-menu-class");
      expect(menu).toHaveStyle("color: blue");
    });
  });

  it("should apply UNSAFE_className and UNSAFE_style to section header", async () => {
    render(
      <Menu
        items={[
          {
            header: "Test",
            actions: [{ label: "Test" }],
          },
        ]}
        UNSAFE_className={{ header: "custom-header-class" }}
        UNSAFE_style={{ header: { color: "red" } }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    // The header element we're applying the style to is hidden for accessibility reasons and has no reliable identifier
    const header = screen.getByRole("heading", { hidden: true }).parentElement;

    expect(header).toHaveClass("custom-header-class");
    expect(header).toHaveStyle("color: red");
  });
  it("should apply UNSAFE_className and UNSAFE_style to all actions", async () => {
    render(
      <Menu
        items={[
          {
            actions: [{ label: "Test" }],
          },
        ]}
        UNSAFE_className={{ action: "custom-action-class" }}
        UNSAFE_style={{ action: { color: "green" } }}
      />,
    );

    await userEvent.click(screen.getByRole("button"));

    const actions = screen.getAllByRole("menuitem");

    actions.forEach(action => {
      expect(action).toHaveClass("custom-action-class");
      expect(action).toHaveStyle("color: green");
    });
  });
});

it("should focus first action item from the menu when activated", async () => {
  render(
    <Menu
      activator={<Button label="Menu" />}
      items={[
        {
          header: "Send as...",
          actions: [
            {
              label: "Text Message",
              icon: "sms",
            },
            {
              label: "Email",
              icon: "email",
            },
          ],
        },
      ]}
    />,
  );

  await userEvent.click(screen.getByRole("button"));
  const firstMenuItem = screen.getAllByRole("menuitem")[0];
  expect(firstMenuItem).toHaveFocus();
});

```

## Component Path

`/components/Menu`

---

_Generated on 2025-08-21T17:35:16.369Z_
