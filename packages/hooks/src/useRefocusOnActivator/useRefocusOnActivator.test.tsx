import React, { ReactNode, useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { useRefocusOnActivator } from ".";

function waitForNextTick(callback: () => void) {
  // Need to wait for the DOM to finish it's thing
  // https://github.com/testing-library/jest-dom/issues/53
  // Based on this finding [https://github.com/testing-library/jest-dom/issues/53#issuecomment-421671377]
  // and [https://stackoverflow.com/a/11299876] the focus always goes back to
  // the < body > before focusing on the correct element. In turn, there's a
  // delay and you have to wait for a tick to get the right element.
  setTimeout(callback, 20);
}

it("should return the focus on the activator", () => {
  const activatorId = "activator";
  const closerId = "closer";
  const { getByTestId } = render(
    <TestComponent activatorId={activatorId} closerId={closerId} />,
  );
  fireEvent.click(getByTestId(activatorId));
  fireEvent.click(getByTestId(closerId));

  waitForNextTick(() => {
    expect(getByTestId(activatorId)).toHaveFocus();
  });
});

describe("Nested components with return focus hook", () => {
  it("should return the focus on the correct activator", () => {
    const activatorId = "activator";
    const closerId = "closer";
    const childActivatorId = "activator-child";
    const childCloserId = "closer-child";
    const { getByTestId } = render(
      <TestComponent activatorId={activatorId} closerId={closerId}>
        <TestComponent
          activatorId={childActivatorId}
          closerId={childCloserId}
        />
      </TestComponent>,
    );
    fireEvent.click(getByTestId(activatorId));
    fireEvent.click(getByTestId(childActivatorId));
    expect(getByTestId(childCloserId)).toBeInTheDocument();

    fireEvent.click(getByTestId(childCloserId));
    waitForNextTick(() => {
      expect(getByTestId(childActivatorId)).toHaveFocus();
    });

    fireEvent.click(getByTestId(closerId));
    waitForNextTick(() => {
      expect(getByTestId(activatorId)).toHaveFocus();
    });
  });
});

interface TestComponentProps {
  readonly activatorId: string;
  readonly closerId: string;
  readonly children?: ReactNode;
}

function TestComponent({
  activatorId,
  closerId,
  children,
}: TestComponentProps) {
  const [open, setOpen] = useState(false);
  useRefocusOnActivator(true);

  return (
    <>
      <button data-testid={activatorId} onClick={() => setOpen(true)}>
        Click me!
      </button>
      {open && (
        <div>
          Haloo!
          <button onClick={() => setOpen(false)} data-testid={closerId}>
            x
          </button>
          {children}
        </div>
      )}
    </>
  );
}
