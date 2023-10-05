import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE,
  COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE,
  Combobox,
} from "./Combobox";
import { ComboboxOption } from "./Combobox.types";

// jsdom is missing this implementation
const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

afterEach(cleanup);

describe("Combobox validation", () => {
  it("renders without error if the correct count and composition of elements are present", () => {
    expect(() => {
      render(
        <Combobox>
          <Combobox.TriggerButton label="Button" />
          <Combobox.Content
            options={[]}
            onSelect={jest.fn()}
            selected={[]}
          ></Combobox.Content>
        </Combobox>,
      );
    }).not.toThrow();
  });

  it("throws an error if there is no Trigger element", () => {
    expect.assertions(1);
    let error;
    try {
      render(
        <Combobox>
          <Combobox.Content
            options={[]}
            onSelect={jest.fn()}
            selected={[]}
          ></Combobox.Content>
        </Combobox>,
      );
    } catch (e) {
      error = e as Error;
    } finally {
      expect(error?.message).toBe(COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE);
    }
  });

  it("throws an error if there are multiple of the same Trigger element", () => {
    expect.assertions(1);
    let error;
    try {
      render(
        <Combobox>
          <Combobox.TriggerButton label="Button" />
          <Combobox.TriggerButton label="Button Again" />
          <Combobox.Content
            options={[]}
            onSelect={jest.fn()}
            selected={[]}
          ></Combobox.Content>
        </Combobox>,
      );
    } catch (e) {
      error = e as Error;
    } finally {
      expect(error?.message).toBe(COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);
    }
  });

  it("throws an error if there are multiple of various Trigger elements", () => {
    expect.assertions(1);
    let error;
    try {
      render(
        <Combobox>
          <Combobox.TriggerButton label="Button" />
          <Combobox.TriggerChip label="Chippy Chip" />
          <Combobox.Content
            options={[]}
            onSelect={jest.fn()}
            selected={[]}
          ></Combobox.Content>
        </Combobox>,
      );
    } catch (e) {
      error = e as Error;
    } finally {
      expect(error?.message).toBe(COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);
    }
  });

  it("throws an error if there is no Content element", () => {
    expect.assertions(1);
    let error;
    try {
      render(
        <Combobox>
          <Combobox.TriggerButton label="Button" />
        </Combobox>,
      );
    } catch (e) {
      error = e as Error;
    } finally {
      expect(error?.message).toBe(COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE);
    }
  });

  it("throws an error if there is neither a Content nor Trigger element", () => {
    expect.assertions(1);
    let error;
    try {
      render(
        <Combobox>
          <></>
        </Combobox>,
      );
    } catch (e) {
      error = e as Error;
    } finally {
      expect(error?.message).toBe(COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE);
    }
  });

  it("throws an error if there are multiple Trigger elements and no Content", () => {
    expect.assertions(1);
    let error;
    try {
      render(
        <Combobox>
          <Combobox.TriggerButton label="Button" />
          <Combobox.TriggerChip label="Chippy Chip" />
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
      <Combobox>
        <Combobox.TriggerButton label="Button" />
        <Combobox.Content
          options={[]}
          onSelect={jest.fn()}
          selected={[]}
        ></Combobox.Content>
      </Combobox>,
    );
    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });

  it("should close the content after opening and making a (single) selection", () => {
    const { getByTestId, getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={[]}
        ></Combobox.Content>
      </Combobox>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    const option = getByText("Bilbo Baggins");
    fireEvent.click(option);

    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });

  it("should close the content after opening and pressing ESC", () => {
    const { getByTestId, getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={[]}
        ></Combobox.Content>
      </Combobox>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    fireEvent.keyDown(button, { key: "Escape" });

    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });

  it("should close the content after opening and clicking outside the content", () => {
    const { getByTestId, getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={[]}
        ></Combobox.Content>
      </Combobox>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    const overlay = getByTestId("ATL-Combobox-Overlay");
    fireEvent.click(overlay);

    expect(getByTestId("ATL-Combobox-Content")).toHaveClass("hidden");
  });
});

describe("Combobox selected value", () => {
  it("has no selected option when selection is cleared", () => {
    const { getByText } = render(<ClearSelectionCombobox />);

    const option = getByText("Bilbo Baggins");
    const clearButton = getByText("Clear Selection");

    expect(option).toHaveClass("selectedOption");

    fireEvent.click(clearButton);
    fireEvent.click(getByText("Button"));
    expect(option).not.toHaveClass("selectedOption");
  });
});

describe("Combobox multiselect", () => {
  it("should allow selections without closing", () => {
    const { getByTestId, getByText } = render(
      <Combobox multiSelect>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={[]}
        ></Combobox.Content>
      </Combobox>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");

    const option = getByText("Bilbo Baggins");
    fireEvent.click(option);

    expect(getByTestId("ATL-Combobox-Content")).not.toHaveClass("hidden");
  });

  it("should allow for multiple selections to be made", () => {
    const { getByText } = render(<MockMultiSelectOnSelectCombobox />);

    const button = getByText("Click Me");
    fireEvent.click(button);

    const option = getByText("Bilbo Baggins");
    const option2 = getByText("Frodo Baggins");

    fireEvent.click(option);
    fireEvent.click(option2);

    expect(option).toHaveClass("selectedOption");
    expect(option2).toHaveClass("selectedOption");
  });
  it("should call the onSelect callback upon making selection(s)", () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <MockMultiSelectOnSelectCombobox onSelectOverride={onSelect} />,
    );

    const button = getByText("Click Me");
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
    const { getByText, getByPlaceholderText } = render(
      <MockMultiSelectOnSelectCombobox />,
    );

    const button = getByText("Click Me");
    const option = getByText("Bilbo Baggins");
    const searchInput = getByPlaceholderText("Search");

    fireEvent.click(button);
    fireEvent.change(searchInput, { target: { value: "Bilbo" } });
    fireEvent.click(option);

    expect(searchInput).toHaveValue("Bilbo");
  });

  describe("onClose callback", () => {
    it("should call onClose with selections when the content is closed", async () => {
      const onClose = jest.fn();
      const { getByText } = render(
        <MockMultiSelectOnCloseCombobox onCloseOverride={onClose} />,
      );

      const button = getByText("Click Me");
      const option = getByText("Bilbo Baggins");
      const spoder = getByText("Shelob the Spoder");

      fireEvent.click(button);
      fireEvent.click(option);
      fireEvent.click(spoder);
      fireEvent.keyDown(button, { key: "Escape" });

      expect(onClose).toHaveBeenCalledWith([
        { id: "1", label: "Bilbo Baggins" },
        { id: "3", label: "Shelob the Spoder" },
      ]);
    });
    it("should not update consumer as selections are made", () => {
      const { getByText, queryByText } = render(
        <MockMultiSelectOnCloseCombobox />,
      );

      const button = getByText("Click Me");
      const option = getByText("Bilbo Baggins");
      const spoder = getByText("Shelob the Spoder");

      fireEvent.click(button);
      fireEvent.click(option);
      fireEvent.click(spoder);

      expect(queryByText("Choice: Bilbo Baggins")).not.toBeInTheDocument();
      expect(queryByText("Choice: Shelob the Spoder")).not.toBeInTheDocument();
    });
  });
});

function MockMultiSelectOnCloseCombobox(props: {
  onCloseOverride?: () => void;
}): JSX.Element {
  const [selected, setSelected] = React.useState<ComboboxOption[]>([]);
  const callback = props.onCloseOverride || setSelected;

  return (
    <>
      <Combobox multiSelect>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
            { id: "3", label: "Shelob the Spoder" },
          ]}
          onClose={callback}
          selected={selected}
        ></Combobox.Content>
      </Combobox>
      {selected.map(option => (
        <span key={option.id}>{`Choice: ${option.label}`}</span>
      ))}
    </>
  );
}

function MockMultiSelectOnSelectCombobox(props: {
  onSelectOverride?: () => void;
}): JSX.Element {
  const [selected, setSelected] = React.useState<ComboboxOption[]>([]);
  const callback = props.onSelectOverride || setSelected;

  return (
    <>
      <Combobox multiSelect>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={callback}
          selected={selected}
        ></Combobox.Content>
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
      <Combobox>
        <Combobox.TriggerButton label="Button" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={selected}
        >
          <></>
        </Combobox.Content>
      </Combobox>
    </>
  );
}
