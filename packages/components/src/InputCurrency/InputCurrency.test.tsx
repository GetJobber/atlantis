import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { describe, expect, it, vi } from "vitest";
import { InputCurrency } from "./InputCurrency";

describe("InputCurrency", () => {
  it("renders with default props", () => {
    render(<InputCurrency />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders with a placeholder label", () => {
    render(<InputCurrency placeholder="Amount" />);

    const label = screen.getByLabelText("Amount");
    expect(label).toBeInTheDocument();
  });

  it("renders with a description", () => {
    render(<InputCurrency description="Enter the payment amount" />);

    const description = screen.getByText("Enter the payment amount");
    expect(description).toBeInTheDocument();
  });

  it("renders with an error message and icon", () => {
    render(<InputCurrency error="Invalid amount" />);

    const errorMessage = screen.getByText("Invalid amount");
    expect(errorMessage).toBeInTheDocument();
    const icon = screen.getByTestId("alert");
    expect(icon).toBeInTheDocument();
  });

  it("renders a value with the default currency when provided", () => {
    render(<InputCurrency value={1234.56} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("$1,234.56");
  });

  it("applies custom format options", () => {
    const formatOptions: Intl.NumberFormatOptions = {
      currency: "GBP",
      currencyDisplay: "symbol",
      style: "currency",
    };

    render(<InputCurrency formatOptions={formatOptions} value={100} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("£100.00");
  });

  it("calls onChange handler when value changes", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<InputCurrency onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "123");
    await user.tab(); // blur input so RAC component calls onChange

    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onFocus handler when input gains focus", async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();

    render(<InputCurrency onFocus={handleFocus} />);

    const input = screen.getByRole("textbox");
    await user.click(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("forwards ref to input element", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<InputCurrency ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });

  it("renders number input field with proper ARIA attributes", () => {
    render(<InputCurrency placeholder="Amount" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "numeric");
  });

  it("renders with a defaultValue when provided", () => {
    render(<InputCurrency defaultValue={500.75} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("$500.75");
  });

  it("applies readOnly attribute when readOnly prop is true", () => {
    render(<InputCurrency readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly", "");
  });
});
