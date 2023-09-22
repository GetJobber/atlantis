import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Combobox } from "../../Combobox";
import { ComboboxContext } from "../../ComboboxProvider";

describe("ComboboxContent Search", () => {
  it("should have a search input when open", () => {
    const { getByPlaceholderText } = render(
      <MockComboboxProvider>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={null}
        ></Combobox.Content>
        ,
      </MockComboboxProvider>,
    );

    const searchInput = getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  it("should refine results after entering a search term", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <MockComboboxProvider>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={null}
        ></Combobox.Content>
      </MockComboboxProvider>,
    );
    const searchInput = getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "Bilbo" } });

    expect(getByText("Bilbo Baggins")).toBeInTheDocument();
    expect(queryByText("Frodo Baggins")).not.toBeInTheDocument();
  });

  it("should clear search when clicking the clear button after entering a search term", () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <MockComboboxProvider>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={null}
        ></Combobox.Content>
      </MockComboboxProvider>,
    );

    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Bilbo" } });

    const clearButton = getByTestId("ATL-Combobox-Content-Search-Clear");
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(getByText("Bilbo Baggins")).toBeInTheDocument();
    expect(getByText("Frodo Baggins")).toBeInTheDocument();
  });

  it("should display a no results message if nothing matched the search term", () => {
    const { getByPlaceholderText, getByText } = render(
      <MockComboboxProvider>
        <Combobox.Content
          options={[
            { id: "1", label: "Michael Myers" },
            { id: "2", label: "Jason Vorhees" },
          ]}
          onSelect={jest.fn()}
          selected={null}
        ></Combobox.Content>
      </MockComboboxProvider>,
    );

    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Bilbo" } });

    expect(getByText('No results for "Bilbo"')).toBeInTheDocument();
  });
});

function MockComboboxProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <ComboboxContext.Provider
      value={{
        open,
        setOpen,
        wrapperRef: { current: null },
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}
