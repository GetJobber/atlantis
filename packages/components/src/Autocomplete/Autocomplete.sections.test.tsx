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
import userEvent from "@testing-library/user-event";
import {
  type OptionLike,
  menuOptions,
  menuSection,
} from "./Autocomplete.types";
import {
  expectMenuClosed,
  expectMenuShown,
  getActiveAction,
  getActiveOption,
  navigateDown,
  navigateUp,
  openAutocomplete,
  selectWithKeyboard,
  typeInInput,
} from "./Autocomplete.pom";
import { Wrapper } from "./tests/Autocomplete.setup";

describe("Autocomplete sections", () => {
  it("renders a default section header when data provided", async () => {
    render(
      <Wrapper
        menu={[
          menuSection("Hello from a section", [
            { label: "One" },
            { label: "Two" },
          ]),
        ]}
      />,
    );

    await openAutocomplete();

    await waitFor(() => {
      expect(screen.getByText("Hello from a section")).toBeVisible();
      // Double check options are there too for good measure
      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();
    });
  });

  it("renders sections actions", async () => {
    render(
      <Wrapper
        menu={[
          menuSection<OptionLike>(
            "Hello from a section",
            [{ label: "Krabby" }, { label: "Patty" }],
            [
              {
                type: "action",
                label: "Experience the high tide",
                onClick: jest.fn(),
              },
            ],
          ),
        ]}
      />,
    );

    await openAutocomplete();

    await waitFor(() => {
      expect(screen.getByText("Hello from a section")).toBeVisible();
      expect(screen.getByText("Krabby")).toBeVisible();
      expect(screen.getByText("Patty")).toBeVisible();
      expect(screen.getByText("Experience the high tide")).toBeVisible();
    });
  });
  // Many interactions in the test
  // This is verifying both the order and arrow navigation/activeIndex
  // eslint-disable-next-line max-statements
  it("renders sections actions in the expected order", async () => {
    render(
      <Wrapper
        menu={[
          menuOptions<OptionLike>(
            [{ label: "First Option" }],
            [
              {
                type: "action",
                label: "First Action",
                onClick: jest.fn(),
              },
            ],
          ),
          menuSection<OptionLike>(
            "Hello from a section",
            [{ label: "First Section Option" }],
            [
              {
                type: "action",
                label: "First Section Action",
                onClick: jest.fn(),
              },
            ],
          ),
        ]}
      />,
    );

    await openAutocomplete();

    await navigateDown(1);

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("First Option");

    await navigateDown(1);

    const firstAction = getActiveAction();

    expect(firstAction).not.toBeNull();
    expect(firstAction?.textContent).toContain("First Action");

    await navigateDown(1);

    const secondOption = getActiveOption();

    expect(secondOption).not.toBeNull();
    expect(secondOption?.textContent).toContain("First Section Option");

    await navigateDown(1);

    const secondAction = getActiveAction();

    expect(secondAction).not.toBeNull();
    expect(secondAction?.textContent).toContain("First Section Action");
  });

  it("does not render section header or actions when section has no filtered options", async () => {
    render(
      <Wrapper
        menu={[
          menuSection<OptionLike>(
            "Indoor",
            [{ label: "Drain Cleaning" }],
            [{ type: "action", label: "Add Service", onClick: jest.fn() }],
          ),
          menuSection<OptionLike>(
            "Off-site",
            [{ label: "Tree Removal" }],
            [{ type: "action", label: "Add Other", onClick: jest.fn() }],
          ),
        ]}
      />,
    );

    await openAutocomplete();
    await typeInInput("Drain");

    await expectMenuShown();
    // Indoor has a matching option, so header is visible
    expect(screen.queryByText("Indoor")).toBeVisible();
    // Off-site has no matching options; header and its actions should not render
    expect(screen.queryByText("Off-site")).not.toBeInTheDocument();
    expect(screen.queryByText("Add Other")).not.toBeInTheDocument();
  });

  it("does not render empty sections", async () => {
    render(
      <Wrapper
        menu={[menuSection<OptionLike>("Section Header Label", [], [])]}
      />,
    );

    await openAutocomplete();
    // Make sure we're not finding the Section header for the right reasons ie. menu is open
    await expectMenuShown();
    expect(screen.queryByText("Section Header Label")).not.toBeInTheDocument();
  });

  it("does not render sections that become empty after filtering", async () => {
    render(
      <Wrapper
        menu={[
          menuSection<OptionLike>("O Letter Section", [{ label: "One" }], []),
          menuSection<OptionLike>(
            "T Letter Section",
            [{ label: "Two" }, { label: "Three" }],
            [],
          ),
        ]}
      />,
    );

    await openAutocomplete();

    await typeInInput("T");

    await expectMenuShown();
    expect(screen.queryByText("O Letter Section")).not.toBeInTheDocument();
  });

  it("only renders sections that have options", async () => {
    render(
      <Wrapper
        menu={[
          menuSection<OptionLike>(
            "Section One Header Label",
            [{ label: "Section 1 Option" }],
            [],
          ),
          menuSection<OptionLike>(
            "Section Two Header Label",
            [{ label: "Section 2 Option" }],
            [],
          ),
        ]}
      />,
    );

    await openAutocomplete();
    await typeInInput("Section 1");

    await expectMenuShown();
    expect(screen.queryByText("Section One Header Label")).toBeVisible();
    expect(
      screen.queryByText("Section Two Header Label"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Section 2 Option")).not.toBeInTheDocument();
  });
});

describe("Autocomplete footer & headers", () => {
  it("renders a default, uninteractive persistent header when provided", async () => {
    render(
      <Wrapper
        menu={[
          {
            type: "options",
            options: [{ label: "One" }, { label: "Two" }],
          },
          {
            type: "header",
            label: "Persistent Text Header",
          },
        ]}
      />,
    );

    await openAutocomplete();
    await waitFor(() => {
      expect(screen.getByText("Persistent Text Header")).toBeVisible();
    });
  });
  it("renders a default, uninteractive persistent footer when provided", async () => {
    render(
      <Wrapper
        menu={[
          {
            type: "options",
            options: [{ label: "One" }, { label: "Two" }],
          },
          {
            type: "footer",
            label: "Persistent Text Footer",
          },
        ]}
      />,
    );

    await openAutocomplete();

    await waitFor(() => {
      expect(screen.getByText("Persistent Text Footer")).toBeVisible();
    });
  });

  it("should fire onClick and close menu by default when an interactive persistent header is clicked", async () => {
    const onClick = jest.fn();
    render(
      <Wrapper
        menu={[
          {
            type: "header",
            label: "Interactive Header",
            onClick,
          },
        ]}
      />,
    );

    await openAutocomplete();

    await userEvent.click(screen.getByText("Interactive Header"));
    expect(onClick).toHaveBeenCalled();

    await expectMenuClosed();
  });

  it("should fire onClick and close menu by default when an interactive persistent footer is invoked with Enter", async () => {
    const onClick = jest.fn();
    render(
      <Wrapper
        menu={[
          {
            type: "options",
            options: [{ label: "One" }, { label: "Two" }],
          },
          {
            type: "footer",
            label: "Interactive Footer",
            onClick,
          },
        ]}
      />,
    );

    await openAutocomplete();
    // Also testing reverse looping behavior by doing this
    await navigateUp(1);
    await selectWithKeyboard();

    expect(onClick).toHaveBeenCalled();
    await expectMenuClosed();
  });
  it("does not close the menu if an interactive persistent has shouldClose=false when clicked", async () => {
    const onClick = jest.fn();
    render(
      <Wrapper
        menu={[
          {
            type: "footer",
            label: "Interactive Footer",
            onClick,
            shouldClose: false,
          },
        ]}
      />,
    );

    await openAutocomplete();

    await userEvent.click(screen.getByText("Interactive Footer"));
    expect(onClick).toHaveBeenCalled();
    await expectMenuShown();
  });

  it("does not close the menu if an interactive persistent has shouldClose=false when invoked with Enter", async () => {
    const onClick = jest.fn();
    // Note that there are no options, and it is still showing
    render(
      <Wrapper
        menu={[
          {
            type: "footer",
            label: "Interactive Footer",
            onClick,
            shouldClose: false,
          },
        ]}
      />,
    );

    await openAutocomplete();

    await navigateDown(1);
    await selectWithKeyboard();

    expect(onClick).toHaveBeenCalled();
    await expectMenuShown();
  });
  it("displays persistents after filtering", async () => {
    render(
      <Wrapper
        menu={[
          { type: "options", options: [{ label: "One" }, { label: "Two" }] },
          {
            type: "header",
            label: "Persistent Text Header",
          },
        ]}
      />,
    );

    await openAutocomplete();
    await typeInInput("Gabagool");

    expect(screen.getByText("Persistent Text Header")).toBeVisible();
  });

  it("highlights interactive persistents when they are active", async () => {
    render(
      <Wrapper
        menu={[
          {
            type: "header",
            label: "Interactive Header",
            onClick: jest.fn(),
          },
        ]}
      />,
    );

    await openAutocomplete();
    await navigateDown(1);

    const activePersistent = getActiveAction();

    expect(activePersistent).not.toBeNull();
    expect(activePersistent).toHaveTextContent("Interactive Header");
  });
  it("highlights interactive persistents in the correct order when 'looping' forward", async () => {
    render(
      <Wrapper
        menu={[
          {
            type: "options",
            options: [{ label: "One" }, { label: "Two" }],
          },
          {
            type: "header",
            label: "Interactive Header",
            onClick: jest.fn(),
          },
        ]}
      />,
    );

    await openAutocomplete();
    // Two options, one persistent
    await navigateDown(4);

    const activePersistent = getActiveAction();
    expect(activePersistent).toBeVisible();
    expect(activePersistent).toHaveTextContent("Interactive Header");
  });
});
