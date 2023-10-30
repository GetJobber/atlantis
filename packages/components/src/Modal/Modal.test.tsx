import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Modal } from ".";
import styles from "./Modal.css";

afterEach(cleanup);

test('modal contains aria role of "dialog"', async () => {
  const { findByRole } = render(<Modal open>Content</Modal>);
  expect(await findByRole("dialog")).toBeDefined();
});

test("modal shows the children and a close button", () => {
  const title = "Dis be a title";
  const content = "Dis be a content 🎉";
  const handleClose = jest.fn();

  const { getByLabelText, getByText, queryByTestId } = render(
    <Modal title={title} open={true} onRequestClose={handleClose}>
      {content}
    </Modal>,
  );
  expect(getByText(title)).toBeTruthy();
  expect(getByText(content)).toBeTruthy();
  expect(queryByTestId("modal-header")).not.toBeNull();

  fireEvent.click(getByLabelText("Close modal"));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("modal without a title doesn't show the header", () => {
  const { queryByTestId } = render(<Modal open={true}>Content</Modal>);
  expect(queryByTestId("modal-header")).toBeNull();
});

test("modal doesn't show up", () => {
  const title = "Dis be a title";
  const content = "Dis be a content 🎉";
  const { queryByText } = render(<Modal title={title}>{content}</Modal>);
  expect(queryByText(title)).toBeNull();
  expect(queryByText(content)).toBeNull();
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

test("modal fires onRequestClose when pressing the escape key", () => {
  const handleClose = jest.fn();

  const { getByLabelText } = render(
    <Modal title="Press escape!" open={true} onRequestClose={handleClose}>
      No really. Press escape!
    </Modal>,
  );

  fireEvent.keyDown(getByLabelText("Close modal"), { key: "Escape", code: 27 });
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("modal gets focused once it opens", () => {
  const title = "Dis be a title";
  const content = "Dis be a content 🎉";
  const handleClose = jest.fn();

  const { baseElement } = render(
    <>
      <h1>Some Page</h1>
      <Modal title={title} open={true} onRequestClose={handleClose}>
        {content}
      </Modal>
      <p>There is some content here.</p>
    </>,
  );

  const containerEl = baseElement.querySelector(`.${styles.container}`);
  expect(containerEl).toHaveFocus();
});
