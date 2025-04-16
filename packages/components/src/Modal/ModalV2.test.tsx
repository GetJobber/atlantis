import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Modal } from "./ModalV2";

it("modal contains a dialog element", () => {
  const { container } = render(<Modal open>Content</Modal>);
  const dialogElement = container.querySelector("dialog");
  expect(dialogElement).toBeInTheDocument();
});

it("modal shows the children and a close button", () => {
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

it("modal without a title doesn't show the header", () => {
  const { queryByTestId } = render(<Modal open={true}>Content</Modal>);
  expect(queryByTestId("modal-header")).toBeNull();
});

/** I'm not sure if this is valid. Should we be removing it from the DOM? */
it("modal appears in the DOM but is not visible", () => {
  const title = "Dis be a title";
  const content = "Dis be a content 🎉";
  const { queryByText } = render(<Modal title={title}>{content}</Modal>);
  expect(queryByText(title)).toBeInTheDocument();
  expect(queryByText(content)).toBeInTheDocument();
  expect(queryByText(title)).not.toBeVisible();
  expect(queryByText(content)).not.toBeVisible();
});

it("modal shows the action buttons", () => {
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

it("modal fires onRequestClose when pressing the escape key", async () => {
  const title = "Dis be a title";
  const content = "Dis be a content 🎉";
  const handleClose = jest.fn();

  const component = render(
    <Modal title={title} open={true} onRequestClose={handleClose}>
      {content}
    </Modal>,
  );

  fireEvent.keyDown(component.getByLabelText("Close modal"), {
    key: "Escape",
    code: 27,
  });

  await waitFor(() => {
    expect(component.queryByText(title)).not.toBeVisible();
    expect(component.queryByText(content)).not.toBeVisible();
  });
});

/** After an hour or so of debugging, it turns out that JSDOM doesn't support the dialog element and its way of focusing. 
This test has been supplanted by a visual test that uses the browser directly.

*/
it("modal gets focused once it opens", async () => {
  const title = "Dis be a title";
  const content = "Dis be a content 🎉";
  const handleClose = jest.fn();

  const component = render(
    <>
      <h1>Some Page</h1>
      <Modal title={title} open={true} onRequestClose={handleClose}>
        {content}
      </Modal>
      <p>There is some content here.</p>
    </>,
  );
  const dialogElement = component.container.querySelector("dialog");
  expect(dialogElement).toBeInTheDocument();
  expect(dialogElement).toHaveClass("visible");
});

it("modal shows with primary learning button", () => {
  const { baseElement } = render(
    <Modal
      title="Teaching Modal"
      open={true}
      primaryAction={{
        label: "I Would Like to Know More",
        variation: "learning",
      }}
      secondaryAction={{
        label: "Nevermind",
      }}
    >
      Learn a lesson?
    </Modal>,
  );
  const learningButton = baseElement.querySelector(".learning.primary");
  expect(learningButton).toBeTruthy();
  expect(learningButton).toHaveTextContent("I Would Like to Know More");
});
