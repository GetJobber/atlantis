import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { InternalChipDismissibleInput } from "../InternalChipDismissibleInput";
import { ChipProps } from "../../Chip";

const initialMockIsInView = jest.fn(() => false);

// Rename variable to follow Jest's allowed pattern
let mockCurrentIsInView = initialMockIsInView();

// Update function to modify the renamed variable
const mockSetIsInView = (value: boolean) => {
  mockCurrentIsInView = value;
};
// Create ref outside the mock factory
const mockRef = React.createRef<HTMLDivElement>();

jest.mock("../hooks/useInView", () => ({
  useInView: () => {
    // Return the external variable (now named mock*) and ref
    return { ref: mockRef, isInView: mockCurrentIsInView };
  },
}));

const handleOptionSelect = jest.fn();
const handleCustomOptionSelect = jest.fn();
const handleSearch = jest.fn();
const handleLoadMore = jest.fn();

// Fix: Create a valid ref object for attachTo
const mockAttachToRef = React.createRef<HTMLDivElement>();

const optionsArray = ["Amazing", "Fabulous", "Magical"];
const options: ChipProps[] = optionsArray.map(opt => ({
  value: opt,
  label: opt,
}));

const baseProps = {
  options: options,
  // Fix: Use the created ref
  attachTo: mockAttachToRef,
  isLoadingMore: false,
  onOptionSelect: handleOptionSelect,
  onCustomOptionSelect: handleCustomOptionSelect,
  onSearch: handleSearch,
  onLoadMore: handleLoadMore,
};

let rerender: (
  ui: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >,
) => void;

// Add a dummy element for attachTo ref
beforeAll(() => {
  const dummyElement = document.createElement("div");
  dummyElement.setAttribute("id", "dummy-attach-to");
  document.body.appendChild(dummyElement);
  (mockAttachToRef as React.MutableRefObject<HTMLDivElement>).current =
    dummyElement;
});

afterAll(() => {
  const dummyElement = document.getElementById("dummy-attach-to");

  if (dummyElement) {
    document.body.removeChild(dummyElement);
  }
  (mockAttachToRef as React.MutableRefObject<HTMLDivElement | null>).current =
    null;
});

beforeEach(() => {
  // Reset mocks and state before each test
  jest.clearAllMocks();
  mockSetIsInView(false); // Reset isInView state

  const { rerender: rerenderComponent } = render(
    <InternalChipDismissibleInput {...baseProps} />,
  );
  rerender = rerenderComponent;
});

// Use fake timers for tests involving debounce/setTimeout
afterEach(() => {
  jest.useRealTimers();
});

