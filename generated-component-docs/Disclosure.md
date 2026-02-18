# Disclosure

<Meta
  title="Components/Layouts and Structure/Disclosure"
  component={Disclosure}
/>

# Disclosure

Disclosure is a component that allows users to progressively reveal content that
is not essential to the primary objective of a given view.

## Design & usage guidelines

Disclosure is useful for revealing or hiding content that is not essential for
the user to view all at once. You may want to put content inside of a Disclosure
to:

- reduce distractions or avoid overwhelming the user
- hide non-critical controls or options in a form

Disclosure should only be used to contain content or controls that aren't
required for the user to complete the primary objective of a given view.

For example, if a user has to make a selection between two options to complete a
task, do not put the selection controls in a Disclosure. A better example of
using a Disclosure would be if there is an optional setting that a user may want
to change but is not required to.

## Content guidelines

- `title` should be informative and label the type of content grouped in the
  body of the Disclosure.
  - This can either be a string or a React component. If a React component is
    used (containing multiple children), it should be wrapped in a container
    element and not a `<Fragment>` to maintain correct UI styling.
    - Caveat: The container element should NOT be `<div>` as it would break the
      semantics of the `<summary>` element. Instead, use a `<span>` or `<p>`
      tag.
  - The elements passed as a `title` can be plain text, or HTML that can be used
    within a paragraph (AKA
    ["phrasing content"](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content))
    to ensure that the title is accessible and can be properly read by screen
    readers. A heading may also be used but will not be treated as a heading by
    assistive technologies.
- `children` should be actionable and clear. The contents of a Disclosure can
  be:
  - plain text
  - any React component (except [Page](/components/Page) and
    [Table](/components/Table))

## Accessibility

- Users should be able to use their keyboard and toggle the component's
  open/close state
