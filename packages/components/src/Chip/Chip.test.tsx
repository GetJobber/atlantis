import React from "react";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./Chip";
import styles from "./Chip.css";
import { Avatar } from "../Avatar";

let mockIsInView = jest.fn(() => true);
jest.mock("@jobber/hooks/useInView", () => ({
  useInView: () => [{ current: null }, mockIsInView()],
}));

describe("Chip", () => {
  it("renders without error", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Chip label="Label" onClick={onClick} />);

    expect(getByText("Label")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Chip onClick={onClick} label="Test Chip" />);

    fireEvent.click(getByText("Test Chip"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown when typed in", () => {
    const onKeyDown = jest.fn();
    const { getByText } = render(
      <Chip onKeyDown={onKeyDown} label="Test Chip" />,
    );
    fireEvent.keyDown(getByText("Test Chip"), { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const label = "Test Disabled";
    const clickHandler = jest.fn();
    const { getByText } = render(
      <Chip label={label} onClick={clickHandler} disabled />,
    );

    fireEvent.click(getByText(label));
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });

  it("should have a role of button when role not provided", () => {
    const { getByRole } = render(<Chip label="Test Chip" />);
    expect(getByRole("button")).toBeInstanceOf(HTMLButtonElement);
  });

  it("should have a tabIndex of zero if one is not provided", () => {
    const { getByRole } = render(<Chip label="Test Chip" />);

    expect(getByRole("button")).toHaveAttribute("tabIndex", "0");
  });

  it("should set aria-label if one is provided", () => {
    const { getByRole } = render(
      <Chip label="Test Chip" ariaLabel="Test Label" />,
    );

    expect(getByRole("button")).toHaveAttribute("aria-label", "Test Label");
  });

  it("should default aria-label to provided label if not provided", () => {
    const { getByRole } = render(<Chip label="Test Chip" />);

    expect(getByRole("button")).toHaveAttribute("aria-label", "Test Chip");
  });
});

describe("Chip Children", () => {
  it("should only render one prefix if two are provided", () => {
    const { container } = render(
      <Chip label="Test Chip">
        <Chip.Prefix>
          <Avatar initials="" />
        </Chip.Prefix>
        <Chip.Prefix>
          <Avatar initials="" />
        </Chip.Prefix>
      </Chip>,
    );
    const elements = container.querySelectorAll("." + styles.prefix);

    expect(elements).toHaveLength(1);
  });

  it("should only render one suffix if two are provided", () => {
    const { container } = render(
      <Chip label="Test Chip">
        <Chip.Suffix>
          <Avatar initials="" />
        </Chip.Suffix>
        <Chip.Suffix>
          <Avatar initials="" />
        </Chip.Suffix>
      </Chip>,
    );
    const elements = container.querySelectorAll("." + styles.suffix);

    expect(elements).toHaveLength(1);
  });
});

describe("Chip truncation", () => {
  describe("with only a label too long to display", () => {
    beforeEach(() => {
      mockIsInView.mockReturnValueOnce(false);
    });

    it("should show a tooltip with the label's content", () => {
      const label =
        "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
      const { getByRole } = render(<Chip label={label} />);
      const button = getByRole("button");

      userEvent.hover(button);

      expect(document.querySelector("div[role='tooltip']")).toHaveTextContent(
        label,
      );
    });

    it("should show a gradient to indicate truncation", () => {
      const label =
        "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
      const { getByTestId } = render(<Chip label={label} />);
      const gradient = getByTestId("ATL-Chip-Truncation-Gradient");

      expect(gradient).toBeInTheDocument();
    });
  });

  describe("with only a label short enough to display", () => {
    beforeEach(() => {
      mockIsInView = jest.fn(() => true);
    });

    it("should not show a tooltip", () => {
      const label = "short";
      const { getByRole } = render(<Chip label={label} />);
      const button = getByRole("button");

      userEvent.hover(button);

      expect(
        document.querySelector("div[role='tooltip']"),
      ).not.toBeInTheDocument();
    });

    it("should not show a gradient", () => {
      const label = "short";
      const { queryByTestId } = render(<Chip label={label} />);
      const gradient = queryByTestId("ATL-Chip-Truncation-Gradient");

      expect(gradient).not.toBeInTheDocument();
    });
  });

  describe("with a label and heading", () => {
    describe("when only label is too long to display", () => {
      beforeEach(() => {
        mockIsInView.mockReturnValueOnce(false);
      });

      it("should show a tooltip with only the label content", () => {
        const heading = "heading";
        const label =
          "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
        const { getByRole } = render(<Chip label={label} heading={heading} />);
        const button = getByRole("button");

        userEvent.hover(button);

        expect(document.querySelector("div[role='tooltip']")).toHaveTextContent(
          label,
        );
      });

      it("should show a gradient to indicate truncation", () => {
        const label =
          "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
        const { getByTestId } = render(<Chip label={label} />);
        const gradient = getByTestId("ATL-Chip-Truncation-Gradient");

        expect(gradient).toBeInTheDocument();
      });
    });

    describe("when heading is also too long to display", () => {
      beforeEach(() => {
        mockIsInView.mockReturnValue(false);
      });

      it("should show a tooltip with the label and heading content", () => {
        const heading = "heading";
        const label =
          "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
        const { getByRole } = render(<Chip label={label} heading={heading} />);
        const button = getByRole("button");

        userEvent.hover(button);

        expect(document.querySelector("div[role='tooltip']")).toHaveTextContent(
          `${heading} | ${label}`,
        );
      });

      it("should show a gradient to indicate truncation", () => {
        const label =
          "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
        const { getByTestId } = render(<Chip label={label} />);
        const gradient = getByTestId("ATL-Chip-Truncation-Gradient");

        expect(gradient).toBeInTheDocument();
      });
    });

    describe("when both can fully display", () => {
      beforeEach(() => {
        mockIsInView.mockReturnValue(true);
      });

      it("should not show a tooltip on hover", () => {
        const heading = "heading";
        const label =
          "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
        const { getByRole } = render(<Chip label={label} heading={heading} />);
        const button = getByRole("button");

        userEvent.hover(button);

        expect(document.querySelector("div[role='tooltip']")).toBeNull();
      });

      it("shold now show a gradient to indicate truncation", () => {
        const label =
          "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?";
        const { queryByTestId } = render(<Chip label={label} />);
        const gradient = queryByTestId("ATL-Chip-Truncation-Gradient");

        expect(gradient).not.toBeInTheDocument();
      });
    });
  });
});
