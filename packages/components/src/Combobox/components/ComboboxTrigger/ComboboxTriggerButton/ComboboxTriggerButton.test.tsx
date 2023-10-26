import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { ComboboxTriggerButton } from "./ComboboxTriggerButton";
import { ComboboxContextProvider } from "../../../ComboboxProvider";

function TriggerButtonTestWrapper() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ComboboxContextProvider
      open={open}
      setOpen={setOpen}
      selectedOptions={[]}
      selectionHandler={jest.fn()}
    >
      <span data-testid="combobox-state">{open ? "Open" : "Closed"}</span>
      <ComboboxTriggerButton label="Open Combobox" />
    </ComboboxContextProvider>
  );
}

describe("TriggerButton", () => {
  it("renders a label", () => {
    const { getByText } = render(
      <ComboboxTriggerButton label="Open Combobox" />,
    );

    expect(getByText("Open Combobox")).toBeInTheDocument();
  });

  it("toggles the combobox when clicked", () => {
    const { getByRole, getByTestId } = render(<TriggerButtonTestWrapper />);
    const triggerButton = getByRole("combobox");

    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");

    fireEvent.click(triggerButton);
    expect(getByTestId("combobox-state")).toHaveTextContent("Open");

    fireEvent.click(triggerButton);
    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");
  });
});
