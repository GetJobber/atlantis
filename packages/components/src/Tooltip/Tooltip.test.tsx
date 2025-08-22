import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from ".";

function setLargeViewport() {
  Object.defineProperty(document.documentElement, "clientWidth", {
    value: 2000,
    configurable: true,
  });
  Object.defineProperty(document.documentElement, "clientHeight", {
    value: 2000,
    configurable: true,
  });
}

it("shouldn't show the tooltip", async () => {
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

it("should show up on hover", async () => {
  const message = "Tipping the tool on hover";
  const content = "Hover on me";
  const contentID = "hover-on-me";

  const { getByText, getByTestId } = render(
    <Tooltip message={message}>
      <div data-testid={contentID}>{content}</div>
    </Tooltip>,
  );

  await userEvent.hover(getByTestId(contentID));
  expect(getByText(message)).toBeInTheDocument();
  expect(getByText(content)).toBeInTheDocument();
});

it("should show the tooltip up on focus", async () => {
  const message = "Tipping the tool on focus";
  const content = "Focus on me";
  const contentID = "focus-on-me";

  const { getByTestId, getByText } = render(
    <Tooltip message={message}>
      <div data-testid={contentID}>{content}</div>
    </Tooltip>,
  );

  await userEvent.hover(getByTestId(contentID));
  expect(getByText(message)).toBeInTheDocument();
});

it("should disappear on blur", async () => {
  const message = "Untipping the tool on blur";
  const content = "Blur on me";
  const contentID = "blur-on-me";

  const { getByTestId, queryByText } = render(
    <Tooltip message={message}>
      <div data-testid={contentID}>{content}</div>
    </Tooltip>,
  );

  await userEvent.hover(getByTestId(contentID));
  await userEvent.unhover(getByTestId(contentID));

  await waitFor(() => {
    expect(queryByText(message)).not.toBeInTheDocument();
  });
});

it("should have aria-description and tabindex", () => {
  const message = "Screen readers read me out loud!";
  const content = "Browsers focus on me";
  const contentID = "focus-on-me";

  const { getByTestId } = render(
    <Tooltip message={message}>
      <div data-testid={contentID}>{content}</div>
    </Tooltip>,
  );

  expect(getByTestId(contentID)).toHaveAttribute("aria-description", message);
  expect(getByTestId(contentID)).toHaveAttribute("tabindex", "0");
});

describe("with a message of an empty string", () => {
  it("should not show the tooltip up on hover", async () => {
    const message = "";
    const content = "Focus on me";
    const contentID = "focus-on-me";

    const { getByTestId } = render(
      <Tooltip message={message}>
        <div data-testid={contentID}>{content}</div>
      </Tooltip>,
    );

    userEvent.hover(getByTestId(contentID));

    const visibleTooltip = document.querySelector("div[role='tooltip']");
    expect(visibleTooltip).toBeNull();
  });

  it("should not show the tooltip up on focus", async () => {
    const message = "";
    const content = "Focus on me";
    const contentID = "focus-on-me";

    const { getByTestId } = render(
      <Tooltip message={message}>
        <div data-testid={contentID}>{content}</div>
      </Tooltip>,
    );

    fireEvent.focus(getByTestId(contentID));

    const visibleTooltip = document.querySelector("div[role='tooltip']");
    expect(visibleTooltip).toBeNull();
  });
});

describe("with a preferred placement", () => {
  beforeEach(() => {
    setLargeViewport();
  });
  it.each(["top", "bottom", "left", "right"] as const)(
    "should show the tooltip on the %s",
    async placement => {
      const message = "Tipping the tool on the right";
      const content = "Hover on me";
      const contentID = "hover-on-me";

      render(
        <Tooltip message={message} preferredPlacement={placement}>
          <div data-testid={contentID}>{content}</div>
        </Tooltip>,
      );

      const tooltipContent = screen.getByTestId(contentID);
      await userEvent.hover(tooltipContent);

      const tooltip = screen.getByRole("tooltip");

      expect(tooltip).toHaveAttribute("data-placement", placement);
      expect(tooltip).toHaveClass(placement);
    },
  );
});
