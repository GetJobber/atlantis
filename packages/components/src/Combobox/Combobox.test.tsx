import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Combobox } from "./Combobox";
import { ComboboxOption } from "./Combobox.types";
import {
  COMBOBOX_OPTION_AND_CONTENT_EXISTS_ERROR,
  COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE,
} from "./hooks/useComboboxValidation";
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
      await userEvent.click(screen.getByText(activatorLabel));
    });

    it("should open the menu", async () => {
      expect(screen.getByTestId(MENU_TEST_ID)).not.toHaveClass("hidden");
    });

    it("should have the options and actions", () => {
      expect(screen.getAllByRole("option")).toHaveLength(2);
      expect(screen.getByText("Add Teammate")).toBeInTheDocument();
    });

    it("should close the menu when clicking the activator", async () => {
      await userEvent.click(screen.getByText(activatorLabel));
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

  it("should fire the onClick of an action when clicking an action", async () => {
    await userEvent.click(screen.getByText(activatorLabel));
    await userEvent.click(screen.getByText("Add Teammate"));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("should fire the onSelect when clicking an option", async () => {
    await userEvent.click(screen.getByText(activatorLabel));
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

  it("should not show the label when there's a selection", () => {
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

    await userEvent.click(screen.getByText(activatorLabel));
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

    await userEvent.click(screen.getByText(activatorLabel));
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

    await userEvent.click(screen.getByText(activatorLabel));
    await userEvent.click(
      screen.getByRole("option", { name: "Bilbo Baggins" }),
    );

    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  it("should not clear search after making a selection", async () => {
    renderMultiSelectCombobox();
    const searchInput = screen.getByPlaceholderText("Search");

    await userEvent.click(screen.getByText(activatorLabel));
    await userEvent.type(searchInput, "Bilbo");
    await userEvent.click(screen.getByText("Bilbo Baggins"));

    expect(searchInput).toHaveValue("Bilbo");
  });

  it("should select all options when clicking Select all", async () => {
    renderMultiSelectCombobox();

    await userEvent.click(screen.getByText(activatorLabel));
    await userEvent.click(screen.getByText("Select all"));

    expect(handleSelect).toHaveBeenCalledWith([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
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
          onClose={handleClose}
        >
          <Combobox.Option id="1" label="Bilbo Baggins" />
          <Combobox.Option id="2" label="Frodo Baggins" />
          <Combobox.Action label="Add Teammate" onClick={handleAction} />
        </Combobox>,
      );
    });

    it("should call onClose with selections when the content is closed", async () => {
      await userEvent.click(screen.getByText(activatorLabel));
      await userEvent.click(screen.getByText("Bilbo Baggins"));
      await userEvent.click(screen.getByText("Frodo Baggins"));
      await userEvent.click(screen.getByTestId(OVERLAY_TEST_ID));

      // This should be 1. If this errors out and expects the value to be 1,
      // then you've fixed the bug! Please to change the value to 1.
      expect(handleClose).toHaveBeenCalledTimes(2);
      expect(handleClose).toHaveBeenCalledWith([
        { id: "1", label: "Bilbo Baggins" },
        { id: "2", label: "Frodo Baggins" },
      ]);
    });

    it("should not update consumer as selections are made", async () => {
      await userEvent.click(screen.getByText(activatorLabel));
      await userEvent.click(screen.getByText("Bilbo Baggins"));
      await userEvent.click(screen.getByText("Frodo Baggins"));

      // This should be 0. If this errors out and expects the value to be 0,
      // then you've fixed the bug! Please to change to .not.toHaveBeenCalled()
      expect(handleClose).toHaveBeenCalledTimes(1);
      expect(
        screen.queryByText("Bilbo Baggins, Frodo Baggins"),
      ).not.toBeInTheDocument();
    });

    it("should not update consumer as selections are made by clicking Select all", async () => {
      await userEvent.click(screen.getByText(activatorLabel));
      await userEvent.click(screen.getByText("Select all"));

      expect(handleSelect).not.toHaveBeenCalled();
      expect(
        screen.queryByText("Bilbo Baggins, Frodo Baggins"),
      ).not.toBeInTheDocument();
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

  it("should throw an error if there is a Trigger element and a Combobox.Activator", () => {
    expect(() =>
      render(
        <Combobox label={activatorLabel} selected={[]} onSelect={jest.fn()}>
          <Combobox.Activator>
            <Button label="Click me" />
          </Combobox.Activator>
          <Combobox.TriggerButton label="Heyoo" />
        </Combobox>,
      ),
    ).toThrow(COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);
  });

  it("should throw an error when Option/Action and Content all exist as siblings", () => {
    expect(() =>
      render(
        <Combobox label={activatorLabel}>
          <Combobox.Content options={[]} onSelect={jest.fn()} selected={[]} />

          <Combobox.Option id="1" label="Option 1" />
          <Combobox.Option id="2" label="Option 2" />
          <Combobox.Action label="Action 1" onClick={jest.fn()} />
        </Combobox>,
      ),
    ).toThrow(COMBOBOX_OPTION_AND_CONTENT_EXISTS_ERROR);
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
