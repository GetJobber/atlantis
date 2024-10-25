import React from "react";
import { render, screen } from "@testing-library/react";
import {
  BREAKPOINT_SIZES,
  mockViewportWidth,
} from "@jobber/hooks/useBreakpoints";
import userEvent from "@testing-library/user-event";
import { Disclosure } from ".";
import { Icon } from "../Icon";

const { cleanup, setViewportWidth } = mockViewportWidth();

describe("Disclosure", () => {
  afterEach(cleanup);
  beforeEach(() => {
    setViewportWidth(BREAKPOINT_SIZES.lg);
  });

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
    afterEach(cleanup);
    beforeEach(() => {
      setViewportWidth(BREAKPOINT_SIZES.lg);
    });

    describe("Title is a string", () => {
      it.each([
        { breakpoint: BREAKPOINT_SIZES.lg, expectedClass: "large" },
        { breakpoint: BREAKPOINT_SIZES.sm - 1, expectedClass: "base" },
      ])(
        "should updated the title size based on the breakpoint",
        async ({ breakpoint, expectedClass }) => {
          setViewportWidth(breakpoint);
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
