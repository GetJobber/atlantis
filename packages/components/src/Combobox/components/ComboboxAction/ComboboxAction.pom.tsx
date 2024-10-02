import React from "react";
import { render } from "@testing-library/react";
import { ComboboxAction as ComboboxActionComponent } from "./ComboboxAction"; // Adjust the import path as needed
import { ComboboxContextProvider } from "../../ComboboxProvider";

export function renderComboboxAction(
  actions: {
    label: string;
    onClick: () => void;
    closeOnActionClick?: boolean;
  }[],
  setOpen: (open: boolean) => void = jest.fn(),
) {
  return render(
    <ComboboxContextProvider
      setOpen={setOpen}
      handleClose={jest.fn()}
      selected={[]}
      open={true}
      shouldScroll={{ current: false }}
      selectionHandler={jest.fn()}
      searchValue=""
    >
      <div>
        {actions.map((action, index) => (
          <ComboboxActionComponent
            key={index}
            label={action.label}
            onClick={action.onClick}
            closeOnActionClick={action.closeOnActionClick}
          />
        ))}
      </div>
    </ComboboxContextProvider>,
  );
}
