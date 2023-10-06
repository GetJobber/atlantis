import React from "react";
import { render } from "@testing-library/react";
import { multiSelect } from "@jobber/components/MultiSelect/MultiSelect.css";
// import { ComboboxHeader } from "./ComboboxHeader";
import { Combobox } from "../../Combobox";
import { ComboboxContext } from "../../ComboboxProvider";

describe("ComboboxHeader", () => {
  it("should be present when multiselect is true", () => {
    const { getByText } = render(
      <MockComboboxProvider multiSelect={true}>
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
  });

  // it("should be absent when multiselect is false", () => {
  //   const { queryByText } = render(
  //     <MockComboboxProvider multiSelect={false}>
  //       <Combobox.Content
  //         options={[
  //           { id: "1", label: "Bilbo Baggins" },
  //           { id: "2", label: "Frodo Baggins" },
  //         ]}
  //         onSelect={jest.fn()}
  //         selected={null}
  //       ></Combobox.Content>
  //     </MockComboboxProvider>,
  //   );

  //   expect(queryByText("Select all")).not.toBeInTheDocument();
  // });

  it("should read 'Select` when subjectNoun is not provided", () => {
    const { getByText } = render(
      <MockComboboxProvider multiSelect={true}>
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

    expect(getByText("Select")).toBeInTheDocument();
  });

  it("should read 'Select {subjectNoun}' when subjectNoun is provided", () => {
    const { getByText } = render(
      <MockComboboxProvider multiSelect={true}>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={null}
          subjectNoun="teammates"
        ></Combobox.Content>
      </MockComboboxProvider>,
    );

    expect(getByText("Select teammates")).toBeInTheDocument();
  });

  it("should read '1 selected' when one option is selected", () => {
    const { getByText } = render(
      <MockComboboxProvider multiSelect={true}>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={{ id: "1", label: "Bilbo Baggins" }}
        ></Combobox.Content>
      </MockComboboxProvider>,
    );

    expect(getByText("1 selected")).toBeInTheDocument();
  });

  it("should display '{selectedCount} selected' label when selectedCount is 1 or more", () => {
    const { getByText } = render(
      <MockComboboxProvider multiSelect={true}>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={{ id: "1", label: "Bilbo Baggins" }}
          subjectNoun="teammates"
        ></Combobox.Content>
      </MockComboboxProvider>,
    );

    expect(getByText("1 selected")).toBeInTheDocument();
  });

  it("should display 'Clear' when one option is selected", () => {
    const { getByText } = render(
      <MockComboboxProvider multiSelect={true}>
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={{ id: "1", label: "Bilbo Baggins" }}
        ></Combobox.Content>
      </MockComboboxProvider>,
    );

    expect(getByText("Clear")).toBeInTheDocument();
  });
});

function MockComboboxProvider({
  children,
}: {
  children: React.ReactNode;
  multiSelect?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <ComboboxContext.Provider
      value={{
        multiselect: !!multiSelect,
        open,
        setOpen,
        wrapperRef: { current: null },
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}
