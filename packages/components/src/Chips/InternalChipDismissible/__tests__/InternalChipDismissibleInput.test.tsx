import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { InternalChipDismissibleInput } from "../InternalChipDismissibleInput";
import type { ChipProps } from "../../Chip";

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

let attachToRef: HTMLDivElement | null = null;

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
  attachToRef = dummyElement;
});

afterAll(() => {
  const dummyElement = document.getElementById("dummy-attach-to");

  if (dummyElement) {
    document.body.removeChild(dummyElement);
  }
  attachToRef = null;
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
  cleanup();
});

describe("Menu closed", () => {
  it("should show a button initially", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("aria-label", "Add");
    expect(addButton.querySelector("svg")).toBeInTheDocument();
  });

  it("should not show an input and menu initially", () => {
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should show the input and menu on activator click", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);

    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveFocus();
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

  it("should focus on the input immediately", () => {
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should highlight the first option", () => {
    isOptionhighlighted(optionsArray[0]);
  });

  it("should highlight the hovered option", () => {
    const optionToHover = screen.getByRole("option", { name: optionsArray[1] });
    fireEvent.mouseEnter(optionToHover);
    isOptionhighlighted(optionsArray[1]);
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
    jest.useFakeTimers();
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should add the highlighted option on enter", () => {
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[0]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should call onCustomOptionSelect on enter when search value is new", () => {
    const input = screen.getByRole("combobox");
    const newValue = "Brand New Option";
    fireEvent.change(input, { target: { value: newValue } });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleCustomOptionSelect).toHaveBeenCalledWith(newValue);
    expect(handleOptionSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should add the highlighted option on tab", () => {
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Tab" });
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[1]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
    expect(input).toHaveFocus();
  });

  it("should add the current input as a custom option on comma", () => {
    const input = screen.getByRole("combobox");
    const newValue = "Comma Option";
    fireEvent.change(input, { target: { value: newValue } });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.keyDown(input, { key: "," });

    expect(handleCustomOptionSelect).toHaveBeenCalledWith(newValue);
    expect(handleOptionSelect).not.toHaveBeenCalled();
    expect(input).toHaveFocus();
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
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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
    expect(screen.getByRole("combobox")).toHaveFocus();
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

describe("onSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    handleSearch.mockClear();
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call onSearch eventually after typing", () => {
    const input = screen.getByRole("combobox");
    const searchValue = "test";
    fireEvent.change(input, { target: { value: searchValue } });

    expect(handleSearch).not.toHaveBeenCalled();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith(searchValue);
  });
});

describe("Default Blur Behavior", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should hide input and menu on blur", () => {
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");
    fireEvent.blur(input);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(handleOptionSelect).not.toHaveBeenCalled();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should select item and keep input focused if blur happens due to item click", () => {
    const firstOption = screen.getByRole("option", { name: optionsArray[0] });
    fireEvent.click(firstOption);

    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[0]);

    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveValue("");
  });
});

describe("autoSelectOnClickOutside", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    rerender(
      <InternalChipDismissibleInput
        {...props}
        autoSelectOnClickOutside={true}
      />,
    );
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should select a custom option on blur", () => {
    const input = screen.getByRole("combobox");
    const searchValue = "Superb";
    fireEvent.change(input, { target: { value: searchValue } });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.blur(input);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(handleCustomOptionSelect).toHaveBeenCalledWith(searchValue);
    expect(handleOptionSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("should do nothing on blur if input is empty", () => {
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");

    fireEvent.blur(input);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
    expect(handleOptionSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument(); // Input should still hide
  });
});

describe("autoSelectOnClickOutside without onCustomOptionSelect", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    cleanup();
    render(
      <InternalChipDismissibleInput
        {...props}
        onCustomOptionSelect={undefined}
        autoSelectOnClickOutside={true}
      />,
    );
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should select the best matching option on blur", () => {
    const input = screen.getByRole("combobox");
    const searchValue = "Fab";
    fireEvent.change(input, { target: { value: searchValue } });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.blur(input);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[1]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("should do nothing on blur if input is empty", () => {
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");

    fireEvent.blur(input);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
    expect(handleOptionSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});

describe("onlyShowMenuOnSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    handleSearch.mockClear();
    rerender(
      <InternalChipDismissibleInput {...props} onlyShowMenuOnSearch={true} />,
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initially show only the activator", () => {
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should show the input on activator click, but not the menu", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);

    expect(
      screen.queryByRole("button", { name: "Add" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should update input value, and eventually show menu on type", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    const searchValue = "A";
    fireEvent.change(input, { target: { value: searchValue } });

    expect(input).toHaveValue(searchValue);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("should clear input value and keep menu hidden on clear", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "A" } });
    expect(input).toHaveValue("A");

    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should hide input on blur", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");

    fireEvent.blur(input);

    expect(screen.getByRole("combobox")).toBeInTheDocument();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should close the menu on option selection", () => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "A" } });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    const firstOption = screen.getByRole("option", { name: optionsArray[0] });
    fireEvent.click(firstOption);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).toBeInTheDocument();
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
