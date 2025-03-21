import React from "react";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SideDrawer } from "./SideDrawer";

describe("SideDrawer", () => {
  describe.each([
    { inline: true, name: "inline" },
    { inline: false, name: "not inline" },
    // eslint-disable-next-line max-statements
  ])("$name", ({ inline }) => {
    it("should not render", () => {
      render(
        <SideDrawer open={false} onRequestClose={jest.fn()} inline={inline} />,
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render when open", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline} />,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should render with a white background", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline} />,
      );
      const drawer = screen.getByRole("dialog");
      expect(drawer).toHaveClass("container");
      expect(drawer).not.toHaveClass("subtle");
    });

    it("should render with a subtle background", () => {
      render(
        <SideDrawer
          open={true}
          onRequestClose={jest.fn()}
          variation="subtle"
          inline={inline}
        />,
      );
      expect(screen.getByRole("dialog")).toHaveClass("subtle");
    });

    it("should render a string title", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline}>
          <SideDrawer.Title>Title</SideDrawer.Title>
        </SideDrawer>,
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("should render a custom title", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline}>
          <SideDrawer.Title>
            <pre>Title</pre>
          </SideDrawer.Title>
        </SideDrawer>,
      );
      expect(screen.getByText("Title")).toBeInstanceOf(HTMLPreElement);
    });

    it("should render the actions", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline}>
          <SideDrawer.Actions>
            <button type="button">Button1</button>
            <button type="button">Button2</button>
          </SideDrawer.Actions>
        </SideDrawer>,
      );

      expect(screen.getByText("Button1")).toBeInTheDocument();
      expect(screen.getByText("Button2")).toBeInTheDocument();
    });

    it("should render a toolbar", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline}>
          <SideDrawer.Toolbar>
            <input type="text" placeholder="Input" />
          </SideDrawer.Toolbar>
        </SideDrawer>,
      );

      expect(screen.getByPlaceholderText("Input")).toBeInTheDocument();
    });

    it("should render the back button", async () => {
      const handleClick = jest.fn();
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline}>
          <SideDrawer.BackButton onClick={handleClick} />
        </SideDrawer>,
      );

      const backButton = screen.getByRole("button", { name: "Back" });
      expect(backButton).toBeInTheDocument();

      await userEvent.click(backButton);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should render the footer", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline}>
          <SideDrawer.Footer>Footer</SideDrawer.Footer>
        </SideDrawer>,
      );

      const footer = screen.getByText("Footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute("data-side-drawer-slot");
    });

    describe("When closed", () => {
      const onRequestClose = jest.fn();

      beforeEach(() => {
        render(
          <SideDrawer
            open={true}
            onRequestClose={onRequestClose}
            inline={inline}
          />,
        );
      });

      afterEach(() => {
        onRequestClose.mockClear();
      });

      it("should call onRequestClose when clicking the close button", async () => {
        const dialog = screen.getByRole("dialog");
        const closeButton = within(dialog).getByLabelText("Close");
        await userEvent.click(closeButton);

        expect(onRequestClose).toHaveBeenCalledTimes(1);
      });

      it("should call onRequestClose when pressing the escape key", async () => {
        await userEvent.keyboard("{Escape}");

        expect(onRequestClose).toHaveBeenCalledTimes(1);
      });
    });

    /**
     * This test ensures that the aria label for Close and Back are present as
     * we're using them to style the button directly when the title is not present.
     *
     * If we couldn't find both buttons, that means the UI will be broken when
     * scrolling down.
     */
    it("should have an aria label for Close and Back", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()} inline={inline}>
          <SideDrawer.BackButton />
        </SideDrawer>,
      );

      const drawer = within(screen.getByRole("dialog"));

      expect(drawer.getByRole("button", { name: "Close" })).toBeInTheDocument();
      expect(drawer.getByRole("button", { name: "Back" })).toBeInTheDocument();
    });

    describe("UNSAFE_PROPS", () => {
      describe("When using UNSAFE_className", () => {
        it("should apply custom class to the container", () => {
          render(
            <SideDrawer
              inline={inline}
              open={true}
              onRequestClose={jest.fn()}
              UNSAFE_className={{ container: "custom-class" }}
            />,
          );

          const drawer = screen.getByRole("dialog").parentElement;
          expect(drawer).toHaveClass("custom-class");
        });
      });
      describe("When using UNSAFE_style", () => {
        it("should apply custom styles to the container", () => {
          render(
            <SideDrawer
              inline={inline}
              open={true}
              onRequestClose={jest.fn()}
              UNSAFE_style={{ container: { width: "250px" } }}
            />,
          );

          const drawer = screen.getByRole("dialog").parentElement;
          expect(drawer).toHaveStyle({ width: "250px" });
        });
      });
    });
  });
});
