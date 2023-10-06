import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
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

  it("should clear search when activating the clear button with enter key", () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <MockComboboxProvider>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          selected={null}
          onSelect={jest.fn()}
        ></Combobox.Content>
      </MockComboboxProvider>,
    );

    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Bilbo" } });

    const clearButton = getByTestId("ATL-Combobox-Content-Search-Clear");

    userEvent.type(clearButton, "{enter}");

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

    expect(getByText("No results for “Bilbo”")).toBeInTheDocument();
  });
});

describe("ComboboxContent Header", () => {
  it("should render when multiSelect is true", () => {
    const { getByText, getByTestId } = render(
      <MockComboboxProvider multiselect={true}>
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

    expect(getByText("Select all")).toBeInTheDocument();
    expect(getByTestId("ATL-Combobox-Header")).toBeInTheDocument();
  });

  it("should not render when multiSelect is false", () => {
    const { queryByTestId } = render(
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

    expect(queryByTestId("ATL-Combobox-Header")).not.toBeInTheDocument();
  });
});

describe("ComboboxContent Options", () => {
  it("should focus first option with down arrow key press", async () => {
    const { getByText, getByTestId } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: 1, label: "Leatherface" },
            { id: 2, label: "Jason" },
            { id: 3, label: "Michael" },
          ]}
          selected={null}
          onSelect={jest.fn()}
        ></Combobox.Content>
      </Combobox>,
    );

    const openButton = getByText("Click Me");

    fireEvent.click(openButton);

    const content = getByTestId("ATL-Combobox-Content");

    userEvent.type(content, "{arrowdown}");

    await waitFor(() => {
      expect(getByText("Leatherface")).toHaveFocus();
    });
  });
  it("should focus 3rd option with as many arrow down key presses", async () => {
    const { getByText, getByTestId } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: 1, label: "Leatherface" },
            { id: 2, label: "Jason" },
            { id: 3, label: "Michael" },
          ]}
          selected={null}
          onSelect={jest.fn()}
        ></Combobox.Content>
      </Combobox>,
    );

    const openButton = getByText("Click Me");

    fireEvent.click(openButton);

    const content = getByTestId("ATL-Combobox-Content");

    userEvent.type(content, "{arrowdown}");
    userEvent.type(content, "{arrowdown}");
    userEvent.type(content, "{arrowdown}");

    await waitFor(() => {
      expect(getByText("Michael")).toHaveFocus();
    });
  });
  it("should focus first option with up arrow key press", async () => {
    const { getByText, getByTestId } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: 1, label: "Leatherface" },
            { id: 2, label: "Jason" },
            { id: 3, label: "Michael" },
          ]}
          onSelect={jest.fn()}
          selected={null}
        ></Combobox.Content>
      </Combobox>,
    );

    const openButton = getByText("Click Me");

    fireEvent.click(openButton);

    const content = getByTestId("ATL-Combobox-Content");

    userEvent.type(content, "{arrowup}");

    await waitFor(() => {
      expect(getByText("Leatherface")).toHaveFocus();
    });
  });
  it("should select option with enter key press", () => {
    const selectHandler = jest.fn();
    const { getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: 1, label: "Leatherface" },
            { id: 2, label: "Jason" },
            { id: 3, label: "Michael" },
          ]}
          onSelect={selectHandler}
          selected={null}
        ></Combobox.Content>
      </Combobox>,
    );

    const openButton = getByText("Click Me");

    fireEvent.click(openButton);

    const firstOption = getByText("Leatherface");

    userEvent.type(firstOption, "{enter}");
    expect(selectHandler).toHaveBeenCalledWith({ id: 1, label: "Leatherface" });
  });
  it("should close after making a selection with the enter key", () => {
    const { getByText, getByTestId } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: 1, label: "Leatherface" },
            { id: 2, label: "Jason" },
            { id: 3, label: "Michael" },
          ]}
          selected={null}
          onSelect={jest.fn()}
        ></Combobox.Content>
      </Combobox>,
    );

    const openButton = getByText("Click Me");

    fireEvent.click(openButton);

    const firstOption = getByText("Leatherface");

    userEvent.type(firstOption, "{enter}");
    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });
  describe("with a search entered", () => {
    it("should focus first of filtered options on arrown down press", async () => {
      const { getByText, getByTestId, getByPlaceholderText } = render(
        <Combobox>
          <Combobox.TriggerButton label="Click Me" />
          <Combobox.Content
            options={[
              { id: 1, label: "Leatherface" },
              { id: 2, label: "Jason" },
              { id: 3, label: "Michael" },
            ]}
            selected={null}
            onSelect={jest.fn()}
          ></Combobox.Content>
        </Combobox>,
      );
      const openButton = getByText("Click Me");

      fireEvent.click(openButton);

      const searchInput = getByPlaceholderText("Search");
      const content = getByTestId("ATL-Combobox-Content");

      fireEvent.change(searchInput, { target: { value: "Mi" } });

      userEvent.type(content, "{arrowdown}");

      await waitFor(() => {
        expect(getByText("Michael")).toHaveFocus();
      });
    });
  });
});

function MockComboboxProvider({
  children,
  multiselect = false,
}: {
  children: React.ReactNode;
  multiselect?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <ComboboxContext.Provider
      value={{
        multiselect,
        open,
        setOpen,
        wrapperRef: { current: null },
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}
