import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Combobox } from "./Combobox";
import { ComboboxOption } from "./Combobox.types";
import { COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE } from "./hooks/useComboboxValidation";
import { Button } from "../Button";

// jsdom is missing this implementation
const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const MENU_TEST_ID = "ATL-Combobox-Content";
const OVERLAY_TEST_ID = "ATL-Combobox-Overlay";

const activatorLabel = "Select a Baggins";
const handleAction = jest.fn();
const handleSelect = jest.fn();
const mockSelectedValue = jest.fn<ComboboxOption[], []>().mockReturnValue([]);
const mockMultiSelectValue = jest.fn().mockReturnValue(false);

afterEach(() => {
  handleAction.mockClear();
  handleSelect.mockClear();
});

describe("Combobox", () => {
  beforeEach(renderCombobox);

  it("should render with the default activator with the closed menu", () => {
    expect(screen.getByText(activatorLabel)).toBeInTheDocument();
    expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");
  });

  describe("Menu", () => {
    beforeEach(async () => {
      await userEvent.click(screen.getByRole("combobox"));
    });

    it("should open the menu", async () => {
      expect(screen.getByTestId(MENU_TEST_ID)).not.toHaveClass("hidden");
    });

    it("should have the options and actions", () => {
      expect(screen.getAllByRole("option")).toHaveLength(2);
      expect(screen.getByText("Add Teammate")).toBeInTheDocument();
    });

    it("should close the menu when clicking the activator", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");
    });

    it("should close the menu when clicking outside the menu (which clicks the overlay)", async () => {
      await userEvent.click(screen.getByTestId(OVERLAY_TEST_ID));
      expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");
    });

    it("should close the menu when pressing the ESC key", async () => {
      await userEvent.type(document.body, "{Escape}");
      expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");
    });

    it("should close the menu when clicking an option", async () => {
      await userEvent.click(screen.getByText("Bilbo Baggins"));
      expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");
    });

    it("should not close the menu when clicking an action", async () => {
      await userEvent.click(screen.getByText("Add Teammate"));
      expect(screen.getByTestId(MENU_TEST_ID)).not.toHaveClass("hidden");
    });
  });

  describe("Search", () => {
    it("should have a search input", () => {
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    });

    it("should refine results after entering a search term", async () => {
      await userEvent.type(screen.getByPlaceholderText("Search"), "Bilbo");
      expect(screen.getAllByRole("option")).toHaveLength(1);
      expect(screen.getByText("Bilbo Baggins")).toBeInTheDocument();
    });

    it("should clear the search when clicking the clear button after entering a term", async () => {
      await userEvent.type(screen.getByPlaceholderText("Search"), "Bilbo");
      await userEvent.click(
        screen.getByTestId("ATL-Combobox-Content-Search-Clear"),
      );
      expect(screen.getAllByRole("option")).toHaveLength(2);
      expect(screen.getByPlaceholderText("Search")).toHaveValue("");
    });

    it("should clear the search when activating the clear button with keyboard", async () => {
      await userEvent.type(screen.getByPlaceholderText("Search"), "Bilbo");
      await userEvent.tab();
      await userEvent.keyboard("{enter}");
      expect(screen.getAllByRole("option")).toHaveLength(2);
      expect(screen.getByPlaceholderText("Search")).toHaveValue("");
    });
  });

  describe("Keyboard actions", () => {
    it("should focus the first option when pressing the down arrow", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.keyboard("{arrowdown}");
      expect(screen.getByText("Bilbo Baggins")).toHaveFocus();
    });

    it("should focus the last option with excessive down arrow presses", async () => {
      // excessive in this context simply means more arrow down presses
      // than there are options
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.keyboard("{arrowdown}");
      await userEvent.keyboard("{arrowdown}");
      await userEvent.keyboard("{arrowdown}");
      await userEvent.keyboard("{arrowdown}");
      await userEvent.keyboard("{arrowdown}");
      expect(screen.getByText("Frodo Baggins")).toHaveFocus();
    });

    it("should focus the first option with up arrow key press", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.keyboard("{arrowup}");
      expect(screen.getByText("Bilbo Baggins")).toHaveFocus();
    });

    it("should fire the onSelect callback when pressing the enter key", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.keyboard("{arrowdown}");
      await userEvent.keyboard("{enter}");
      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledWith([
        { id: "1", label: "Bilbo Baggins" },
      ]);
    });

    it("should focus first of filtered options when pressing the down arrow after searching", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.type(screen.getByPlaceholderText("Search"), "Frodo");
      await userEvent.keyboard("{arrowdown}");
      expect(screen.getByText("Frodo Baggins")).toHaveFocus();
    });
  });

  it("should fire the onClick of an action when clicking an action", async () => {
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Add Teammate"));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("should fire the onSelect when clicking an option", async () => {
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Bilbo Baggins"));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith([
      { id: "1", label: "Bilbo Baggins" },
    ]);
  });
});

describe("Combobox Single Select", () => {
  const selectedValue = { id: "1", label: "Bilbo Baggins" };
  beforeEach(() => {
    mockSelectedValue.mockReturnValueOnce([selectedValue]);
    renderCombobox();
  });

  it("should not show the heading when there's a selection", () => {
    expect(screen.queryByText(activatorLabel)).not.toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: selectedValue.label }),
    ).toBeInTheDocument();
  });

  it("should fire the onSelect with the new option", async () => {
    await userEvent.click(screen.getByText("Frodo Baggins"));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith([
      { id: "2", label: "Frodo Baggins" },
    ]);
  });
});

