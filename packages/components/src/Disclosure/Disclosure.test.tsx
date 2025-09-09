import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as jobberHooks from "@jobber/hooks";
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
