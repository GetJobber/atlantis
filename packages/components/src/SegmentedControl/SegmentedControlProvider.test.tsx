import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  SegmentedControlProvider,
  useSegmentedControl,
} from "./SegmentedControlProvider";

const SegmentedControl = () => {
  const { selectedValue, handleChange } = useSegmentedControl<string>();

  return (
    <div>
      <input
        type="radio"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={handleChange}
        aria-label="Option 1"
      />
      <input
        type="radio"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={handleChange}
        aria-label="Option 2"
      />
    </div>
  );
};

describe("SegmentedControlProvider", () => {
  describe("Uncontrolled", () => {
    it("updates internal state when an option is selected", async () => {
      render(
        <SegmentedControlProvider defaultValue="option1">
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      expect(screen.getByLabelText("Option 1")).toBeChecked();

      userEvent.click(screen.getByLabelText("Option 2"));

      await waitFor(() => {
        expect(screen.getByLabelText("Option 2")).toBeChecked();
      });
    });

    it("initializes with the correct value", () => {
      render(
        <SegmentedControlProvider defaultValue="option2">
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      expect(screen.getByLabelText("Option 2")).toBeChecked();
    });
  });

  describe("Controlled", () => {
    it("calls onSelectValue when an option is selected", async () => {
      const handleSelectValue = jest.fn();
      render(
        <SegmentedControlProvider
          selectedValue="option1"
          onSelectValue={handleSelectValue}
        >
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      expect(screen.getByLabelText("Option 1")).toBeChecked();

      userEvent.click(screen.getByLabelText("Option 2"));

      await waitFor(() => {
        expect(handleSelectValue).toHaveBeenCalledWith("option2");
      });
    });

    it("initializes with the correct value via onSelectValue", async () => {
      const handleSelectValue = jest.fn();
      render(
        <SegmentedControlProvider
          selectedValue="option2"
          onSelectValue={handleSelectValue}
        >
          <SegmentedControl />
        </SegmentedControlProvider>,
      );

      await waitFor(() => {
        expect(handleSelectValue).toHaveBeenCalledWith("option2");
      });

      expect(screen.getByLabelText("Option 2")).toBeChecked();
    });
  });
});
