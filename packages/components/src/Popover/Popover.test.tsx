import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from ".";
import { PopoverProps } from "./Popover";

const content = "Test Content";

const PopoverTestComponent = (props: Omit<PopoverProps, "attachTo">) => {
  const divRef = useRef(null);

  return (
    <>
      <div ref={divRef}></div>
      <Popover {...props} attachTo={divRef}>
        {props.children}
      </Popover>
    </>
  );
};

describe("Popover", () => {
  it("should render a Popover with the content and dismiss button", async () => {
    const handleClose = jest.fn();

    render(
      <PopoverTestComponent open={true} onRequestClose={handleClose}>
        {content}
      </PopoverTestComponent>,
    );

    expect(screen.queryByText(content)).toBeInstanceOf(HTMLElement);

    await userEvent.click(screen.getByLabelText("Close dialog"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("shouldn't render a popover when open is false", async () => {
    render(<PopoverTestComponent open={false}>{content}</PopoverTestComponent>);

    expect(screen.queryByText(content)).toBeNull();
  });

  describe("UNSAFE_ props", () => {
    it("should apply the UNSAFE_className to the Popover", () => {
      render(
        <PopoverTestComponent open={true} UNSAFE_className="custom-class">
          {content}
        </PopoverTestComponent>,
      );

      const popover = screen.getByRole("dialog");
      expect(popover).toHaveClass("custom-class");
    });

    it("should apply the UNSAFE_style to the Popover", () => {
      render(
        <PopoverTestComponent
          open={true}
          UNSAFE_style={{ backgroundColor: "lightblue" }}
        >
          {content}
        </PopoverTestComponent>,
      );

      const popover = screen.getByRole("dialog");
      expect(getComputedStyle(popover).backgroundColor).toBe("lightblue");
    });
  });
});
