import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Combobox } from "./Combobox";

afterEach(cleanup);
const mockUseAssert = (condition: boolean, message: string) => {
  if (condition) {
    throw new Error(message);
  }
};
jest.mock("../../../hooks", () => {
  return {
    useAssert: (...args: [condition: boolean, message: string]) =>
      mockUseAssert(...args),
  };
});

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
      expect(error?.message).toBe(
        "Combobox must have a Trigger and Content element",
      );
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
      expect(error?.message).toBe("Combobox can only have one Trigger element");
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
      expect(error?.message).toBe("Combobox can only have one Trigger element");
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
      expect(error?.message).toBe(
        "Combobox must have a Trigger and Content element",
      );
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
      expect(error?.message).toBe(
        "Combobox must have a Trigger and Content element",
      );
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
      expect(error?.message).toBe("Combobox can only have one Trigger element");
    }
  });
});