describe("Combobox Multiselect", () => {
  it("should not close the menu when selecting the value", async () => {
    renderMultiSelectCombobox();

    expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByTestId(MENU_TEST_ID)).not.toHaveClass("hidden");

    await userEvent.click(screen.getByText("Bilbo Baggins"));
    expect(screen.getByTestId(MENU_TEST_ID)).not.toHaveClass("hidden");
  });

  it("should show both the header and the selected values in the activator", async () => {
    mockSelectedValue.mockReturnValueOnce([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
    renderMultiSelectCombobox();

    expect(screen.getByText(activatorLabel)).toBeInTheDocument();
    expect(
      screen.getByText("Bilbo Baggins, Frodo Baggins"),
    ).toBeInTheDocument();
  });

  it("should allow for multiple selections to be made", async () => {
    mockSelectedValue.mockReturnValueOnce([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
    renderMultiSelectCombobox();

    expect(screen.getByText(activatorLabel)).toBeInTheDocument();
    expect(screen.getByText("Bilbo Baggins")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Frodo Baggins")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("should call the onSelect callback with the new addition", async () => {
    mockSelectedValue.mockReturnValueOnce([
      { id: "1", label: "Bilbo Baggins" },
    ]);
    renderMultiSelectCombobox();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Frodo Baggins"));

    expect(handleSelect).toHaveBeenCalledWith([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
  });

  it("should call the onSelect callback with the removal", async () => {
    mockSelectedValue.mockReturnValueOnce([
      { id: "1", label: "Bilbo Baggins" },
    ]);
    renderMultiSelectCombobox();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(
      screen.getByRole("option", { name: "Bilbo Baggins" }),
    );

    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  it("should not clear search after making a selection", async () => {
    renderMultiSelectCombobox();
    const searchInput = screen.getByPlaceholderText("Search");

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(searchInput, "Bilbo");
    await userEvent.click(screen.getByText("Bilbo Baggins"));

    expect(searchInput).toHaveValue("Bilbo");
  });

  it("should select all options when clicking Select all", async () => {
    renderMultiSelectCombobox();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Select all"));

    expect(handleSelect).toHaveBeenCalledWith([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
  });

  it("should contextually select all matching options when clicking Select all after searching", async () => {
    mockSelectedValue.mockReturnValueOnce([]);
    renderMultiSelectCombobox();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByPlaceholderText("Search"), "Bilbo");
    await userEvent.click(screen.getByText("Select all"));

    expect(handleSelect).toHaveBeenCalledWith([
      { id: "1", label: "Bilbo Baggins" },
    ]);
  });

  it("should clear all options when clicking Clear", async () => {
    mockSelectedValue.mockReturnValueOnce([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
    renderMultiSelectCombobox();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Clear"));

    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  it("should NOT contextually clear all selections when clicking Clear after searching", async () => {
    mockSelectedValue.mockReturnValueOnce([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
    renderMultiSelectCombobox();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByPlaceholderText("Search"), "Bilbo");
    await userEvent.click(screen.getByText("Clear"));

    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  describe("onClose callback", () => {
    const handleClose = jest.fn();

    beforeEach(() => {
      handleClose.mockClear();

      render(
        <Combobox
          label={activatorLabel}
          multiSelect={true}
          selected={[]}
          onSelect={handleSelect}
          onClose={handleClose}
        >
          <Combobox.Option id="1" label="Bilbo Baggins" />
          <Combobox.Option id="2" label="Frodo Baggins" />
          <Combobox.Action label="Add Teammate" onClick={handleAction} />
        </Combobox>,
      );
    });

    it("should call onClose when the content is closed", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.click(screen.getByTestId(OVERLAY_TEST_ID));

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Combobox Compound Component Validation", () => {
  it("renders without error if the correct count and composition of elements are present", () => {
    expect(renderCombobox).not.toThrow();
  });

  it("renders without error when there is a ComboboxActivator", () => {
    expect(() =>
      render(
        <Combobox label={activatorLabel} selected={[]} onSelect={jest.fn()}>
          <Combobox.Activator>
            <Button label="Click me" />
          </Combobox.Activator>
        </Combobox>,
      ),
    ).not.toThrow();
  });

  it("throws an error when there are multiple Combobox Activators present", () => {
    expect(() =>
      render(
        <Combobox label={activatorLabel} selected={[]} onSelect={jest.fn()}>
          <Combobox.Activator>
            <Button label="Click me" />
          </Combobox.Activator>
          <Combobox.Activator>
            <Button label="No Click me" />
          </Combobox.Activator>
        </Combobox>,
      ),
    ).toThrow(COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);
  });
});

function renderCombobox() {
  return render(
    <Combobox
      label={activatorLabel}
      multiSelect={mockMultiSelectValue()}
      selected={mockSelectedValue()}
      onSelect={handleSelect}
    >
      <Combobox.Option id="1" label="Bilbo Baggins" />
      <Combobox.Option id="2" label="Frodo Baggins" />
      <Combobox.Action label="Add Teammate" onClick={handleAction} />
    </Combobox>,
  );
}

function renderMultiSelectCombobox() {
  mockMultiSelectValue.mockReturnValueOnce(true);

  return renderCombobox();
}
