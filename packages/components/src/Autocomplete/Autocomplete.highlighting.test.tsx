// Locally mock timing tokens to 0ms to avoid transition waits in this file
jest.mock("@jobber/design", () => {
  const actual = jest.requireActual("@jobber/design");

  return {
    ...actual,
    tokens: {
      ...actual.tokens,
      "timing-base": 0,
    },
  };
});

import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  blurAutocomplete,
  closeAutocomplete,
  deleteInput,
  getActiveAction,
  getActiveOption,
  navigateDown,
  navigateUp,
  openAutocomplete,
  selectAll,
  selectWithKeyboard,
  typeInInput,
} from "./Autocomplete.pom";
import { Wrapper } from "./tests/Autocomplete.setup";

// eslint-disable-next-line max-statements
describe("Autocomplete highlighting", () => {
  it("does not highlight an option or action when the menu is opened for the first time", async () => {
    render(<Wrapper />);

    await openAutocomplete();

    const activeOption = getActiveOption();
    const activeAction = getActiveAction();

    expect(activeOption).toBeNull();
    expect(activeAction).toBeNull();
  });

  it("highlights the correct option reopening after a selection", async () => {
    render(<Wrapper />);
    await openAutocomplete();
    await navigateDown(3);
    await selectWithKeyboard();

    // selection closed the menu
    await openAutocomplete("arrowDown");

    await waitFor(() => {
      const activeOption = getActiveOption();
      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Three");
    });
  });

  it("uses the correct index when reopening after a selection and navigating", async () => {
    render(<Wrapper />);
    await openAutocomplete();
    await navigateDown(3);
    await selectWithKeyboard();

    // selection closed the menu
    await openAutocomplete("arrowDown");

    await waitFor(() => {
      const activeOption = getActiveOption();
      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Three");
    });

    await navigateUp(1);

    await waitFor(() => {
      const activeOption = getActiveOption();
      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
    });
  });

  it("highlights the correct option reopening after bluring", async () => {
    render(<Wrapper />);
    await openAutocomplete();
    await navigateDown(3);
    await selectWithKeyboard();

    // selection closed the menu
    await openAutocomplete("arrowDown");

    await waitFor(() => {
      const activeOption = getActiveOption();
      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Three");
    });
  });

  it("does not highlight an option from typing alone", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await typeInInput("Thr");

    const activeOption = getActiveOption();

    expect(activeOption).toBeNull();
  });

  // Test requires multiple interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state when the menu is closed without a selection", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await navigateDown(2);

    const firstActiveOption = getActiveOption();

    expect(firstActiveOption).not.toBeNull();
    expect(firstActiveOption?.textContent).toContain("Two");
    // Closed, but not unfocused
    await closeAutocomplete();

    await openAutocomplete("arrowDown");

    const activeOptionAfterReopen = getActiveOption();

    expect(activeOptionAfterReopen).toBeNull();

    await navigateDown(1);

    // we expect this to be back on the first option since resetting brings us to null
    const activeOptionAfterNavigation = getActiveOption();

    expect(activeOptionAfterNavigation).not.toBeNull();
    expect(activeOptionAfterNavigation?.textContent).toContain("One");
  });

  // Test requires multiple interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state when the input is cleared with backspaces", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await typeInInput("Tw");
    await navigateDown(1);

    const firstActiveOption = getActiveOption();

    expect(firstActiveOption).not.toBeNull();

    await deleteInput(2);

    const activeOptionAfterDelete = getActiveOption();

    expect(activeOptionAfterDelete).toBeNull();

    await navigateDown(1);

    // we expect this to be back on the first option since resetting brings us to null
    const thirdActiveOption = getActiveOption();

    expect(thirdActiveOption).not.toBeNull();
    expect(thirdActiveOption?.textContent).toContain("One");
  });

  // Test requires multiple interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state after using an action", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await navigateDown(4);

    const activeAction = getActiveAction();

    expect(activeAction).not.toBeNull();

    await selectWithKeyboard();
    // Closed, but not unfocused so re-open with arrow down
    await openAutocomplete("arrowDown");

    const activeOptionAfterReopen = getActiveOption();

    expect(activeOptionAfterReopen).toBeNull();

    await navigateDown(1);

    const activeOptionAfterNav = getActiveOption();

    expect(activeOptionAfterNav).not.toBeNull();
    expect(activeOptionAfterNav?.textContent).toContain("One");
  });
  // Test requires multiple interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state when the autocomplete loses focus (blur)", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await navigateDown(1);

    const firstActiveOption = getActiveOption();

    expect(firstActiveOption).not.toBeNull();
    expect(firstActiveOption?.textContent).toContain("One");
    // Maybe rename to "dismiss" or "ESC-something"
    await blurAutocomplete();
    await openAutocomplete("arrowDown");

    const activeOptionAfterReopen = getActiveOption();

    expect(activeOptionAfterReopen).toBeNull();

    await navigateDown(1);

    // we expect this to be back on the first option since resetting brings us to null
    const activeOptionAfterNav = getActiveOption();

    expect(activeOptionAfterNav).not.toBeNull();
    expect(activeOptionAfterNav?.textContent).toContain("One");
  });

  it("resets the highlight to initial, not visible state after making a selection, deleting it and reopening the menu", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await navigateDown(1);

    await selectWithKeyboard();
    // Menu is still open after deletion
    await deleteInput(3);

    expect(screen.getByRole("combobox")).toHaveValue("");

    const activeOption = getActiveOption();
    expect(activeOption).toBeNull();

    await navigateDown(1);

    const activeOptionAfterNav = getActiveOption();

    expect(activeOptionAfterNav).not.toBeNull();
    expect(activeOptionAfterNav?.textContent).toContain("One");
  });
  // Test requires elaborate amount of interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state after making a selection, select-all + delete and reopening the menu", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await navigateDown(1);

    await selectWithKeyboard();

    await selectAll();
    // Menu is still open after deletion
    await deleteInput(1);

    expect(screen.getByRole("combobox")).toHaveValue("");
    const activeOptionAfterDelete = getActiveOption();
    expect(activeOptionAfterDelete).toBeNull();

    await navigateDown(1);

    const activeOptionAfterNav = getActiveOption();

    expect(activeOptionAfterNav).not.toBeNull();
    expect(activeOptionAfterNav?.textContent).toContain("One");
  });

  it("resets the highlight to initial, not visible state after moving index and typing a search term", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    await navigateDown(2);

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();

    await typeInInput("O");

    const activeOptionAfterTyping = getActiveOption();

    expect(activeOptionAfterTyping).toBeNull();

    await navigateDown(1);

    const activeOptionAfterNav = getActiveOption();

    expect(activeOptionAfterNav).not.toBeNull();
    expect(activeOptionAfterNav?.textContent).toContain("One");
  });

  it("wraps highlight from first option to last on ArrowUp", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    // At the very "top" where it's not visible
    await navigateUp(1);

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Three");
  });

  it("wraps highlight from last option to first on ArrowDown", async () => {
    render(<Wrapper />);

    await openAutocomplete();
    // Move to last option (3 options + 2 actions)
    await navigateDown(5);
    // One more to wrap
    await navigateDown(1);

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("One");
  });
});
