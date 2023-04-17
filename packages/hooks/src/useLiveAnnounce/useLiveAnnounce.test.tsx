import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useLiveAnnounce } from "./index.js";

function setupHook() {
  const returnVal: ReturnType<typeof useLiveAnnounce> = {
    liveAnnounce: jest.fn,
  };

  function TestComponent() {
    Object.assign(returnVal, useLiveAnnounce());
    return <></>;
  }

  const { rerender } = render(<TestComponent />);
  return { ...returnVal, rerenderComponent: () => rerender(<TestComponent />) };
}

it("should render a div to announce", async () => {
  const { liveAnnounce } = setupHook();
  const message = "Huzzah";
  act(() => liveAnnounce(message));

  await waitFor(() => {
    const expectedElement = screen.queryByRole("status");
    expect(expectedElement).toBeInTheDocument();
    expect(expectedElement?.textContent).toBe(message);
    expect(expectedElement).toHaveAttribute("role", "status");
    expect(expectedElement).toHaveAttribute("aria-atomic", "true");
    expect(expectedElement).toHaveAttribute("aria-live", "assertive");
  });
});

it("should not render the announced div", async () => {
  setupHook();
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

it("should only have 1 div to announce a message on a single instance of the hook", async () => {
  const { liveAnnounce } = setupHook();
  const firstMessage = "I am first";
  const secondMessage = "I am second";

  act(() => liveAnnounce(firstMessage));
  await waitFor(() => {
    expect(screen.queryAllByRole("status")).toHaveLength(1);
    expect(screen.getByRole("status").textContent).toBe(firstMessage);
  });

  act(() => liveAnnounce(secondMessage));
  await waitFor(() => {
    expect(screen.queryAllByRole("status")).toHaveLength(1);
    expect(screen.getByRole("status").textContent).toBe(secondMessage);
  });
});
