import React, { useState } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChipDismissible } from "..";
import { Chip } from "../..";

const mockIsInView = jest.fn(() => false);

jest.mock("../hooks/useInView", () => ({
  useInView: () => ({ isInView: mockIsInView() }),
}));

const handleChange = jest.fn(value => value);
const handleClickChip = jest.fn((_, value) => value);
const handleCustomAdd = jest.fn(value => value);
const handleSearch = jest.fn(value => value);
const handleLoadMore = jest.fn(value => value);

function getByChipLabelText(chipName: string) {
  return screen.getByLabelText(
    chipName + ". Press delete or backspace to remove " + chipName,
  );
}

describe("Basic interaction", () => {
  const chips = ["Amazing", "Fabulous", "Magical"];
  const selectedChips = ["Amazing"];

  beforeEach(async () => {
    render(
      <InternalChipDismissible
        selected={selectedChips}
        onChange={handleChange}
        onCustomAdd={handleCustomAdd}
        onClick={handleClickChip}
        onSearch={handleSearch}
        onLoadMore={handleLoadMore}
      >
        {chips.map(chip => (
          <Chip key={chip} label={chip} value={chip} />
        ))}
      </InternalChipDismissible>,
    );
  });

  it("should only render the selected chip on the UI", () => {
    const wrapperEl = screen.getByTestId("dismissible-chips");

    selectedChips.forEach(chip => {
      expect(within(wrapperEl).queryByText(chip)).toBeInTheDocument();
    });

    chips
      .filter(chip => !selectedChips.includes(chip))
      .forEach(chip => {
        expect(within(wrapperEl).queryByText(chip)).not.toBeInTheDocument();
      });
  });

  describe("Open Menu", () => {
    let wrapperEl: HTMLElement;

    beforeEach(async () => {
      await userEvent.click(screen.getByLabelText("Add"));
      wrapperEl = screen.getByTestId("chip-menu");
    });

    it("should not render the selected chips on the menu", () => {
      selectedChips.forEach(chip => {
        expect(within(wrapperEl).queryByText(chip)).not.toBeInTheDocument();
      });

      chips
        .filter(chip => !selectedChips.includes(chip))
        .forEach(chip => {
          expect(within(wrapperEl).queryByText(chip)).toBeInTheDocument();
        });
    });

    it("should trigger the onChange callback when you select from available options", async () => {
      const target = chips[chips.length - 1];
      await userEvent.click(screen.getByText(target));

      expect(handleChange).toHaveBeenCalledWith([...selectedChips, target]);
      expect(handleCustomAdd).not.toHaveBeenCalled();
    });

    it("should trigger the onSearch callback when you type on the input", async () => {
      const value = "🌮";
      await userEvent.type(screen.getByRole("combobox"), value);

      await waitFor(() => expect(handleSearch).toHaveBeenCalledWith(value));
    });

    it("should only trigger the onCustomAdd callback when you select the custom option", async () => {
      const value = "🌮";
      await userEvent.type(screen.getByRole("combobox"), value);

      await waitFor(async () => {
        await userEvent.click(screen.getByText(value));
        expect(handleCustomAdd).toHaveBeenCalledWith(value);
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    it("should not trigger the onLoadMore callback", () => {
      expect(handleLoadMore).not.toHaveBeenCalled();
    });

    describe("Load More", () => {
      beforeAll(() => {
        mockIsInView.mockReturnValueOnce(true);
      });

      it("should trigger the onLoadMore callback", () => {
        expect(handleLoadMore).toHaveBeenCalled();
      });
    });
  });

  it("should trigger the onClick callback when a chip gets clicked", async () => {
    await userEvent.click(getByChipLabelText(selectedChips[0]));
    expect(handleClickChip).toHaveBeenCalledWith(
      expect.any(Object),
      selectedChips[0],
    );
  });

  //
  it("should trigger the onChange callback when removing a chip", async () => {
    const wrapperEl = getByChipLabelText(selectedChips[0]);

    await userEvent.click(within(wrapperEl).getByTestId("remove-chip-button"));

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  describe("delete via keyboard", () => {
    beforeEach(async () => {
      const addButton = screen.getByRole("button", { name: "Add" });
      await userEvent.click(addButton);
    });

    it("should add the highlighted option on enter", async () => {
      await userEvent.keyboard("{Enter}");
      expect(handleChange).toHaveBeenCalledWith([...selectedChips, chips[1]]);
      expect(handleCustomAdd).not.toHaveBeenCalled();
    });

    it("should add the highlighted option on tab", async () => {
      await userEvent.tab();
      expect(handleChange).toHaveBeenCalledWith([...selectedChips, chips[1]]);
      expect(handleCustomAdd).not.toHaveBeenCalled();
    });

    it("should focus on the last selected chip on input backspace", async () => {
      await userEvent.keyboard("{Backspace}");
      const wrapperEl = getByChipLabelText(selectedChips[0]);
      expect(wrapperEl).toHaveFocus();
    });
  });

  describe("left and right arrow keys via keyboard", () => {
    it("should focus on the correct element when left or right arrow down", async () => {
      const chipWrappers = screen.getAllByTestId("ATL-InternalChip");
      const first = chipWrappers[0];

      await userEvent.tab();
      expect(first).toHaveFocus();

      await userEvent.keyboard("{ArrowRight}");
      expect(first).not.toHaveFocus();

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toHaveFocus();

      await userEvent.keyboard("{ArrowLeft}");
      expect(addButton).not.toHaveFocus();
      expect(first).toHaveFocus();
    });
  });
});

describe("Deleting a chip", () => {
  function MockChips() {
    const mockChips = ["chip", "chip2"];
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

  it("should focus on the next chip if the very first chip has focus", async () => {
    render(<MockChips />);

    const first = getByChipLabelText("chip");
    await userEvent.tab();
    expect(first).toHaveFocus();

    await userEvent.keyboard("{Backspace}");

    // After deletion, the second chip should have focus
    await waitFor(() => {
      const second = getByChipLabelText("chip2");
      expect(second).toHaveFocus();
    });
  });

  it("should focus on the previous chip if the not-first chip has focus", async () => {
    render(<MockChips />);

    // Focus the second chip
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    const second = getByChipLabelText("chip2");
    expect(second).toHaveFocus();

    await userEvent.keyboard("{Backspace}");

    // After deletion, the first chip should have focus
    await waitFor(() => {
      const first = getByChipLabelText("chip");
      expect(first).toHaveFocus();
    });
  });

  it("should focus on the Add button when the last chip is removed", async () => {
    function SingleChipMock() {
      const mockChips = ["chip"];
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

    render(<SingleChipMock />);

    // Focus the only chip
    await userEvent.tab();
    const onlyChip = getByChipLabelText("chip");
    expect(onlyChip).toHaveFocus();

    // Delete the only chip
    await userEvent.keyboard("{Delete}");

    // After deletion, the Add button should have focus
    await waitFor(() => {
      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toHaveFocus();
    });
  });
});
