import { cleanup, fireEvent, render } from "@testing-library/react";
import React, { useContext } from "react";
import { ComboboxTrigger } from "./ComboboxTrigger";
import {
  ComboboxContext,
  ComboboxContextProvider,
} from "../../ComboboxProvider";
import { Combobox } from "../../Combobox";

describe("ComboboxTrigger", () => {
  it("renders without error", () => {
    const { getByRole } = render(
      <ComboboxContextProvider>
        <TriggerTestWrapper />
      </ComboboxContextProvider>,
    );

    expect(getByRole("combobox")).toBeInTheDocument();
  });

  it("opens and closes ComboboxContent when clicked", () => {
    const { getByRole, getByTestId } = render(
      <ComboboxContextProvider>
        <TriggerTestWrapper />
      </ComboboxContextProvider>,
    );
    const trigger = getByRole("combobox");

    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");

    fireEvent.click(trigger);
    expect(getByTestId("combobox-state")).toHaveTextContent("Open");

    fireEvent.click(trigger);
    expect(getByTestId("combobox-state")).toHaveTextContent("Closed");
  });

  it("has role 'combobox'", () => {
    const { getByRole } = render(
      <ComboboxContextProvider>
        <TriggerTestWrapper />
      </ComboboxContextProvider>,
    );

    expect(getByRole("combobox")).toBeInTheDocument();
  });

  describe("before selection", () => {
    it("renders a Chip with a heading", () => {
      const { getByText } = render(
        <ComboboxContextProvider>
          <TriggerTestWrapper />
        </ComboboxContextProvider>,
      );

      expect(getByText("Teammates")).toBeInTheDocument();
    });

    it("renders a Chip with a 'Select' heading if no heading is provided", () => {
      const { getByText } = render(
        <Combobox>
          <Combobox.Content
            options={[
              { id: "1", label: "Michael" },
              { id: "2", label: "Jason" },
            ]}
            onSelect={jest.fn()}
            selected={[]}
          ></Combobox.Content>
        </Combobox>,
      );

      expect(getByText("Select")).toBeInTheDocument();
    });

    it("renders a Chip with a suffix", () => {
      const { getByTestId } = render(
        <ComboboxContextProvider>
          <TriggerTestWrapper />
        </ComboboxContextProvider>,
      );

      const suffixIcon = getByTestId("add");

      expect(suffixIcon).toBeInTheDocument();
    });

    it("renders a Chip with 'subtle' variation", () => {
      const { getByRole } = render(
        <ComboboxContextProvider>
          <TriggerTestWrapper />
        </ComboboxContextProvider>,
      );

      expect(getByRole("combobox")).toHaveClass("subtle");
    });
  });

  describe("after selection", () => {
    afterEach(cleanup);
    it("renders a Chip with 'base' variation", () => {
      const { getByRole } = render(
        <Combobox
          heading="Teammates"
          onSelect={jest.fn()}
          selected={[{ id: "1", label: "Michael" }]}
        >
          <Combobox.Option id="1" label="Michael" />
          <Combobox.Option id="2" label="Jason" />
        </Combobox>,
      );

      const trigger = getByRole("combobox");

      expect(trigger).toHaveClass("base");
      expect(trigger).toHaveTextContent("Michael");
    });

    describe("When multiSelect is false", () => {
      it("renders Chip with the selected option as the label", () => {
        const { getByRole } = render(
          <Combobox
            heading="Teammates"
            onSelect={jest.fn()}
            selected={[{ id: "1", label: "Michael" }]}
          >
            <Combobox.Option id="1" label="Michael" />
            <Combobox.Option id="2" label="Jason" />
          </Combobox>,
        );

        const trigger = getByRole("combobox");

        expect(trigger).toHaveTextContent("Michael");
      });
    });

    describe("When multiSelect is true", () => {
      it("renders Chip with a heading and label", () => {
        const { getByRole } = render(
          <Combobox
            heading="Teammates"
            multiSelect
            onSelect={jest.fn()}
            selected={[{ id: "1", label: "Michael" }]}
          >
            <Combobox.Option id="1" label="Michael" />
            <Combobox.Option id="2" label="Jason" />
            <Combobox.Option id="3" label="Leatherface" />
          </Combobox>,
        );

        const trigger = getByRole("combobox");

        expect(trigger).toHaveTextContent("Teammates");
        expect(trigger).toHaveTextContent("Michael");
      });

      it("renders Chip with a label that is the selected options joined by a comma", () => {
        const { getByRole } = render(
          <Combobox
            heading="Teammates"
            multiSelect
            onSelect={jest.fn()}
            selected={[
              { id: "1", label: "Michael" },
              { id: "3", label: "Leatherface" },
            ]}
          >
            <Combobox.Option id="1" label="Michael" />
            <Combobox.Option id="2" label="Jason" />
            <Combobox.Option id="3" label="Leatherface" />
          </Combobox>,
        );

        const trigger = getByRole("combobox");

        expect(trigger).toHaveTextContent("Michael, Leatherface");
      });
    });
  });
});

function TriggerTestWrapper() {
  const { open } = useContext(ComboboxContext);

  return (
    <>
      <span data-testid="combobox-state">{open ? "Open" : "Closed"}</span>
      <ComboboxTrigger heading="Teammates" selected={[]} />
    </>
  );
}
