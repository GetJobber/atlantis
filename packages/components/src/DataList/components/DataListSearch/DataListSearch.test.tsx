import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DATA_LIST_SEARCH_TEST_ID,
  DataListSearch,
  InternalDataListSearch,
} from "./DataListSearch";
import { defaultValues } from "../../context/DataListContext";
import * as dataListContext from "../../context/DataListContext/DataListContext";
import { DataListContextProps, DataListObject } from "../../DataList.types";

const spy = jest.spyOn(dataListContext, "useDataListContext");
const contextValueWithRenderableChildren: DataListContextProps<DataListObject> =
  {
    ...defaultValues,
    searchComponent: <DataListSearch onSearch={jest.fn()} />,
  };

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  cleanup();
  spy.mockReset();
  jest.useRealTimers();
});

describe("DataListSearch", () => {
  it("should not render anything", () => {
    render(<DataListSearch onSearch={jest.fn()} />);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});

describe("InternalDataListSearch", () => {
  describe("Placeholders", () => {
    it("should render a search box with the default placeholder", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);
      render(<InternalDataListSearch />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByLabelText("Search...")).toBeInTheDocument();
    });

    it("should render a search box with the data list title", () => {
      const title = "Persons";
      spy.mockReturnValue({ ...contextValueWithRenderableChildren, title });
      render(<InternalDataListSearch />);

      expect(screen.getByLabelText(`Search ${title}...`)).toBeInTheDocument();
      expect(screen.queryByLabelText("Search...")).not.toBeInTheDocument();
    });

    it("should render a search box with the passed in placeholder even if the title exist", () => {
      const placeholder = "Search for something";
      const title = "Thangs";
      spy.mockReturnValue({
        ...defaultValues,
        title,
        searchComponent: (
          <DataListSearch onSearch={jest.fn()} placeholder={placeholder} />
        ),
      });
      render(<InternalDataListSearch />);

      expect(screen.getByLabelText(placeholder)).toBeInTheDocument();
      expect(
        screen.queryByLabelText(`Search ${title}...`),
      ).not.toBeInTheDocument();
    });
  });

  describe("Toggle search", () => {
    it("should add the searchInputVisible class name after clicking the search button", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);
      render(<InternalDataListSearch />);

      const input = screen.getByTestId(DATA_LIST_SEARCH_TEST_ID);
      const searchButton = screen.getByLabelText("Search");

      expect(input).not.toHaveClass("searchInputVisible");

      userEvent.click(searchButton);
      expect(input).toHaveClass("searchInputVisible");
    });

    it("should focus on the search input after clicking the search button", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);
      render(<InternalDataListSearch />);

      const input = screen.getByRole("textbox");
      const searchButton = screen.getByLabelText("Search");

      expect(input).not.toHaveFocus();

      userEvent.click(searchButton);
      jest.runAllTimers();
      expect(input).toHaveFocus();
    });
  });

  it("should debounce the search", () => {
    const onSearch = jest.fn();
    spy.mockReturnValue({
      ...contextValueWithRenderableChildren,
      searchComponent: <DataListSearch onSearch={onSearch} />,
    });
    render(<InternalDataListSearch />);

    const input = screen.getByRole("textbox");
    const searchValue = "search";
    input.focus();
    userEvent.type(input, searchValue);

    expect(onSearch).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    expect(onSearch).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(onSearch).toHaveBeenCalledWith(searchValue);
  });
});
