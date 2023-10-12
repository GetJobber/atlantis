/**
 * Once this PR lands we should be able to un-split these different test files.
 * https://github.com/GetJobber/atlantis/pull/171/files
 */

import React, { RefObject, useRef } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { ConfirmationModal, ConfirmationModalRef } from "..";
import { Button } from "../../Button";

afterEach(cleanup);

test("simple ConfirmationModal should confirm", () => {
  const confirmHandler = jest.fn();
  const cancelHandler = jest.fn();
  const requestCloseHandler = jest.fn();

  const { getByText } = render(
    <ConfirmationModal
      title="Should we?"
      message="Do something…"
      open={true}
      confirmLabel="We Shall"
      onConfirm={confirmHandler}
      onCancel={cancelHandler}
      onRequestClose={requestCloseHandler}
    />,
  );

  fireEvent.click(getByText("We Shall"));
  expect(confirmHandler).toHaveBeenCalled();
  expect(cancelHandler).not.toHaveBeenCalled();
  expect(requestCloseHandler).toHaveBeenCalled();
});

test("simple ConfirmationModal should cancel", () => {
  const confirmHandler = jest.fn();
  const cancelHandler = jest.fn();
  const requestCloseHandler = jest.fn();

  const { getByText } = render(
    <ConfirmationModal
      title="Should we?"
      message="Do something…"
      open={true}
      confirmLabel="We Shall"
      onConfirm={confirmHandler}
      onCancel={cancelHandler}
      onRequestClose={requestCloseHandler}
    />,
  );

  fireEvent.click(getByText("Cancel"));
  expect(confirmHandler).not.toHaveBeenCalled();
  expect(cancelHandler).toHaveBeenCalled();
  expect(requestCloseHandler).toHaveBeenCalled();
});

describe("using keyboard shortcuts", () => {
  describe("while focused on actions", () => {
    it("should perform the shortcut if ctrl or meta key is also pressed", () => {
      const confirmHandler = jest.fn();
      const cancelHandler = jest.fn();
      const requestCloseHandler = jest.fn();

      const { getByText } = render(
        <ConfirmationModal
          title="Should we?"
          message="Do something…"
          open={true}
          confirmLabel="We Shall"
          onConfirm={confirmHandler}
          onCancel={cancelHandler}
          onRequestClose={requestCloseHandler}
        />,
      );

      fireEvent.keyDown(getByText("Cancel").closest("button"), {
        key: "Enter",
        code: "Enter",
        ctrlKey: true,
      });

      expect(confirmHandler).toHaveBeenCalled();
      expect(cancelHandler).not.toHaveBeenCalled();
      expect(requestCloseHandler).toHaveBeenCalled();
    });

    it("should not perform the shortcut if lacking ctrl or meta key", () => {
      const confirmHandler = jest.fn();

      const { getByText } = render(
        <ConfirmationModal
          title="Should we?"
          message="nope!"
          open={true}
          confirmLabel="We Shan't"
          onConfirm={confirmHandler}
          onCancel={jest.fn()}
          onRequestClose={jest.fn()}
        />,
      );

      fireEvent.keyDown(getByText("Cancel").closest("button"), {
        key: "Enter",
        code: "Enter",
      });

      expect(confirmHandler).not.toHaveBeenCalled();
    });
  });

  it("should cancel", () => {
    const confirmHandler = jest.fn();
    const cancelHandler = jest.fn();
    const requestCloseHandler = jest.fn();

    const { container } = render(
      <ConfirmationModal
        title="Should we?"
        message="Do something…"
        open={true}
        confirmLabel="We Shall"
        onConfirm={confirmHandler}
        onCancel={cancelHandler}
        onRequestClose={requestCloseHandler}
      />,
    );

    fireEvent.keyDown(container, {
      key: "Escape",
      code: "Escape",
      ctrlKey: true,
    });

    expect(confirmHandler).not.toHaveBeenCalled();
    expect(cancelHandler).toHaveBeenCalled();
    expect(requestCloseHandler).toHaveBeenCalled();
  });

  it("should confirm", () => {
    const confirmHandler = jest.fn();
    const cancelHandler = jest.fn();
    const requestCloseHandler = jest.fn();

    const { container } = render(
      <ConfirmationModal
        title="Should we?"
        message="Do something…"
        open={true}
        confirmLabel="We Shall"
        onConfirm={confirmHandler}
        onCancel={cancelHandler}
        onRequestClose={requestCloseHandler}
      />,
    );

    fireEvent.keyDown(container, {
      key: "Enter",
      code: "Enter",
      ctrlKey: true,
    });

    expect(cancelHandler).not.toHaveBeenCalled();
    expect(confirmHandler).toHaveBeenCalled();
    expect(requestCloseHandler).toHaveBeenCalled();
  });
});

