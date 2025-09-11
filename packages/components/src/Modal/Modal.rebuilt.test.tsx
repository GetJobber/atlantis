import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from ".";
import { Content } from "../Content";
import { Text } from "../Text";
import { Button } from "../Button";

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
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass(
      "primary",
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "primary subtle",
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "secondary destructive",
    );
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
              variation: "work",
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
      "tertiary work",
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

  it("closes when clicking the backdrop and stays open when clicking inside", async () => {
    const handleRequestClose = jest.fn();

    render(
      <Modal.Provider open={true} onRequestClose={handleRequestClose}>
        <Modal.Content>
          <Modal.Header title="Modal Title" />
          <Content>
            <button type="button">Inside</button>
          </Content>
        </Modal.Content>
      </Modal.Provider>,
    );

    // Click inside the modal panel should NOT close
    await userEvent.click(screen.getByRole("button", { name: "Inside" }));
    expect(handleRequestClose).not.toHaveBeenCalled();

    // Click the backdrop (overlayBackground inside the branch)
    const branches = document.querySelectorAll("[data-atlantis-modal-branch]");
    const topBranch = branches[branches.length - 1] as HTMLElement;
    const backdrop = topBranch.querySelector('[aria-hidden="true"]') as Element;
    await userEvent.click(backdrop);

    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });

  // eslint-disable-next-line max-statements
  it("nested: clicking inner backdrop closes only inner modal", async () => {
    const outerCloseSpy = jest.fn();
    const innerCloseSpy = jest.fn();

    function NestedHarness() {
      const [outerOpen, setOuterOpen] = React.useState(true);
      const [innerOpen, setInnerOpen] = React.useState(true);

      return (
        <Modal.Provider
          open={outerOpen}
          onRequestClose={() => {
            outerCloseSpy();
            setOuterOpen(false);
          }}
        >
          <Modal.Content>
            <Modal.Header title="Outer" />
            <Content>
              <Text>Outer content</Text>
            </Content>
          </Modal.Content>

          <Modal.Provider
            open={innerOpen}
            onRequestClose={() => {
              innerCloseSpy();
              setInnerOpen(false);
            }}
          >
            <Modal.Content>
              <Modal.Header title="Inner" />
              <Content>
                <Text>Inner content</Text>
                <button type="button">Inner Focus</button>
              </Content>
            </Modal.Content>
          </Modal.Provider>
        </Modal.Provider>
      );
    }

    render(<NestedHarness />);

    // Two dialogs present (include hidden while animations/inert are applied)
    const initialDialogs = await screen.findAllByRole("dialog", {
      hidden: true,
    });
    expect(initialDialogs).toHaveLength(2);

    // Click inner backdrop (pointerdown to match outsidePressEvent)
    const branches = document.querySelectorAll("[data-atlantis-modal-branch]");
    const topBranch = branches[branches.length - 1] as HTMLElement;
    const backdrop = topBranch.querySelector('[aria-hidden="true"]') as Element;
    await userEvent.pointer({ keys: "[MouseLeft]", target: backdrop });

    // Inner closed, outer remains
    await waitFor(() => expect(innerCloseSpy).toHaveBeenCalledTimes(1));
    expect(outerCloseSpy).not.toHaveBeenCalled();
  });

  // eslint-disable-next-line max-statements
  it("nested: Escape closes only the topmost modal first", async () => {
    const outerCloseSpy = jest.fn();
    const innerCloseSpy = jest.fn();

    function NestedHarness() {
      const [outerOpen, setOuterOpen] = React.useState(true);
      const [innerOpen, setInnerOpen] = React.useState(true);

      return (
        <Modal.Provider
          open={outerOpen}
          onRequestClose={() => {
            outerCloseSpy();
            setOuterOpen(false);
          }}
        >
          <Modal.Content>
            <Modal.Header title="Outer" />
          </Modal.Content>

          <Modal.Provider
            open={innerOpen}
            onRequestClose={() => {
              innerCloseSpy();
              setInnerOpen(false);
            }}
          >
            <Modal.Content>
              <Modal.Header title="Inner" />
              <button type="button" data-testid="Inner Focus">
                Inner Focus
              </button>
            </Modal.Content>
          </Modal.Provider>
        </Modal.Provider>
      );
    }

    render(<NestedHarness />);

    const startDialogs = await screen.findAllByRole("dialog", {
      hidden: true,
    });
    expect(startDialogs).toHaveLength(2);

    // Focus inside inner modal then press Escape
    const innerFocus = await screen.findByTestId("Inner Focus");
    await userEvent.click(innerFocus);
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(innerCloseSpy).toHaveBeenCalledTimes(1));
    expect(outerCloseSpy).not.toHaveBeenCalled();

    // Focus the remaining (outer) dialog explicitly by accessible name
    const outerDialog = (await screen.findByRole("dialog", {
      name: /Outer/i,
      hidden: true,
    })) as HTMLElement;
    outerDialog.focus();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(outerCloseSpy).toHaveBeenCalledTimes(1));
  });

  it("returns focus to the activator when closed", async () => {
    function Harness() {
      const [open, setOpen] = React.useState(false);

      return (
        <Modal.Provider open={open} onRequestClose={() => setOpen(false)}>
          <Modal.Content>
            <Modal.Header title="Focus Test" />
          </Modal.Content>
          <Modal.Activator>
            <Button
              label="Open Modal"
              onClick={() => setOpen(true)}
              type="secondary"
            />
          </Modal.Activator>
        </Modal.Provider>
      );
    }

    render(<Harness />);

    const activator = screen.getByRole("button", { name: "Open Modal" });
    activator.focus();
    await userEvent.click(activator);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await waitFor(() => {
      expect(document.activeElement).toBe(activator);
    });
  });
});
