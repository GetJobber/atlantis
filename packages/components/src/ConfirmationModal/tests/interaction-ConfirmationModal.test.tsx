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
      text="Do something…"
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
      text="Do something…"
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
  onConfirmMock: jest.Mock;
  onCancelMock: jest.Mock;
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
            text: "Hang out with Bob?",
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
