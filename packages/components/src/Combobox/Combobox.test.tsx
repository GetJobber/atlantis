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
          <Combobox.Content options={[]} onSelection={jest.fn()}>
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
          <Combobox.Content options={[]} onSelection={jest.fn()}>
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
          <Combobox.Content options={[]} onSelection={jest.fn()}>
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
          <Combobox.Content options={[]} onSelection={jest.fn()}>
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
        <Combobox.Content options={[]} onSelection={jest.fn()}>
          <></>
        </Combobox.Content>
      </Combobox>,
    );
    expect(getByTestId("combobox-content")).toHaveClass("hidden");
  });
  it("should close the content after opening and making a (single) selection", async () => {
    const { getByTestId, getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelection={jest.fn()}
        >
          <></>
        </Combobox.Content>
      </Combobox>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(getByTestId("combobox-content")).not.toHaveClass("hidden");

    const option = getByText("Bilbo Baggins");
    fireEvent.click(option);

    expect(getByTestId("combobox-content")).toHaveClass("hidden");
  });

  it("should close the content after opening and pressing ESC", async () => {
    const { getByTestId, getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelection={jest.fn()}
        >
          <></>
        </Combobox.Content>
      </Combobox>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(getByTestId("combobox-content")).not.toHaveClass("hidden");

    fireEvent.keyDown(button, { key: "Escape" });

    expect(getByTestId("combobox-content")).toHaveClass("hidden");
  });

  it("should close the content after opening and clicking outside the content", async () => {
    const { getByTestId, getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Click Me" />
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
          onSelection={jest.fn()}
        >
          <></>
        </Combobox.Content>
      </Combobox>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(getByTestId("combobox-content")).not.toHaveClass("hidden");

    const overlay = getByTestId("overlay");
    fireEvent.click(overlay);

    expect(getByTestId("combobox-content")).toHaveClass("hidden");
  });
});
