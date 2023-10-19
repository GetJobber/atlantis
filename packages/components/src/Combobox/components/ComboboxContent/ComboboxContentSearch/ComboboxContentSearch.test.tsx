import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { ComboboxContentSearch } from "./ComboboxContentSearch";

describe("ComboboxContentSearch", () => {
  it("should have the correct placeholder if provided", () => {
    const { getByPlaceholderText } = render(
      <ComboboxContentSearch
        placeholder="Bloop"
        searchValue=""
        open={true}
        setSearchValue={jest.fn()}
      />,
    );
    expect(getByPlaceholderText("Search Bloop")).toBeInTheDocument();
  });
  it("should have the default placeholder without one provided", () => {
    const { getByPlaceholderText } = render(
      <ComboboxContentSearch
        searchValue=""
        open={true}
        setSearchValue={jest.fn()}
      />,
    );
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("should call the setSearchValue function when the search input changes", () => {
    const setSearchValue = jest.fn();
    const { getByPlaceholderText } = render(
      <ComboboxContentSearch
        searchValue=""
        open={true}
        setSearchValue={setSearchValue}
      />,
    );
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Rumplestiltskin" } });
    expect(setSearchValue).toHaveBeenCalledWith("Rumplestiltskin");
  });

  it("should clear the search when the clear is used", () => {
    const setSearchValue = jest.fn();
    const { getByTestId } = render(
      <ComboboxContentSearch
        searchValue="Rumplestiltskin"
        open={true}
        setSearchValue={setSearchValue}
      />,
    );
    const clearButton = getByTestId("ATL-Combobox-Content-Search-Clear");
    fireEvent.click(clearButton);
    expect(setSearchValue).toHaveBeenCalledWith("");
  });
  it("should refocus search input when cleared", () => {
    const setSearchValue = jest.fn();
    const { getByTestId } = render(
      <ComboboxContentSearch
        searchValue="Rumplestiltskin"
        open={true}
        setSearchValue={setSearchValue}
      />,
    );
    const clearButton = getByTestId("ATL-Combobox-Content-Search-Clear");
    fireEvent.click(clearButton);
    expect(setSearchValue).toHaveBeenCalledWith("");
  });

  it("should have a clear button when there is a search value", () => {
    const { getByTestId } = render(
      <ComboboxContentSearch
        searchValue="Rumplestiltskin"
        open={true}
        setSearchValue={jest.fn()}
      />,
    );
    expect(
      getByTestId("ATL-Combobox-Content-Search-Clear"),
    ).toBeInTheDocument();
  });

  it("should focus the search input when open", async () => {
    const { getByPlaceholderText } = render(
      <ComboboxContentSearch
        searchValue=""
        open={true}
        setSearchValue={jest.fn()}
      />,
    );
    const searchInput = getByPlaceholderText("Search");

    await waitFor(() => {
      expect(searchInput).toHaveFocus();
    });
  });
});