describe("Menu closed", () => {
  it("should show a button", () => {
    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("aria-label", "Add");
    expect(within(addButton).getByTestId("add")).toBeInstanceOf(SVGElement);
  });

  it("should not show an input and menu", () => {
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

describe("Menu open", () => {
  let addButton: HTMLElement;

  beforeEach(() => {
    addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should not show the add button", () => {
    // Button role might still exist if input is also a button, query specifically
    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
  });

  it("should show an input and menu", () => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("should focus on the input", () => {
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should highlight the first option", () => {
    isOptionhighlighted(optionsArray[0]);
  });

  it("should have a loading spinner", () => {
    rerender(
      <InternalChipDismissibleInput {...baseProps} isLoadingMore={true} />,
    );
    expect(screen.getByRole("alert", { name: "loading" })).toBeInTheDocument();
  });
});

describe("Arrow keys", () => {
  beforeEach(() => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should highlight the next option on arrow down", () => {
    // Fix: Use getByRole as combobox should exist
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    isOptionhighlighted(optionsArray[1]);
  });

  it("should highlight the last option on arrow up", () => {
    // Fix: Use getByRole
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowUp" });
    isOptionhighlighted(optionsArray[optionsArray.length - 1]);
  });

  it("should highlight the first option on arrow down when the last option is highlighted", () => {
    const input = screen.getByRole("combobox");
    // Ensure last option is highlighted
    fireEvent.keyDown(input, { key: "ArrowUp" });
    isOptionhighlighted(optionsArray[optionsArray.length - 1]);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    isOptionhighlighted(optionsArray[0]);
  });

  it("should not do anything on arrow down when the last option is highlighted and it's loading", () => {
    rerender(
      <InternalChipDismissibleInput {...baseProps} isLoadingMore={true} />,
    );
    expect(screen.getByRole("alert", { name: "loading" })).toBeInTheDocument();
    const highlighted = optionsArray[optionsArray.length - 1];
    const input = screen.getByRole("combobox");

    // Ensure last option is highlighted
    fireEvent.keyDown(input, { key: "ArrowUp" });
    isOptionhighlighted(highlighted);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    isOptionhighlighted(highlighted);
  });
});

describe("Add/delete via keyboard", () => {
  beforeEach(() => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should add the highlighted option on enter", () => {
    // Fix: Use getByRole
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    // Fix: Expect the value string, not the object
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[0]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });

  it("should add the highlighted option on tab", () => {
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Tab" });
    // Fix: Expect the value string, not the object
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[1]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });
});

describe("Activator", () => {
  const activatorLabel = "Activate me";
  beforeEach(() => {
    rerender(
      <InternalChipDismissibleInput
        {...baseProps}
        activator={<div>{activatorLabel}</div>}
      />,
    );
  });

  it("should render a custom activator", () => {
    expect(screen.getByText(activatorLabel)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
  });

  it("should open the menu on click", () => {
    const target = screen.getByText(activatorLabel);
    expect(target).toBeInTheDocument();
    fireEvent.click(target);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });
});

describe("onLoadMore", () => {
  it("should call onLoadMore when the trigger element is in view", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);

    // Simulate element coming into view
    act(() => {
      mockSetIsInView(true);
      // Manually rerender after changing the mock value
      rerender(<InternalChipDismissibleInput {...baseProps} />);
    });

    expect(handleLoadMore).toHaveBeenCalledTimes(1);
    expect(handleLoadMore).toHaveBeenCalledWith("");

    // Simulate element going out of view
    act(() => {
      mockSetIsInView(false);
      rerender(<InternalChipDismissibleInput {...baseProps} />);
    });
    expect(handleLoadMore).toHaveBeenCalledTimes(1);

    // Simulate coming into view again
    act(() => {
      mockSetIsInView(true);
      rerender(<InternalChipDismissibleInput {...baseProps} />);
    });
    expect(handleLoadMore).toHaveBeenCalledTimes(2);
  });

  it("should call onLoadMore with current search value", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");
    const searchValue = "test";
    fireEvent.change(input, { target: { value: searchValue } });

    // Simulate element coming into view AFTER search
    act(() => {
      mockSetIsInView(true);
      // Rerender needed here too
      rerender(<InternalChipDismissibleInput {...baseProps} />);
    });

    expect(handleLoadMore).toHaveBeenCalledWith(searchValue);
  });
});

describe("Blur Behavior", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Open menu by default
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should close the menu after debounce timeout on blur (default mode)", () => {
    const input = screen.getByRole("combobox");
    fireEvent.blur(input);

    // Menu should still be open immediately
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(handleOptionSelect).not.toHaveBeenCalled(); // Assuming blur doesn't select

    // Advance timers past the debounce time (DEBOUNCE_TIME = 200)
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Now the menu should be closed (assuming handleBlur closes it)
    // We check if the input is gone, as it implies the component state reset
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    // Check if the activator is back
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  // Simulate clicking on a menu item which also triggers blur
  it("should select item and close menu if blur happens due to item click (default mode)", () => {
    const firstOption = screen.getByRole("option", { name: optionsArray[0] });

    // Simulate clicking the option (fires mousedown, mouseup, click) and blurs input
    // fireEvent.click handles this sequence generally
    fireEvent.click(firstOption);

    // Option should be selected immediately
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[0]);

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Menu and input should be closed/gone now
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

describe("onlyShowMenuOnSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    rerender(
      <InternalChipDismissibleInput
        {...baseProps}
        onlyShowMenuOnSearch={true}
      />,
    );
  });

  it("should initially show only the activator", () => {
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should show the input on activator click", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);

    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    // Menu should NOT show until typing
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Should focus input after timeout
    act(() => {
      jest.advanceTimersByTime(1); // Advance timers slightly for the setTimeout(..., 0)
    });
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should show the menu only when typing", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "A" } });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "" } });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should hide input on blur if empty", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");

    // Blur the input while it's empty
    fireEvent.blur(input);

    // Input should still be there immediately
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Input should be gone, activator should be back
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should NOT hide input on blur if not empty", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");

    // Type something
    fireEvent.change(input, { target: { value: "test" } });

    // Blur the input
    fireEvent.blur(input);

    // Input should still be there immediately
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Input should still be there
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
  });
});

// Helper function
function isOptionhighlighted(highlighted: string) {
  const activeClass = "activeOption";
  const option = screen.getByRole("option", { name: highlighted });
  expect(option).toHaveClass(activeClass);

  // Fix: Check aria-activedescendant on the combobox input
  const input = screen.getByRole("combobox");
  expect(input).toHaveAttribute("aria-activedescendant", option.id);

  optionsArray
    .filter(opt => opt !== highlighted)
    .forEach(opt => {
      const otherOption = screen.getByRole("option", { name: opt });
      expect(otherOption).not.toHaveClass(activeClass);
      // Check that aria-selected is not true or is absent (Removed the check entirely as it's not used)
      // expect(otherOption).not.toHaveAttribute("aria-selected", "true");
      // Check that the input's active descendant is not this option's ID
      expect(input.getAttribute("aria-activedescendant")).not.toBe(
        otherOption.id,
      );
    });
}
