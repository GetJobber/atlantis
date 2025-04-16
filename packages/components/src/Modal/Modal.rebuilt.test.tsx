import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from ".";
import styles from "./Modal.module.css";
import { Content } from "../Content";
import { Text } from "../Text";

describe("Default Modal", () => {
  it('modal contains aria role of "dialog"', async () => {
    const { findByRole } = render(
      <Modal open version={2}>
        Content
      </Modal>,
    );
    expect(await findByRole("dialog")).toBeInTheDocument();
  });

  it("modal shows the children and a close button", () => {
    const title = "Dis be a title";
    const content = "Dis be a content 🎉";
    const handleClose = jest.fn();

    const { getByLabelText, getByText, queryByTestId } = render(
      <Modal title={title} open={true} onRequestClose={handleClose} version={2}>
        {content}
      </Modal>,
    );
    expect(getByText(title)).toBeTruthy();
    expect(getByText(content)).toBeTruthy();
    expect(queryByTestId("ATL-Modal-Header")).not.toBeNull();

    fireEvent.click(getByLabelText("Close modal"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("modal without a title doesn't show the header", () => {
    const { queryByTestId } = render(
      <Modal open={true} version={2}>
        Content
      </Modal>,
    );
    expect(queryByTestId("modal-header")).toBeNull();
  });

  it("modal doesn't show up", () => {
    const title = "Dis be a title";
    const content = "Dis be a content 🎉";
    const { queryByText } = render(
      <Modal title={title} version={2}>
        {content}
      </Modal>,
    );
    expect(queryByText(title)).toBeNull();
    expect(queryByText(content)).toBeNull();
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
        version={2}
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

  it("modal fires onRequestClose when pressing the escape key", () => {
    const handleClose = jest.fn();

    const { getByLabelText } = render(
      <Modal
        title="Press escape!"
        open={true}
        onRequestClose={handleClose}
        version={2}
      >
        No really. Press escape!
      </Modal>,
    );

    fireEvent.keyDown(getByLabelText("Close modal"), {
      key: "Escape",
      code: 27,
    });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("modal gets focused once it opens", async () => {
    const title = "Dis be a title";
    const content = "Dis be a content 🎉";
    const handleClose = jest.fn();

    const { baseElement } = render(
      <>
        <h1>Some Page</h1>
        <Modal
          title={title}
          open={true}
          onRequestClose={handleClose}
          version={2}
        >
          {content}
        </Modal>
        <p>There is some content here.</p>
      </>,
    );

    const containerEl = baseElement.querySelector(`.${styles.modal}`);
    await waitFor(() => {
      expect(containerEl).toHaveFocus();
    });
  });

  it("modal shows with primary learning button", () => {
    const { baseElement } = render(
      <Modal
        version={2}
        title="Teaching Modal"
        open={true}
        primaryAction={{
          label: "I Would Like to Know More",
          variation: "learning",
        }}
      >
        Learn a lesson?
      </Modal>,
    );
    const learningButton = baseElement.querySelector(".learning.primary");
    expect(learningButton).toBeTruthy();
    expect(learningButton).toHaveTextContent("I Would Like to Know More");
  });
});

describe("Composable Modal", () => {
  it("should render the modal content", () => {
    render(
      <Modal.Provider open={true}>
        <Modal.Wrapper>
          <Modal.Header title="Modal Title" />
          <Content>
            <Text>This is some extra content</Text>
          </Content>
          <Modal.Actions
            primary={{ label: "Submit" }}
            secondary={{ label: "Cancel" }}
            tertiary={{ label: "Delete", variation: "destructive" }}
          />
        </Modal.Wrapper>
      </Modal.Provider>,
    );
    const header = screen.getByTestId("ATL-Modal-Header");
    expect(header).toBeDefined();
    expect(header).toHaveTextContent("Modal Title");
    expect(screen.getByText("This is some extra content")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it('modal contains aria role of "dialog"', async () => {
    render(
      <Modal.Provider open={true}>
        <Modal.Wrapper>
          <Modal.Header title="Modal Title" />
        </Modal.Wrapper>
      </Modal.Provider>,
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("calls onRequestClose when pressing the escape key", async () => {
    const handleRequestClose = jest.fn();
    render(
      <Modal.Provider open={true} onRequestClose={handleRequestClose}>
        <Modal.Wrapper>
          <Modal.Header title="Modal Title" />
        </Modal.Wrapper>
      </Modal.Provider>,
    );

    await userEvent.keyboard("{Escape}");
    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });
});
