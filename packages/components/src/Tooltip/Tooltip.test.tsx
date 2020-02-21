import React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { Tooltip } from ".";

afterEach(cleanup);

test("tooltip shouldn't show up", () => {
  const message = "Imma not tip the tool";
  const content = "Don't show my tooltip";

  const { getByText, queryByText } = render(
    <Tooltip message={message}>
      <div>{content}</div>
    </Tooltip>,
  );
  expect(queryByText(message)).toBeNull();
  expect(getByText(content)).toBeTruthy();
});

test("tooltip should show up on hover", () => {
  const message = "Tipping the tool on hover";
  const content = "Hover on me";
  const contentID = "hover-on-me";

  const { getByText, getByTestId } = render(
    <Tooltip message={message}>
      <div data-testid={contentID}>{content}</div>
    </Tooltip>,
  );

  act(() => {
    getByTestId(contentID).dispatchEvent(new MouseEvent("mouseenter"));
  });
  expect(getByText(message)).toBeTruthy();
  expect(getByText(content)).toBeTruthy();
});
