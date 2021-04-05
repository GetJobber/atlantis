import React, { useRef } from "react";
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";
import { Popover } from ".";
import { PopoverProps } from "./Popover";

afterEach(cleanup);

let rendered: RenderResult;
const content = "Test Content";

const PopoverTestComponent = (props: PopoverProps) => {
  const checkboxRef = useRef();
  return (
    <>
      <div ref={checkboxRef}></div>
      <Popover {...props} attachTo={checkboxRef}>
        {props.children}
      </Popover>
    </>
  );
};

it("should render a Popover with the content and dismiss button", async () => {
  const handleClose = jest.fn();

  await act(async () => {
    rendered = render(
      <PopoverTestComponent
        attachTo={undefined}
        open={true}
        onRequestClose={handleClose}
      >
        {content}
      </PopoverTestComponent>,
    );
  });

  const { queryByText, queryByTestId, container } = rendered;

  expect(queryByText(content)).toBeTruthy();
  expect(queryByTestId("popover")).not.toBeNull();

  fireEvent.click(container.querySelector("[aria-label='Close modal']"));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

it("shouldn't render a dismiss button if dismissible is false", async () => {
  await act(async () => {
    rendered = render(
      <PopoverTestComponent
        attachTo={undefined}
        open={true}
        dismissible={false}
      >
        {content}
      </PopoverTestComponent>,
    );
  });

  const { queryByTestId } = rendered;

  expect(queryByTestId("popover-dismiss")).toBeNull();
});

it("shouldn't render a popover when open is false", async () => {
  await act(async () => {
    rendered = render(
      <PopoverTestComponent attachTo={undefined} open={false}>
        {content}
      </PopoverTestComponent>,
    );
  });

  const { queryByTestId } = rendered;

  expect(queryByTestId("popover")).toBeNull();
});
