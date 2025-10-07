# AnimatedSwitcher

# AnimatedSwitcher

Smoothly switch between two components that aim to add delight when the user
interacts with them.

## Web Component Code

```tsx
AnimatedSwitcher Motion Animation Web React import type { ReactElement } from "react";
import React, { useState } from "react";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import type { IconNames } from "@jobber/design";
import {
  DURATION_AVERAGE,
  DURATION_SIMPLE,
  FADE,
  SLIDE_IN_DOWN,
  SLIDE_IN_UP,
  SPIN_CLOCK_WISE,
  SPIN_COUNTER_CLOCK_WISE,
} from "./transitions";
import { Icon } from "../Icon";

export interface AnimatedSwitcherProps {
  /**
   * Determines when to switch the component to the `switchTo` prop.
   *
   * @default false
   */
  readonly switched: boolean;

  /**
   * The component that shows up when the `switched` prop is `false`
   */
  readonly initialChild: ReactElement;

  /**
   * The component that shows up when the `switched` prop is `true`
   */
  readonly switchTo: ReactElement;

  /**
   * Change the transition between 2 elements.
   */
  readonly type?: "slideFromBottom" | "fade";
}

export function AnimatedSwitcher({
  initialChild,
  switched,
  switchTo,
  type = "slideFromBottom",
}: AnimatedSwitcherProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const isSwitchingBetweenIcons =
    initialChild.type === Icon && switchTo.type === Icon;

  const { key, transition, child, duration } = getChildData();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        ref={setRef}
        key={key}
        variants={transition}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration }}
        style={{ display: getDisplayValue() }}
      >
        {child}
      </motion.div>
    </AnimatePresence>
  );

  function getDisplayValue() {
    if (ref?.firstElementChild) {
      return window.getComputedStyle(ref.firstElementChild).display;
    }
  }

  function getChildData() {
    let data = {
      key: `${initialChild.type.toString()}_1`,
      child: initialChild,
    };

    if (switched) {
      data = { key: `${switchTo.type.toString()}_2`, child: switchTo };
    }

    return {
      ...data,
      transition: getTransitionType(),
      duration: getTransitionDuration(),
    };
  }

  function getTransitionType(): Variants {
    if (isSwitchingBetweenIcons) {
      if (switched) return SPIN_COUNTER_CLOCK_WISE;

      return SPIN_CLOCK_WISE;
    } else if (type === "fade") {
      return FADE;
    } else {
      if (switched) return SLIDE_IN_UP;

      return SLIDE_IN_DOWN;
    }
  }

  function getTransitionDuration() {
    switch (type) {
      case "fade":
        return DURATION_AVERAGE;
      default:
        return DURATION_SIMPLE;
    }
  }
}

interface AnimatedSwitcherIconProps
  extends Pick<AnimatedSwitcherProps, "switched"> {
  readonly initialIcon: IconNames;
  readonly switchToIcon: IconNames;
}

AnimatedSwitcher.Icon = function AnimatedSwitcherIcon({
  switchToIcon,
  switched,
  initialIcon,
}: AnimatedSwitcherIconProps) {
  return (
    <AnimatedSwitcher
      switched={switched}
      initialChild={<Icon name={initialIcon} />}
      switchTo={<Icon name={switchToIcon} />}
    />
  );
};

```

## Props

### Web Props

| Prop           | Type                      | Required                     | Default | Description                                                     |
| -------------- | ------------------------- | ---------------------------- | ------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `switched`     | `boolean`                 | ✅                           | `false` | Determines when to switch the component to the `switchTo` prop. |
| `initialChild` | `ReactElement<any, string | JSXElementConstructor<any>>` | ✅      | `_none_`                                                        | The component that shows up when the `switched` prop is `false` |
| `switchTo`     | `ReactElement<any, string | JSXElementConstructor<any>>` | ✅      | `_none_`                                                        | The component that shows up when the `switched` prop is `true`  |
| `type`         | `"slideFromBottom"        | "fade"`                      | ❌      | `slideFromBottom`                                               | Change the transition between 2 elements.                       |

## Categories

- Utilities

## Web Test Code

