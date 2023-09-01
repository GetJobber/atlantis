import React, { useContext } from "react";
import { fireEvent, render } from "@testing-library/react";
import { TriggerButton } from "./TriggerButton";
import {
  ComboboxContext,
  ComboboxContextProvider,
} from "../../ComboboxProvider";

function TriggerButtonTestWrapper() {
  const { open } = useContext(ComboboxContext);

  return (
    <>
      <span data-testid="combobox-state">{open ? "Open" : "Closed"}</span>
      <TriggerButton label="Open Combobox" />
    </>
  );
}

describe("TriggerButton", () => {
  it("renders a label", () => {
    const { getByText } = render(
      <ComboboxContextProvider>
        <TriggerButton label="Open Combobox" />
      </ComboboxContextProvider>,
    );

    expect(getByText("Open Combobox")).toBeInTheDocument();
  });

  it("toggles the combobox when clicked", () => {
    const { getByRole, getByTestId } = render(
      <ComboboxContextProvider>
        <TriggerButtonTestWrapper />
      </ComboboxContextProvider>,
    );
    const triggerButton = getByRole("button");

    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");

    fireEvent.click(triggerButton);
    expect(getByTestId("combobox-state")).toHaveTextContent("Open");

    fireEvent.click(triggerButton);
    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");
  });
});
