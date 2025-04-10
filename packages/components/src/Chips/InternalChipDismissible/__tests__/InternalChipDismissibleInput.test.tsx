import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { InternalChipDismissibleInput } from "../InternalChipDismissibleInput";
import { ChipProps } from "../../Chip";

let mockCurrentIsInView = false;

const mockSetIsInView = (value: boolean) => {
  mockCurrentIsInView = value;
};

jest.mock("../hooks/useInView", () => ({
  useInView: () => {
    return { isInView: mockCurrentIsInView };
  },
}));

const handleOptionSelect = jest.fn();
const handleCustomOptionSelect = jest.fn();
const handleSearch = jest.fn();
const handleLoadMore = jest.fn();

const attachToRef: React.MutableRefObject<HTMLDivElement | null> = {
  current: null,
};

const optionsArray = ["Amazing", "Fabulous", "Magical"];
const options: ChipProps[] = optionsArray.map(opt => ({
  value: opt,
  label: opt,
}));

const props = {
  options: options,
  attachTo: attachToRef,
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

// Add a dummy element for the attachTo ref
beforeAll(() => {
  const dummyElement = document.createElement("div");
  dummyElement.setAttribute("id", "dummy-attach-to");
  document.body.appendChild(dummyElement);
  attachToRef.current = dummyElement;
});

afterAll(() => {
  const dummyElement = document.getElementById("dummy-attach-to");

  if (dummyElement) {
    document.body.removeChild(dummyElement);
  }
  attachToRef.current = null;
});

beforeEach(() => {
  jest.clearAllMocks();
  mockSetIsInView(false);

  const { rerender: rerenderComponent } = render(
    <InternalChipDismissibleInput {...props} />,
  );
  rerender = rerenderComponent;
});

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
    rerender(<InternalChipDismissibleInput {...props} isLoadingMore={true} />);
    expect(screen.getByRole("alert", { name: "loading" })).toBeInTheDocument();
  });
});

describe("Arrow keys", () => {
  beforeEach(() => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should highlight the next option on arrow down", () => {
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    isOptionhighlighted(optionsArray[1]);
  });

  it("should highlight the last option on arrow up", () => {
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowUp" });
    isOptionhighlighted(optionsArray[optionsArray.length - 1]);
  });

  it("should highlight the first option on arrow down when the last option is highlighted", () => {
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    isOptionhighlighted(optionsArray[optionsArray.length - 1]);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    isOptionhighlighted(optionsArray[0]);
  });

  it("should not do anything on arrow down when the last option is highlighted and it's loading", () => {
    rerender(<InternalChipDismissibleInput {...props} isLoadingMore={true} />);
    expect(screen.getByRole("alert", { name: "loading" })).toBeInTheDocument();
    const highlighted = optionsArray[optionsArray.length - 1];
    const input = screen.getByRole("combobox");

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
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[0]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });

  it("should add the highlighted option on tab", () => {
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Tab" });
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[1]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });
});

describe("Activator", () => {
  const activatorLabel = "Activate me";
  beforeEach(() => {
    rerender(
      <InternalChipDismissibleInput
        {...props}
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

    act(() => {
      mockSetIsInView(true);
      rerender(<InternalChipDismissibleInput {...props} />);
    });

    expect(handleLoadMore).toHaveBeenCalledTimes(1);
    expect(handleLoadMore).toHaveBeenCalledWith("");

    act(() => {
      mockSetIsInView(false);
      rerender(<InternalChipDismissibleInput {...props} />);
    });
    expect(handleLoadMore).toHaveBeenCalledTimes(1);

    act(() => {
      mockSetIsInView(true);
      rerender(<InternalChipDismissibleInput {...props} />);
    });
    expect(handleLoadMore).toHaveBeenCalledTimes(2);
  });

  it("should call onLoadMore with current search value", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");
    const searchValue = "test";
    fireEvent.change(input, { target: { value: searchValue } });

    act(() => {
      mockSetIsInView(true);
      rerender(<InternalChipDismissibleInput {...props} />);
    });

    expect(handleLoadMore).toHaveBeenCalledWith(searchValue);
  });
});

describe("Default Blur Behavior", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should close the menu after debounce timeout on blur (default mode)", () => {
    const input = screen.getByRole("combobox");
    fireEvent.blur(input);

    // Menu should still be open immediately after blur
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(handleOptionSelect).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Menu should be closed and activator should be back after debounce timeout
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should select item and close menu if blur happens due to item click", () => {
    const firstOption = screen.getByRole("option", { name: optionsArray[0] });
    fireEvent.click(firstOption);

    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[0]);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

describe("onlyShowMenuOnSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    rerender(
      <InternalChipDismissibleInput {...props} onlyShowMenuOnSearch={true} />,
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
    // Menu should not show until typing
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1);
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

    fireEvent.blur(input);

    // Input should still be there immediately
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Input should be gone, activator should be back
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should not hide input on blur if not empty", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.blur(input);

    // Input should still be there immediately
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Input should still be there since it's not empty
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
  });
});

function isOptionhighlighted(highlighted: string) {
  const activeClass = "activeOption";
  const option = screen.getByRole("option", { name: highlighted });
  expect(option).toHaveClass(activeClass);

  const input = screen.getByRole("combobox");
  expect(input).toHaveAttribute("aria-activedescendant", option.id);

  optionsArray
    .filter(opt => opt !== highlighted)
    .forEach(opt => {
      const otherOption = screen.getByRole("option", { name: opt });
      expect(otherOption).not.toHaveClass(activeClass);
      expect(input.getAttribute("aria-activedescendant")).not.toBe(
        otherOption.id,
      );
    });
}
