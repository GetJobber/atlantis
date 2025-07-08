import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, type PopoverProps } from ".";
import { Button } from "../Button";

const content = "Test Content";

const PopoverTestComponent = (props: Omit<PopoverProps, "attachTo">) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={divRef}></div>
      <Popover {...props} attachTo={divRef}>
        {props.children}
      </Popover>
    </>
  );
};

const renderPopover = (props: Omit<PopoverProps, "attachTo">) => {
  return render(
    <PopoverTestComponent {...props}>{content}</PopoverTestComponent>,
  );
};

describe("Non-composable Popover", () => {
  it("should render a Popover with the content and dismiss button", async () => {
    const handleClose = jest.fn();

    renderPopover({
      open: true,
      onRequestClose: handleClose,
      children: content,
    });

    expect(screen.queryByText(content)).toBeInstanceOf(HTMLElement);

    await userEvent.click(screen.getByLabelText("Close dialog"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("shouldn't render a popover when open is false", async () => {
    renderPopover({ open: false, children: content });

    expect(screen.queryByText(content)).toBeNull();
  });

  describe("preferredPlacement", () => {
    it("should use bottom placement by default", () => {
      renderPopover({
        open: true,
        children: content,
      });

      const popover = screen.getByTestId("ATL-Popover-Container");
      expect(popover).toHaveAttribute("data-popper-placement", "bottom");
    });

    it("should use specified placement value", () => {
      renderPopover({
        open: true,
        preferredPlacement: "top",
        children: content,
      });

      const popover = screen.getByTestId("ATL-Popover-Container");
      expect(popover).toHaveAttribute("data-popper-placement", "top");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes when open", () => {
      renderPopover({
        open: true,
        children: content,
      });

      const popover = screen.getByTestId("ATL-Popover-Container");
      expect(popover).toHaveAttribute("role", "dialog");
      expect(popover).toHaveAttribute("data-elevation", "elevated");
    });

    it("should have dismiss button with proper accessibility attributes", () => {
      renderPopover({
        open: true,
        children: content,
      });

      const dismissButton = screen.getByLabelText("Close dialog");
      expect(dismissButton).toBeInTheDocument();
      expect(dismissButton).toHaveAttribute("aria-label", "Close dialog");
    });

    it("should be focusable and keyboard accessible", async () => {
      renderPopover({
        open: true,
        children: content,
      });

      const dismissButton = screen.getByLabelText("Close dialog");

      await userEvent.tab();
      expect(dismissButton).toHaveFocus();
    });
  });

  describe("UNSAFE_ props", () => {
    it("should apply the UNSAFE_className to the container", () => {
      renderPopover({
        open: true,
        UNSAFE_className: { container: "custom-container-class" },
        children: content,
      });

      const popover = screen.getByTestId("ATL-Popover-Container");
      expect(popover).toHaveClass("custom-container-class");
    });

    it("should apply the UNSAFE_className to the dismiss button container", () => {
      renderPopover({
        open: true,
        UNSAFE_className: {
          dismissButtonContainer: "custom-dismiss-button-class",
        },
        children: content,
      });

      const dismissButtonContainer = screen.getByTestId(
        "ATL-Popover-Dismiss-Button-Container",
      );
      expect(dismissButtonContainer).toHaveClass("custom-dismiss-button-class");
    });

    it("should apply the UNSAFE_className to the arrow", () => {
      renderPopover({
        open: true,
        UNSAFE_className: { arrow: "custom-arrow-class" },
        children: content,
      });

      const arrow = screen.getByTestId("ATL-Popover-Arrow");
      expect(arrow).toHaveClass("custom-arrow-class");
    });

    it("should apply the UNSAFE_style to the container", () => {
      renderPopover({
        open: true,
        UNSAFE_style: { container: { backgroundColor: "lightblue" } },
        children: content,
      });

      const popover = screen.getByTestId("ATL-Popover-Container");
      expect(getComputedStyle(popover).backgroundColor).toBe("lightblue");
    });

    it("should apply the UNSAFE_style to the dismiss button container", () => {
      renderPopover({
        open: true,
        UNSAFE_style: { dismissButtonContainer: { backgroundColor: "red" } },
        children: content,
      });

      const dismissButtonContainer = screen.getByTestId(
        "ATL-Popover-Dismiss-Button-Container",
      );
      expect(getComputedStyle(dismissButtonContainer).backgroundColor).toBe(
        "red",
      );
    });

    it("should apply the UNSAFE_style to the arrow", () => {
      renderPopover({
        open: true,
        UNSAFE_style: { arrow: { backgroundColor: "green" } },
        children: content,
      });

      const arrow = screen.getByTestId("ATL-Popover-Arrow");
      expect(getComputedStyle(arrow).backgroundColor).toBe("green");
    });
  });
});

describe("Composable Popover", () => {
  it("renders the popover content", async () => {
    const handleClose = jest.fn();
    const divRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <div ref={divRef}></div>
        <Popover.Provider attachTo={divRef} open={true}>
          <Popover.DismissButton onClick={handleClose} />
          {content}
          <Popover.Arrow />
        </Popover.Provider>
      </>,
    );
    expect(screen.queryByText(content)).toBeVisible();
  });

  it("renders the arrow", async () => {
    const handleClose = jest.fn();
    const divRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <div ref={divRef}></div>
        <Popover.Provider attachTo={divRef} open={true}>
          <Popover.DismissButton onClick={handleClose} />
          {content}
          <Popover.Arrow />
        </Popover.Provider>
      </>,
    );

    expect(screen.queryByTestId("ATL-Popover-Arrow")).toBeVisible();
  });

  it("renders the dismiss button and closes the popover when clicked", async () => {
    const handleClose = jest.fn();
    const divRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <div ref={divRef}></div>
        <Popover.Provider attachTo={divRef} open={true}>
          <Popover.DismissButton onClick={handleClose} />
          {content}
          <Popover.Arrow />
        </Popover.Provider>
      </>,
    );

    await userEvent.click(screen.getByLabelText("Close dialog"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("allows rendering a custom dismiss button and closes the popover when clicked", async () => {
    const handleClose = jest.fn();
    const divRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <div ref={divRef}></div>
        <Popover.Provider attachTo={divRef} open={true}>
          <Popover.DismissButton>
            <Button onClick={handleClose}>
              <Button.Label>Close this</Button.Label>
            </Button>
          </Popover.DismissButton>
          {content}
          <Popover.Arrow />
        </Popover.Provider>
      </>,
    );

    await userEvent.click(screen.getByText("Close this"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not render the popover when open is false", async () => {
    const handleClose = jest.fn();
    const divRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <div ref={divRef}></div>
        <Popover.Provider attachTo={divRef} open={false}>
          <Popover.DismissButton onClick={handleClose} />
          {content}
          <Popover.Arrow />
        </Popover.Provider>
      </>,
    );

    expect(screen.queryByText(content)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Close dialog")).not.toBeInTheDocument();
    expect(screen.queryByTestId("ATL-Popover-Arrow")).not.toBeInTheDocument();
  });

  it("does not render the arrow when it's omitted", async () => {
    const handleClose = jest.fn();
    const divRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <div ref={divRef}></div>
        <Popover.Provider attachTo={divRef} open={true}>
          <Popover.DismissButton onClick={handleClose} />
          {content}
        </Popover.Provider>
      </>,
    );

    expect(screen.queryByTestId("ATL-Popover-Arrow")).not.toBeInTheDocument();
  });

  it("does not render the dismiss button when it's omitted", async () => {
    const divRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <div ref={divRef}></div>
        <Popover.Provider attachTo={divRef} open={true}>
          {content}
          <Popover.Arrow />
        </Popover.Provider>
      </>,
    );

    expect(screen.queryByLabelText("Close dialog")).not.toBeInTheDocument();
  });

  describe("UNSAFE_ props", () => {
    it("applies the UNSAFE_ props to the container", () => {
      const handleClose = jest.fn();
      const divRef = React.createRef<HTMLDivElement>();

      render(
        <>
          <div ref={divRef}></div>
          <Popover.Provider
            attachTo={divRef}
            open={true}
            UNSAFE_className={{
              container: "custom-container-class",
            }}
            UNSAFE_style={{
              container: { backgroundColor: "red" },
            }}
          >
            <Popover.DismissButton onClick={handleClose} />
            {content}
            <Popover.Arrow />
          </Popover.Provider>
        </>,
      );

      const popover = screen.getByTestId("ATL-Popover-Container");
      expect(popover).toHaveClass("custom-container-class");
      expect(getComputedStyle(popover).backgroundColor).toBe("red");
    });

    it("applies the UNSAFE_ props to the dismiss button", () => {
      const handleClose = jest.fn();
      const divRef = React.createRef<HTMLDivElement>();

      render(
        <>
          <div ref={divRef}></div>
          <Popover.Provider attachTo={divRef} open={true}>
            <Popover.DismissButton
              onClick={handleClose}
              UNSAFE_className={{
                dismissButtonContainer: "custom-dismiss-button-class",
              }}
              UNSAFE_style={{
                dismissButtonContainer: { backgroundColor: "blue" },
              }}
            />
            {content}
            <Popover.Arrow />
          </Popover.Provider>
        </>,
      );

      const dismissButtonContainer = screen.getByTestId(
        "ATL-Popover-Dismiss-Button-Container",
      );
      expect(dismissButtonContainer).toHaveClass("custom-dismiss-button-class");
      expect(getComputedStyle(dismissButtonContainer).backgroundColor).toBe(
        "blue",
      );
    });

    it("applies the UNSAFE_ props to the arrow", () => {
      const handleClose = jest.fn();
      const divRef = React.createRef<HTMLDivElement>();

      render(
        <>
          <div ref={divRef}></div>
          <Popover.Provider attachTo={divRef} open={true}>
            <Popover.DismissButton onClick={handleClose} />
            {content}
            <Popover.Arrow
              UNSAFE_className={{
                arrow: "custom-arrow-class",
              }}
              UNSAFE_style={{
                arrow: { backgroundColor: "green" },
              }}
            />
          </Popover.Provider>
        </>,
      );

      const arrow = screen.getByTestId("ATL-Popover-Arrow");
      expect(arrow).toHaveClass("custom-arrow-class");
      expect(getComputedStyle(arrow).backgroundColor).toBe("green");
    });
  });
});
