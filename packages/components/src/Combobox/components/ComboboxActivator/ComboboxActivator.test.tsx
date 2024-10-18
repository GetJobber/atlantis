import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxActivator } from "./ComboboxActivator";
import { ComboboxContextProvider } from "../../ComboboxProvider";

const toggleOpen = jest.fn();
const handleClose = jest.fn();

afterEach(() => {
  toggleOpen.mockClear();
  handleClose.mockClear();
});

describe("ComboboxActivator", () => {
  describe("when open is true", () => {
    it("should call toggleOpen when the activator is clicked", () => {
      const { getByRole } = renderComboboxActivator(
        <Button label="Teammates" />,
        true,
      );
      const activator = getByRole("combobox");

      activator.click();

      expect(toggleOpen).toHaveBeenCalled();
    });
  });

  describe("when open is false", () => {
    it("should call toggleOpen when the activator is clicked", () => {
      const { getByRole } = renderComboboxActivator(
        <Button label="Teammates" />,
        false,
      );
      const activator = getByRole("combobox");

      activator.click();

      expect(toggleOpen).toHaveBeenCalled();
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
      <div>Teammates</div>,
      true,
    );
    expect(getByText("Teammates")).toBeInTheDocument();
    expect(queryByRole("combobox")).toBeInTheDocument();
  });
});

function renderComboboxActivator(child: ReactElement, open: boolean) {
  return render(
    <ComboboxContextProvider
      toggleOpen={toggleOpen}
      handleClose={handleClose}
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
