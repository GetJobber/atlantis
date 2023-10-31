import React, { useRef } from "react";
import { RenderResult, act, fireEvent, render } from "@testing-library/react";
import { Popover } from ".";
import { PopoverProps } from "./Popover";

let rendered: RenderResult;
const content = "Test Content";

const PopoverTestComponent = (props: Omit<PopoverProps, "attachTo">) => {
  const divRef = useRef();

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

  await act(async () => {
    rendered = render(
      <PopoverTestComponent open={true} onRequestClose={handleClose}>
        {content}
      </PopoverTestComponent>,
    );
  });

  const { queryByText, queryByLabelText } = rendered;

  expect(queryByText(content)).toBeInstanceOf(HTMLElement);

  fireEvent.click(queryByLabelText("Close dialog"));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

it("shouldn't render a popover when open is false", async () => {
  await act(async () => {
    rendered = render(
      <PopoverTestComponent open={false}>{content}</PopoverTestComponent>,
    );
  });

  const { queryByText } = rendered;
  expect(queryByText(content)).toBeNull();
});
