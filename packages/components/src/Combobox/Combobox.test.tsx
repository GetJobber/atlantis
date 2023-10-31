import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { ComboboxOption } from "./Combobox.types";
import { Combobox } from "./Combobox";
import { COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE } from "./hooks/useComboboxValidation";
import { Chip } from "../Chip";

// jsdom is missing this implementation
const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

afterEach(cleanup);

describe("Combobox validation", () => {
  it("renders without error when there is no Activator", () => {
    expect(() => {
      render(<Combobox onSelect={jest.fn()} selected={[]} heading="no" />);
    }).not.toThrow();
  });

  it("renders without error when there is a ComboboxActivator", () => {
    expect(() => {
      render(
        <Combobox heading="hi" onSelect={jest.fn()} selected={[]}>
          <Combobox.Activator>
            <Chip variation="subtle" label="Teammates" />
          </Combobox.Activator>
        </Combobox>,
      );
    }).not.toThrow();
  });

  it("throws an error if there are multiple Activators", () => {
    expect.assertions(1);
    let error;

    try {
      render(
        <Combobox onSelect={jest.fn()} selected={[]} heading="hello">
          <Combobox.Activator>
            <span>hey</span>
          </Combobox.Activator>
          <Combobox.Activator>
            <span>hi</span>
          </Combobox.Activator>
        </Combobox>,
      );
    } catch (e) {
      error = e as Error;
    } finally {
      expect(error?.message).toBe(COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);
    }
  });
});

describe("ComboboxContent", () => {
  it("should not have the content visible by default", () => {
    const { getByTestId } = render(
      <Combobox onSelect={jest.fn()} selected={[]} heading="hi"></Combobox>,
    );
    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });

  it("should close the content after opening and making a (single) selection", () => {
    const { getByTestId, getByText, getByRole } = render(
      <Combobox heading="hi" onSelect={jest.fn()} selected={[]}>
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
      </Combobox>,
    );

    const button = getByRole("combobox");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    const option = getByText("Bilbo Baggins");
    fireEvent.click(option);

    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });

  it("should close the content after opening and pressing ESC", () => {
    const { getByTestId, getByRole } = render(
      <Combobox onSelect={jest.fn()} selected={[]} heading="hi">
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
      </Combobox>,
    );

    const button = getByRole("combobox");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    fireEvent.keyDown(button, { key: "Escape" });

    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });

  it("should close the content after opening and clicking outside the content", () => {
    const { getByTestId, getByRole } = render(
      <Combobox onSelect={jest.fn()} selected={[]} heading="hi">
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
      </Combobox>,
    );

    const button = getByRole("combobox");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    const overlay = getByTestId("ATL-Combobox-Overlay");
    fireEvent.click(overlay);

    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });
});

describe("Combobox selected value", () => {
  it("has no selected option when selection is cleared", () => {
    const { getByText, getByRole } = render(<ClearSelectionCombobox />);

    const option = getByRole("option", { name: "Bilbo Baggins" });
    const clearButton = getByText("Clear Selection");

    expect(option).toHaveAttribute("aria-selected", "true");

    fireEvent.click(clearButton);
    fireEvent.click(getByRole("combobox"));
    expect(option).not.toHaveAttribute("aria-selected", "true");
  });
});

describe("Combobox multiselect", () => {
  it("should allow selections without closing", () => {
    const { getByTestId, getByText, getByRole } = render(
      <Combobox multiSelect onSelect={jest.fn()} selected={[]} heading="hi">
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
      </Combobox>,
    );

    const button = getByRole("combobox");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    const option = getByText("Bilbo Baggins");
    fireEvent.click(option);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");
  });

  it("should allow for multiple selections to be made", () => {
    const { getByText, getByRole } = render(
      <MockMultiSelectOnSelectCombobox />,
    );

    const button = getByRole("combobox");
    fireEvent.click(button);

    const option = getByText("Bilbo Baggins");
    const option2 = getByText("Frodo Baggins");

    fireEvent.click(option);
    fireEvent.click(option2);

    expect(option).toHaveAttribute("aria-selected", "true");
    expect(option2).toHaveAttribute("aria-selected", "true");
  });

  it("should call the onSelect callback upon making selection(s)", () => {
    const onSelect = jest.fn();
    const { getByText, getByRole } = render(
      <MockMultiSelectOnSelectCombobox onSelectOverride={onSelect} />,
    );

    const button = getByRole("combobox");
    const option = getByText("Bilbo Baggins");

    fireEvent.click(button);
    fireEvent.click(option);

    expect(onSelect).toHaveBeenCalledWith([
      {
        id: "1",
        label: "Bilbo Baggins",
      },
    ]);
  });

  it("should not clear search after making a selection", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <MockMultiSelectOnSelectCombobox />,
    );

    const button = getByRole("combobox");
    const option = getByText("Bilbo Baggins");
    const searchInput = getByPlaceholderText("Search");

    fireEvent.click(button);
    fireEvent.change(searchInput, { target: { value: "Bilbo" } });
    fireEvent.click(option);

    expect(searchInput).toHaveValue("Bilbo");
  });

  describe("onClose callback", () => {
    it("should call onClose when the content is closed", async () => {
      const onClose = jest.fn();
      const { getByText, getByRole } = render(
        <MockMultiSelectOnCloseCombobox onCloseOverride={onClose} />,
      );

      const button = getByRole("combobox");
      const option = getByText("Bilbo Baggins");
      const spoder = getByText("Shelob the Spoder");

      fireEvent.click(button);
      fireEvent.click(option);
      fireEvent.click(spoder);
      fireEvent.keyDown(button, { key: "Escape" });

      expect(onClose).toHaveBeenCalled();
    });
  });
});

function MockMultiSelectOnCloseCombobox(props: {
  readonly onCloseOverride?: () => void;
}): JSX.Element {
  const [selected, setSelected] = React.useState<ComboboxOption[]>([]);
  const callback = props.onCloseOverride;

  return (
    <>
      <Combobox
        multiSelect
        heading="hi"
        onSelect={setSelected}
        onClose={callback}
        selected={selected}
      >
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
        <Combobox.Option id="3" label="Pippin Took" />
        <Combobox.Option id="4" label="Shelob the Spoder" />
      </Combobox>
      {selected.map(option => (
        <span key={option.id}>{`Choice: ${option.label}`}</span>
      ))}
    </>
  );
}

function MockMultiSelectOnSelectCombobox(props: {
  readonly onSelectOverride?: () => void;
}): JSX.Element {
  const [selected, setSelected] = React.useState<ComboboxOption[]>([]);
  const callback = props.onSelectOverride || setSelected;

  return (
    <>
      <Combobox
        multiSelect
        onSelect={callback}
        selected={selected}
        heading="hi"
      >
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
        <Combobox.Option id="3" label="Pippin Took" />
      </Combobox>
      ,
    </>
  );
}

function ClearSelectionCombobox() {
  const [selected, setSelected] = React.useState<ComboboxOption[]>([
    {
      id: 1,
      label: "Bilbo Baggins",
    },
  ]);

  return (
    <>
      <button onClick={() => setSelected([])}>Clear Selection</button>
      <Combobox heading="hi" onSelect={jest.fn()} selected={selected}>
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
        <Combobox.Option id="3" label="Pippin Took" />
      </Combobox>
    </>
  );
}
