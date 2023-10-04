import React, { useContext } from "react";
import { fireEvent, render } from "@testing-library/react";
import { ComboboxTriggerChip } from "./ComboboxTriggerChip";
import {
  ComboboxContext,
  ComboboxContextProvider,
} from "../../../ComboboxProvider";

function TriggerChipTestWrapper() {
  const { open } = useContext(ComboboxContext);

  return (
    <>
      <span data-testid="combobox-state">{open ? "Open" : "Closed"}</span>
      <ComboboxTriggerChip label="Open Combobox" />
    </>
  );
}
describe("TriggerChip", () => {
  it("renders a label", () => {
    const { getByText } = render(
      <ComboboxContextProvider>
        <ComboboxTriggerChip label="Open Combobox" />
      </ComboboxContextProvider>,
    );

    expect(getByText("Open Combobox")).toBeInTheDocument();
  });

  it("renders the 'add' icon", () => {
    const { getByTestId } = render(
      <ComboboxContextProvider>
        <ComboboxTriggerChip label="Open Combobox" />
      </ComboboxContextProvider>,
    );

    const iconElement = getByTestId("add");

    expect(iconElement).toBeInTheDocument();
  });

  it("toggles the combobox when clicked", () => {
    const { getByRole, getByTestId } = render(
      <ComboboxContextProvider>
        <TriggerChipTestWrapper />
      </ComboboxContextProvider>,
    );
    const triggerChip = getByRole("combobox");

    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");

    fireEvent.click(triggerChip);
    expect(getByTestId("combobox-state")).toHaveTextContent("Open");

    fireEvent.click(triggerChip);
    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");
  });
});
