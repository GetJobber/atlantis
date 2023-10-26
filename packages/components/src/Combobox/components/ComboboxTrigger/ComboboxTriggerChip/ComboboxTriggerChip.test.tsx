import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { ComboboxTriggerChip } from "./ComboboxTriggerChip";
import { ComboboxContextProvider } from "../../../ComboboxProvider";

function TriggerChipTestWrapper() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ComboboxContextProvider
      open={open}
      setOpen={setOpen}
      selectedOptions={[]}
      selectionHandler={jest.fn()}
    >
      <span data-testid="combobox-state">{open ? "Open" : "Closed"}</span>
      <ComboboxTriggerChip label="Open Combobox" />
    </ComboboxContextProvider>
  );
}
describe("TriggerChip", () => {
  it("renders a label", () => {
    const { getByText } = render(<ComboboxTriggerChip label="Open Combobox" />);

    expect(getByText("Open Combobox")).toBeInTheDocument();
  });

  it("renders the 'add' icon", () => {
    const { getByTestId } = render(
      <ComboboxTriggerChip label="Open Combobox" />,
    );

    const iconElement = getByTestId("add");

    expect(iconElement).toBeInTheDocument();
  });

  it("toggles the combobox when clicked", () => {
    const { getByRole, getByTestId } = render(<TriggerChipTestWrapper />);
    const triggerChip = getByRole("combobox");

    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");

    fireEvent.click(triggerChip);
    expect(getByTestId("combobox-state")).toHaveTextContent("Open");

    fireEvent.click(triggerChip);
    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");
  });
});
