import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { InputMask, InputMaskProps } from "./InputMask";
import { FormField } from "../FormField";

const placeholder = "Expiry date";

describe("InputMask", () => {
  it("should render the pattern with * replaced as _", () => {
    render(<TestInputMask />);
    expect(screen.getByText("__/__")).toBeInTheDocument();
  });

  describe("With user typed value", () => {
    beforeEach(() => {
      render(<TestInputMask />);
    });

    it("should have a hidden and visible placeholder value and the correct input value", () => {
      const input = screen.getByLabelText(placeholder);
      fireEvent.change(input, {
        target: { value: "02" },
      });

      const invisiblePlaceholder = screen.getByText("02");
      expect(invisiblePlaceholder).toBeInTheDocument();
      expect(invisiblePlaceholder).toHaveClass("hiddenValue");
      expect(screen.getByText("/__")).toBeInTheDocument();
      expect(input).toHaveValue("02");
    });

    it("should add the special character", () => {
      const input = screen.getByLabelText(placeholder);
      fireEvent.change(input, {
        target: { value: "023" },
      });

      const invisiblePlaceholder = screen.getByText("02/3");
      expect(invisiblePlaceholder).toBeInTheDocument();
      expect(invisiblePlaceholder).toHaveClass("hiddenValue");
      expect(screen.getByText("_")).toBeInTheDocument();
      expect(input).toHaveValue("02/3");
    });

    it("should not have the placeholder value when the full value is typed", () => {
      const input = screen.getByLabelText(placeholder);
      fireEvent.change(input, {
        target: { value: "0231" },
      });

      const expectedValue = "02/31";
      expect(screen.getByText(expectedValue)).toBeInTheDocument();
      expect(input).toHaveValue(expectedValue);
    });

    it("should not allow typing values longer than the mask allows", () => {
      const input = screen.getByLabelText(placeholder);
      fireEvent.change(input, {
        target: { value: "02231" },
      });

      expect(screen.getByText("02/23")).toBeInTheDocument();
      expect(input).toHaveValue("02/23");
    });

    // This would need to be removed/updated once we generalize this component
    it("should only accept numbers", () => {
      const input = screen.getByLabelText(placeholder);
      fireEvent.change(input, {
        target: { value: "0one2" },
      });

      expect(screen.getByText("02")).toBeInTheDocument();
      expect(screen.getByText("/__")).toBeInTheDocument();
      expect(input).toHaveValue("02");
    });
  });

  describe("Exceeding typed value when strict is set to false", () => {
    beforeEach(() => {
      render(<TestInputMask pattern="(***) ***-****" strict={false} />);
    });

    it("should allow typing values longer than the mask allows", () => {
      const expectedValue = "555123456789";
      const input = screen.getByLabelText(placeholder);
      fireEvent.change(input, {
        target: { value: expectedValue },
      });

      expect(screen.queryByText(expectedValue)).not.toBeInTheDocument();
      expect(input).toHaveValue(expectedValue);
    });

    it("should start off formatted and stops formatting after exceeding", () => {
      const input = screen.getByLabelText(placeholder);
      fireEvent.change(input, {
        target: { value: "5551234567" },
      });

      const formattedValue = "(555) 123-4567";
      expect(input).toHaveValue(formattedValue);

      const unFormattedValue = "555123456789";
      fireEvent.change(input, {
        target: { value: unFormattedValue },
      });

      expect(input).toHaveValue(unFormattedValue);
    });
  });
});

function TestInputMask({
  pattern = "**/**",
  ...props
}: Partial<InputMaskProps>) {
  const [value, setValue] = useState("");
  return (
    <InputMask pattern={pattern} {...props}>
      <FormField
        placeholder={placeholder}
        value={value}
        onChange={(v: string) => setValue(v)}
      />
    </InputMask>
  );
}
