import React, { useRef } from "react";
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";
import { Clippy } from ".";
import { ClippyProps } from "./Clippy";

afterEach(cleanup);

let rendered: RenderResult;
const content = "Test Content";

const ClippyTestComponent = (props: Omit<ClippyProps, "attachTo">) => {
  const divRef = useRef();
  return (
    <>
      <div ref={divRef}></div>
      <Clippy {...props} attachTo={divRef}>
        {props.children}
      </Clippy>
    </>
  );
};

it("should render a Clippy with the content and dismiss button", async () => {
  const handleClose = jest.fn();

  await act(async () => {
    rendered = render(
      <ClippyTestComponent open={true} onRequestClose={handleClose}>
        {content}
      </ClippyTestComponent>,
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
      <ClippyTestComponent open={false}>{content}</ClippyTestComponent>,
    );
  });

  const { queryByText } = rendered;
  expect(queryByText(content)).toBeNull();
});
