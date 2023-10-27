import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ComboboxOption } from "./Combobox.types";
import { Combobox } from "./Combobox";
import {
  COMBOBOX_OPTION_AND_CONTENT_EXISTS_ERROR,
  COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE,
} from "./hooks/useComboboxValidation";

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

// TODO: Consolidate this with "ComboboxContent" test once we've completely
// remove Combobox.Content JOB-81416
describe("Combobox Simplified API", () => {
  const mockOnSelect = jest.fn();
  const mockActionClick = jest.fn();

  it("should show the options and actions in the Combobox Content", () => {
    const triggerLabel = "Button";
    render(
      <Combobox onSelect={mockOnSelect} selected={[]}>
        <Combobox.TriggerButton label={triggerLabel} />

        <Combobox.Option id="1" label="Option 1" />
        <Combobox.Option id="2" label="Option 2" />

        <Combobox.Action label="Action 1" onClick={mockActionClick} />
      </Combobox>,
    );

    const optionOneLabel = screen.getByText("Option 1");
    const actionLabel = screen.getByLabelText("Action 1");

    fireEvent.click(screen.getByText(triggerLabel));
    expect(optionOneLabel).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(actionLabel).toBeInTheDocument();

    fireEvent.click(optionOneLabel);
    expect(mockOnSelect).toHaveBeenCalledWith([{ id: "1", label: "Option 1" }]);

    actionLabel.click();
    expect(mockActionClick).toHaveBeenCalled();
  });

  it("should throw an error when Option/Action and Content all exist as siblings", () => {
    const component = () =>
      render(
        <Combobox onSelect={mockOnSelect} selected={[]}>
          <Combobox.TriggerButton label="Button" />

          <Combobox.Content options={[]} onSelect={jest.fn()} selected={[]} />

          <Combobox.Option id="1" label="Option 1" />
          <Combobox.Option id="2" label="Option 2" />

          <Combobox.Action label="Action 1" onClick={mockActionClick} />
        </Combobox>,
      );

    expect(component).toThrow(COMBOBOX_OPTION_AND_CONTENT_EXISTS_ERROR);
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

    expect(option).toHaveAttribute("aria-selected", "true");

    fireEvent.click(clearButton);
    fireEvent.click(getByText("Button"));
    expect(option).not.toHaveAttribute("aria-selected", "true");
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

    expect(option).toHaveAttribute("aria-selected", "true");
    expect(option2).toHaveAttribute("aria-selected", "true");
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

    it("should not update consumer as selections are made by clicking Select all", () => {
      const { getByText, queryByText } = render(
        <MockMultiSelectOnCloseCombobox />,
      );

      const button = getByText("Click Me");
      const selectAll = getByText("Select all");

      fireEvent.click(button);
      fireEvent.click(selectAll);

      const options = [
        getByText("Bilbo Baggins"),
        getByText("Frodo Baggins"),
        getByText("Shelob the Spoder"),
      ];

      options.forEach(option => {
        expect(option).toHaveAttribute("aria-selected", "true");
      });

      expect(queryByText("Choice: Bilbo Baggins")).not.toBeInTheDocument();
      expect(queryByText("Choice: Frodo Baggins")).not.toBeInTheDocument();
      expect(queryByText("Choice: Shelob the Spoder")).not.toBeInTheDocument();
    });
  });
});

function MockMultiSelectOnCloseCombobox(props: {
  readonly onCloseOverride?: () => void;
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
  readonly onSelectOverride?: () => void;
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
