import React from "react";
import { render } from "@testing-library/react";
import { ComboboxContextProvider } from "@jobber/components/Combobox/ComboboxProvider";
import type { ComboboxOption } from "@jobber/components/Combobox/Combobox.types";
import { ComboboxContentList } from "./ComboboxContentList";

describe("ComboboxContentList", () => {
  it("should render a list of options if provided", () => {
    const { getByText } = renderComboboxContentList();

    expect(getByText("Michael")).toBeInTheDocument();
    expect(getByText("Jason")).toBeInTheDocument();
  });

  it("should not show the empty message if list of options provided", () => {
    const { queryByText } = renderComboboxContentList();

    expect(queryByText("No Options yet")).not.toBeInTheDocument();
  });

  describe("when no options are present", () => {
    it("should render a generic message if no subjectNoun provided", () => {
      const { getByText } = renderComboboxContentList([], []);

      expect(getByText("No options yet")).toBeInTheDocument();
    });

    it("should render a message if a subjectNoun is provided", () => {
      const { getByText } = renderComboboxContentList([], [], "", "Plumbus");
      expect(getByText("You don't have any Plumbus yet")).toBeInTheDocument();
    });
    it("should render a message if a search term is entered", () => {
      const { getByText } = renderComboboxContentList([], [], "Frederick");
      expect(getByText(/No results for “Frederick”/)).toBeInTheDocument();
    });
  });
});

function renderComboboxContentList(
  options: ComboboxOption[] = [
    {
      id: "1",
      label: "Michael",
    },
    {
      id: "2",
      label: "Jason",
    },
  ],
  selected: ComboboxOption[] = [],
  searchValue = "",
  subjectNoun?: string,
) {
  return render(
    <ComboboxContextProvider
      handleOpen={jest.fn()}
      handleClose={jest.fn()}
      selectionHandler={jest.fn()}
      shouldScroll={{ current: false }}
      open={true}
      selected={[]}
      searchValue=""
    >
      <ComboboxContentList
        multiselect={false}
        options={options}
        selected={selected}
        optionsListRef={{ current: null }}
        searchValue={searchValue}
        subjectNoun={subjectNoun}
      />
    </ComboboxContextProvider>,
  );
}
