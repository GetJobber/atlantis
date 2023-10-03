import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { InputSearch } from "./InputSearch";

const accessibilityLabelSearch = "Search";
const accessibilityHint = "Search clients, properties, quotes, etc.";
const mockOnChange = jest.fn();
const mockOnDebouncedChange = jest.fn();
let searchValue: string;

beforeEach(() => {
  mockOnChange.mockReset();
  mockOnDebouncedChange.mockReset();
  searchValue = "";
});
afterEach(cleanup);

function setup() {
  return render(
    <InputSearch
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabelSearch}
      placeholder={accessibilityHint}
      value={searchValue}
      onChange={mockOnChange}
      onDebouncedChange={mockOnDebouncedChange}
    />,
  );
}

describe("InputSearch", () => {
  it("renders the search input text", () => {
    const { getByHintText, getByLabelText } = setup();

    expect(getByLabelText(accessibilityLabelSearch)).toBeDefined();
    expect(getByHintText(accessibilityHint)).toBeDefined();
  });

  it("passes the correct search value to onChange when the value changed", () => {
    const { getByLabelText } = setup();
    const inputSearch = getByLabelText(accessibilityLabelSearch);

    fireEvent.changeText(inputSearch, "Apollo Client");
    expect(mockOnChange).toHaveBeenCalledWith("Apollo Client");
  });

  it("passes the correcet search value to onDebouncedChange when the value changed", async () => {
    const { getByLabelText } = setup();
    const inputSearch = getByLabelText(accessibilityLabelSearch);

    await waitFor(() => {
      fireEvent.changeText(inputSearch, "Update Apollo Client");
      expect(mockOnDebouncedChange).toHaveBeenCalled();
    });
  });

  it("clears the search value when the clear button is pressed", () => {
    searchValue = "test search value";
    const { getByLabelText } = setup();

    fireEvent(getByLabelText(accessibilityLabelSearch), "focus");

    const inputSearchClearButton = getByLabelText("Clear input");
    fireEvent.press(inputSearchClearButton);
    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});