test("controlled ConfirmationModal should confirm", () => {
  const onConfirmHandler = jest.fn();
  const onCancelHandler = jest.fn();

  const { getByText } = render(
    <ControlledConfirm
      onConfirmMock={onConfirmHandler}
      onCancelMock={onCancelHandler}
    />,
  );

  fireEvent.click(getByText("Confirm Bob"));
  fireEvent.click(getByText("Hangout"));
  expect(onConfirmHandler).toHaveBeenCalled();
  expect(onCancelHandler).not.toHaveBeenCalled();
});

test("controlled ConfirmationModal should cancel", () => {
  const onConfirmHandler = jest.fn();
  const onCancelHandler = jest.fn();

  const { getByText } = render(
    <ControlledConfirm
      onConfirmMock={onConfirmHandler}
      onCancelMock={onCancelHandler}
    />,
  );

  fireEvent.click(getByText("Confirm Bob"));
  fireEvent.click(getByText("Cancel"));
  expect(onConfirmHandler).not.toHaveBeenCalled();
  expect(onCancelHandler).toHaveBeenCalled();
});

interface ControlledConfirmProps {
  readonly onConfirmMock: jest.Mock;
  readonly onCancelMock: jest.Mock;
}

function ControlledConfirm({
  onConfirmMock,
  onCancelMock,
}: ControlledConfirmProps) {
  const confirmationModalRef = useRef() as RefObject<ConfirmationModalRef>;

  return (
    <>
      return (
      <Button
        label={`Confirm Bob`}
        onClick={() =>
          confirmationModalRef.current.show({
            title: "Should we?",
            message: "Hang out with Bob?",
            confirmLabel: "Hangout",
            onConfirm: onConfirmMock,
            onCancel: onCancelMock,
          })
        }
      />
      );
      <ConfirmationModal ref={confirmationModalRef} />
    </>
  );
}

test("message should handle markdown", () => {
  const { getByText } = render(
    <ConfirmationModal
      title="Should we?"
      message={`# hello`}
      open={true}
      confirmLabel=""
    />,
  );

  expect(getByText("hello")).toBeInstanceOf(HTMLHeadingElement);
});

test("should have work type button by default", () => {
  const { getByText } = render(
    <ConfirmationModal
      title="Should we?"
      message="Do something…"
      open={true}
      confirmLabel="okay"
    />,
  );
  expect(getByText("okay").parentElement).toHaveClass("work");
});

test("destructive type should have destructive confirmation button", () => {
  const { getByText } = render(
    <ConfirmationModal
      title="Should we?"
      message="Do something…"
      open={true}
      confirmLabel="Pull the plug"
      variation="destructive"
    />,
  );

  expect(getByText("Pull the plug").parentElement).toHaveClass("destructive");
});

test("Work should have work styled confirmation button", () => {
  const { getByText } = render(
    <ConfirmationModal
      title="Should we?"
      message="Do something…"
      open={true}
      confirmLabel="Ok"
      variation="work"
    />,
  );

  expect(getByText("Ok").parentElement).toHaveClass("work");
});

test("should display child component", () => {
  const { getByText } = render(
    <ConfirmationModal
      title="Should we?"
      size={"small"}
      open={true}
      confirmLabel="Ok"
      variation="work"
    >
      <h1>Hello Atlantis!</h1>
    </ConfirmationModal>,
  );

  const text = getByText("Hello Atlantis!");
  expect(text).toBeDefined();
  // Example of message display
  // <div
  //   className="padded base"
  // >
  //   <div
  //     className="padded base"
  //   >
  //     <p
  //       className="base regular base text"
  //     >
  //       Do something…
  //     </p>
  //   </div>
  // </div>

  // Ensure that only child component is displayed
  expect(text?.parentElement?.children[1]).not.toHaveClass("padded", "base");
});
