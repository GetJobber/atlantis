import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxActivator } from "./ComboboxActivator";
import {
  ComboboxContext,
  ComboboxContextProvider,
} from "../../ComboboxProvider";
import { Combobox } from "../../Combobox";

function ComboboxActivatorButtonTestWrapper() {
  const { open } = React.useContext(ComboboxContext);

  return (
    <>
      <span data-testid="combobox-state">{open ? "Open" : "Closed"}</span>
      <ComboboxActivator>
        <Button label="Teammates" />
      </ComboboxActivator>
    </>
  );
}

function ComboboxActivatorChipTestWrapper() {
  const { open } = React.useContext(ComboboxContext);

  return (
    <>
      <span data-testid="combobox-state">{open ? "Open" : "Closed"}</span>
      <ComboboxActivator>
        <Chip label="Teammates" />
      </ComboboxActivator>
    </>
  );
}

describe("ComboboxActivator", () => {
  it("can render a Button with role 'combobox' and onClick handler", () => {
    const { getByRole, getByTestId } = render(
      <ComboboxContextProvider>
        <ComboboxActivatorButtonTestWrapper />
      </ComboboxContextProvider>,
    );
    const activator = getByRole("combobox");
    expect(activator).toBeInTheDocument();

    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");

    fireEvent.click(activator);
    expect(getByTestId("combobox-state")).toHaveTextContent("Open");

    fireEvent.click(activator);
    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");
  });

  it("can render a Chip with role 'combobox' and onClick handler", () => {
    const { getByRole, getByTestId } = render(
      <ComboboxContextProvider>
        <ComboboxActivatorChipTestWrapper />
      </ComboboxContextProvider>,
    );
    const activator = getByRole("combobox");
    expect(activator).toBeInTheDocument();

    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");

    fireEvent.click(activator);
    expect(getByTestId("combobox-state")).toHaveTextContent("Open");

    fireEvent.click(activator);
    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");
  });

  it("renders without 'combobox' role if children are not a Chip or Button", () => {
    const { getByText, queryByRole } = render(
      <ComboboxContextProvider>
        <ComboboxActivator>
          <div>Teammates</div>
        </ComboboxActivator>
      </ComboboxContextProvider>,
    );
    expect(getByText("Teammates")).toBeInTheDocument();
    expect(queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("renders a ComboboxTrigger when no custom activator is provided", () => {
    const { getByRole } = render(
      <Combobox heading="Teammates">
        <Combobox.Content
          options={[]}
          onSelect={jest.fn()}
          selected={[]}
        ></Combobox.Content>
      </Combobox>,
    );

    expect(getByRole("combobox")).toBeInTheDocument();
    expect(getByRole("combobox")).toHaveTextContent("Teammates");
  });
});
