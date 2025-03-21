import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChipDismissible } from "..";
import { Chip } from "../..";

// Helper function to get a chip by label
function getByChipLabelText(chipName: string) {
  return screen.getByLabelText(
    chipName + ". Press delete or backspace to remove " + chipName,
  );
}

// Helper to get remove button within a chip
function getRemoveButton(chip: HTMLElement) {
  const button = chip.querySelector('[data-testid="remove-chip-button"]');

  if (!button) {
    throw new Error("Remove button not found");
  }

  return button;
}

// A component with multiple chips for testing
function MultipleChipsComponent() {
  const mockChips = ["first", "middle", "last"];
  const [selected, setSelected] = useState(mockChips);

  return (
    <InternalChipDismissible
      selected={selected}
      onChange={setSelected}
      onClick={jest.fn}
    >
      {mockChips.map(chip => (
        <Chip key={chip} label={chip} value={chip} />
      ))}
    </InternalChipDismissible>
  );
}

// A component with a single chip for testing
function SingleChipComponent() {
  const mockChips = ["only"];
  const [selected, setSelected] = useState(mockChips);

  return (
    <InternalChipDismissible
      selected={selected}
      onChange={setSelected}
      onClick={jest.fn}
    >
      {mockChips.map(chip => (
        <Chip key={chip} label={chip} value={chip} />
      ))}
    </InternalChipDismissible>
  );
}

describe("Keyboard Navigation and Focus Management", () => {
  describe("Arrow Key Navigation", () => {
    beforeEach(() => {
      render(<MultipleChipsComponent />);
    });

    it("should navigate forward through chips using right arrow", async () => {
      // Focus the first chip
      const firstChip = getByChipLabelText("first");
      await userEvent.tab();
      expect(firstChip).toHaveFocus();

      // Move to middle chip with right arrow
      await userEvent.keyboard("{ArrowRight}");
      const middleChip = getByChipLabelText("middle");
      expect(middleChip).toHaveFocus();

      // Move to last chip with right arrow
      await userEvent.keyboard("{ArrowRight}");
      const lastChip = getByChipLabelText("last");
      expect(lastChip).toHaveFocus();

      // Move to Add button with right arrow
      await userEvent.keyboard("{ArrowRight}");
      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toHaveFocus();
    });

    it("should navigate from Add button to last chip with left arrow", async () => {
      // Navigate to Add button first
      await userEvent.tab();
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{ArrowRight}");

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toHaveFocus();

      // Move back to last chip with left arrow
      await userEvent.keyboard("{ArrowLeft}");
      const lastChip = getByChipLabelText("last");
      expect(lastChip).toHaveFocus();
    });

    it("should navigate from last chip to first chip with left arrow", async () => {
      // Focus the last chip first
      await userEvent.tab();
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{ArrowRight}");

      const lastChip = getByChipLabelText("last");
      expect(lastChip).toHaveFocus();

      // Move back to middle chip with left arrow
      await userEvent.keyboard("{ArrowLeft}");
      const middleChip = getByChipLabelText("middle");
      expect(middleChip).toHaveFocus();

      // Move back to first chip with left arrow
      await userEvent.keyboard("{ArrowLeft}");
      const firstChip = getByChipLabelText("first");
      expect(firstChip).toHaveFocus();
    });

    it("should not navigate past first chip with left arrow", async () => {
      // Focus the first chip
      const firstChip = getByChipLabelText("first");
      await userEvent.tab();
      expect(firstChip).toHaveFocus();

      // Try to go before first chip (should stay on first)
      await userEvent.keyboard("{ArrowLeft}");
      expect(firstChip).toHaveFocus();
    });

    it("should not navigate past Add button with right arrow", async () => {
      // Navigate to Add button
      await userEvent.tab();
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{ArrowRight}");

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toHaveFocus();

      // Try to go past Add button (should stay on Add)
      await userEvent.keyboard("{ArrowRight}");
      expect(addButton).toHaveFocus();
    });
  });

  describe("Focus Management When Deleting Chips", () => {
    describe("When clicking remove button", () => {
      it("should focus the previous chip when removing a non-first chip", async () => {
        render(<MultipleChipsComponent />);

        // Find the middle chip's remove button and click it
        const middleChip = getByChipLabelText("middle");
        const removeButton = getRemoveButton(middleChip);
        await userEvent.click(removeButton);

        // After deletion, the first chip should have focus
        await waitFor(() => {
          const firstChip = getByChipLabelText("first");
          expect(firstChip).toHaveFocus();
        });
      });

      it("should focus the next chip when removing the first chip", async () => {
        render(<MultipleChipsComponent />);

        // Find the first chip's remove button and click it
        const firstChip = getByChipLabelText("first");
        const removeButton = getRemoveButton(firstChip);
        await userEvent.click(removeButton);

        // After deletion, the new first chip (originally the "middle" chip) should have focus
        await waitFor(() => {
          const newFirstChip = getByChipLabelText("middle");
          expect(newFirstChip).toHaveFocus();
        });
      });

      it("should focus the Add button when removing the last remaining chip", async () => {
        render(<SingleChipComponent />);

        // Find the only chip's remove button and click it
        const onlyChip = getByChipLabelText("only");
        const removeButton = getRemoveButton(onlyChip);
        await userEvent.click(removeButton);

        // After deletion, the Add button should have focus
        await waitFor(() => {
          const addButton = screen.getByRole("button", { name: "Add" });
          expect(addButton).toHaveFocus();
        });
      });
    });

    describe("When using keyboard Delete/Backspace", () => {
      it("should focus the previous chip when deleting a non-first chip", async () => {
        render(<MultipleChipsComponent />);

        // Focus the last chip
        await userEvent.tab(); // Focus first chip
        await userEvent.keyboard("{ArrowRight}"); // Focus middle chip
        await userEvent.keyboard("{ArrowRight}"); // Focus last chip

        // Delete the last chip with Backspace
        await userEvent.keyboard("{Backspace}");

        // After deletion, the middle chip should have focus
        await waitFor(() => {
          const middleChip = getByChipLabelText("middle");
          expect(middleChip).toHaveFocus();
        });
      });

      it("should focus the next chip when deleting the first chip", async () => {
        render(<MultipleChipsComponent />);

        // Focus the first chip
        await userEvent.tab();

        // Delete the first chip with Delete key
        await userEvent.keyboard("{Delete}");

        // After deletion, the new first chip should have focus
        await waitFor(() => {
          const newFirstChip = getByChipLabelText("middle");
          expect(newFirstChip).toHaveFocus();
        });
      });

      it("should focus the Add button when deleting the last remaining chip", async () => {
        render(<SingleChipComponent />);

        // Focus the only chip
        await userEvent.tab();

        // Delete the only chip with Backspace
        await userEvent.keyboard("{Backspace}");

        // After deletion, the Add button should have focus
        await waitFor(() => {
          const addButton = screen.getByRole("button", { name: "Add" });
          expect(addButton).toHaveFocus();
        });
      });
    });
  });
});
