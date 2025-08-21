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
  focusAutocomplete,
  getActiveAction,
  getActiveOption,
  navigateDown,
  navigateUp,
  openAutocomplete,
  selectAll,
  selectWithClick,
  selectWithKeyboard,
  typeInInput,
} from "./Autocomplete.pom";
import { FreeFormWrapper, Wrapper } from "./tests/Autocomplete.setup";
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
  });

  describe("basic open behavior", () => {
    it("opens on click", async () => {
      render(<Wrapper />);

      await openAutocomplete();

      await expectMenuShown();
    });

    it("opens on tab", async () => {
      render(<Wrapper />);

      await userEvent.tab();

      await expectMenuShown();
    });
  });

  describe("openOnFocus=false", () => {
    it("opens the menu when arrowUp is pressed", async () => {
      render(<Wrapper openOnFocus={false} />);

      await openAutocomplete("arrowUp");

      await expectMenuShown();
    });

    it("opens the menu when arrowDown is pressed", async () => {
      render(<Wrapper openOnFocus={false} />);

      await openAutocomplete("arrowDown");

      await expectMenuShown();
    });

    it("opens the menu when user types", async () => {
      render(<Wrapper openOnFocus={false} />);

      await openAutocomplete("type", "Two");

      await expectMenuShown();
    });

    it("does not select on Enter when menu is closed and free-form is disabled", async () => {
      const onChange = jest.fn();

      render(<Wrapper onChange={onChange} openOnFocus={false} />);

      await focusAutocomplete();

      await selectWithKeyboard();

      expect(onChange).not.toHaveBeenCalled();
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
              actionsBottom: [
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
              actionsBottom: [
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

  describe("Persistents", () => {
    it("renders a default, uninteractive persistent header when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "options",
              options: [{ label: "One" }, { label: "Two" }],
            },
            {
              type: "persistent",
              label: "Persistent Text Header",
              position: "header",
            },
          ]}
        />,
      );

      await openAutocomplete();
      await waitFor(() => {
        expect(screen.getByText("Persistent Text Header")).toBeVisible();
      });
    });
    it("renders a default, uninteractive persistent footer async when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "options",
              options: [{ label: "One" }, { label: "Two" }],
            },
            {
              type: "persistent",
              label: "Persistent Text Footer",
              position: "footer",
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
              type: "persistent",
              label: "Interactive Header",
              position: "header",
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
              type: "persistent",
              label: "Interactive Footer",
              position: "footer",
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
              type: "persistent",
              label: "Interactive Footer",
              position: "footer",
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
              type: "persistent",
              label: "Interactive Footer",
              position: "footer",
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
              type: "persistent",
              label: "Persistent Text Header",
              position: "header",
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
              type: "persistent",
              label: "Interactive Header",
              position: "header",
              onClick: jest.fn(),
            },
          ]}
        />,
      );

      await openAutocomplete();
      await navigateDown(1);

      // Interactive persistent is also role="option"
      const activePersistent = getActiveOption();

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
              type: "persistent",
              label: "Interactive Header",
              position: "header",
              onClick: jest.fn(),
            },
          ]}
        />,
      );

      await openAutocomplete();
      // Two options, one persistent
      await navigateDown(4);

      const activePersistent = getActiveOption();
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
      await openAutocomplete("arrowDown");

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
      await openAutocomplete("arrowDown");

      await waitFor(() => {
        const activeOption = getActiveOption();
        expect(activeOption).not.toBeNull();
        expect(activeOption?.textContent).toContain("Two");
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
  });

  describe("readOnly", () => {
    it("does not open on focus, arrows, or typing when readOnly", async () => {
      render(<Wrapper openOnFocus readOnly />);

      await focusAutocomplete();
      await expectMenuClosed();

      await navigateDown(1);
      await expectMenuClosed();

      await navigateUp(1);
      await expectMenuClosed();

      await typeInInput("This is ignored");
      await expectMenuClosed();
      await expect(
        screen.queryByText("This is ignored"),
      ).not.toBeInTheDocument();
    });

    it("still calls onBlur when readOnly", async () => {
      const onBlur = jest.fn();

      render(<Wrapper readOnly onBlur={onBlur} />);

      await focusAutocomplete();
      await blurAutocomplete();

      expect(onBlur).toHaveBeenCalled();
    });

    it("still calls onFocus when readOnly", async () => {
      const onFocus = jest.fn();

      render(<Wrapper openOnFocus readOnly onFocus={onFocus} />);

      await focusAutocomplete();

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

      // selection closed the menu
      await openAutocomplete("arrowDown");

      await waitFor(() => {
        const activeOption = getActiveOption();
        expect(activeOption).not.toBeNull();
        expect(activeOption?.textContent).toContain("Three");
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

    // Test requires elaborate amount of interactions
    // eslint-disable-next-line max-statements
    it("resets the highlight to initial, not visible state after making a selection, deleting it and reopening the menu", async () => {
      render(<Wrapper />);

      await openAutocomplete();
      await navigateDown(1);

      await selectWithKeyboard();
      // Menu is still open after deletion
      await deleteInput(3);

      expect(screen.getByRole("textbox")).toHaveValue("");

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

      expect(screen.getByRole("textbox")).toHaveValue("");
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
          renderAction={({ value, origin }) => {
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

  describe("renderInput", () => {
    it("renders a custom layout for renderInput when provided", async () => {
      const onChange = jest.fn();
      render(
        <Wrapper
          renderInput={({ inputRef, inputProps }) => {
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

      expect(screen.getByRole("textbox")).toBeVisible();
      expect(onChange).toHaveBeenCalledWith("Just a Pineapple");
    });
  });

  describe("renderSection", () => {
    it("renders a custom layout for renderSection when provided", async () => {
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
          renderSection={renderSection}
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

  describe("renderOption", () => {
    it("renders a custom layout for renderOption when provided", async () => {
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
          renderOption={customRenderOption}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-option-special")).toBeVisible();
        expect(screen.getByTestId("custom-option-normal")).toBeVisible();
      });
    });

    it("passes isActive correctly to renderOption for the highlighted option", async () => {
      render(
        <Wrapper
          renderOption={({ value, isActive }) => {
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

    it("passes isSelected correctly to renderOption for the selected option", async () => {
      render(
        <Wrapper
          initialValue={{ label: "Two" }}
          renderOption={({ value, isSelected }) => {
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

  describe("renderAction", () => {
    it("renders a custom layout for renderAction when provided", async () => {
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
              actionsBottom: [
                {
                  type: "action",
                  label: "Create new",
                  special: true,
                  onClick: jest.fn(),
                },
              ],
            },
          ]}
          renderAction={renderAction}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-action-special")).toBeVisible();
      });
    });

    it("passes isActive to renderAction for the highlighted action", async () => {
      render(
        <Wrapper
          renderAction={({ value, isActive }) => {
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

  describe("renderPersistent", () => {
    it("renders a custom layout for renderPersistent when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "persistent",
              label: "Interactive Header",
              position: "header",
              onClick: jest.fn(),
            },
          ]}
          renderPersistent={({ value }) => (
            <div data-testid="custom-persistent">{value.label}</div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-persistent")).toBeVisible();
      });
    });
    it("passes isActive to renderPersistent when used with an interactive persistent", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "persistent",
              label: "Interactive Header",
              position: "header",
              onClick: jest.fn(),
            },
            {
              type: "persistent",
              label: "Interactive Footer",
              position: "footer",
              onClick: jest.fn(),
            },
          ]}
          renderPersistent={({ value, isActive }) => (
            <div
              data-testid={`custom-persistent-${
                isActive ? "active" : "inactive"
              }`}
            >
              {value.label}
            </div>
          )}
        />,
      );

      await openAutocomplete();

      await navigateDown(1);

      await waitFor(() => {
        expect(screen.getByTestId("custom-persistent-active")).toBeVisible();
        expect(screen.getByTestId("custom-persistent-inactive")).toBeVisible();
      });
    });
    it("passes position to renderPersistent when provided", async () => {
      render(
        <Wrapper
          menu={[
            {
              type: "persistent",
              label: "Interactive Header",
              position: "header",
              onClick: jest.fn(),
            },
          ]}
          renderPersistent={({ value, position }) => (
            <div data-testid={`custom-persistent-${position}`}>
              {value.label}
            </div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-persistent-header")).toBeVisible();
      });
    });
    it("accepts and passes custom values to renderPersistent when provided", async () => {
      const menu = defineMenu<
        OptionLike,
        Record<string, never>,
        { arbitrary: string }
      >([
        {
          type: "persistent",
          label: "Interactive Header",
          position: "header",
          arbitrary: "something",
          onClick: jest.fn(),
        },
      ]);

      render(
        <Wrapper<OptionLike>
          // TODO: fix test types to not need this
          menu={menu as unknown as MenuItem<OptionLike>[]}
          renderPersistent={({ value }) => (
            <div data-testid="custom-persistent">
              {(value as unknown as { arbitrary: string }).arbitrary}
            </div>
          )}
        />,
      );

      await openAutocomplete();

      await waitFor(() => {
        expect(screen.getByTestId("custom-persistent")).toBeVisible();
        expect(screen.getByTestId("custom-persistent")).toHaveTextContent(
          "something",
        );
      });
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
            persistentHeader: "custom-persistent-header",
            persistentFooter: "custom-persistent-footer",
          }}
          menu={[
            {
              type: "persistent",
              label: "Interactive Header",
              position: "header",
            },
            {
              type: "persistent",
              label: "Interactive Footer",
              position: "footer",
            },
          ]}
        />,
      );

      await openAutocomplete();

      expect(
        screen.getByTestId("ATL-AutocompleteRebuilt-Persistent-header"),
      ).toHaveClass("custom-persistent-header");
      expect(
        screen.getByTestId("ATL-AutocompleteRebuilt-Persistent-footer"),
      ).toHaveClass("custom-persistent-footer");
    });
  });

  describe("onFocus/onBlur", () => {
    it("calls onFocus when the input is focused", async () => {
      const onFocus = jest.fn();

      render(<Wrapper onFocus={onFocus} />);

      await focusAutocomplete();

      expect(onFocus).toHaveBeenCalled();
    });

    it("calls onBlur when the input is blurred", async () => {
      const onBlur = jest.fn();

      render(<Wrapper onBlur={onBlur} />);

      await focusAutocomplete();
      await blurAutocomplete();

      expect(onBlur).toHaveBeenCalled();
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
});
