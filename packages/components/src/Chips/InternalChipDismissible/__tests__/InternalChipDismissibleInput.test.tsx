import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { InternalChipDismissibleInput } from "../InternalChipDismissibleInput";
import { ChipProps } from "../../Chip";

const mockIsInView = jest.fn(() => false);

jest.mock("../hooks/useInView", () => ({
  useInView: () => ({ isInView: mockIsInView() }),
}));

const handleOptionSelect = jest.fn(value => value);
const handleCustomOptionSelect = jest.fn(value => value);
const handleSearch = jest.fn(value => value);
const handleLoadMore = jest.fn(value => value);

const optionsArray = ["Amazing", "Fabulous", "Magical"];
const options: ChipProps[] = optionsArray.map(opt => ({
  value: opt,
  label: opt,
}));

const props = {
  options: options,
  attachTo: { current: undefined },
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

beforeEach(async () => {
  const { rerender: rerenderComponent } = render(
    <InternalChipDismissibleInput {...props} />,
  );
  rerender = rerenderComponent;
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
    expect(addButton).not.toBeInTheDocument();
  });

  it("should show an input and menu", () => {
    expect(screen.queryByRole("combobox")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).toBeInTheDocument();
  });

  it("should focus on the input", () => {
    expect(screen.queryByRole("combobox")).toHaveFocus();
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
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "ArrowDown" });
    isOptionhighlighted(optionsArray[1]);
  });

  it("should highlight the last option on arrow up", () => {
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "ArrowUp" });
    isOptionhighlighted(optionsArray[optionsArray.length - 1]);
  });

  it("should highlight the first option on arrow down when the last option is highlighted", () => {
    // Ensure last option is highlighted
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "ArrowUp" });
    isOptionhighlighted(optionsArray[optionsArray.length - 1]);

    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "ArrowDown" });
    isOptionhighlighted(optionsArray[0]);
  });

  it("should not do anything on arrow down when the last option is highlighted and it's loading", () => {
    rerender(<InternalChipDismissibleInput {...props} isLoadingMore={true} />);
    expect(screen.getByRole("alert", { name: "loading" })).toBeInTheDocument();
    const highlighted = optionsArray[optionsArray.length - 1];

    // Ensure last option is highlighted
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "ArrowUp" });
    isOptionhighlighted(highlighted);

    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "ArrowDown" });
    isOptionhighlighted(highlighted);
  });
});

describe("Add/delete via keyboard", () => {
  beforeEach(() => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should add the highlighted option on enter", () => {
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "Enter" });
    expect(handleOptionSelect).toHaveBeenCalledWith(optionsArray[0]);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });

  it("should add the highlighted option on tab", () => {
    const input = screen.queryByRole("combobox");
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
    expect(screen.queryByRole("combobox")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).toBeInTheDocument();
  });
});

function isOptionhighlighted(highlighted: string) {
  const activeClass = "activeOption";
  expect(screen.getByRole("option", { name: highlighted })).toHaveClass(
    activeClass,
  );

  optionsArray
    .filter(opt => opt !== highlighted)
    .map(opt => {
      expect(screen.getByRole("option", { name: opt })).not.toHaveClass(
        activeClass,
      );
    });
}
