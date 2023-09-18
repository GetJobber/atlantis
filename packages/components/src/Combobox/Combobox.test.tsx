import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE,
  COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE,
  Combobox,
} from "./Combobox";

afterEach(cleanup);

describe("Combobox validation", () => {
  it("renders without error if the correct count and composition of elements are present", () => {
    expect(() => {
      render(
        <Combobox>
          <Combobox.TriggerButton label="Button" />
          <Combobox.Content options={[]} onSelect={jest.fn()}>
            <></>
          </Combobox.Content>
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
          <Combobox.Content options={[]} onSelect={jest.fn()}>
            <></>
          </Combobox.Content>
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
          <Combobox.Content options={[]} onSelect={jest.fn()}>
            <></>
          </Combobox.Content>
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
          <Combobox.Content options={[]} onSelect={jest.fn()}>
            <></>
          </Combobox.Content>
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
        <Combobox.Content options={[]} onSelect={jest.fn()}>
          <></>
        </Combobox.Content>
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
        >
          <></>
        </Combobox.Content>
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
        >
          <></>
        </Combobox.Content>
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
        >
          <></>
        </Combobox.Content>
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
  it("has a selected option when a selected id is passed as a number and option id is a string", () => {
    const { getByRole } = render(
      <Combobox>
        <Combobox.TriggerButton label="Button" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={1}
        >
          <></>
        </Combobox.Content>
      </Combobox>,
    );
    const option = getByRole("radio", { name: "Bilbo Baggins" });
    expect(option).toBeChecked();
  });

  it("has a selected option when a selected value is passed as the same type as the option id", () => {
    const { getByRole } = render(
      <Combobox>
        <Combobox.TriggerButton label="Button" />
        <Combobox.Content
          options={[
            { id: 1, label: "Bilbo Baggins" },
            { id: 2, label: "Frodo Baggins" },
          ]}
          onSelect={jest.fn()}
          selected={1}
        >
          <></>
        </Combobox.Content>
      </Combobox>,
    );
    const option = getByRole("radio", { name: "Bilbo Baggins" });
    expect(option).toBeChecked();
  });
});

describe("Combobox Zero Index State", () => {
  describe("when no options exist and subjectNoun is provided", () => {
    it("should render the correct zero index state text", () => {
      const subjectNoun = "teammates";
      const { getByText } = render(
        <Combobox>
          <Combobox.TriggerButton label="Select a teammate" />
          <Combobox.Content
            options={[]}
            onSelect={jest.fn()}
            subjectNoun={subjectNoun}
          />
        </Combobox>,
      );

      expect(getByText("You don't have any teammates yet")).toBeInTheDocument();
    });
  });

  describe("when no options exist and subjectNoun is not provided", () => {
    it("should render the default zero index state text", () => {
      const { getByText } = render(
        <Combobox>
          <Combobox.TriggerButton label="Select a tax rate" />
          <Combobox.Content options={[]} onSelect={jest.fn()} />
        </Combobox>,
      );

      expect(getByText("No options yet")).toBeInTheDocument();
    });
  });

  describe("when options do exist", () => {
    it("should not render default zero index state text", () => {
      const { queryByText } = render(
        <Combobox>
          <Combobox.TriggerButton label="Select a tax rate" />
          <Combobox.Content
            options={[{ id: "1", label: "10%" }]}
            onSelect={jest.fn()}
          />
        </Combobox>,
      );

      expect(queryByText("No options yet")).not.toBeInTheDocument();
    });
  });
});
