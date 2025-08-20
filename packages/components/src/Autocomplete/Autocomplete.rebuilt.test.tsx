import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";
import {
  type AutocompleteRebuiltProps,
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
import { InputText } from "../InputText";
import { GLIMMER_TEST_ID } from "../Glimmer/Glimmer";

const ACTION1_LABEL = "Create";
const ACTION2_LABEL = "Stay Open";

interface TestOption {
  label: string;
  special?: boolean;
}

// TODO: allow opting out of actions
// and sections
// and clearly define how many of each are rendered so the test is easy to read
function buildMenu(overrides?: {
  createAction?: jest.Mock;
  stayOpenAction?: jest.Mock;
}) {
  const createAction = overrides?.createAction ?? jest.fn();
  const stayOpenAction = overrides?.stayOpenAction ?? jest.fn();

  return {
    menu: [
      menuOptions<OptionLike>(
        [{ label: "One" }, { label: "Two" }, { label: "Three" }],
        [
          {
            type: "action",
            label: ACTION1_LABEL,
            onClick: createAction,
          },
          {
            type: "action",
            label: ACTION2_LABEL,
            onClick: stayOpenAction,
            shouldClose: false,
          },
        ],
      ),
    ],
    createAction,
    stayOpenAction,
  };
}

function Wrapper<T extends OptionLike>({
  initialValue,
  initialInputValue,
  onChange,
  onInputChange,
  onBlur,
  onFocus,
  menu,
  openOnFocus,
  filterOptions,
  emptyActions,
  renderOption,
  renderAction,
  renderSection,
  renderInput,
  loading,
  emptyStateMessage,
  ref,
  UNSAFE_className,
  UNSAFE_styles,
  readOnly,
  renderPersistent,
}: {
  readonly initialValue?: T;
  readonly initialInputValue?: string;
  readonly onChange?: (v: T | undefined) => void;
  readonly onInputChange?: (v: string) => void;
  readonly onBlur?: () => void;
  readonly onFocus?: () => void;
  readonly menu?: MenuItem<T>[];
  readonly openOnFocus?: boolean;
  readonly filterOptions?: false | ((opts: T[], input: string) => T[]);
  readonly emptyActions?: AutocompleteRebuiltProps<T, false>["emptyActions"];
  readonly renderOption?: AutocompleteRebuiltProps<T, false>["renderOption"];
  readonly renderAction?: AutocompleteRebuiltProps<T, false>["renderAction"];
  readonly renderInput?: AutocompleteRebuiltProps<T, false>["renderInput"];
  readonly renderPersistent?: AutocompleteRebuiltProps<
    T,
    false
  >["renderPersistent"];
  readonly renderSection?: AutocompleteRebuiltProps<T, false>["renderSection"];
  readonly loading?: boolean;
  readonly emptyStateMessage?: React.ReactNode;
  readonly ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  readonly UNSAFE_className?: AutocompleteRebuiltProps<
    T,
    false
  >["UNSAFE_className"];
  readonly UNSAFE_styles?: AutocompleteRebuiltProps<T, false>["UNSAFE_styles"];
  readonly readOnly?: boolean;
}) {
  const [value, setValue] = React.useState<T | undefined>(initialValue);
  const [inputValue, setInputValue] = React.useState<string>(
    initialInputValue ?? initialValue?.label ?? "",
  );
  const built = React.useMemo(() => buildMenu(), []);

  return (
    <AutocompleteRebuilt
      version={2}
      value={value}
      onChange={onChange ?? setValue}
      inputValue={inputValue}
      onInputChange={onInputChange ?? setInputValue}
      onBlur={onBlur}
      onFocus={onFocus}
      menu={menu ?? (built.menu as MenuItem<T>[])}
      placeholder=""
      openOnFocus={openOnFocus}
      filterOptions={filterOptions}
      emptyActions={emptyActions}
      renderOption={renderOption}
      renderAction={renderAction}
      renderSection={renderSection}
      renderInput={renderInput}
      loading={loading}
      emptyStateMessage={emptyStateMessage}
      ref={ref}
      UNSAFE_className={UNSAFE_className}
      UNSAFE_styles={UNSAFE_styles}
      readOnly={readOnly}
      renderPersistent={renderPersistent}
    />
  );
}
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

      await openAutocomplete("arrowDown");

      await expectMenuShown();
      expect(screen.getAllByTestId(GLIMMER_TEST_ID)).toHaveLength(3);
    });

    it("does not render Glimmers when loading is false or omitted", async () => {
      render(<Wrapper />);

      await openAutocomplete("arrowDown");

      await expectMenuShown();
      expect(screen.queryByTestId(GLIMMER_TEST_ID)).not.toBeInTheDocument();
    });
  });

  describe("standard open behavior", () => {
    it("opens the menu when arrowUp is pressed", async () => {
      render(<Wrapper />);
      await openAutocomplete("arrowUp");
      await navigateDown(1);

      await expectMenuShown();
    });

    it("opens the menu when arrowDown is pressed", async () => {
      render(<Wrapper />);
      await openAutocomplete("arrowDown");
      await navigateDown(1);

      await expectMenuShown();
    });

    it("opens the menu when user types", async () => {
      render(<Wrapper />);
      await openAutocomplete("type", "o");
      await navigateDown(1);

      await expectMenuShown();
    });
  });

  it("selects the highlighted option on Enter and closes", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("arrowDown");
    await navigateDown(1);
    await selectWithKeyboard();

    expect(onChange).toHaveBeenCalledWith({ label: "One" });
    await expectMenuClosed();
  });

  it("selects an option on click and closes", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("arrowDown");
    await selectWithClick("Two");

    expect(onChange).toHaveBeenCalledWith({ label: "Two" });
    await expectMenuClosed();
  });

  it("does not select on Enter when menu is closed and free-form is disabled", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await focusAutocomplete();
    // Menu should remain closed on focus when openOnFocus is false
    await expectMenuClosed();

    await selectWithKeyboard();

    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not select on Enter after menu was manually closed (free-form disabled)", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("arrowDown");
    await navigateDown(1);
    await screen.findByRole("listbox");

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

      await openAutocomplete("arrowUp");

      await waitFor(() => {
        expect(screen.getByText("Hello from a section")).toBeVisible();
        // Double check options are there too for good measure
        expect(screen.getByText("One")).toBeVisible();
        expect(screen.getByText("Two")).toBeVisible();
      });
    });

    it("renders actions within sections", async () => {
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

      await openAutocomplete("arrowUp");

      await waitFor(() => {
        expect(screen.getByText("Hello from a section")).toBeVisible();
        expect(screen.getByText("Krabby")).toBeVisible();
        expect(screen.getByText("Patty")).toBeVisible();
        expect(screen.getByText("Experience the high tide")).toBeVisible();
      });
    });

    it("renders section actions and actions on the root", async () => {
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
            menuOptions<OptionLike>(
              [{ label: "One" }, { label: "Two" }],
              [
                {
                  type: "action",
                  label: "Experience the low tide",
                  onClick: jest.fn(),
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete("arrowUp");

      await waitFor(() => {
        expect(screen.getByText("Hello from a section")).toBeVisible();
        expect(screen.getByText("Krabby")).toBeVisible();
        expect(screen.getByText("Patty")).toBeVisible();
        expect(screen.getByText("Experience the high tide")).toBeVisible();
        expect(screen.getByText("Experience the low tide")).toBeVisible();
      });
    });

    it("does not render empty sections", async () => {
      render(
        <Wrapper
          menu={[menuSection<OptionLike>("Section Header Label", [], [])]}
        />,
      );

      await openAutocomplete("arrowUp");
      await screen.findByRole("listbox");

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

      await openAutocomplete("arrowUp");
      await screen.findByRole("listbox");

      await typeInInput("T");

      expect(screen.queryByText("O Letter Section")).not.toBeInTheDocument();
    });
  });

  describe("actions", () => {
    it("invokes action on Enter and closes when shouldClose is true/undefined", async () => {
      const { menu, createAction } = buildMenu();

      render(<Wrapper menu={menu} />);

      await openAutocomplete("arrowDown");
      // 3 options, 2 actions - move highlight to second action (index 4)
      await navigateDown(4);
      await selectWithKeyboard();

      expect(createAction).toHaveBeenCalled();
      await expectMenuClosed();
    });

    it("invokes action on click and stays open when shouldClose is false", async () => {
      const { menu, stayOpenAction } = buildMenu();

      render(<Wrapper menu={menu} />);

      await openAutocomplete("type", "o");
      await selectWithClick("Stay Open");

      expect(stayOpenAction).toHaveBeenCalled();
      await expectMenuShown();
    });
  });

  describe("default options", () => {
    it("renders default option content", async () => {
      render(<Wrapper />);

      await openAutocomplete("arrowDown");

      await waitFor(() => {
        expect(screen.getByText("One")).toBeVisible();
        expect(screen.queryByTestId("checkmark")).not.toBeInTheDocument();
      });
    });

    it("renders default selected option content", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete("arrowDown");

      await waitFor(() => {
        expect(screen.getByText("Two")).toBeVisible();
        expect(screen.getByTestId("checkmark")).toBeVisible();
      });
    });
  });

  it("does not auto-reopen from programmatic input update after selection", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("type", "O");
    await navigateDown(1);
    await selectWithKeyboard();

    expect(onChange).toHaveBeenCalledWith({ label: "One" });
    await expectMenuClosed();
  });

  describe("filterOptions", () => {
    it("can opt-out of filtering entirely with filterOptions=false (async pattern)", async () => {
      render(<Wrapper filterOptions={false} />);

      await openAutocomplete(
        "type",
        "Any way you want it, that's the way I need it",
      );

      // With opt-out, all options should be visible regardless of input
      await expectMenuShown();
      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();
      expect(screen.getByText("Three")).toBeVisible();
    });

    it("can provide a custom filter function", async () => {
      // Ignore the search term, just return things that have "t"
      render(
        <Wrapper
          filterOptions={opts => opts.filter(o => o.label.includes("T"))}
        />,
      );

      await openAutocomplete("type", "n");

      await expectMenuShown();
      // Two and Three should be visible
      expect(screen.getByText("Two")).toBeVisible();
      expect(screen.getByText("Three")).toBeVisible();
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

      await openAutocomplete("type", "4");

      await expectMenuShown();
      expect(screen.getByText("16")).toBeVisible();
    });
  });

  describe("with a selection", () => {
    it("highlights the selected option on open", async () => {
      render(<Wrapper initialValue={{ label: "Two" }} />);

      await openAutocomplete("arrowDown");

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
    });
  });

  describe("openOnFocus=false (default)", () => {
    it("shows full list when input exactly matches an option label (unfiltered) after user opens", async () => {
      render(
        <Wrapper initialValue={{ label: "Two" }} initialInputValue="Two" />,
      );

      await openAutocomplete("arrowDown");

      await expectMenuShown();

      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();
    });

    it("highlights selected item on reopen when input exactly matches that option", async () => {
      render(<Wrapper />);

      await openAutocomplete("arrowDown");
      await screen.findByRole("listbox");

      await selectWithClick("Two");

      await expectMenuClosed();

      await openAutocomplete("arrowDown");
      await screen.findByRole("listbox");

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
    });
  });

  describe("openOnFocus=true", () => {
    it("opens on focus", async () => {
      render(<Wrapper openOnFocus />);

      await focusAutocomplete();

      await expectMenuShown();
    });

    it("does not highlight an option or action when the menu is opened for the first time", async () => {
      render(<Wrapper openOnFocus />);

      await focusAutocomplete();

      const activeOption = getActiveOption();
      const activeAction = getActiveAction();

      expect(activeOption).toBeNull();
      expect(activeAction).toBeNull();
    });

    it("opens on focus and shows full list when input exactly matches an option label and highlights selected", async () => {
      render(
        <Wrapper
          initialValue={{ label: "Two" }}
          initialInputValue="Two"
          openOnFocus
        />,
      );

      await focusAutocomplete();

      await expectMenuShown();
      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();

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

      await openAutocomplete("arrowDown");
      await expectMenuClosed();

      await openAutocomplete("arrowUp");
      await expectMenuClosed();

      await openAutocomplete("type", "Two");
      await expectMenuClosed();
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
    it("commits free-form on blur when non-empty and no exact match", async () => {
      const onChange = jest.fn();

      function WrapperWithSpy() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <AutocompleteRebuilt
            version={2}
            allowFreeForm
            createFreeFormValue={input => ({
              label: input,
            })}
            value={undefined}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={setInputValue}
            menu={menu}
            placeholder="Testing free-form"
          />
        );
      }

      render(<WrapperWithSpy />);

      await openAutocomplete("type", "NewCity");
      await blurAutocomplete();

      expect(onChange).toHaveBeenCalledWith({
        label: "NewCity",
      });
    });

    it("commits free-form on Enter when menu has no options (filtered out)", async () => {
      const onChange = jest.fn();

      function WrapperWithSpyFilterNone() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <AutocompleteRebuilt
            version={2}
            allowFreeForm
            createFreeFormValue={input => ({
              label: input,
            })}
            value={undefined}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={setInputValue}
            menu={menu}
            filterOptions={() => []}
            placeholder="Testing free-form"
          />
        );
      }

      render(<WrapperWithSpyFilterNone />);

      await openAutocomplete("type", "Zed");
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({
        label: "Zed",
      });
    });

    it("selects existing option on blur when input exactly matches (case-sensitive by default)", async () => {
      const onChange = jest.fn();

      function WrapperWithSpy() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <AutocompleteRebuilt
            version={2}
            allowFreeForm
            createFreeFormValue={input => ({
              label: input,
            })}
            value={undefined}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={setInputValue}
            menu={menu}
            placeholder="Testing free-form"
          />
        );
      }

      render(<WrapperWithSpy />);

      await openAutocomplete("type", "Two");
      await blurAutocomplete();

      expect(onChange).toHaveBeenCalledWith({ label: "Two" });
    });

    it("treats different case as free-form by default (case-sensitive)", async () => {
      const onChange = jest.fn();

      function WrapperWithSpy() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <AutocompleteRebuilt
            version={2}
            allowFreeForm
            createFreeFormValue={input => ({
              label: input,
            })}
            value={undefined}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={setInputValue}
            menu={menu}
            placeholder="Testing free-form"
          />
        );
      }

      render(<WrapperWithSpy />);

      await openAutocomplete("type", "two");
      await blurAutocomplete();

      expect(onChange).toHaveBeenCalledWith({
        label: "two",
      });
    });

    it("can match case-insensitively with inputEqualsOption override", async () => {
      const onChange = jest.fn();

      function WrapperWithSpy() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <AutocompleteRebuilt
            version={2}
            allowFreeForm
            createFreeFormValue={input => ({
              label: input,
            })}
            value={undefined}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={setInputValue}
            menu={menu}
            inputEqualsOption={(input, option) =>
              input.trim().toLowerCase() === option.label.toLowerCase()
            }
            placeholder=""
          />
        );
      }

      render(<WrapperWithSpy />);

      await openAutocomplete("type", "two");
      await blurAutocomplete();

      expect(onChange).toHaveBeenCalledWith({ label: "Two" });
    });

    it("commits free-form on Enter when menu is closed", async () => {
      const onChange = jest.fn();

      function WrapperWithSpy() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <AutocompleteRebuilt
            version={2}
            allowFreeForm
            createFreeFormValue={input => ({
              label: input,
            })}
            value={undefined}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={setInputValue}
            menu={menu}
            placeholder="Testing while closed"
          />
        );
      }

      render(<WrapperWithSpy />);

      await openAutocomplete("type", "Custom");
      await closeAutocomplete();
      await selectWithKeyboard();

      expect(onChange).toHaveBeenCalledWith({
        label: "Custom",
      });
    });
  });

  it("highlights selected item on reopen when input exactly matches that option", async () => {
    render(<Wrapper initialValue={{ label: "Two" }} initialInputValue="Two" />);

    await openAutocomplete("arrowDown");
    await screen.findByRole("listbox");

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Two");
  });

  it("does not highlight an option or action when the menu is opened for the first time", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");

    const activeOption = getActiveOption();
    const activeAction = getActiveAction();

    expect(activeOption).toBeNull();
    expect(activeAction).toBeNull();
  });

  it("highlights the correct option reopening after a selection", async () => {
    render(<Wrapper />);
    await openAutocomplete("arrowDown");
    await navigateDown(3);
    await selectWithKeyboard();

    // selection closed the menu
    await openAutocomplete("arrowUp");

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Three");
  });

  it("highlights the correct option reopening after bluring", async () => {
    render(<Wrapper />);
    await openAutocomplete("arrowDown");
    await navigateDown(3);
    await selectWithKeyboard();

    // selection closed the menu
    await openAutocomplete("arrowUp");

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Three");
  });

  it("does not highlight an option from typing alone", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    await typeInInput("Thr");

    const activeOption = getActiveOption();
    expect(activeOption).toBeNull();
  });

  // Test requires multiple interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state when the menu is closed without a selection", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    await navigateDown(2);

    const firstActiveOption = getActiveOption();

    expect(firstActiveOption).not.toBeNull();
    expect(firstActiveOption?.textContent).toContain("Two");

    await closeAutocomplete();

    await openAutocomplete("arrowDown");

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).toBeNull();

    await navigateDown(1);

    // we expect this to be back on the first option since resetting brings us to null
    const thirdActiveOption = getActiveOption();

    expect(thirdActiveOption).not.toBeNull();
    expect(thirdActiveOption?.textContent).toContain("One");
  });

  // Test requires multiple interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state when the input is cleared with backspaces", async () => {
    render(<Wrapper />);

    await openAutocomplete("type", "Th");
    await navigateDown(1);

    const firstActiveOption = getActiveOption();

    expect(firstActiveOption).not.toBeNull();

    await deleteInput(2);
    await openAutocomplete("arrowDown");

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).toBeNull();

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

    await openAutocomplete("arrowDown");
    await navigateDown(4);

    const activeAction = getActiveAction();

    expect(activeAction).not.toBeNull();

    await selectWithKeyboard();

    await openAutocomplete("arrowDown");

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).toBeNull();

    const activeOption = getActiveOption();

    expect(activeOption).toBeNull();

    await navigateDown(1);

    const thirdActiveOption = getActiveOption();

    expect(thirdActiveOption).not.toBeNull();
    expect(thirdActiveOption?.textContent).toContain("One");
  });
  // Test requires multiple interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state when the autocomplete loses focus (blur)", async () => {
    render(<Wrapper />);

    await openAutocomplete("type", "Th");
    await navigateDown(1);

    const firstActiveOption = getActiveOption();

    expect(firstActiveOption).not.toBeNull();

    await blurAutocomplete();

    await openAutocomplete("arrowDown");

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).toBeNull();

    await navigateDown(1);

    // we expect this to be back on the first option since resetting brings us to null
    const thirdActiveOption = getActiveOption();

    expect(thirdActiveOption).not.toBeNull();
    expect(thirdActiveOption?.textContent).toContain("One");
  });

  // Test requires elaborate amount of interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state after making a selection, deleting it and reopening the menu", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    await navigateDown(1);

    await selectWithKeyboard();

    await openAutocomplete("arrowDown");
    await deleteInput(3);

    expect(screen.getByRole("textbox")).toHaveValue("");

    await navigateDown(1);

    const activeOption = getActiveOption();

    expect(activeOption).toBeNull();

    await navigateDown(1);

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).not.toBeNull();
    expect(secondActiveOption?.textContent).toContain("One");
  });
  // Test requires elaborate amount of interactions
  // eslint-disable-next-line max-statements
  it("resets the highlight to initial, not visible state after making a selection, select-all + delete and reopening the menu", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    await navigateDown(1);

    await selectWithKeyboard();

    await openAutocomplete("arrowDown");
    await selectAll();
    await deleteInput(1);

    expect(screen.getByRole("textbox")).toHaveValue("");

    await navigateDown(1);

    const activeOption = getActiveOption();

    expect(activeOption).toBeNull();

    await navigateDown(1);

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).not.toBeNull();
    expect(secondActiveOption?.textContent).toContain("One");
  });

  it("resets the highlight to initial, not visible state after moving index and typing a search term", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    await navigateDown(2);

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();

    await typeInInput("O");

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).toBeNull();

    await navigateDown(1);

    const thirdActiveOption = getActiveOption();

    expect(thirdActiveOption).not.toBeNull();
    expect(thirdActiveOption?.textContent).toContain("One");
  });

  it("wraps highlight from first option to last on ArrowUp", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    // Move to first option
    await navigateUp(1);

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Three");
  });

  it("wraps highlight from last option to first on ArrowDown", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    // Move to last option (3 options + 2 actions)
    await navigateDown(5);
    // One more to wrap
    await navigateDown(1);

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("One");
  });

  it("keeps the selected item highlighted as characters are deleted", async () => {
    render(<Wrapper initialValue={{ label: "Two" }} />);

    await openAutocomplete("arrowDown");

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Two");

    await deleteInput(2);

    const secondActiveOption = getActiveOption();

    expect(secondActiveOption).not.toBeNull();
    expect(secondActiveOption?.textContent).toContain("Two");
  });

  it("highlights the selected option on reopen after blur", async () => {
    render(<Wrapper initialValue={{ label: "Two" }} />);

    await openAutocomplete("arrowDown");
    await blurAutocomplete();
    await openAutocomplete("arrowDown");

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Two");
  });

  it("highlights the selected option on reopon after dismissing the menu", async () => {
    render(<Wrapper initialValue={{ label: "Two" }} />);

    await openAutocomplete("arrowDown");
    await closeAutocomplete();
    await openAutocomplete("arrowDown");

    const activeOption = getActiveOption();

    expect(activeOption).not.toBeNull();
    expect(activeOption?.textContent).toContain("Two");
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

      await openAutocomplete("type", "Just a Pineapple");

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

      await openAutocomplete("arrowDown");

      await waitFor(() => {
        expect(
          screen.getByTestId("custom-section-header-special"),
        ).toBeVisible();
      });
    });
  });

  describe("renderOption", () => {
    it("renders a custom layout for renderOption when provided", async () => {
      const renderOption = ({
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
          renderOption={renderOption}
        />,
      );

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      expect(screen.getByTestId("custom-option-special")).toBeVisible();
      expect(screen.getByTestId("custom-option-normal")).toBeVisible();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      expect(screen.getByTestId("custom-action-special")).toBeVisible();
    });
  });

  describe("emptyState", () => {
    it("shows default empty state when there are no options to render", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(<Wrapper menu={emptyMenu} />);

      await openAutocomplete("arrowDown");

      await expectMenuShown();
      expect(screen.getByText("No options")).toBeVisible();
    });

    it("shows default empty state when there are no options to render and filtering is disabled", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(<Wrapper menu={emptyMenu} filterOptions={false} />);

      await openAutocomplete("arrowDown");

      await expectMenuShown();
      expect(screen.getByText("No options")).toBeVisible();
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

      await openAutocomplete("arrowDown");

      await expectMenuShown();
      expect(screen.getByTestId("custom-empty")).toBeVisible();
      expect(screen.queryByText("No options")).not.toBeInTheDocument();
    });

    it("shows basic empty state when filtering removes all options", async () => {
      render(<Wrapper filterOptions={() => []} />);

      await openAutocomplete("type", "anything");

      await expectMenuShown();
      expect(screen.getByText("No options")).toBeVisible();
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

      await openAutocomplete("type", "something with no matches");
      await expectMenuShown();

      expect(screen.queryByText("Create new")).not.toBeInTheDocument();
      expect(screen.queryByText("Browse templates")).not.toBeInTheDocument();
    });

    it("renders emptyActions (array) together with empty message when there are no options", async () => {
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      // Empty message shown alongside actions by default
      expect(screen.getByText("No options")).toBeVisible();

      // Actions are present and navigable
      expect(screen.getByText("Create new")).toBeVisible();
      expect(screen.getByText("Browse templates")).toBeVisible();

      // Keyboard navigation to first action and invoke
      await navigateDown(1);
      await selectWithKeyboard();
      expect(create).toHaveBeenCalled();
    });

    it("renders emptyActions (function) using current input", async () => {
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

      await openAutocomplete("type", "Zed");
      await expectMenuShown();

      // Action reflects typed input
      expect(screen.getByText('Add "Zed"')).toBeVisible();

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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      expect(screen.getByTestId("regular-action")).toBeVisible();

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
            { type: "action", label: "Create new", onClick: create },
          ]}
        />,
      );

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      // Empty message suppressed
      expect(screen.queryByText("No options")).not.toBeInTheDocument();

      // Action visible
      expect(screen.getByText("Create new")).toBeVisible();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      expect(screen.getByText("Persistent Text Header")).toBeVisible();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      expect(screen.getByText("Persistent Text Footer")).toBeVisible();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

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

      await openAutocomplete("type", "O");
      await expectMenuShown();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

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

      await openAutocomplete("type", "O");
      await expectMenuShown();

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

      await openAutocomplete("type", "One");
      await expectMenuShown();

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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      await navigateDown(1);

      // Interactive persistent is also role="option"
      const activePersistent = getActiveOption();

      expect(activePersistent).toBeVisible();
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

      await openAutocomplete("type", "o");
      await expectMenuShown();
      // Two options, one persistent
      await navigateDown(4);

      const activePersistent = getActiveOption();
      expect(activePersistent).toBeVisible();
      expect(activePersistent).toHaveTextContent("Interactive Header");
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

      await openAutocomplete("type", "i");
      await expectMenuShown();

      expect(screen.getByTestId("custom-persistent")).toBeVisible();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      await navigateDown(1);

      expect(screen.getByTestId("custom-persistent-active")).toBeVisible();
      expect(screen.getByTestId("custom-persistent-inactive")).toBeVisible();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      expect(screen.getByTestId("custom-persistent-header")).toBeVisible();
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

      await openAutocomplete("arrowDown");
      await expectMenuShown();

      expect(screen.getByTestId("custom-persistent")).toBeVisible();
      expect(screen.getByTestId("custom-persistent")).toHaveTextContent(
        "something",
      );
    });
  });
  describe("renderOption/renderAction render args", () => {
    it("renders a custom layout for renderOption when provided", async () => {
      const renderOption = jest.fn(({ value }) => value.label);

      render(<Wrapper renderOption={renderOption} />);

      await openAutocomplete("arrowDown");
      expect(renderOption).toHaveBeenCalled();
    });

    it("renders a custom layout for renderAction when provided", async () => {
      const renderAction = jest.fn(({ value }) => value.label);

      render(<Wrapper renderAction={renderAction} />);
      await openAutocomplete("arrowDown");

      expect(renderAction).toHaveBeenCalled();
    });

    it("passes isActive correctly to renderOption for the highlighted option", async () => {
      // TODO: Consider consuming the value and using it as output to verify isActive rather than calls
      const renderOption = jest.fn(({ value }) => value.label);

      render(
        <AutocompleteRebuilt
          version={2}
          value={undefined}
          onChange={jest.fn()}
          inputValue=""
          onInputChange={jest.fn()}
          menu={buildMenu().menu}
          placeholder=""
          renderOption={renderOption}
        />,
      );

      await openAutocomplete("arrowDown");
      await navigateDown(1);

      // Find the last call for the option "One" and assert isActive true
      const calls = renderOption.mock.calls as Array<
        [{ value: TestOption; isActive: boolean; isSelected: boolean }]
      >;
      const lastForOne = [...calls]
        .reverse()
        .find(([args]) => args.value.label === "One");

      expect(lastForOne).toBeTruthy();
      expect(lastForOne?.[0].isActive).toBe(true);
      expect(lastForOne?.[0].isSelected).toBe(false);
    });

    it("passes isSelected correctly to renderOption for the selected option", async () => {
      const renderOption = jest.fn(({ value }) => value.label);

      render(
        <AutocompleteRebuilt
          version={2}
          value={{ label: "Two" }}
          onChange={jest.fn()}
          inputValue={"Two"}
          onInputChange={jest.fn()}
          menu={buildMenu().menu}
          placeholder=""
          openOnFocus
          renderOption={renderOption}
        />,
      );

      await openAutocomplete("click");

      const calls = renderOption.mock.calls as Array<
        [{ value: TestOption; isActive: boolean; isSelected: boolean }]
      >;
      const lastForTwo = [...calls]
        .reverse()
        .find(([args]) => args.value.label === "Two");

      expect(lastForTwo).toBeTruthy();
      expect(lastForTwo?.[0].isSelected).toBe(true);
    });

    it("passes isActive to renderAction for the highlighted action", async () => {
      const { menu } = buildMenu();
      const renderAction = jest.fn(({ value }) => value.label);

      render(
        <AutocompleteRebuilt
          version={2}
          value={undefined}
          onChange={jest.fn()}
          inputValue={""}
          onInputChange={jest.fn()}
          menu={menu}
          placeholder=""
          renderAction={renderAction}
        />,
      );

      await openAutocomplete("arrowDown");
      // 3 options, 2 actions - move highlight to second action (index 4)
      await navigateDown(5);

      const activeAction = getActiveAction();

      expect(activeAction).not.toBeNull();
      expect(activeAction?.textContent).toContain("Stay Open");

      const calls = renderAction.mock.calls as Array<
        [{ value: { label: string }; isActive: boolean }]
      >;
      const lastAction = [...calls].reverse()[0]?.[0];

      expect(lastAction?.isActive).toBe(true);
    });
  });

  describe("UNSAFE props", () => {
    it("passes className to the menu", async () => {
      render(<Wrapper UNSAFE_className={{ menu: "custom-menu" }} />);

      await openAutocomplete("arrowDown");

      expect(await screen.findByRole("listbox")).toHaveClass("custom-menu");
    });

    it("passes styles to the menu", async () => {
      render(<Wrapper UNSAFE_styles={{ menu: { backgroundColor: "red" } }} />);

      await openAutocomplete("arrowDown");

      expect(await screen.findByRole("listbox")).toHaveStyle({
        backgroundColor: "red",
      });
    });

    it("passes className to the option", async () => {
      render(<Wrapper UNSAFE_className={{ option: "custom-option" }} />);

      await openAutocomplete("arrowDown");

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

      await openAutocomplete("arrowDown");

      expect(
        screen
          .getAllByRole("option")
          .every(option => option.style.backgroundColor === "red"),
      ).toBe(true);
    });

    it("passes className to the action", async () => {
      render(<Wrapper UNSAFE_className={{ action: "custom-action" }} />);

      await openAutocomplete("arrowDown");

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

      await openAutocomplete("arrowDown");

      expect(
        screen
          .getAllByTestId("ATL-AutocompleteRebuilt-Action")
          .every(action => action.style.backgroundColor === "red"),
      ).toBe(true);
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
