import React from "react";
import { render } from "@testing-library/react";
import { Combobox } from "../../Combobox";

describe("Combobox", () => {
  it("should render TriggerButton and Content", () => {
    const { getByText } = render(
      <Combobox>
        <Combobox.TriggerButton label="Open Combobox" />
        <Combobox.Content options={[]} onSelection={() => {}}>
          Combobox Content
        </Combobox.Content>
      </Combobox>,
    );

    const triggerButton = getByText("Open Combobox");
    const content = getByText("Combobox Content");

    expect(triggerButton).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
  it("should throw an error if no TriggerButton is provided", () => {
    // Mock the console.error function to suppress expected error messages
    const originalError = console.error;
    console.error = jest.fn();

    // Wrap your code in a function to test the error boundary
    const renderWithoutTriggerButton = () => {
      render(
        <Combobox>
          <Combobox.Content>Combobox Content</Combobox.Content>
        </Combobox>,
      );
    };

    expect(renderWithoutTriggerButton).toThrow(
      "Combobox must have a Trigger and Content element",
    );

    // Restore the original console.error function
    console.error = originalError;
  });
});
