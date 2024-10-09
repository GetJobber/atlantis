import React from "react";
import { render } from "@testing-library/react";
import { ComboboxAction as ComboboxActionComponent } from "./ComboboxAction";
import { ComboboxContextProvider } from "../../ComboboxProvider";

interface Action {
  label: string;
  onClick: () => void;
  keepOpenOnClick?: boolean;
}

export function renderComboboxAction(
  actions: Action[],
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
          <ComboboxActionComponent key={index} {...action} />
        ))}
      </div>
    </ComboboxContextProvider>,
  );
}
