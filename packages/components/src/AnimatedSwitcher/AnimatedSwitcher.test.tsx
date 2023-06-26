import React from "react";
import { render, screen } from "@testing-library/react";
import { Variant } from "framer-motion";
import { AnimatedSwitcher, AnimatedSwitcherProps } from "./AnimatedSwitcher";
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
