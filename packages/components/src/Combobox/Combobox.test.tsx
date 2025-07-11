import React, { useEffect, useState } from "react";
import { act, render, screen } from "@testing-library/react";
import { UserEvent, userEvent } from "@testing-library/user-event";
import { mockIntersectionObserver } from "jsdom-testing-mocks";
import { Combobox } from "./Combobox";
import { ComboboxOption } from "./Combobox.types";
import * as POM from "./Combobox.pom";
import { Button } from "../Button";

// jsdom is missing this implementation
const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const MENU_TEST_ID = "ATL-Combobox-Content";
const OVERLAY_TEST_ID = "ATL-Combobox-Overlay";

const activatorLabel = "Select a Baggins";
const handleAction = jest.fn();
const handleSelect = jest.fn();
const handleSelectAll = jest.fn();
const handleClear = jest.fn();
const mockSelectedValue = jest.fn<ComboboxOption[], []>().mockReturnValue([]);
const mockMultiSelectValue = jest.fn().mockReturnValue(false);
const mockOnSearch = jest.fn();
const observer = mockIntersectionObserver();

let user: UserEvent;

afterEach(() => {
  handleAction.mockClear();
  handleSelect.mockClear();
  handleSelectAll.mockClear();
  handleClear.mockClear();
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

    it("should close the menu when clicking an action", async () => {
      await userEvent.click(screen.getByText("Add Teammate"));
      expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");
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
      expect(POM.getOption("Bilbo Baggins")).toHaveFocus();
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
      expect(POM.getOption("Frodo Baggins")).toHaveFocus();
    });

    it("should focus the first option with up arrow key press", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      await userEvent.keyboard("{arrowup}");
      expect(POM.getOption("Bilbo Baggins")).toHaveFocus();
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
      expect(POM.getOption("Frodo Baggins")).toHaveFocus();
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
  describe("when there is a selection", () => {
    const selectedValue = { id: "1", label: "Bilbo Baggins" };
    beforeEach(() => {
      mockSelectedValue.mockReturnValueOnce([selectedValue]);
      renderCombobox();
    });
    it("should show the label", () => {
      expect(screen.getByText(activatorLabel)).toBeInTheDocument();
      expect(
        screen.getByRole("combobox", { name: activatorLabel }),
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

  describe("when there is no selection", () => {
    beforeEach(() => {
      mockSelectedValue.mockReturnValueOnce([]);
      renderCombobox();
    });

    it("should show the label", () => {
      expect(screen.getByText(activatorLabel)).toBeInTheDocument();
    });

    it("should fire the onSelect with the new option", async () => {
      await userEvent.click(screen.getByText("Frodo Baggins"));

      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledWith([
        { id: "2", label: "Frodo Baggins" },
      ]);
    });
  });
});

describe("Actions", () => {
  it("should show the action when there is a search value", async () => {
    renderCombobox();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByPlaceholderText("Search"), "Bilbo");

    const action = screen.getByText("Add Bilbo");
    expect(action).toBeInTheDocument();
    await userEvent.click(action);
    expect(handleAction).toHaveBeenCalledWith(expect.anything(), {
      searchValue: "Bilbo",
    });
  });

  it("should not show the action when there is no search value", async () => {
    renderCombobox();

    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.queryByText("Add Bilbo")).not.toBeInTheDocument();
    expect(screen.queryByText("Add ")).not.toBeInTheDocument();
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
    expect(POM.getOption("Bilbo Baggins")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(POM.getOption("Frodo Baggins")).toHaveAttribute(
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

  it("should call onSelectAll when clicking Select all", async () => {
    render(
      <Combobox
        label={activatorLabel}
        multiSelect={true}
        selected={[]}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onClear={handleClear}
      >
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
      </Combobox>,
    );

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Select all"));

    expect(handleSelectAll).toHaveBeenCalledTimes(1);
    expect(handleSelectAll).toHaveBeenCalledWith([
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
    ]);
  });

  it("should call onClear when clicking Clear", async () => {
    render(
      <Combobox
        label={activatorLabel}
        multiSelect={true}
        selected={[
          { id: "1", label: "Bilbo Baggins" },
          { id: "2", label: "Frodo Baggins" },
        ]}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onClear={handleClear}
      >
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
      </Combobox>,
    );

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Clear"));

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
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
        onSearch={mockOnSearch}
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

  it("should call onSearch with correct params when closing", async () => {
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByTestId(OVERLAY_TEST_ID));
    expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");

    expect(mockOnSearch).toHaveBeenCalledWith("");
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
});

describe("Combobox Custom onSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    mockOnSearch.mockClear();
  });
  it("should only call the debounced onSearch one, with the correct value", async () => {
    renderCustomOnSearchCombobox(false);

    await user.type(screen.getByPlaceholderText("Search"), "V");
    await user.type(screen.getByPlaceholderText("Search"), "a");
    await user.type(screen.getByPlaceholderText("Search"), "l");

    jest.advanceTimersByTime(200);
    expect(mockOnSearch).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("Val");
  });

  it("should call the debounced onSearch with an empty string when cleared with the clear button", async () => {
    renderCustomOnSearchCombobox(false);

    await user.type(screen.getByPlaceholderText("Search"), "Val");
    jest.advanceTimersByTime(300);
    expect(mockOnSearch).toHaveBeenLastCalledWith("Val");
    await user.click(screen.getByTestId("ATL-Combobox-Content-Search-Clear"));
    jest.advanceTimersByTime(300);

    expect(mockOnSearch).toHaveBeenLastCalledWith("");
  });

  it("should not have option filtering behavior out of the box like the non custom onSearch version", async () => {
    renderCustomOnSearchCombobox(false);

    await user.type(screen.getByPlaceholderText("Search"), "Value 1");
    jest.advanceTimersByTime(300);

    expect(screen.queryByText("API Value 1")).toBeInTheDocument();
    expect(screen.queryByText("API Value 2")).toBeInTheDocument();
  });

  it("should show the correct number of loading glimmers if loading is true and options don't exist", () => {
    renderCustomOnSearchCombobox(true, true);

    expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    expect(screen.queryByText("No options yet")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("ATL-Glimmer")).toHaveLength(5);
  });

  it("should show the loading indicator when loading is true and options exist", () => {
    renderCustomOnSearchCombobox(true);

    expect(screen.getByLabelText("loading")).toBeInTheDocument();
    expect(screen.queryAllByTestId("ATL-Glimmer")).toHaveLength(0);
  });

  it("should not show the loading indicator when loading is false", () => {
    renderCustomOnSearchCombobox(false);

    expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    expect(screen.queryAllByTestId("ATL-Glimmer")).toHaveLength(0);
  });

  it("should show the correct message when searching, and no options present", async () => {
    renderCustomOnSearchCombobox(false, true);

    await user.type(screen.getByPlaceholderText("Search"), "Value 4");
    jest.advanceTimersByTime(300);

    // heads up these quotes are tricky and cause the test to not pass if they don't match exactly
    expect(screen.getByText("No results for “Value 4”")).toBeInTheDocument();
  });

  it("should show the correct message when no options present, not loading and not searching", () => {
    renderCustomOnSearchCombobox(false, true);

    expect(screen.getByText("No options yet")).toBeInTheDocument();
  });
});

describe("Combobox option reactiveness", () => {
  it("should render the correct options when they instantly change", async () => {
    render(<ImmediatelyAlteredOptionCombobox />);
    expect(screen.getByText("Bilbo Baggins")).toBeInTheDocument();
    expect(screen.getByText("Frodo Baggins")).toBeInTheDocument();
    expect(screen.getByText("Pippin Took")).toBeInTheDocument();
    expect(screen.getByText("Meriadoc Brandybuck")).toBeInTheDocument();
  });
});

describe("Infinite scroll", () => {
  it("should trigger the load more callback at the bottom of the list if a callback is provided", async () => {
    const mockLoadMore = jest.fn();
    renderInfiniteScrollCombobox(mockLoadMore);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Bilbo Baggins")).toBeInTheDocument();
    const loadMoreTrigger = screen.getByTestId("ATL-Combobox-Loadmore-Trigger");
    expect(loadMoreTrigger).toBeInTheDocument();
    act(() => {
      observer.enterNode(loadMoreTrigger);
    });
    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });
});

describe("ComboboxOption onClick", () => {
  const handleOptionClick = jest.fn();

  beforeEach(() => {
    handleOptionClick.mockClear();
  });

  it("should call onClick when an option is clicked", async () => {
    render(
      <Combobox label={activatorLabel} selected={[]} onSelect={handleSelect}>
        <Combobox.Option
          id="1"
          label="Bilbo Baggins"
          onClick={handleOptionClick}
        />
        <Combobox.Option id="2" label="Frodo Baggins" />
      </Combobox>,
    );

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Bilbo Baggins"));

    expect(handleOptionClick).toHaveBeenCalledTimes(1);
    expect(handleOptionClick).toHaveBeenCalledWith({
      id: "1",
      label: "Bilbo Baggins",
      prefix: undefined,
      customRender: undefined,
      onClick: handleOptionClick,
    });
  });
});

function renderCustomOnSearchCombobox(
  loading: boolean,
  renderWithoutOptions = false,
) {
  const options = renderWithoutOptions
    ? []
    : [
        { id: "1", label: "API Value 1" },
        { id: "2", label: "API Value 2" },
      ];

  return render(
    <Combobox
      multiSelect
      selected={mockSelectedValue()}
      onSelect={handleSelect}
      onSearch={mockOnSearch}
      loading={loading}
    >
      {options.map(option => (
        <Combobox.Option id={option.id} label={option.label} key={option.id} />
      ))}
    </Combobox>,
  );
}

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
      <Combobox.Action
        visible={({ searchValue }) => Boolean(searchValue)}
        label={({ searchValue }) => `Add ${searchValue}`}
        onClick={handleAction}
      />
    </Combobox>,
  );
}

function renderInfiniteScrollCombobox(loadMoreCallback?: () => void) {
  return render(
    <Combobox
      label={activatorLabel}
      selected={mockSelectedValue()}
      onSelect={handleSelect}
      onLoadMore={loadMoreCallback}
    >
      <Combobox.Option id="1" label="Bilbo Baggins" />
      <Combobox.Option id="2" label="Frodo Baggins" />
    </Combobox>,
  );
}

function renderMultiSelectCombobox() {
  mockMultiSelectValue.mockReturnValueOnce(true);

  return renderCombobox();
}

function ImmediatelyAlteredOptionCombobox() {
  const firstOptions = [
    {
      id: "1",
      label: "Bilbo Baggins",
    },
    {
      id: "2",
      label: "Frodo Baggins",
    },
  ];
  const secondOptions = [
    {
      id: "3",
      label: "Pippin Took",
    },
    {
      id: "4",
      label: "Meriadoc Brandybuck",
    },
  ];
  const [options, setOptions] = useState(firstOptions);

  useEffect(() => {
    setOptions([...firstOptions, ...secondOptions]);
  }, []);

  return (
    <Combobox
      label={activatorLabel}
      multiSelect={true}
      selected={mockSelectedValue()}
      onSelect={handleSelect}
    >
      {options.map(option => (
        <Combobox.Option id={option.id} label={option.label} key={option.id} />
      ))}
    </Combobox>
  );
}
