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
