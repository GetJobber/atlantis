import type { ReactElement } from "react";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxActivator } from "./ComboboxActivator";
import { ComboboxContextProvider } from "../../ComboboxProvider";
import type { ComboboxCustomActivatorProps } from "../../Combobox.types";

const handleOpen = jest.fn();

afterEach(() => {
  handleOpen.mockClear();
});

describe("ComboboxActivator", () => {
  describe("when open is false", () => {
    it("should call handleOpen when the activator is clicked", async () => {
      const { getByRole } = renderComboboxActivator(
        <Button label="Teammates" />,
        false,
      );
      const activator = getByRole("combobox");

      await userEvent.click(activator);

      expect(handleOpen).toHaveBeenCalled();
    });
  });
  it("can render a Button with role 'combobox' and onClick handler", () => {
    const { getByRole } = renderComboboxActivator(
      <Button label="Teammates" />,
      true,
    );
    const activator = getByRole("combobox");

    expect(activator).toBeInTheDocument();
  });

  it("can render a Chip with role 'combobox' and onClick handler", () => {
    const { getByRole } = renderComboboxActivator(
      <Chip label="Teammates" />,
      true,
    );
    const activator = getByRole("combobox");

    expect(activator).toBeInTheDocument();
  });

  it("renders provided element with 'combobox' role if children are not a Chip or Button", () => {
    const { getByText, queryByRole } = renderComboboxActivator(
      (api: ComboboxCustomActivatorProps) => (
        <div role={api.role}>Teammates</div>
      ),
      true,
    );
    expect(getByText("Teammates")).toBeInTheDocument();
    expect(queryByRole("combobox")).toBeInTheDocument();
  });
  it("opens the combobox when custom element is clicked", async () => {
    const { getByRole } = renderComboboxActivator(
      (api: ComboboxCustomActivatorProps) => (
        <div role={api.role} onClick={api.open}>
          Teammates
        </div>
      ),
      true,
    );
    await userEvent.click(getByRole("combobox"));
    expect(handleOpen).toHaveBeenCalled();
  });
});

function renderComboboxActivator(
  child:
    | ReactElement
    | ((args: ComboboxCustomActivatorProps) => React.JSX.Element),
  open: boolean,
) {
  return render(
    <ComboboxContextProvider
      handleOpen={handleOpen}
      handleClose={jest.fn()}
      selectionHandler={jest.fn()}
      shouldScroll={{ current: false }}
      open={open}
      selected={[]}
      searchValue=""
    >
      <ComboboxActivator>{child}</ComboboxActivator>
    </ComboboxContextProvider>,
  );
}
