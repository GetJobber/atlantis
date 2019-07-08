import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Modal } from ".";

afterEach(cleanup);

test("modal shows the children and a close button", () => {
  const handleClose = jest.fn();

  const { getByLabelText, getByText } = render(
    <Modal title="Dis be a title" open={true} onRequestClose={handleClose}>
      Dis be a content 🎉
    </Modal>,
  );
  expect(getByText("Dis be a title")).toBeTruthy();
  expect(getByText("Dis be a content 🎉")).toBeTruthy();

  fireEvent.click(getByLabelText("Close modal"));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("modal doesn't show up", () => {
  const { queryByText } = render(
    <Modal title="What is love?">Baby dont show me, no mo</Modal>,
  );
  expect(queryByText("What is love?")).toBeNull();
  expect(queryByText("Baby dont show me, no mo")).toBeNull();
});

test("modal shows the action buttons", () => {
  const handlePrimaryAction = jest.fn();
  const handleSecondaryAction = jest.fn();
  const handleTertiaryAction = jest.fn();
  const { getByText } = render(
    <Modal
      title="Got some buttons?"
      open={true}
      primaryAction={{ label: "Submit", onClick: handlePrimaryAction }}
      secondaryAction={{ label: "Cancel", onClick: handleSecondaryAction }}
      tertiaryAction={{ label: "Delete", onClick: handleTertiaryAction }}
    >
      Button me up!
    </Modal>,
  );

  fireEvent.click(getByText("Submit"));
  expect(handlePrimaryAction).toHaveBeenCalledTimes(1);

  fireEvent.click(getByText("Cancel"));
  expect(handleSecondaryAction).toHaveBeenCalledTimes(1);

  fireEvent.click(getByText("Delete"));
  expect(handleTertiaryAction).toHaveBeenCalledTimes(1);
});
