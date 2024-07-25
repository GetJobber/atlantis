import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from ".";
import { PopoverProps } from "./Popover";

const content = "Test Content";

// Mock popper to avoid forceUpdate causing act warnings with testing-library.
jest.mock("@popperjs/core", () => ({
  createPopper: () => ({
    destroy: jest.fn(),
    forceUpdate: jest.fn(),
    update: jest.fn(),
  }),
}));

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
