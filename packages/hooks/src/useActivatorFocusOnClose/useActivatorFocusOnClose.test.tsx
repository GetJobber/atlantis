import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { useActivatorFocusOnClose } from ".";

const activatorId = "activator";
const closerId = "closer";

it("return the focus on the activator", () => {
  const { getByTestId } = render(<TestComponent />);
  fireEvent.click(getByTestId(activatorId));
  fireEvent.click(getByTestId(closerId));

  // Run on next tick
  setTimeout(() => {
    expect(getByTestId(activatorId)).toHaveFocus();
  }, 0);
});

function TestComponent() {
  const [open, setOpen] = useState(false);
  useActivatorFocusOnClose(true);

  return (
    <>
      <button data-testid="activator" onClick={() => setOpen(true)}>
        Click me!
      </button>
      {open && (
        <div>
          Haloo!
          <button onClick={() => setOpen(false)} data-testid="closer">
            x
          </button>
        </div>
      )}
    </>
  );
}
