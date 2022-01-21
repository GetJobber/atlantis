import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
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

const chips = ["Amazing", "Fabulous", "Magical"];
const selectedChips = ["Amazing"];

beforeEach(async () => {
  await popperUpdate();

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

  await popperUpdate();
});

afterEach(cleanup);

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

  beforeEach(() => {
    fireEvent.click(screen.getByLabelText("Add"));
    wrapperEl = screen.getByRole("listbox");
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

  it("should trigger the onChange callback when you select from available optipns", () => {
    const target = chips[chips.length - 1];
    fireEvent.click(screen.getByText(target));

    expect(handleChange).toHaveBeenCalledWith([...selectedChips, target]);
    expect(handleCustomAdd).not.toHaveBeenCalled();
  });

  it("should trigger the onSearch callback when you type on the input", () => {
    const value = "🌮";
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: value },
    });

    expect(handleSearch).toHaveBeenCalledWith(value);
  });

  it("should only trigger the onCustomAdd callback when you select the custom option", () => {
    const value = "🌮";
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: value },
    });
    fireEvent.click(screen.getByText(value));

    expect(handleCustomAdd).toHaveBeenCalledWith(value);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("should nit trigger the onLoadMore callback", () => {
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

it("should trigger the onclick callback when a chip gets clicked", () => {
  fireEvent.click(screen.getByRole("button", { name: selectedChips[0] }));

  expect(handleClickChip).toHaveBeenCalledWith(
    expect.any(Object),
    selectedChips[0],
  );
});

it("should trigger the onChange callback when removing a chip", () => {
  const targetChip = selectedChips[0];
  const wrapperEl = screen.getByRole("button", { name: targetChip });
  fireEvent.click(within(wrapperEl).getByTestId("remove-chip-button"));

  expect(handleChange).toHaveBeenCalledWith([]);
});

async function popperUpdate() {
  // Wait for the Popper update() so jest doesn't throw an act warning
  // https://github.com/popperjs/react-popper/issues/350
  await act(async () => undefined);
}

describe("delete via keyboard", () => {
  beforeEach(() => {
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);
  });

  it("should add the highlighted option on enter", () => {
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith([...selectedChips, chips[1]]);
    expect(handleCustomAdd).not.toHaveBeenCalled();
  });

  it("should add the highlighted option on tab", () => {
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "Tab" });
    expect(handleChange).toHaveBeenCalledWith([...selectedChips, chips[1]]);
    expect(handleCustomAdd).not.toHaveBeenCalled();
  });

  it("should delete the last selected chip on backspace", () => {
    fireEvent.keyDown(screen.queryByRole("combobox"), { key: "Backspace" });
    expect(handleChange).toHaveBeenCalledWith([]);
    expect(handleCustomAdd).not.toHaveBeenCalled();
  });
});
