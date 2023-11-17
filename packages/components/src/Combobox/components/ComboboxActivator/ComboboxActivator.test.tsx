import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxActivator } from "./ComboboxActivator";
import { ComboboxContextProvider } from "../../ComboboxProvider";

const setOpen = jest.fn();
const handleClose = jest.fn();

afterEach(() => {
  setOpen.mockClear();
  handleClose.mockClear();
});

describe("ComboboxActivator", () => {
  describe("when open is true", () => {
    it("should call handleClose when the activator is clicked", () => {
      const { getByRole } = renderComboboxActivator(
        <Button label="Teammates" />,
        true,
      );
      const activator = getByRole("combobox");

      activator.click();

      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("when open is false", () => {
    it("should call setOpen when the activator is clicked", () => {
      const { getByRole } = renderComboboxActivator(
        <Button label="Teammates" />,
        false,
      );
      const activator = getByRole("combobox");

      activator.click();

      expect(setOpen).toHaveBeenCalled();
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

  it("renders without 'combobox' role if children are not a Chip or Button", () => {
    const { getByText, queryByRole } = renderComboboxActivator(
      <div>Teammates</div>,
      true,
    );
    expect(getByText("Teammates")).toBeInTheDocument();
    expect(queryByRole("combobox")).not.toBeInTheDocument();
  });
});

function renderComboboxActivator(child: ReactElement, open: boolean) {
  return render(
    <ComboboxContextProvider
      setOpen={setOpen}
      handleClose={handleClose}
      selectionHandler={jest.fn()}
      multiselect={false}
      shouldScroll={{ current: false }}
      open={open}
      selected={[]}
    >
      <ComboboxActivator>{child}</ComboboxActivator>
    </ComboboxContextProvider>,
  );
}
