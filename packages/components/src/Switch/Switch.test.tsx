import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from ".";

describe("Switch", () => {
  it("renders with correct role and accessibility attributes", () => {
    render(<Switch ariaLabel="Toggle me" />);
    const switchElement = screen.getByRole("switch", { name: "Toggle me" });

    expect(switchElement).toBeVisible();
    expect(switchElement).toHaveAttribute("aria-checked", "false");
    expect(switchElement).toHaveAttribute("type", "button");
  });

  it("renders in the OFF state by default", () => {
    render(<Switch ariaLabel="Toggle me" />);
    const switchElement = screen.getByRole("switch");

    expect(switchElement).toHaveAttribute("aria-checked", "false");
    expect(screen.getByTestId("cross")).toBeVisible();
  });

  it("renders in the ON state when value is true", () => {
    render(<Switch ariaLabel="Toggle me" value={true} />);
    const switchElement = screen.getByRole("switch");

    expect(switchElement).toHaveAttribute("aria-checked", "true");
    expect(screen.getByTestId("checkmark")).toBeVisible();
  });

  it("renders as disabled when disabled prop is true", () => {
    render(<Switch ariaLabel="Can't touch this" disabled={true} />);
    const switchElement = screen.getByRole("switch");

    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveAttribute("aria-checked", "false");
  });

  it("renders a hidden input with the current value", () => {
    const { rerender } = render(<Switch ariaLabel="Toggle me" value={false} />);
    expect(screen.getByDisplayValue("false")).toHaveAttribute("type", "hidden");

    rerender(<Switch ariaLabel="Toggle me" value={true} />);
    expect(screen.getByDisplayValue("true")).toHaveAttribute("type", "hidden");
  });

  test("it should change the input value on click", async () => {
    const { getByRole } = render(<Switch ariaLabel="Toggle me" />);
    const element = getByRole("switch");

    await userEvent.click(element);
    expect(element).toHaveAttribute("aria-checked", "true");

    await userEvent.click(element);
    expect(element).toHaveAttribute("aria-checked", "false");
  });

  test("it should not change the input value on click", async () => {
    const { getByRole } = render(
      <Switch ariaLabel="Can't touch this" value={true} disabled={true} />,
    );
    const element = getByRole("switch");

    await userEvent.click(element);
    expect(element).toHaveAttribute("aria-checked", "true");
  });

  describe("accessibility", () => {
    it("hides the icon from screen readers", () => {
      render(<Switch ariaLabel="Toggle me" />);
      const iconContainer = screen.getByTestId("cross").parentElement;
      expect(iconContainer).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("icons", () => {
    it("displays cross icon when OFF", () => {
      render(<Switch ariaLabel="Toggle me" value={false} />);
      expect(screen.getByTestId("cross")).toBeVisible();
      expect(screen.queryByTestId("checkmark")).not.toBeInTheDocument();
    });

    it("displays checkmark icon when ON", () => {
      render(<Switch ariaLabel="Toggle me" value={true} />);
      expect(screen.getByTestId("checkmark")).toBeVisible();
      expect(screen.queryByTestId("cross")).not.toBeInTheDocument();
    });

    it("toggles icon from cross to checkmark on click", async () => {
      render(<Switch ariaLabel="Toggle me" />);
      const element = screen.getByRole("switch");

      expect(screen.getByTestId("cross")).toBeVisible();
      expect(screen.queryByTestId("checkmark")).not.toBeInTheDocument();

      await userEvent.click(element);
      expect(screen.getByTestId("checkmark")).toBeVisible();
      expect(screen.queryByTestId("cross")).not.toBeInTheDocument();

      await userEvent.click(element);
      expect(screen.getByTestId("cross")).toBeVisible();
      expect(screen.queryByTestId("checkmark")).not.toBeInTheDocument();
    });
  });
});