```typescript
AnimatedSwitcher Motion Animation Web React Test Testing Jest import React from "react";
import { render, screen } from "@testing-library/react";
import type { Variant } from "framer-motion";
import type { AnimatedSwitcherProps } from "./AnimatedSwitcher";
import { AnimatedSwitcher } from "./AnimatedSwitcher";
import {
  FADE,
  SLIDE_IN_DOWN,
  SLIDE_IN_UP,
  SPIN_CLOCK_WISE,
  SPIN_COUNTER_CLOCK_WISE,
} from "./transitions";

const INITIAL_CHILD_TESTID = "INITIAL_CHILD";
const SWITCH_TO_CHILD_TESTID = "SWITCH_TO";
const MOCK_TEST_ID = "MOCK_TEST_ID";

function renderComponent(props?: Partial<AnimatedSwitcherProps>) {
  return render(
    <AnimatedSwitcher
      switched={false}
      initialChild={<div data-testid={INITIAL_CHILD_TESTID} />}
      switchTo={<div data-testid={SWITCH_TO_CHILD_TESTID} />}
      {...props}
    />,
  );
}

jest.mock("framer-motion", () => ({
  motion: {
    div: require("react").forwardRef(
      ({ children, variants, transition, ...rest }, ref) => (
        <div
          {...rest}
          ref={ref}
          data-variants={JSON.stringify(variants)}
          data-transition={JSON.stringify(transition)}
          data-testid={MOCK_TEST_ID}
        >
          {children}
        </div>
      ),
    ),
  },
  AnimatePresence: jest
    .fn()
    .mockImplementation(({ children }) => <>{children}</>),
  default: jest.fn(),
}));

describe("AnimatedSwitcher", () => {
  describe("On initial render", () => {
    it("should render initialChild when the switched prop is false", () => {
      renderComponent();

      expect(screen.getByTestId(INITIAL_CHILD_TESTID)).toBeInTheDocument();
      expect(
        screen.queryByTestId(SWITCH_TO_CHILD_TESTID),
      ).not.toBeInTheDocument();

      expect(screen.getByTestId(MOCK_TEST_ID)).toHaveAttribute(
        "data-variants",
        JSON.stringify(SLIDE_IN_DOWN),
      );
    });

    it("should render switchTo when the switched prop is false", () => {
      renderComponent({ switched: true });

      expect(
        screen.queryByTestId(INITIAL_CHILD_TESTID),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId(SWITCH_TO_CHILD_TESTID)).toBeInTheDocument();
    });
  });

  describe("Animation Variant", () => {
    it.each<[AnimatedSwitcherProps["type"], Variant]>([
      ["slideFromBottom", SLIDE_IN_DOWN],
      ["fade", FADE],
    ])("should render %s with the correct initial variant", (type, variant) => {
      renderComponent({ type });

      expect(screen.getByTestId(MOCK_TEST_ID)).toHaveAttribute(
        "data-variants",
        JSON.stringify(variant),
      );
    });

    it.each<[AnimatedSwitcherProps["type"], Variant]>([
      ["slideFromBottom", SLIDE_IN_UP],
      ["fade", FADE],
    ])(
      "should render %s with the correct switched variant",
      (type, variant) => {
        renderComponent({ switched: true, type });

        expect(screen.getByTestId(MOCK_TEST_ID)).toHaveAttribute(
          "data-variants",
          JSON.stringify(variant),
        );
      },
    );

    describe("AnimatedSwitcher.Icon", () => {
      it.each<[AnimatedSwitcherProps["switched"], Variant]>([
        [false, SPIN_CLOCK_WISE],
        [true, SPIN_COUNTER_CLOCK_WISE],
      ])(
        "should render with the correct switched=%s variant",
        (switched, variant) => {
          render(
            <AnimatedSwitcher.Icon
              switched={switched}
              initialIcon="add"
              switchToIcon="checkmark"
            />,
          );

          expect(screen.getByTestId(MOCK_TEST_ID)).toHaveAttribute(
            "data-variants",
            JSON.stringify(variant),
          );
        },
      );
    });
  });
});

```

## Component Path

`/components/AnimatedSwitcher`

---

_Generated on 2025-08-21T17:35:16.352Z_
