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
  type OptionLike,
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
  getActiveOption,
  getSelectedOption,
  navigateDown,
  navigateUp,
  openAutocomplete,
  selectWithClick,
  selectWithKeyboard,
  typeInInput,
} from "./Autocomplete.pom";
import { FreeFormWrapper, Wrapper } from "./tests/Autocomplete.setup";
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
});
