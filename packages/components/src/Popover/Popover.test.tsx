import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, type PopoverProps } from ".";

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

describe("Popover", () => {
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

  describe("UNSAFE_ props", () => {
    it("should apply the UNSAFE_className to the container", () => {
      renderPopover({
        open: true,
        UNSAFE_className: { container: "custom-container-class" },
        children: content,
      });

      const popover = screen.getByTestId("popover-container");
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
        "popover-dismiss-button-container",
      );
      expect(dismissButtonContainer).toHaveClass("custom-dismiss-button-class");
    });

    it("should apply the UNSAFE_className to the arrow", () => {
      renderPopover({
        open: true,
        UNSAFE_className: { arrow: "custom-arrow-class" },
        children: content,
      });

      const arrow = screen.getByTestId("popover-arrow");
      expect(arrow).toHaveClass("custom-arrow-class");
    });

    it("should apply the UNSAFE_style to the container", () => {
      renderPopover({
        open: true,
        UNSAFE_style: { container: { backgroundColor: "lightblue" } },
        children: content,
      });

      const popover = screen.getByTestId("popover-container");
      expect(getComputedStyle(popover).backgroundColor).toBe("lightblue");
    });

    it("should apply the UNSAFE_style to the dismiss button container", () => {
      renderPopover({
        open: true,
        UNSAFE_style: { dismissButtonContainer: { backgroundColor: "red" } },
        children: content,
      });

      const dismissButtonContainer = screen.getByTestId(
        "popover-dismiss-button-container",
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

      const arrow = screen.getByTestId("popover-arrow");
      expect(getComputedStyle(arrow).backgroundColor).toBe("green");
    });
  });
});