- A single Heading element is permitted in `summary` elements, however, it might
  lose some accessibility benefits, since according to
  [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary#summaries_as_headings):
  > Warning: Because the `<summary>` element has a default role of button (which
  > strips all roles from child elements), this example will not work for users
  > of assistive technologies such as screen readers. The `<h4>` will have its
  > role removed and thus will not be treated as a heading for these users.
- Include aria-expanded attribute on the trigger to communicate to assistive
  technology
- Include aria-controls attribute ties on the trigger to the content it controls
  using the id of the collapsible container
- The trigger contains a downward-pointing-arrow to hint that it can be
  expanded. When the disclosure item is in an expanded state, this is rotated
  180 degrees to point upwards
- The icon will be given an `aria-hidden="true"` attribute to hide it from
  assistive technologies, as well as `focusable="false"` to address an
  inconsistency in IE and older versions of Edge

## Responsiveness

The Disclosure component should handle both click and touch, as well as keyboard
inputs. It should fill the width of its container and if the component is less
than 375px wide, the title will wrap and should not be truncated.

## Web Component Code

```tsx
Disclosure Accordion Collapsable Expandable Toggle Reveal Web React import type { CSSProperties, ReactElement, ReactNode } from "react";
import React, { useState } from "react";
import classnames from "classnames";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import styles from "./Disclosure.module.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

interface DisclosureProps {
  /**
   * Child content that is manged by this component.
   */
  readonly children: ReactNode | ReactNode[];

  /**
   * Title for the disclosure pane.
   * If ReactElement[] is provided, it must be wrapped in a container element (not a Fragment).
   */
  readonly title: string | ReactElement | ReactElement[];

  /**
   * This sets the default open state of the disclosure.
   * By default the disclosure is closed.
   * For use when the component is being used as an Uncontrolled Component.
   * @default false
   */
  readonly defaultOpen?: boolean;

  /**
   * Callback that is called when the disclosure is toggled.
   */
  readonly onToggle?: (newOpened: boolean) => void;

  /**
   * Used to make the disclosure a Controlled Component.
   */
  readonly open?: boolean;

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
    summary?: string;
    summaryWrap?: string;
    title?: { textStyle?: string };
    icon?: {
      svg?: string;
      path?: string;
    };
    arrowIconWrapper?: string;
    content?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
    summary?: CSSProperties;
    summaryWrap?: CSSProperties;
    title?: { textStyle?: CSSProperties };
    icon?: {
      svg?: CSSProperties;
      path?: CSSProperties;
    };
    arrowIconWrapper?: CSSProperties;
    content?: CSSProperties;
  };
}

export function Disclosure({
  children,
  title,
  defaultOpen = false,
  onToggle,
  open,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: DisclosureProps) {
  const [internalOpen, setInternalOpen] = useState(
    defaultOpen || open || false,
  );
  const isOpen = open !== undefined ? open : internalOpen;
  const [titleRef, { exactWidth }] = useResizeObserver<HTMLDivElement>();
  const isBelowBreakpoint = exactWidth && exactWidth < Breakpoints.small;
  const isTitleString = typeof title === "string";

  const containerClassNames = classnames(
    styles.details,
    UNSAFE_className.container,
  );

  const summaryClassNames = classnames(
    styles.summary,
    UNSAFE_className.summary,
  );

  const summaryWrapClassNames = classnames(
    styles.summaryWrap,
    { [styles.customSummaryWrap]: !isTitleString },
    UNSAFE_className.summaryWrap,
  );

  const arrowIconWrapperClassNames = classnames(
    styles.arrowIconWrapper,
    UNSAFE_className.arrowIconWrapper,
  );

  const contentClassNames = classnames(
    styles.content,
    UNSAFE_className.content,
  );

  return (
    <details
      open={isOpen}
      className={containerClassNames}
      style={UNSAFE_style.container}
    >
      <summary
        className={summaryClassNames}
        style={UNSAFE_style.summary}
        onClick={handleToggle}
      >
        <div
          className={summaryWrapClassNames}
          style={UNSAFE_style.summaryWrap}
          ref={titleRef}
        >
          <DisclosureTitle
            title={title}
            size={isBelowBreakpoint ? "base" : "large"}
            isTitleString={isTitleString}
            UNSAFE_className={UNSAFE_className.title}
            UNSAFE_style={UNSAFE_style.title}
          />
          <span
            className={arrowIconWrapperClassNames}
            style={UNSAFE_style.arrowIconWrapper}
          >
            <Icon
              name="arrowDown"
              color="interactive"
              UNSAFE_className={{
                svg: UNSAFE_className.icon?.svg,
                path: UNSAFE_className.icon?.path,
              }}
              UNSAFE_style={{
                svg: UNSAFE_style.icon?.svg,
                path: UNSAFE_style.icon?.path,
              }}
            />
          </span>
        </div>
      </summary>
      <span className={contentClassNames} style={UNSAFE_style.content}>
        {children}
      </span>
    </details>
  );

  function handleToggle(event: React.MouseEvent<HTMLDetailsElement>) {
    event.preventDefault();

    setInternalOpen(!isOpen);
    onToggle?.(!isOpen);
  }
}

interface DisclosureTitleProps {
  /**
   * Title for the disclosure pane.
   */
  readonly title: string | ReactNode | ReactNode[];
  /**
   * Size when the title is a string.
   */
  readonly size: "base" | "large";
  /**
   * Whether the title is a string.
   */
  readonly isTitleString: boolean;
  /**
   * Custom className for the DisclosureTitle.
   */
  readonly UNSAFE_className?: { textStyle?: string };
  /**
   * Custom style for the DisclosureTitle.
   */
  readonly UNSAFE_style?: { textStyle?: CSSProperties };
}

function DisclosureTitle({
  title,
  size,
  isTitleString,
  UNSAFE_className,
  UNSAFE_style,
}: DisclosureTitleProps) {
  if (!isTitleString) return <>{title}</>;

  return (
    <Typography
      element="h4"
      size={size}
      fontWeight="bold"
      textColor="heading"
      UNSAFE_className={UNSAFE_className}
      UNSAFE_style={UNSAFE_style}
    >
      {title}
    </Typography>
  );
}

```

## Props

### Web Props

| Prop                                                                                       | Type       | Required                 | Default                     | Description                                         |
| ------------------------------------------------------------------------------------------ | ---------- | ------------------------ | --------------------------- | --------------------------------------------------- | ----------------------------------------------- | --- | -------- | ------------------------------ |
| `children`                                                                                 | `ReactNode | ReactNode[]`             | ✅                          | `_none_`                                            | Child content that is manged by this component. |
| `title`                                                                                    | `string    | ReactElement<any, string | JSXElementConstructor<any>> | ReactElement<any, string                            | JSXElementConstructor<any>>[]`                  | ✅  | `_none_` | Title for the disclosure pane. |
| If ReactElement[] is provided, it must be wrapped in a container element (not a Fragment). |
| `defaultOpen`                                                                              | `boolean`  | ❌                       | `[object Object]`           | This sets the default open state of the disclosure. |

By default the disclosure is closed. For use when the component is being used as
an Uncontrolled Component. | | `onToggle` | `(newOpened: boolean) => void` | ❌
| `_none_` | Callback that is called when the disclosure is toggled. | | `open`
| `boolean` | ❌ | `_none_` | Used to make the disclosure a Controlled
Component. | | `UNSAFE_className` |
`{ container?: string; summary?: string; summaryWrap?: string; title?: { textStyle?: string; }; icon?: { svg?: string; path?: string; }; arrowIconWrapper?: string; content?: string; }`
| ❌ | `{}` | **Use at your own risk:** Custom classNames for specific elements.
This should only be used as a **last resort**. Using this may result in
unexpected side effects. More information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
| | `UNSAFE_style` |
`{ container?: CSSProperties; summary?: CSSProperties; summaryWrap?: CSSProperties; title?: { textStyle?: CSSProperties; }; icon?: { ...; }; arrowIconWrapper?: CSSProperties; content?: CSSProperties; }`
| ❌ | `{}` | **Use at your own risk:** Custom style for specific elements. This
should only be used as a **last resort**. Using this may result in unexpected
side effects. More information in the
[Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
|

### Mobile Props

| Prop                                                                                            | Type              | Required | Default                          | Description                                                                                                         |
| ----------------------------------------------------------------------------------------------- | ----------------- | -------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `content`                                                                                       | `React.ReactNode` | ✅       | `_none_`                         | Specifies the main content of the disclosure component.                                                             |
| It can be any React Node - simple text, JSX, or a complex React component.                      |
| `header`                                                                                        | `React.ReactNode` | ✅       | `_none_`                         | Defines the header of the disclosure component.                                                                     |
| Similar to `content`, it can be any React Node.                                                 |
| `open`                                                                                          | `boolean`         | ✅       | `_none_`                         | A boolean that determines whether the disclosure component is in an open or closed state.                           |
| If `open` is true, the disclosure is in an open state; if false, it's closed.                   |
| `isEmpty`                                                                                       | `boolean`         | ✅       | `_none_`                         | A boolean that indicates whether the disclosure component is empty or not.                                          |
| If `isEmpty` is `true`, there is no content in the disclosure; if false, there is some content. |
| `animationDuration`                                                                             | `number`          | ❌       | `staticTokens["timing-slowest"]` | An optional property that determines the duration of the opening and closing animation of the disclosure component. |
| It's defined in milliseconds.                                                                   |
| `onToggle`                                                                                      | `() => void`      | ✅       | `_none_`                         | A function that is called whenever the disclosure component is toggled between its open and closed states.          |

## Categories

- Layouts & Structure

## Web Test Code

```typescript
Disclosure Accordion Collapsable Expandable Toggle Reveal Web React Test Testing Jest import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as jobberHooks from "@jobber/hooks/useResizeObserver";
import { Disclosure } from ".";
import { Icon } from "../Icon";

jest.mock("@jobber/hooks/useResizeObserver", () => {
  return {
    __esModule: true, // Allows use to spy on useResizeObserver
    ...(jest.requireActual("@jobber/hooks/useResizeObserver") as object),
  };
});

const mockContainerWidth = (exactWidth?: number) => {
  jest.spyOn(jobberHooks, "useResizeObserver").mockReturnValue([
    { current: null },
    {
      width: 1200,
      height: 800,
      exactWidth: exactWidth || 1200,
      exactHeight: 800,
    },
  ]);
};

describe("Disclosure", () => {
  it("renders a Disclosure", () => {
    render(
      <Disclosure title="Example Disclosure Title">
        <p>Wafer topping soufflé bear claw cake chocolate toffee.</p>
      </Disclosure>,
    );
    const title = screen.getByRole("heading", {
      level: 4,
      name: "Example Disclosure Title",
    });
    expect(title).toBeDefined();
    expect(
      screen.getByText(
        "Wafer topping soufflé bear claw cake chocolate toffee.",
      ),
    ).toBeDefined();
  });

  it("renders a Disclosure which should be closed by default", () => {
    render(
      <Disclosure title="I am Disclosure">
        <span>Bacon ipsum dolor amet leberkas picanha landjaeger ham.</span>
      </Disclosure>,
    );

    const detailsElement = screen.getByRole("group");
    expect(detailsElement.getAttribute("open")).toBeNull();
  });

  it("renders a Disclosure that is opened if `defaultOpen` is set", () => {
    render(
      <Disclosure defaultOpen title="I am Disclosure">
        <span>Cotton candy tootsie roll lemon drops tiramisu cake tart.</span>
      </Disclosure>,
    );

    const detailsElement = screen.getByRole("group");
    expect(detailsElement.getAttribute("open")).not.toBeNull();
  });

  describe("When a custom title is provided", () => {
    it("renders the custom title", () => {
      render(
        <Disclosure
          title={
            <>
              <Icon name="archive" />
              <span>Custom Title</span>
            </>
          }
        >
          <span>Content</span>
        </Disclosure>,
      );

      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.getByTestId("archive")).toBeInTheDocument();
    });

    it("should not render a custom title if the passed 'title' is a string", () => {
      const title = "String Title";
      const customTitleClass = "customSummaryWrap";
      render(
        <Disclosure title={title}>
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByText(title).parentElement).not.toHaveClass(
        customTitleClass,
      );
    });
  });

  describe("When the disclosure is controlled", () => {
    describe("Title is a string", () => {
      it.each([
        { breakpoint: jobberHooks.Breakpoints.large, expectedClass: "large" },
        {
          breakpoint: jobberHooks.Breakpoints.small - 1,
          expectedClass: "base",
        },
      ])(
        "should updated the title size based on the size of the container",
        async ({ breakpoint, expectedClass }) => {
          mockContainerWidth(breakpoint);
          render(
            <Disclosure title="I am Disclosure" open={false}>
              <span>Content</span>
            </Disclosure>,
          );
          const title = screen.getByRole("heading", { level: 4 });
          expect(title).toHaveClass(expectedClass);
        },
      );
    });
    it("should open when `open` is true", () => {
      render(
        <Disclosure open title="I am Disclosure">
          <span>Content</span>
        </Disclosure>,
      );

      const detailsElement = screen.getByRole("group");
      expect(detailsElement.getAttribute("open")).not.toBeNull();
    });

    it("should close when `open` is false", () => {
      render(
        <Disclosure open={false} title="I am Disclosure">
          <span>Content</span>
        </Disclosure>,
      );

      const detailsElement = screen.getByRole("group");
      expect(detailsElement.getAttribute("open")).toBeNull();
    });

    it.each([
      { open: true, expected: false },
      { open: false, expected: true },
    ])(
      `when $open should call onToggle with $expected when the summary is clicked`,
      async ({ expected, open }) => {
        const mockOnToggle = jest.fn();
        render(
          <Disclosure
            open={open}
            onToggle={mockOnToggle}
            title="I am Disclosure"
          >
            <span>Content</span>
          </Disclosure>,
        );

        const summaryElement = screen.getByText("I am Disclosure");
        await userEvent.click(summaryElement);

        expect(mockOnToggle).toHaveBeenCalledWith(expected);
      },
    );
  });
});

describe("UNSAFE_ props", () => {
  describe("UNSAFE_className", () => {
    type ElementTestCase = [
      element: string,
      className: string | { textStyle: string },
      getElement: () => HTMLElement | null,
    ];

    const testCases: ElementTestCase[] = [
      ["container", "custom-container", () => screen.getByRole("group")],
      [
        "summary",
        "custom-summary",
        () => screen.getByText("Test Title").closest("summary"),
      ],
      [
        "summaryWrap",
        "custom-summary-wrap",
        () => screen.getByText("Test Title").closest("div"),
      ],
      [
        "title",
        { textStyle: "custom-title" },
        () => screen.getByRole("heading"),
      ],
      [
        "arrowIconWrapper",
        "custom-arrow-wrapper",
        () => screen.getByTestId("arrowDown").parentElement,
      ],
      [
        "content",
        "custom-content",
        () => screen.getByText("Content").parentElement,
      ],
    ];

    it.each<ElementTestCase>(testCases)(
      "applies to %s",
      (element, className, getElement) => {
        render(
          <Disclosure
            title="Test Title"
            UNSAFE_className={{ [element]: className }}
          >
            <span>Content</span>
          </Disclosure>,
        );
        expect(getElement()).toHaveClass(
          typeof className === "string" ? className : className.textStyle,
        );
      },
    );

    it("applies to icon", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_className={{
            icon: {
              svg: "custom-icon-svg",
              path: "custom-icon-path",
            },
          }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByTestId("arrowDown")).toHaveClass("custom-icon-svg");
      expect(screen.getByTestId("arrowDown").querySelector("path")).toHaveClass(
        "custom-icon-path",
      );
    });
  });

  describe("UNSAFE_style", () => {
    it("applies to container", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_style={{
            container: { backgroundColor: "var(--color-yellow)" },
          }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByRole("group")).toHaveStyle({
        backgroundColor: "var(--color-yellow)",
      });
    });

    it("applies to summary", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_style={{
            summary: { padding: "var(--space-large)" },
          }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByText("Test Title").closest("summary")).toHaveStyle({
        padding: "var(--space-large)",
      });
    });

    it("applies to summary wrap", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_style={{
            summaryWrap: { margin: "var(--space-small)" },
          }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByText("Test Title").closest("div")).toHaveStyle({
        margin: "var(--space-small)",
      });
    });

    it("applies to title", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_style={{
            title: { textStyle: { color: "var(--color-blue)" } },
          }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByRole("heading")).toHaveStyle({
        color: "var(--color-blue)",
      });
    });

    it("applies to icon", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_style={{
            icon: {
              svg: { width: "var(--space-large)" },
              path: { fill: "var(--color-green)" },
            },
          }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByTestId("arrowDown")).toHaveStyle({
        width: "var(--space-large)",
      });
      expect(screen.getByTestId("arrowDown").querySelector("path")).toHaveStyle(
        { fill: "var(--color-green)" },
      );
    });

    it("applies to arrow icon wrapper", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_style={{ arrowIconWrapper: { display: "flex" } }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByTestId("arrowDown").parentElement).toHaveStyle({
        display: "flex",
      });
    });

    it("applies to content", () => {
      render(
        <Disclosure
          title="Test Title"
          UNSAFE_style={{
            content: { fontSize: "var(--typography--fontSize-large)" },
          }}
        >
          <span>Content</span>
        </Disclosure>,
      );
      expect(screen.getByText("Content").parentElement).toHaveStyle({
        fontSize: "var(--typography--fontSize-large)",
      });
    });
  });

  it("should work with both className and style customizations simultaneously", () => {
    render(
      <Disclosure
        title="Test Title"
        UNSAFE_className={{ container: "custom-container" }}
        UNSAFE_style={{
          container: { backgroundColor: "var(--color-yellow)" },
        }}
      >
        <span>Content</span>
      </Disclosure>,
    );

    const container = screen.getByRole("group");
    expect(container).toHaveClass("custom-container");
    expect(container).toHaveStyle({ backgroundColor: "var(--color-yellow)" });
  });
});

```

## Component Path

`/components/Disclosure`

---

_Generated on 2025-08-21T17:35:16.359Z_
