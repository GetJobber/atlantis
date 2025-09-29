import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from ".";
import { MODAL_HEADER_ID } from "./constants";
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
    const header = screen.getByTestId(MODAL_HEADER_ID);
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

  describe("accessibility", () => {
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

    describe("dialog is named from title prop", () => {
      it("when ariaLabel is not provided", async () => {
        render(
          <Modal.Provider open={true}>
            <Modal.Content>
              <Modal.Header title="Billing Settings" />
            </Modal.Content>
          </Modal.Provider>,
        );

        const dialog = await screen.findByRole("dialog");

        expect(
          screen.getByRole("dialog", { name: "Billing Settings" }),
        ).toBeInTheDocument();
        expect(dialog).toHaveAttribute("aria-labelledby");
      });

      it("when ariaLabel is provided (title takes precedence)", async () => {
        render(
          <Modal.Provider open={true} ariaLabel="This should be ignored">
            <Modal.Content>
              <Modal.Header title="Billing Settings" />
            </Modal.Content>
          </Modal.Provider>,
        );

        const dialog = await screen.findByRole("dialog");

        expect(dialog).toBeInTheDocument();
        expect(
          screen.getByRole("dialog", { name: "Billing Settings" }),
        ).toBeInTheDocument();
        expect(dialog).toHaveAttribute("aria-labelledby");
      });
    });

    describe("dialog is named from ariaLabel", () => {
      it("when no header is provided", async () => {
        render(
          <Modal.Provider open={true} ariaLabel="Add Customer">
            <Modal.Content>{/* no Modal.Header on purpose */}</Modal.Content>
          </Modal.Provider>,
        );

        const dialog = await screen.findByRole("dialog");

        expect(
          screen.getByRole("dialog", { name: "Add Customer" }),
        ).toBeInTheDocument();
        expect(dialog).toHaveAttribute("aria-label", "Add Customer");
      });

      it("when header lacks id/modalLabelledBy", async () => {
        render(
          <Modal.Provider open={true} ariaLabel="Fallback Label">
            <Modal.Content>
              <Modal.Header>
                <span>Custom Header Without ID</span>
              </Modal.Header>
            </Modal.Content>
          </Modal.Provider>,
        );

        const dialog = await screen.findByRole("dialog");

        expect(
          screen.getByRole("dialog", { name: "Fallback Label" }),
        ).toBeInTheDocument();
        expect(dialog).toHaveAttribute("aria-label", "Fallback Label");
      });
    });

    describe("dialog is named from Modal.Header", () => {
      it("when modalLabelledBy matches header id", async () => {
        render(
          <Modal.Provider
            open={true}
            modalLabelledBy="custom-header"
            ariaLabel="This should be ignored"
          >
            <Modal.Content>
              <Modal.Header>
                <span id="custom-header">Custom Header Content</span>
              </Modal.Header>
            </Modal.Content>
          </Modal.Provider>,
        );

        const dialog = await screen.findByRole("dialog");

        expect(dialog).toBeInTheDocument();
        expect(
          screen.getByRole("dialog", { name: "Custom Header Content" }),
        ).toBeInTheDocument();
        expect(dialog).toHaveAttribute("aria-labelledby", "custom-header");
      });

      it("has no accessible name when header lacks id and no ariaLabel", async () => {
        render(
          <Modal.Provider open={true}>
            <Modal.Content>
              <Modal.Header>
                <span>Custom Header Without ID</span>
              </Modal.Header>
            </Modal.Content>
          </Modal.Provider>,
        );

        const dialog = await screen.findByRole("dialog");

        expect(dialog).toBeInTheDocument();
        expect(dialog).not.toHaveAttribute("aria-label");
      });
    });
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

    // Click the backdrop (overlay background). This simulates a real user clicking the dimmed area.
    const backdrops = document.querySelectorAll('[aria-hidden="true"]');
    const topBackdrop = backdrops[backdrops.length - 1] as Element;
    await userEvent.pointer({ keys: "[MouseLeft]", target: topBackdrop });

    expect(handleRequestClose).toHaveBeenCalledTimes(1);
  });

  describe("nested modals", () => {
    function DismissNestedHarness({
      outerCloseSpy,
      innerCloseSpy,
    }: {
      readonly outerCloseSpy: jest.Mock;
      readonly innerCloseSpy: jest.Mock;
    }) {
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

            <Modal.Provider
              open={innerOpen}
              onRequestClose={() => {
                innerCloseSpy();
                setInnerOpen(false);
              }}
            >
              <Modal.Content>
                <Modal.Header title="Inner" />
              </Modal.Content>
            </Modal.Provider>
          </Modal.Content>
        </Modal.Provider>
      );
    }
    it("clicking inner backdrop closes only inner modal", async () => {
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
            </Modal.Content>
          </Modal.Provider>
        );
      }

      render(<NestedHarness />);

      // Click the inner modal's backdrop using its data-modal-node-id
      const dialogs = await screen.findAllByRole("dialog", { hidden: true });
      const innerDialog = dialogs[dialogs.length - 1] as HTMLElement;
      const nodeId = innerDialog.getAttribute("data-modal-node-id");
      const innerBackdrop = document.querySelector(
        `[aria-hidden="true"][data-modal-node-id="${nodeId}"]`,
      ) as Element;
      await userEvent.pointer({ keys: "[MouseLeft]", target: innerBackdrop });

      // Inner closed and removed (only one dialog remains)
      await waitFor(() => expect(innerCloseSpy).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(screen.getAllByRole("dialog", { hidden: true })).toHaveLength(1),
      );
    });

    // eslint-disable-next-line max-statements
    it("Escape closes only the topmost modal first", async () => {
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
            </Modal.Content>
          </Modal.Provider>
        );
      }

      render(<NestedHarness />);

      // Focus the topmost (inner) dialog, then press Escape
      const dialogs = await screen.findAllByRole("dialog", { hidden: true });
      const innerDialog = dialogs[dialogs.length - 1] as HTMLElement;
      innerDialog.focus();
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(innerCloseSpy).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(screen.getAllByRole("dialog", { hidden: true })).toHaveLength(1),
      );

      // Close the remaining (outer) dialog via Escape
      const [outerDialog] = screen.getAllByRole("dialog", { hidden: true });
      (outerDialog as HTMLElement).focus();
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(outerCloseSpy).toHaveBeenCalledTimes(1));
    });

    it("Dismiss button closes only the topmost modal first", async () => {
      const outerCloseSpy = jest.fn();
      const innerCloseSpy = jest.fn();

      render(
        <DismissNestedHarness
          outerCloseSpy={outerCloseSpy}
          innerCloseSpy={innerCloseSpy}
        />,
      );

      const dialogs = await screen.findAllByRole("dialog", { hidden: true });
      const innerDialog = dialogs[dialogs.length - 1];
      await userEvent.click(
        within(innerDialog).getByRole("button", { name: /Close modal/i }),
      );

      await waitFor(() => expect(innerCloseSpy).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(screen.getAllByRole("dialog", { hidden: true })).toHaveLength(1),
      );

      const [outerDialog] = screen.getAllByRole("dialog", { hidden: true });
      await userEvent.click(
        within(outerDialog).getByRole("button", { name: /Close modal/i }),
      );
      await waitFor(() => expect(outerCloseSpy).toHaveBeenCalledTimes(1));
    });
  });
});
