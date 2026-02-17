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

import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";
import {
  type MenuItem,
  type MenuSection,
  type OptionLike,
  defineMenu,
  menuOptions,
  menuSection,
} from "./Autocomplete.types";
import {
  blurAutocomplete,
  closeAutocomplete,
  deleteInput,
  expectMenuClosed,
  expectMenuShown,
  getActiveAction,
  getActiveOption,
  getSelectedOption,
  navigateDown,
  navigateUp,
  openAutocomplete,
  openWithKeyboard,
  reopenAutocomplete,
  selectAll,
  selectWithClick,
  selectWithKeyboard,
  tabToInput,
  typeInInput,
} from "./Autocomplete.pom";
import {
  FocusableSiblingsWrapper,
  FreeFormWrapper,
  Wrapper,
} from "./tests/Autocomplete.setup";
import { InputText } from "../InputText";
import { GLIMMER_TEST_ID } from "../Glimmer/Glimmer";

// They're tests, limit isn't helpful here
// eslint-disable-next-line max-statements
describe("AutocompleteRebuilt", () => {
  it("renders", () => {
    render(<Wrapper />);

    expect(screen.getByTestId("ATL-AutocompleteRebuilt")).toBeVisible();
  });

  describe("loading", () => {
    it("renders 3 Glimmers when open and loading is true", async () => {
      render(<Wrapper loading />);

      await openAutocomplete();

      expect(screen.getAllByTestId(GLIMMER_TEST_ID)).toHaveLength(3);
    });

    it("does not render Glimmers when loading is false or omitted", async () => {
      render(<Wrapper />);

      await openAutocomplete();

      expect(screen.queryByTestId(GLIMMER_TEST_ID)).not.toBeInTheDocument();
    });

    it("renders custom loading content when provided", async () => {
      const CUSTOM_ID = "custom-loading";
      render(
        <Wrapper
          loading
          customRenderLoading={<div data-testid={CUSTOM_ID}>Loading…</div>}
        />,
      );

      await openAutocomplete();

      expect(screen.getByTestId(CUSTOM_ID)).toBeInTheDocument();
      expect(screen.queryByTestId(GLIMMER_TEST_ID)).not.toBeInTheDocument();
    });

    it("does not render custom loading content when loading is false", async () => {
      const CUSTOM_ID = "custom-loading";
      render(
        <Wrapper
          customRenderLoading={<div data-testid={CUSTOM_ID}>Loading…</div>}
        />,
      );

      await openAutocomplete();

      expect(screen.queryByTestId(CUSTOM_ID)).not.toBeInTheDocument();
    });
  });

  describe("basic open behavior", () => {
    it("opens on click", async () => {
      render(<Wrapper />);

      await openAutocomplete();

      await expectMenuShown();
    });

    it("does not show a highlighted option on open when opened with a click", async () => {
      render(<Wrapper />);

      await openAutocomplete();

      const activeOption = getActiveOption();

      expect(activeOption).toBeNull();
    });

    it("opens on tab (default openOnFocus)", async () => {
      render(<Wrapper />);

      await userEvent.tab();

      await expectMenuShown();
    });

    it("opens when tabbing from previous focusable element (default openOnFocus)", async () => {
      render(<FocusableSiblingsWrapper openOnFocus />);

      await tabToInput();

      await expectMenuShown();
    });

    it("stays open when clicking while menu is already open", async () => {
      render(<Wrapper />);

      await openAutocomplete();
      await expectMenuShown();

      await openAutocomplete();

      await expectMenuShown();
    });

    it("reopens when tabbing back after blur (default openOnFocus)", async () => {
      render(<FocusableSiblingsWrapper openOnFocus />);

      await openAutocomplete();
      await expectMenuShown();

      await userEvent.tab();
      expect(screen.getByTestId("after-button")).toHaveFocus();
      await expectMenuClosed();

      await userEvent.tab({ shift: true });

      await expectMenuShown();
    });

    it("opens when shift-tabbing backwards into autocomplete (default openOnFocus)", async () => {
      render(<FocusableSiblingsWrapper openOnFocus />);

      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
      expect(screen.getByTestId("after-button")).toHaveFocus();

      await userEvent.tab({ shift: true });

      await expectMenuShown();
    });
  });

  describe("openOnFocus=false", () => {
    it("does not open menu on tab focus, only on arrowDown", async () => {
      render(<FocusableSiblingsWrapper />);

      await tabToInput();
      await expectMenuClosed();

      await openWithKeyboard("arrowDown");

      await expectMenuShown();
    });

    it("does not open menu on tab focus, only on arrowUp", async () => {
      render(<FocusableSiblingsWrapper />);

      await tabToInput();

      await expectMenuClosed();

      await openWithKeyboard("arrowUp");

      await expectMenuShown();
    });

    it("does not open menu on tab focus, only on typing", async () => {
      render(<FocusableSiblingsWrapper />);

      await tabToInput();

      await expectMenuClosed();

      await openWithKeyboard("type", "Two");

      await expectMenuShown();
    });

    it("does not select on Enter when menu is closed and free-form is disabled", async () => {
      const onChange = jest.fn();

      render(<FocusableSiblingsWrapper onChange={onChange} />);

      await tabToInput();

      await selectWithKeyboard();

      expect(onChange).not.toHaveBeenCalled();
    });

    it("should still open the menu on click, regardless of openOnFocus", async () => {
      render(<FocusableSiblingsWrapper />);

      await openAutocomplete();

      await expectMenuShown();
    });

    it("does not reopen when tabbing back after blur (openOnFocus=false)", async () => {
      render(<FocusableSiblingsWrapper />);

      await tabToInput();
      await openWithKeyboard("arrowDown");
      await expectMenuShown();

      await userEvent.tab();
      expect(screen.getByTestId("after-button")).toHaveFocus();
      await expectMenuClosed();

      await userEvent.tab({ shift: true });
      expect(screen.getByRole("combobox")).toHaveFocus();

      await expectMenuClosed();
    });

    it("does not open when shift-tabbing backwards into autocomplete (openOnFocus=false)", async () => {
      render(<FocusableSiblingsWrapper />);

      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
      expect(screen.getByTestId("after-button")).toHaveFocus();

      await userEvent.tab({ shift: true });
      expect(screen.getByRole("combobox")).toHaveFocus();

      await expectMenuClosed();
    });
  });

  describe("basic selection interactions", () => {
    it("selects the highlighted option on Enter and closes", async () => {
      const onChange = jest.fn();

      render(<Wrapper onChange={onChange} />);

      await openAutocomplete();
      await navigateDown(1);
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({ label: "One" });
      await expectMenuClosed();
    });

    it("selects an option on click and closes", async () => {
      const onChange = jest.fn();

      render(<Wrapper onChange={onChange} />);

      await openAutocomplete();
      await selectWithClick("Two");

      expect(onChange).toHaveBeenCalledWith({ label: "Two" });
      await expectMenuClosed();
    });

    it("does not auto-reopen from programmatic input update after selection", async () => {
      const onChange = jest.fn();

      render(<Wrapper onChange={onChange} />);

      await openAutocomplete();
      await navigateDown(1);
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({ label: "One" });
      await expectMenuClosed();
    });
  });

  it("does not select on Enter after menu was manually closed (free-form disabled)", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete();
    await navigateDown(1);

    await closeAutocomplete();

    await expectMenuClosed();

    await selectWithKeyboard();

    expect(onChange).not.toHaveBeenCalled();
  });

  describe("sections", () => {
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
      expect(
        screen.queryByText("Section Header Label"),
      ).not.toBeInTheDocument();
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

  describe("actions", () => {
    it("invokes action on Enter and closes when shouldClose is true/undefined", async () => {
      const createAction = jest.fn();
      render(
        <Wrapper
          menu={[
            {
              type: "options",
              options: [{ label: "One" }],
              actions: [
                {
                  type: "action",
                  label: "Create Action",
                  onClick: createAction,
                },
              ],
            },
          ]}
        />,
      );

      await openAutocomplete();
      await navigateDown(2);
      await selectWithKeyboard();

      expect(createAction).toHaveBeenCalled();
      await expectMenuClosed();
    });

    it("invokes action on click and stays open when shouldClose is false", async () => {
      const stayOpenAction = jest.fn();

      render(
        <Wrapper
          menu={[
            {
              type: "options",
              options: [{ label: "Howdy" }],
              actions: [
                {
                  type: "action",
                  label: "Stay Open",
                  onClick: stayOpenAction,
                  shouldClose: false,
                },
              ],
            },
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Stay Open");

      expect(stayOpenAction).toHaveBeenCalled();
      await expectMenuShown();
    });
  });

  describe("Header & Footer", () => {
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

  describe("default options", () => {
    it("renders default option content", async () => {
      render(<Wrapper />);

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByText("One")).toBeVisible();
        expect(screen.queryByTestId("checkmark")).not.toBeInTheDocument();
      });
    });

    it("renders default selected option content", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByText("Two")).toBeVisible();
        expect(screen.getByTestId("checkmark")).toBeVisible();
      });
    });
  });

  describe("filterOptions", () => {
    it("can opt-out of filtering entirely with filterOptions=false (async pattern)", async () => {
      render(<Wrapper filterOptions={false} />);

      await openAutocomplete();
      await typeInInput("A bunch of text");

      // With opt-out, all options should be visible regardless of input
      await waitFor(() => {
        expect(screen.getByText("One")).toBeVisible();
        expect(screen.getByText("Two")).toBeVisible();
        expect(screen.getByText("Three")).toBeVisible();
      });
    });

    it("can provide a custom filter function", async () => {
      // Ignore the search term, just return things that have "t"
      render(
        <Wrapper
          filterOptions={opts => opts.filter(o => o.label.includes("T"))}
        />,
      );

      await openAutocomplete();

      // Two and Three should be visible
      await waitFor(() => {
        expect(screen.getByText("Two")).toBeVisible();
        expect(screen.getByText("Three")).toBeVisible();
      });
    });

    it("can provide a custom filter function capable of searching custom values", async () => {
      const customOptionMenu: MenuItem<{
        label: string;
        squareRoot: number;
      }>[] = [
        {
          type: "options",
          options: [
            { label: "9", squareRoot: 3 },
            { label: "16", squareRoot: 4 },
          ],
        },
      ];

      const filterOptions = (
        options: { label: string; squareRoot: number }[],
        input: string,
      ) => options.filter(o => o.squareRoot === parseInt(input, 10));

      render(
        <Wrapper<{ label: string; squareRoot: number }>
          menu={customOptionMenu}
          filterOptions={filterOptions}
        />,
      );

      await openAutocomplete();
      // Type in 4 to match 16
      await typeInInput("4");

      await waitFor(() => {
        expect(screen.getByText("16")).toBeVisible();
      });
    });
  });

  describe("debounce", () => {
    it("delays filtering until the debounce interval elapses", async () => {
      render(<Wrapper debounce={50} />);

      await openAutocomplete();
      await typeInInput("T");

      // Immediately after typing, filtering has not yet applied
      expect(screen.getByText("One")).toBeVisible();

      // Wait longer than the debounce interval inside act to flush updates
      await act(async () => {
        await new Promise(res => setTimeout(res, 60));
      });

      await waitFor(() => {
        expect(screen.queryByText("One")).not.toBeInTheDocument();
        expect(screen.getByText("Two")).toBeVisible();
      });
    });
  });

  describe("with a selection", () => {
    it("highlights the selected option on open", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete();

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
    });

    it("keeps the selected item highlighted as characters are deleted", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete();

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");

      await deleteInput(2);

      const activeOptionAfterDelete = getActiveOption();

      expect(activeOptionAfterDelete).not.toBeNull();
      expect(activeOptionAfterDelete?.textContent).toContain("Two");
    });

    it("highlights the selected option on reopen after blur", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete();
      await blurAutocomplete();
      await reopenAutocomplete();

      await waitFor(() => {
        const activeOption = getActiveOption();
        expect(activeOption).not.toBeNull();
        expect(activeOption?.textContent).toContain("Two");
      });
    });

    it("highlights the selected option on reopon after dismissing the menu", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete();
      await closeAutocomplete();
      await reopenAutocomplete();

      await waitFor(() => {
        const activeOption = getActiveOption();
        expect(activeOption).not.toBeNull();
        expect(activeOption?.textContent).toContain("Two");
      });
    });

    it("keeps selected option while moving active highlight to another option", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete();

      const selected = getSelectedOption();
      expect(selected).not.toBeNull();
      expect(selected?.textContent).toContain("Two");

      // Move active highlight to "Three"
      await navigateDown(1);

      // Active should be Three, selected remains Two
      await waitFor(() => {
        const active = getActiveOption();
        expect(active).not.toBeNull();
        expect(active?.textContent).toContain("Three");

        const selectedAfterNav = getSelectedOption();
        expect(selectedAfterNav).not.toBeNull();
        expect(selectedAfterNav?.textContent).toContain("Two");
      });
    });

    it("shows full list when input value exactly matches an option label and highlights corresponding option", async () => {
      render(
        <Wrapper initialValue={{ label: "Two" }} initialInputValue="Two" />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByText("One")).toBeVisible();
        expect(screen.getByText("Two")).toBeVisible();
      });

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
    });

    it("highlights selected item on reopen when input exactly matches that option", async () => {
      render(<Wrapper />);

      await openAutocomplete();

      await selectWithClick("Two");

      await openAutocomplete();

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
    });

    it("restores input to the selected label on blur after partial deletion when free-form is disabled", async () => {
      const onChange = jest.fn();

      render(<Wrapper initialValue={{ label: "Two" }} onChange={onChange} />);

      await openAutocomplete();
      // Delete one character -> "Tw"
      await deleteInput(1);
      await blurAutocomplete();

      expect(screen.getByRole("combobox")).toHaveValue("Two");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("readOnly", () => {
    it("does not open on tab focus, click, arrows, or typing when readOnly", async () => {
      render(<FocusableSiblingsWrapper readOnly />);

      // Tab to focus (without clicking)
      await tabToInput();
      await expectMenuClosed();

      // Arrow keys don't open
      await navigateDown(1);
      await expectMenuClosed();

      await navigateUp(1);
      await expectMenuClosed();

      // Typing doesn't work
      await typeInInput("This is ignored");
      await expectMenuClosed();
      await expect(
        screen.queryByText("This is ignored"),
      ).not.toBeInTheDocument();
    });

    it("does not open on click when readOnly", async () => {
      render(<Wrapper readOnly />);

      await openAutocomplete();
      await expectMenuClosed();
    });

    it("still calls onBlur when readOnly", async () => {
      const onBlur = jest.fn();

      render(<Wrapper readOnly onBlur={onBlur} />);

      await openAutocomplete();
      await blurAutocomplete();

      expect(onBlur).toHaveBeenCalled();
    });

    it("still calls onFocus when readOnly (via click)", async () => {
      const onFocus = jest.fn();

      render(<Wrapper readOnly onFocus={onFocus} />);

      await openAutocomplete();

      expect(onFocus).toHaveBeenCalled();
    });
  });

  describe("allowFreeForm", () => {
    it("commits free-form on blur when non-empty and no exact match in options", async () => {
      const onChange = jest.fn();

      render(<FreeFormWrapper onChange={onChange} />);

      await openAutocomplete();
      await typeInInput("TotallyNewValue");
      await blurAutocomplete();

      expect(onChange).toHaveBeenCalledWith({
        label: "TotallyNewValue",
      });
    });

    it("commits free-form on Enter when menu has no options (filtered out)", async () => {
      const onChange = jest.fn();

      render(<FreeFormWrapper onChange={onChange} />);

      await openAutocomplete();
      await typeInInput("Zed");
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({
        label: "Zed",
      });
    });

    it("selects existing option on blur when input exactly matches (case-sensitive by default)", async () => {
      const onChange = jest.fn();

      render(<FreeFormWrapper onChange={onChange} />);

      await openAutocomplete();
      await typeInInput("Two");
      await blurAutocomplete();

      expect(onChange).toHaveBeenCalledWith({ label: "Two" });
    });

    it("treats different case as free-form by default (case-sensitive)", async () => {
      const onChange = jest.fn();

      render(<FreeFormWrapper onChange={onChange} />);

      await openAutocomplete();
      await typeInInput("two");
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({
        label: "two",
      });
    });

    it("can match case-insensitively with inputEqualsOption override", async () => {
      const onChange = jest.fn();

      render(
        <FreeFormWrapper
          onChange={onChange}
          inputEqualsOption={(input, option) =>
            input.trim().toLowerCase() === option.label.toLowerCase()
          }
        />,
      );

      await openAutocomplete();
      await typeInInput("two");
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({ label: "Two" });
    });

    it("commits free-form on Enter when menu is closed", async () => {
      const onChange = jest.fn();

      render(<FreeFormWrapper onChange={onChange} />);

      await typeInInput("Custom");
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({
        label: "Custom",
      });
    });

    it("closes the menu when committing free-form with Tab", async () => {
      render(<FreeFormWrapper />);
      await openAutocomplete();
      await typeInInput("not-in-options");

      await blurAutocomplete();

      await expectMenuClosed();
    });

    // Regression test for an issue where the menu would reopen after blur/commit
    it("does not reopen immediately after Tab blur (short delay)", async () => {
      render(
        <>
          <FreeFormWrapper openOnFocus={false} />
          <button type="button" data-testid="after">
            after
          </button>
        </>,
      );

      await openAutocomplete();
      await typeInInput("non-matching-freeform-value");
      await blurAutocomplete();

      // Ensure focus moved off the input
      expect(screen.getByTestId("after")).toHaveFocus();

      // Use a short timeout to ensure the menu is not reopened
      await expect(
        screen.findByRole("listbox", undefined, { timeout: 5 }),
      ).rejects.toThrow();
    });
  });

  // eslint-disable-next-line max-statements
  describe("highlighting", () => {
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

      // selection closed the menu, but input still has focus
      await reopenAutocomplete("arrowDown");

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

      // selection closed the menu, but input still has focus
      await reopenAutocomplete("arrowDown");

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

      // selection closed the menu, but input still has focus
      await reopenAutocomplete("arrowDown");

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

      // Reopen with click to avoid navigating (input still has focus)
      await reopenAutocomplete("click");

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
      // Action closed menu, but input still has focus - reopen with click to avoid navigating
      await reopenAutocomplete("click");

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
      // Blur loses focus, so we need to click to refocus and reopen
      await blurAutocomplete();
      await openAutocomplete();

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

  describe("emptyState", () => {
    it("shows default empty state when there are no options to render", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(<Wrapper menu={emptyMenu} />);

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByText("No options")).toBeVisible();
      });
    });

    it("shows default empty state when there are no options to render and filtering is disabled", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(<Wrapper menu={emptyMenu} filterOptions={false} />);

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByText("No options")).toBeVisible();
      });
    });

    it("shows custom empty state when provided", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(
        <Wrapper
          menu={emptyMenu}
          emptyStateMessage={
            <span data-testid="custom-empty">Nothing here</span>
          }
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-empty")).toBeVisible();
        expect(screen.queryByText("No options")).not.toBeInTheDocument();
      });
    });

    it("shows basic empty state when filtering removes all options", async () => {
      render(<Wrapper filterOptions={() => []} />);

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByText("No options")).toBeVisible();
      });
    });

    it("does not render standard actions when empty", async () => {
      render(
        <Wrapper
          menu={[
            menuSection<OptionLike>(
              "Hello from a section",
              [{ label: "One" }, { label: "Two" }],
              [
                { type: "action", label: "Create new", onClick: jest.fn() },
                {
                  type: "action",
                  label: "Browse templates",
                  onClick: jest.fn(),
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete();
      await typeInInput("Gabagool");

      await waitFor(() => {
        expect(screen.queryByText("Create new")).not.toBeInTheDocument();
        expect(screen.queryByText("Browse templates")).not.toBeInTheDocument();
      });
    });

    it("renders interactive emptyActions (array) together with empty message when there are no options", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      const create = jest.fn();
      const browse = jest.fn();

      render(
        <Wrapper
          menu={emptyMenu}
          emptyActions={[
            { type: "action", label: "Create new", onClick: create },
            { type: "action", label: "Browse templates", onClick: browse },
          ]}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        // Empty message shown alongside actions by default
        expect(screen.getByText("No options")).toBeVisible();

        // Actions are present and navigable
        expect(screen.getByText("Create new")).toBeVisible();
        expect(screen.getByText("Browse templates")).toBeVisible();
      });

      // Keyboard navigation to first action and invoke
      await navigateDown(1);
      await selectWithKeyboard();
      expect(create).toHaveBeenCalled();
    });

    it("renders interactive emptyActions (function) using current input", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];
      const create = jest.fn();

      render(
        <Wrapper
          menu={emptyMenu}
          emptyActions={({ inputValue }) => [
            {
              type: "action",
              label: `Add "${inputValue}"`,
              onClick: create,
            },
          ]}
        />,
      );

      await openAutocomplete();
      await typeInInput("Zed");

      await waitFor(() => {
        // Action reflects typed input
        expect(screen.getByText('Add "Zed"')).toBeVisible();
      });

      await navigateDown(1);
      await selectWithKeyboard();
      expect(create).toHaveBeenCalled();
    });

    it("can render emptyActions distinctly from standard actions", async () => {
      render(
        <Wrapper
          menu={[
            menuSection<OptionLike>(
              "Hello from a section",
              [{ label: "One" }, { label: "Two" }],
              [{ type: "action", label: "Create new", onClick: jest.fn() }],
            ),
          ]}
          emptyActions={[
            { type: "action", label: "Browse templates", onClick: jest.fn() },
          ]}
          customRenderAction={({
            value,
            origin,
          }: {
            value: OptionLike;
            origin?: "menu" | "empty";
          }) => {
            if (origin === "empty") {
              return <strong data-testid="empty-action">{value.label}</strong>;
            }

            return <div data-testid="regular-action">{value.label}</div>;
          }}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("regular-action")).toBeVisible();
      });

      await typeInInput("something with no matches");

      expect(screen.getByTestId("empty-action")).toBeVisible();
      expect(screen.queryByTestId("regular-action")).not.toBeInTheDocument();
    });

    it("can suppress empty message when emptyState=false while showing emptyActions", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];
      const create = jest.fn();

      render(
        <Wrapper
          menu={emptyMenu}
          emptyStateMessage={false}
          emptyActions={[
            { type: "action", label: "Empty Action", onClick: create },
          ]}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        // Empty message suppressed
        expect(screen.queryByText("No options")).not.toBeInTheDocument();
        // Action visible
        expect(screen.getByText("Empty Action")).toBeVisible();
      });
    });
  });

  describe("customRenderInput", () => {
    it("renders a custom layout for customRenderInput when provided", async () => {
      const onChange = jest.fn();
      render(
        <Wrapper
          customRenderInput={({ inputRef, inputProps }) => {
            return (
              <InputText
                ref={inputRef}
                {...inputProps}
                version={2}
                // Compose with internal onChange so Autocomplete behavior still works
                onChange={(val, evt) => {
                  inputProps.onChange?.(val, evt);
                  onChange(val);
                }}
                placeholder="Just a Pineapple"
              />
            );
          }}
        />,
      );

      await openAutocomplete();
      await typeInInput("Just a Pineapple");

      expect(screen.getByRole("combobox")).toBeVisible();
      expect(onChange).toHaveBeenCalledWith("Just a Pineapple");
    });
  });

  describe("customRenderSection", () => {
    it("renders a custom layout for customRenderSection when provided", async () => {
      const renderSection = (
        section: MenuSection<OptionLike & { special?: boolean }>,
      ) => {
        return (
          <strong
            data-testid={`custom-section-header-${
              section.special ? "special" : "normal"
            }`}
          >
            {section.label}
          </strong>
        );
      };
      const sectionedMenu = defineMenu<OptionLike & { special?: boolean }>([
        {
          type: "section",
          special: true,
          label: "One",
          options: [{ label: "One" }, { label: "Two" }],
        },
      ]);

      render(
        <Wrapper<OptionLike & { special?: boolean }>
          customRenderSection={renderSection}
          menu={sectionedMenu}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(
          screen.getByTestId("custom-section-header-special"),
        ).toBeVisible();
      });
    });
  });

  describe("customRenderOption", () => {
    it("renders a custom layout for customRenderOption when provided", async () => {
      const customRenderOption = ({
        value,
      }: {
        value: OptionLike & { special?: boolean };
      }) => {
        return (
          <strong
            data-testid={`custom-option-${
              value.special ? "special" : "normal"
            }`}
          >
            {value.label}
          </strong>
        );
      };

      render(
        <Wrapper<OptionLike & { special?: boolean }>
          menu={defineMenu<OptionLike & { special?: boolean }>([
            {
              type: "options",
              options: [
                { label: "One", special: true },
                { label: "Two", special: false },
              ],
            },
          ])}
          customRenderOption={customRenderOption}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-option-special")).toBeVisible();
        expect(screen.getByTestId("custom-option-normal")).toBeVisible();
      });
    });

    it("passes isActive correctly to customRenderOption for the highlighted option", async () => {
      render(
        <Wrapper
          customRenderOption={({ value, isActive }) => {
            return (
              <div
                data-testid={`custom-option-${
                  isActive ? "active" : "inactive"
                }`}
              >
                {value.label}
              </div>
            );
          }}
        />,
      );
      await openAutocomplete();
      await navigateDown(1);

      await waitFor(() => {
        expect(screen.getByTestId("custom-option-active")).toBeVisible();
        expect(screen.getAllByTestId("custom-option-inactive")).toHaveLength(2);
      });
    });

    it("passes isSelected correctly to customRenderOption for the selected option", async () => {
      render(
        <Wrapper
          initialValue={{ label: "Two" }}
          customRenderOption={({ value, isSelected }) => {
            return (
              <div
                data-testid={`custom-option-${
                  isSelected ? "selected" : "unselected"
                }`}
              >
                {value.label}
              </div>
            );
          }}
        />,
      );
      await openAutocomplete();
      await navigateDown(1);

      await waitFor(() => {
        expect(screen.getByTestId("custom-option-selected")).toBeVisible();
        expect(screen.getAllByTestId("custom-option-unselected")).toHaveLength(
          2,
        );
      });
    });
  });

  describe("customRenderAction", () => {
    it("renders a custom layout for customRenderAction when provided", async () => {
      const renderAction = ({
        value,
      }: {
        value: OptionLike & { special?: boolean };
      }) => {
        return (
          <strong
            data-testid={`custom-action-${
              value.special ? "special" : "normal"
            }`}
          >
            {value.label}
          </strong>
        );
      };

      render(
        <Wrapper<OptionLike & { special?: boolean }>
          menu={[
            {
              type: "options",
              options: [{ label: "One" }],
              actions: [
                {
                  type: "action",
                  label: "Create new",
                  special: true,
                  onClick: jest.fn(),
                },
              ],
            },
          ]}
          customRenderAction={renderAction}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-action-special")).toBeVisible();
      });
    });

    it("passes isActive to customRenderAction for the highlighted action", async () => {
      render(
        <Wrapper
          customRenderAction={({ value, isActive }) => {
            return (
              <div
                data-testid={`custom-action-${
                  isActive ? "active" : "inactive"
                }`}
              >
                {value.label}
              </div>
            );
          }}
        />,
      );
      await openAutocomplete();
      // 3 options, 2 actions - move highlight to second action (index 4)
      await navigateDown(5);

      const activeAction = getActiveAction();

      expect(activeAction).not.toBeNull();
      expect(activeAction?.textContent).toContain("Stay Open");

      await waitFor(() => {
        expect(screen.getByTestId("custom-action-active")).toBeVisible();
        expect(screen.getByTestId("custom-action-inactive")).toBeVisible();
      });
    });
  });

  describe("customRenderHeader/customRenderFooter", () => {
    it("renders a custom layout for customRenderHeader when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: jest.fn(),
            },
          ]}
          customRenderHeader={({ value }) => (
            <div data-testid="custom-header">{value.label}</div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-header")).toBeVisible();
      });
    });
    it("passes isActive to customRenderHeader/customRenderFooter when interactive", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: jest.fn(),
            },
            {
              type: "footer",
              label: "Interactive Footer",
              onClick: jest.fn(),
            },
          ]}
          customRenderHeader={({ value, isActive }) => (
            <div
              data-testid={`custom-header-${isActive ? "active" : "inactive"}`}
            >
              {value.label}
            </div>
          )}
          customRenderFooter={({ value, isActive }) => (
            <div
              data-testid={`custom-footer-${isActive ? "active" : "inactive"}`}
            >
              {value.label}
            </div>
          )}
        />,
      );

      await openAutocomplete();

      await navigateDown(1);

      await waitFor(() => {
        expect(screen.getByTestId("custom-header-active")).toBeVisible();
        expect(screen.getByTestId("custom-footer-inactive")).toBeVisible();
      });
    });
    it("renders footer via customRenderFooter when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: jest.fn(),
            },
          ]}
          customRenderHeader={({ value }) => (
            <div data-testid={`custom-header`}>{value.label}</div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-header")).toBeVisible();
      });
    });
    it("accepts and passes custom values to customRenderHeader when provided", async () => {
      const menu = defineMenu<
        OptionLike,
        Record<string, never>,
        { arbitrary: string }
      >([
        {
          type: "header",
          label: "Interactive Header",
          arbitrary: "something",
          onClick: jest.fn(),
        },
      ]);

      render(
        <Wrapper<OptionLike>
          // TODO: fix test types to not need this
          menu={menu as MenuItem<OptionLike>[]}
          customRenderHeader={({ value }) => (
            <div data-testid="custom-header">
              {(value as unknown as { arbitrary: string }).arbitrary}
            </div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-header")).toBeVisible();
        expect(screen.getByTestId("custom-header")).toHaveTextContent(
          "something",
        );
      });
    });
  });

  describe("a11y", () => {
    it("wires autocomplete ARIA correctly and toggles aria-expanded", async () => {
      render(<Wrapper />);

      const autocomplete = screen.getByRole("combobox");
      expect(autocomplete).toHaveAttribute("aria-autocomplete", "list");
      expect(autocomplete).toHaveAttribute("aria-expanded", "false");

      await openAutocomplete();

      const listbox = await screen.findByRole("listbox");
      expect(autocomplete).toHaveAttribute("aria-expanded", "true");
      expect(autocomplete).toHaveAttribute(
        "aria-controls",
        listbox.getAttribute("id") ?? "",
      );
    });

    it("sets aria-activedescendant to the active option as user navigates", async () => {
      render(<Wrapper />);

      await openAutocomplete();
      await navigateDown(1);

      const autocomplete = screen.getByRole("combobox");
      const listbox = screen.getByRole("listbox");
      const listboxId = listbox.getAttribute("id") ?? "";

      expect(autocomplete).toHaveAttribute(
        "aria-activedescendant",
        `${listboxId}-item-0`,
      );
    });

    it("marks the selected option with aria-selected=true", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete();

      // Option with label "Two" should be selected
      const optionTwo = screen.getByRole("option", { name: "Two" });
      expect(optionTwo).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("UNSAFE props", () => {
    it("passes className to the menu", async () => {
      render(<Wrapper UNSAFE_className={{ menu: "custom-menu" }} />);

      await openAutocomplete();

      expect(await screen.findByRole("listbox")).toHaveClass("custom-menu");
    });

    it("passes styles to the menu", async () => {
      render(<Wrapper UNSAFE_styles={{ menu: { backgroundColor: "red" } }} />);

      await openAutocomplete();

      expect(await screen.findByRole("listbox")).toHaveStyle({
        backgroundColor: "red",
      });
    });

    it("passes className to the option", async () => {
      render(<Wrapper UNSAFE_className={{ option: "custom-option" }} />);

      await openAutocomplete();

      expect(
        screen
          .getAllByRole("option")
          .every(option => option.classList.contains("custom-option")),
      ).toBe(true);
    });

    it("passes styles to the option", async () => {
      render(
        <Wrapper UNSAFE_styles={{ option: { backgroundColor: "red" } }} />,
      );

      await openAutocomplete();

      expect(
        screen
          .getAllByRole("option")
          .every(option => option.style.backgroundColor === "red"),
      ).toBe(true);
    });

    it("passes className to the action", async () => {
      render(<Wrapper UNSAFE_className={{ action: "custom-action" }} />);

      await openAutocomplete();

      expect(
        screen
          .getAllByTestId("ATL-AutocompleteRebuilt-Action")
          .every(action => action.classList.contains("custom-action")),
      ).toBe(true);
    });

    it("passes styles to the action", async () => {
      render(
        <Wrapper UNSAFE_styles={{ action: { backgroundColor: "red" } }} />,
      );

      await openAutocomplete();

      expect(
        screen
          .getAllByTestId("ATL-AutocompleteRebuilt-Action")
          .every(action => action.style.backgroundColor === "red"),
      ).toBe(true);
    });

    it("passes className to the persistent header and footer", async () => {
      render(
        <Wrapper
          UNSAFE_className={{
            header: "custom-header",
            footer: "custom-footer",
          }}
          menu={[
            {
              type: "header",
              label: "Interactive Header",
            },
            {
              type: "footer",
              label: "Interactive Footer",
            },
          ]}
        />,
      );

      await openAutocomplete();

      expect(screen.getByTestId("ATL-AutocompleteRebuilt-header")).toHaveClass(
        "custom-header",
      );
      expect(screen.getByTestId("ATL-AutocompleteRebuilt-footer")).toHaveClass(
        "custom-footer",
      );
    });
  });

  describe("ref", () => {
    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement | HTMLTextAreaElement>();

      render(
        <AutocompleteRebuilt
          version={2}
          menu={[]}
          inputValue=""
          onInputChange={jest.fn()}
          value={undefined}
          onChange={jest.fn()}
          placeholder=""
          ref={ref}
        />,
      );

      expect(
        ref.current instanceof HTMLInputElement ||
          ref.current instanceof HTMLTextAreaElement,
      ).toBe(true);
    });
  });

  describe("Multiple", () => {
    it("calls onChange once with added selection array", async () => {
      const onChange = jest.fn();
      const onInputChange = jest.fn();

      const menu = [
        menuOptions<OptionLike>([
          { label: "One" },
          { label: "Two" },
          { label: "Three" },
        ]),
      ];

      render(
        <AutocompleteRebuilt
          version={2}
          multiple
          menu={menu}
          inputValue=""
          onInputChange={onInputChange}
          value={[]}
          onChange={onChange}
          placeholder=""
        />,
      );

      await openAutocomplete();
      await navigateDown(1);
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([{ label: "One" }]);
    });

    it("calls onChange once with removed selection array when toggling off", async () => {
      const onChange = jest.fn();
      const onInputChange = jest.fn();

      const menu = [
        menuOptions<OptionLike>([
          { label: "One" },
          { label: "Two" },
          { label: "Three" },
        ]),
      ];

      render(
        <AutocompleteRebuilt
          version={2}
          multiple
          menu={menu}
          inputValue=""
          onInputChange={onInputChange}
          value={[{ label: "One" }]}
          onChange={onChange}
          placeholder=""
        />,
      );

      await openAutocomplete();
      await waitFor(() => {
        const active = getActiveOption();
        expect(active).not.toBeNull();
        expect(active?.textContent).toContain("One");
      });
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  // eslint-disable-next-line max-statements
  describe("blur and focus management", () => {
    it("calls onFocus when the input is clicked", async () => {
      const onFocus = jest.fn();

      render(<Wrapper onFocus={onFocus} />);

      await openAutocomplete();

      expect(onFocus).toHaveBeenCalled();
    });

    it("calls onFocus when the input is focused", async () => {
      const onFocus = jest.fn();

      render(<FocusableSiblingsWrapper onFocus={onFocus} />);

      await tabToInput();

      expect(onFocus).toHaveBeenCalled();
    });

    it("does not call onFocus again when selecting an option (internal programmatic focus restoration)", async () => {
      const onFocus = jest.fn();

      render(<Wrapper onFocus={onFocus} />);

      await openAutocomplete();
      expect(onFocus).toHaveBeenCalledTimes(1);

      await selectWithClick("One");
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it("does not call onFocus again when clicking an action (internal programmatic focus restoration)", async () => {
      const onFocus = jest.fn();
      const actionClick = jest.fn();

      render(
        <Wrapper
          onFocus={onFocus}
          menu={[
            menuOptions<OptionLike>(
              [{ label: "Option" }],
              [
                {
                  type: "action",
                  label: "Test Action",
                  onClick: actionClick,
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete();
      expect(onFocus).toHaveBeenCalledTimes(1);

      await selectWithClick("Test Action");
      expect(actionClick).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it("does not call onFocus again when clicking an interactive header (programmatic focus restoration)", async () => {
      const onFocus = jest.fn();
      const headerClick = jest.fn();

      render(
        <Wrapper
          onFocus={onFocus}
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: headerClick,
            },
          ]}
        />,
      );

      await openAutocomplete();
      expect(onFocus).toHaveBeenCalledTimes(1);

      await selectWithClick("Interactive Header");
      expect(headerClick).toHaveBeenCalledTimes(1);
      // Focus is restored programmatically but onFocus should not fire again
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when the input is blurred", async () => {
      const onBlur = jest.fn();

      render(<Wrapper onBlur={onBlur} />);

      await openAutocomplete();
      await blurAutocomplete();

      expect(onBlur).toHaveBeenCalled();
    });

    it("does not call onBlur when clicking within the floating menu", async () => {
      const onBlur = jest.fn();
      const onHeaderClick = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: onHeaderClick,
            },
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
          ]}
        />,
      );

      await openAutocomplete();

      const headerButton = screen.getByRole("button", {
        name: "Interactive Header",
      });

      await userEvent.click(headerButton);

      expect(onBlur).not.toHaveBeenCalled();
      expect(onHeaderClick).toHaveBeenCalledTimes(1);
    });
    it("prevents blur when clicking on a section header", async () => {
      const onBlur = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[
            menuSection<OptionLike>("Section Header", [{ label: "Option" }]),
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Section Header");

      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur when clicking on text-only header", async () => {
      const onBlur = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[
            { type: "header", label: "Text Header" },
            menuOptions<OptionLike>([{ label: "Option" }]),
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Text Header");

      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur when clicking on text-only footer", async () => {
      const onBlur = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[
            menuOptions<OptionLike>([{ label: "Option" }]),
            { type: "footer", label: "Text Footer" },
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Text Footer");

      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur and keeps focus on input when clicking an option", async () => {
      const onBlur = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[menuOptions<OptionLike>([{ label: "One" }, { label: "Two" }])]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("One");

      await expectMenuClosed();
      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur and keeps focus on input when clicking an action", async () => {
      const onBlur = jest.fn();
      const onActionClick = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[
            menuOptions<OptionLike>(
              [{ label: "Option" }],
              [
                {
                  type: "action",
                  label: "Test Action",
                  onClick: onActionClick,
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Test Action");

      await expectMenuClosed();
      expect(onActionClick).toHaveBeenCalledTimes(1);
      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur and keeps focus on input when clicking interactive header", async () => {
      const onBlur = jest.fn();
      const onHeaderClick = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[
            {
              type: "header",
              label: "Interactive Header",
              onClick: onHeaderClick,
            },
            menuOptions<OptionLike>([{ label: "Option" }]),
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Interactive Header");

      expect(onHeaderClick).toHaveBeenCalledTimes(1);
      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur and keeps focus on input when clicking interactive footer", async () => {
      const onBlur = jest.fn();
      const onFooterClick = jest.fn();

      render(
        <Wrapper
          onBlur={onBlur}
          menu={[
            menuOptions<OptionLike>([{ label: "Option" }]),
            {
              type: "footer",
              label: "Interactive Footer",
              onClick: onFooterClick,
            },
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Interactive Footer");

      expect(onFooterClick).toHaveBeenCalledTimes(1);
      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("does not reopen menu after selecting an option that closes it", async () => {
      render(<Wrapper menu={[menuOptions<OptionLike>([{ label: "One" }])]} />);

      await openAutocomplete();
      await selectWithClick("One");

      await expectMenuClosed();
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("does not reopen menu after clicking an action that closes it", async () => {
      const onActionClick = jest.fn();

      render(
        <Wrapper
          menu={[
            menuOptions<OptionLike>(
              [{ label: "Option" }],
              [
                {
                  type: "action",
                  label: "Close Action",
                  onClick: onActionClick,
                  shouldClose: true,
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Close Action");

      await expectMenuClosed();
      expect(onActionClick).toHaveBeenCalledTimes(1);
    });

    it("keeps menu open when clicking an action with shouldClose: false", async () => {
      const onActionClick = jest.fn();

      render(
        <Wrapper
          menu={[
            menuOptions<OptionLike>(
              [{ label: "Option" }],
              [
                {
                  type: "action",
                  label: "Stay Open",
                  onClick: onActionClick,
                  shouldClose: false,
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete();
      await selectWithClick("Stay Open");

      await expectMenuShown();
      expect(onActionClick).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("reopens menu when clicking the input while already focused", async () => {
      render(<Wrapper menu={[menuOptions<OptionLike>([{ label: "One" }])]} />);

      await openAutocomplete();
      await selectWithClick("One");
      await expectMenuClosed();

      await reopenAutocomplete();

      await expectMenuShown();
      expect(screen.getByRole("listbox")).toBeVisible();
    });

    it("allows blur when focus moves to external element", async () => {
      const onBlur = jest.fn();

      render(
        <div>
          <Wrapper onBlur={onBlur} />
          <button type="button">External Button</button>
        </div>,
      );

      await openAutocomplete();
      await blurAutocomplete();

      expect(onBlur).toHaveBeenCalled();
    });

    it("allows blur when tabbing away from input", async () => {
      const onBlur = jest.fn();

      render(
        <div>
          <Wrapper onBlur={onBlur} />
          <button type="button">Next Element</button>
        </div>,
      );

      await openAutocomplete();
      await blurAutocomplete();

      expect(onBlur).toHaveBeenCalled();
    });

    it("prevents blur when clicking on empty state message", async () => {
      const onBlur = jest.fn();
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(<Wrapper onBlur={onBlur} menu={emptyMenu} />);

      await openAutocomplete();
      await selectWithClick("No options");

      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur when clicking on custom empty state message", async () => {
      const onBlur = jest.fn();
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(
        <Wrapper
          onBlur={onBlur}
          menu={emptyMenu}
          emptyStateMessage="Custom empty message"
        />,
      );

      await openAutocomplete();
      await selectWithClick("Custom empty message");

      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });

    it("prevents blur when clicking on loading content", async () => {
      const onBlur = jest.fn();

      render(<Wrapper onBlur={onBlur} loading />);

      await openAutocomplete();

      const loadingElement = screen.getAllByTestId(GLIMMER_TEST_ID)[0];
      await userEvent.click(loadingElement);

      expect(onBlur).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getByRole("combobox"));
    });
  });

  describe("data-* attributes", () => {
    it("should pass data-* attributes to the InputText", () => {
      render(<Wrapper data-test="autocomplete-input" />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("data-test", "autocomplete-input");
    });
  });

  describe("autoHighlight", () => {
    it("highlights the first option on open when autoHighlight is true", async () => {
      render(<Wrapper autoHighlight />);

      await openAutocomplete();

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("One");
    });

    it("does not highlight the first option on open when autoHighlight is false (default)", async () => {
      render(<Wrapper />);

      await openAutocomplete();

      const activeOption = getActiveOption();

      expect(activeOption).toBeNull();
    });

    it("keeps the first option highlighted after typing narrows the list", async () => {
      render(<Wrapper autoHighlight />);

      await openAutocomplete();
      await typeInInput("T");

      await waitFor(() => {
        const activeOption = getActiveOption();

        expect(activeOption).not.toBeNull();
        expect(activeOption?.textContent).toContain("Two");
      });
    });

    it("still highlights the selected option instead of the first when a selection exists", async () => {
      render(<Wrapper autoHighlight initialValue={{ label: "Three" }} />);

      await openAutocomplete();

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Three");
    });

    it("allows arrow navigation after auto-highlighting", async () => {
      render(<Wrapper autoHighlight />);

      await openAutocomplete();
      await navigateDown(1);

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
    });

    it("highlights the first option on reopen after closing without selection", async () => {
      render(<Wrapper autoHighlight />);

      await openAutocomplete();
      await closeAutocomplete();
      await reopenAutocomplete("click");

      await waitFor(() => {
        const activeOption = getActiveOption();

        expect(activeOption).not.toBeNull();
        expect(activeOption?.textContent).toContain("One");
      });
    });
  });
});
