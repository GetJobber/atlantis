import React from "react";
import { render } from "@testing-library/react";
import { ComboboxContextProvider } from "@jobber/components/Combobox/ComboboxProvider";
import { ComboboxOption } from "@jobber/components/Combobox/Combobox.types";
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

  describe("when showEmptyState is true", () => {
    it("should render a generic message if no options nor subjectNoun are provided", () => {
      const { getByText } = renderComboboxContentList([], [], true);

      expect(getByText("No options yet")).toBeInTheDocument();
    });

    it("should render a message if no options are provided and a subjectNoun is provided", () => {
      const { getByText } = renderComboboxContentList(
        [],
        [],
        true,
        "",
        "Plumbus",
      );
      expect(getByText("You don't have any Plumbus yet")).toBeInTheDocument();
    });
    it("should render a message if no options are provided and a search term is entered", () => {
      const { getByText } = renderComboboxContentList(
        [],
        [],
        true,
        "Frederick",
      );
      expect(getByText("No options yet")).toBeInTheDocument();
    });
  });

  describe("when showEmptyState is false", () => {
    it("should render a message if no options are provided and a search term is entered", () => {
      const { getByText } = renderComboboxContentList(
        [],
        [],
        false,
        "Frederick",
      );
      expect(getByText("No results for “Frederick”")).toBeInTheDocument();
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
  showEmptyState = false,
  searchValue = "",
  subjectNoun?: string,
) {
  return render(
    <ComboboxContextProvider
      setOpen={jest.fn()}
      handleClose={jest.fn()}
      selectionHandler={jest.fn()}
      multiselect={false}
      shouldScroll={{ current: false }}
      open={true}
      selected={[]}
    >
      <ComboboxContentList
        multiselect={false}
        options={options}
        showEmptyState={showEmptyState}
        selected={selected}
        optionsListRef={{ current: null }}
        searchValue={searchValue}
        subjectNoun={subjectNoun}
      />
    </ComboboxContextProvider>,
  );
}
