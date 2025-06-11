import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from ".";
import { Content } from "../Content";
import { Text } from "../Text";

describe("Composable Modal", () => {
  it("should render the modal content", () => {
    render(
      <Modal.Provider open={true}>
        <Modal.Content>
          <Modal.Header title="Modal Title" />
          <Content>
            <Text>This is some extra content</Text>
          </Content>
          <Modal.Actions
            primary={{ label: "Submit" }}
            secondary={{ label: "Cancel" }}
            tertiary={{ label: "Delete", variation: "destructive" }}
          />
        </Modal.Content>
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

  it("should allow overriding of action buttons", () => {
    render(
      <Modal.Provider open={true}>
        <Modal.Content>
          <Modal.Header title="Modal Title" />
          <Modal.Actions
            primary={{
              label: "Submit",
              variation: "destructive",
              type: "secondary",
            }}
            secondary={{
              label: "Cancel",
              variation: "subtle",
              type: "tertiary",
            }}
            tertiary={{
              label: "Delete",
              variation: "destructive",
              type: "secondary",
            }}
          />
        </Modal.Content>
      </Modal.Provider>,
    );
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass(
      "secondary destructive",
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "tertiary subtle",
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "secondary destructive",
    );
  });
  it('modal contains aria role of "dialog"', async () => {
    render(
      <Modal.Provider open={true}>
        <Modal.Content>
          <Modal.Header title="Modal Title" />
        </Modal.Content>
      </Modal.Provider>,
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("calls onRequestClose when pressing the escape key", async () => {
    const handleRequestClose = jest.fn();
    render(
      <Modal.Provider open={true} onRequestClose={handleRequestClose}>
        <Modal.Content>
          <Modal.Header title="Modal Title" />
        </Modal.Content>
      </Modal.Provider>,
    );

    await userEvent.keyboard("{Escape}");
    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });

  it("should render the modal header with custom content", () => {
    render(
      <Modal.Provider open={true} modalLabelledBy="custom-header">
        <Modal.Content>
          <Modal.Header>
            <span id="custom-header">Custom Header Content</span>
          </Modal.Header>
        </Modal.Content>
      </Modal.Provider>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-labelledby",
      "custom-header",
    );
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "Custom Header Content",
    );
  });
});
