import React from "react";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";
import styles from "./Modal.module.css";
import { useModalStyles } from "./useModalStyles";
import { Content } from "../Content";
import { Text } from "../Text";

describe("Default Modal", () => {
  it('modal contains aria role of "dialog"', async () => {
    const { findByRole } = render(<Modal open>Content</Modal>);
    expect(await findByRole("dialog")).toBeInTheDocument();
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
    expect(queryByTestId("ATL-Modal-Header")).not.toBeNull();

    fireEvent.click(getByLabelText("Close modal"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("modal without a title doesn't show the header", () => {
    const { queryByTestId } = render(<Modal open={true}>Content</Modal>);
    expect(queryByTestId("modal-header")).toBeNull();
  });

  it("modal doesn't show up", () => {
    const title = "Dis be a title";
    const content = "Dis be a content 🎉";
    const { queryByText } = render(<Modal title={title}>{content}</Modal>);
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
      <Modal title="Press escape!" open={true} onRequestClose={handleClose}>
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
        <Modal title={title} open={true} onRequestClose={handleClose}>
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

  describe("UNSAFE_ props", () => {
    const customModalClass = "custom-modal-class";
    const customHeaderClass = "custom-header-class";
    const customActionBarClass = "custom-action-bar-class";
    const customRightActionClass = "custom-right-action-class";
    const customLeftActionClass = "custom-left-action-class";
    const customModalStyle = { backgroundColor: "pink", borderRadius: "10px" };
    const customHeaderStyle = { color: "purple", fontStyle: "italic" };
    const customActionBarStyle = {
      backgroundColor: "lightyellow",
      padding: "15px",
    };
    const customRightActionStyle = {
      backgroundColor: "lightblue",
      padding: "15px",
    };
    const customLeftActionStyle = {
      backgroundColor: "lightgreen",
      padding: "15px",
    };
    it("applies UNSAFE_className to the modal", () => {
      render(
        <Modal
          open={true}
          UNSAFE_className={{
            modal: customModalClass,
            header: customHeaderClass,
            actionBar: customActionBarClass,
            rightAction: customRightActionClass,
            leftAction: customLeftActionClass,
          }}
          secondaryAction={{
            label: "Nevermind",
          }}
          tertiaryAction={{
            label: "Delete",
            variation: "destructive",
          }}
          title="Custom styled title"
        >
          Custom styled modal
        </Modal>,
      );

      // Look for the dialog element directly with the role and then check for the custom class
      const modalElement = screen.getByRole("dialog");
      const modalActions = screen.getByTestId("ATL-Modal-Actions");
      expect(modalElement).toHaveClass(customModalClass);
      expect(screen.getByTestId("ATL-Modal-Header")).toHaveClass(
        customHeaderClass,
      );
      expect(modalActions).toHaveClass(customActionBarClass);
      expect(modalActions.firstChild).toHaveClass(customRightActionClass);
      expect(modalActions.lastChild).toHaveClass(customLeftActionClass);
    });

    it("applies UNSAFE_style to the modal", () => {
      render(
        <Modal
          open={true}
          UNSAFE_style={{
            modal: customModalStyle,
            header: customHeaderStyle,
            actionBar: customActionBarStyle,
            rightAction: customRightActionStyle,
            leftAction: customLeftActionStyle,
          }}
          secondaryAction={{
            label: "Nevermind",
          }}
          tertiaryAction={{
            label: "Delete",
            variation: "destructive",
          }}
          title="Custom styled title"
        >
          Custom styled modal
        </Modal>,
      );

      // Look for the dialog element directly with the role and then check for the custom style
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toHaveStyle(customModalStyle);
      expect(screen.getByTestId("ATL-Modal-Header")).toHaveStyle(
        customHeaderStyle,
      );
      expect(screen.getByTestId("ATL-Modal-Actions")).toHaveStyle(
        customActionBarStyle,
      );
      expect(screen.getByTestId("ATL-Modal-Actions").firstChild).toHaveStyle(
        customRightActionStyle,
      );
      expect(screen.getByTestId("ATL-Modal-Actions").lastChild).toHaveStyle(
        customLeftActionStyle,
      );
    });
  });
});

describe("Composable Modal", () => {
  function ComposedModal({
    children,
    onRequestClose,
  }: {
    readonly children: React.ReactNode;
    readonly onRequestClose: () => void;
  }) {
    return (
      <Modal open={true} onRequestClose={onRequestClose}>
        {children}
      </Modal>
    );
  }

  it("renders a modal", () => {
    render(<ComposedModal onRequestClose={jest.fn()}>Content</ComposedModal>);
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("renders the modal with a header", async () => {
    const handleRequestClose = jest.fn();
    render(
      <ComposedModal onRequestClose={handleRequestClose}>
        <Modal.Header title="Modal Title" />
      </ComposedModal>,
    );
    const header = screen.getByTestId("ATL-Modal-Header");
    const dismissButton = screen.getByLabelText("Close modal");

    expect(header).toBeDefined();
    expect(header).toHaveTextContent("Modal Title");
    await userEvent.click(dismissButton);
    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });

  it("renders composed actions", async () => {
    const handlePrimaryAction = jest.fn();
    const handleSecondaryAction = jest.fn();
    const handleRequestClose = jest.fn();
    render(
      <ComposedModal onRequestClose={handleRequestClose}>
        <Modal.Header title="Modal Title" />
        <Modal.Actions
          primary={{ label: "Submit", onClick: handlePrimaryAction }}
          secondary={{ label: "Cancel", onClick: handleSecondaryAction }}
        />
      </ComposedModal>,
    );
    const primaryButton = screen.getByText("Submit");
    const secondaryButton = screen.getByText("Cancel");

    await userEvent.click(primaryButton);
    expect(handlePrimaryAction).toHaveBeenCalledTimes(1);
    await userEvent.click(secondaryButton);
    expect(handleSecondaryAction).toHaveBeenCalledTimes(1);
    expect(handleRequestClose).toHaveBeenCalledTimes(0);
  });

  it("closes the modal when the escape key is pressed", async () => {
    const handleRequestClose = jest.fn();
    render(
      <ComposedModal onRequestClose={handleRequestClose}>
        Content
      </ComposedModal>,
    );
    await userEvent.keyboard("{Escape}");
    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });

  it("should render custom modal header", () => {
    const { result: modalStyles } = renderHook(() => useModalStyles());
    render(
      <ComposedModal onRequestClose={jest.fn()}>
        <Modal.Header>
          <div
            className={modalStyles.current.header}
            data-testid="custom-header"
          >
            <h1>Modal Title</h1>
          </div>
        </Modal.Header>
      </ComposedModal>,
    );
    const customHeader = screen.getByTestId("custom-header");
    expect(customHeader).toHaveClass(modalStyles.current.header);
    expect(customHeader).toHaveTextContent("Modal Title");
  });

  describe("UNSAFE_ props", () => {
    it("applies UNSAFE_className to Modal.Header", () => {
      const customClass = "custom-header-class";
      render(
        <ComposedModal onRequestClose={jest.fn()}>
          <Modal.Header
            title="Custom Header"
            UNSAFE_className={{ header: customClass }}
          />
        </ComposedModal>,
      );

      const headerElement = screen.getByTestId("ATL-Modal-Header");
      expect(headerElement).toHaveClass(customClass);
    });

    it("applies UNSAFE_style to Modal.Header", () => {
      const customStyle = { color: "purple", fontStyle: "italic" };
      render(
        <ComposedModal onRequestClose={jest.fn()}>
          <Modal.Header
            title="Custom Header"
            UNSAFE_style={{ header: customStyle }}
          />
        </ComposedModal>,
      );

      const headerElement = screen.getByTestId("ATL-Modal-Header");
      expect(headerElement).toHaveStyle(customStyle);
    });

    it("applies UNSAFE_className to Modal.Actions", () => {
      const customClass = "custom-actions-class";
      render(
        <ComposedModal onRequestClose={jest.fn()}>
          <Modal.Actions
            primary={{ label: "Submit" }}
            UNSAFE_className={{ actionBar: customClass }}
          />
        </ComposedModal>,
      );

      const actionBarElement = screen.getByTestId("ATL-Modal-Actions");
      expect(actionBarElement).toHaveClass(customClass);
    });

    it("applies UNSAFE_style to Modal.Actions", () => {
      const customStyle = { backgroundColor: "lightyellow", padding: "15px" };
      render(
        <ComposedModal onRequestClose={jest.fn()}>
          <Modal.Actions
            primary={{ label: "Submit" }}
            UNSAFE_style={{ actionBar: customStyle }}
          />
        </ComposedModal>,
      );

      const actionBarElement = screen.getByTestId("ATL-Modal-Actions");
      expect(actionBarElement).toHaveStyle(customStyle);
    });
  });
});

describe("Modal.Provider", () => {
  const open = true;

  it("should render the modal content", () => {
    render(
      <Modal.Provider open={open}>
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
      <Modal.Provider open={open}>
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
      <Modal.Provider open={open} onRequestClose={handleRequestClose}>
        <Modal.Wrapper>
          <Modal.Header title="Modal Title" />
        </Modal.Wrapper>
      </Modal.Provider>,
    );

    await userEvent.keyboard("{Escape}");
    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });
});
