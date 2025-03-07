import React from "react";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SideDrawer } from "./SideDrawer";

const createMockAnchorRect = () => {
  const rect = {
    top: 100,
    right: 500,
    bottom: 200,
    left: 200,
    width: 300,
    height: 100,
    x: 200,
    y: 100,
  };

  return {
    ...rect,
    toJSON: () => rect,
  };
};

describe("SideDrawer", () => {
  describe("Basic rendering", () => {
    it("should not render when closed", () => {
      render(<SideDrawer open={false} onRequestClose={jest.fn()} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render when open", () => {
      render(<SideDrawer open={true} onRequestClose={jest.fn()} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should render with a white background", () => {
      render(<SideDrawer open={true} onRequestClose={jest.fn()} />);
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
        />,
      );
      expect(screen.getByRole("dialog")).toHaveClass("subtle");
    });
  });

  describe("Child components", () => {
    it("should render a string title", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()}>
          <SideDrawer.Title>Title</SideDrawer.Title>
        </SideDrawer>,
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("should render a custom title", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()}>
          <SideDrawer.Title>
            <pre>Title</pre>
          </SideDrawer.Title>
        </SideDrawer>,
      );
      expect(screen.getByText("Title")).toBeInstanceOf(HTMLPreElement);
    });

    it("should render the actions", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()}>
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
        <SideDrawer open={true} onRequestClose={jest.fn()}>
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
        <SideDrawer open={true} onRequestClose={jest.fn()}>
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
        <SideDrawer open={true} onRequestClose={jest.fn()}>
          <SideDrawer.Footer>Footer</SideDrawer.Footer>
        </SideDrawer>,
      );

      const footer = screen.getByText("Footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute("data-side-drawer-slot");
    });
  });

  describe("Interaction behavior", () => {
    describe("When closed", () => {
      const onRequestClose = jest.fn();

      beforeEach(() => {
        render(<SideDrawer open={true} onRequestClose={onRequestClose} />);
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

    it("should have an aria label for Close and Back", () => {
      render(
        <SideDrawer open={true} onRequestClose={jest.fn()}>
          <SideDrawer.BackButton />
        </SideDrawer>,
      );

      const drawer = within(screen.getByRole("dialog"));

      expect(drawer.getByRole("button", { name: "Close" })).toBeInTheDocument();
      expect(drawer.getByRole("button", { name: "Back" })).toBeInTheDocument();
    });
  });

  describe("Positioning and styling", () => {
    describe("When anchored to an element", () => {
      beforeEach(() => {
        const mockElement = document.createElement("div");
        jest
          .spyOn(mockElement, "getBoundingClientRect")
          .mockReturnValue(createMockAnchorRect());

        const anchorRef = { current: mockElement };
        render(
          <SideDrawer
            open={true}
            onRequestClose={jest.fn()}
            anchorElement={anchorRef}
          />,
        );
      });

      it("should position the drawer relative to the anchor element", () => {
        const drawer = screen.getByRole("dialog").parentElement;
        expect(drawer).toHaveStyle({
          position: "absolute",
          top: "100px",
          left: "80px", // right (500) - width (420, the default max)
          width: "420px",
        });
      });

      it("should add the anchored class", () => {
        const drawer = screen.getByRole("dialog").parentElement;
        expect(drawer).toHaveClass("anchored");
      });
    });

    describe("When using UNSAFE_className", () => {
      it("should apply custom class to the container", () => {
        render(
          <SideDrawer
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
            open={true}
            onRequestClose={jest.fn()}
            UNSAFE_style={{ container: { width: "250px" } }}
          />,
        );

        const drawer = screen.getByRole("dialog").parentElement;
        expect(drawer).toHaveStyle({ width: "250px" });
      });

      it("should merge custom styles with anchor positioning", () => {
        const mockElement = document.createElement("div");
        jest
          .spyOn(mockElement, "getBoundingClientRect")
          .mockReturnValue(createMockAnchorRect());

        const anchorRef = { current: mockElement };
        render(
          <SideDrawer
            open={true}
            onRequestClose={jest.fn()}
            anchorElement={anchorRef}
            UNSAFE_style={{
              container: { backgroundColor: "red" },
            }}
          />,
        );

        const drawer = screen.getByRole("dialog").parentElement;
        expect(drawer).toHaveStyle({
          position: "absolute",
          top: "100px",
          left: "80px", // right (500) - width (420, the default max)
          width: "420px",
          backgroundColor: "red",
        });
      });

      it("should allow UNSAFE_style to override default anchor positioning styles", () => {
        const mockElement = document.createElement("div");
        jest
          .spyOn(mockElement, "getBoundingClientRect")
          .mockReturnValue(createMockAnchorRect());

        const anchorRef = { current: mockElement };
        render(
          <SideDrawer
            open={true}
            onRequestClose={jest.fn()}
            anchorElement={anchorRef}
            UNSAFE_style={{
              container: {
                width: "250px",
                left: "0px",
                top: "0px",
              },
            }}
          />,
        );

        const drawer = screen.getByRole("dialog").parentElement;
        expect(drawer).toHaveStyle({
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "250px",
        });
      });
    });
  });
});
