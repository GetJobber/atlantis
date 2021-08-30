import React from "react";
import { act, cleanup, render, waitFor } from "@testing-library/react";
import { Tooltip } from ".";

afterEach(cleanup);

test("tooltip shouldn't show up", async () => {
  const message = "Imma not tip the tool";
  const content = "Don't show my tooltip";

  const { getByText, queryByText } = render(
    <Tooltip message={message}>
      <div>{content}</div>
    </Tooltip>,
  );

  await waitFor(() => {
    expect(queryByText(message)).not.toBeInTheDocument();
  });
  expect(getByText(content)).toBeInTheDocument();
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
  expect(getByText(message)).toBeInTheDocument();
  expect(getByText(content)).toBeInTheDocument();
});

test("tooltip should show up on focus", () => {
  const message = "Tipping the tool on hover";
  const content = "Hover on me";
  const contentID = "hover-on-me";

  const { getByTestId, getByText } = render(
    <Tooltip message={message}>
      <div data-testid={contentID}>{content}</div>
    </Tooltip>,
  );

  act(() => {
    getByTestId(contentID).dispatchEvent(new Event("focus"));
  });
  expect(getByText(message)).toBeInTheDocument();
});

test("tooltip should disappear on blur", async () => {
  const message = "Tipping the tool on hover";
  const content = "Hover on me";
  const contentID = "hover-on-me";

  const { getByTestId, queryByText } = render(
    <Tooltip message={message}>
      <div data-testid={contentID}>{content}</div>
    </Tooltip>,
  );

  act(() => {
    getByTestId(contentID).dispatchEvent(new Event("focus"));
    getByTestId(contentID).dispatchEvent(new Event("blur"));
  });

  await waitFor(() => {
    expect(queryByText(message)).not.toBeInTheDocument();
  });
});
