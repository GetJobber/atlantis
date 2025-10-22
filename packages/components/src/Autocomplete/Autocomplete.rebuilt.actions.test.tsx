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
  type OptionLike,
  menuOptions,
  menuSection,
} from "./Autocomplete.types";
import {
  expectMenuShown,
  getActiveAction,
  getActiveOption,
  navigateDown,
  openAutocomplete,
  typeInInput,
} from "./Autocomplete.pom";
import { Wrapper } from "./tests/Autocomplete.setup";

describe("Autocomplete actions", () => {
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
