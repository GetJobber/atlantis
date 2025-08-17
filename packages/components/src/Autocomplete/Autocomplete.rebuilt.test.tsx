import { render, screen } from "@testing-library/react";
import React from "react";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";
import {
  type AutocompleteRebuiltProps,
  type MenuItem,
  type MenuSection,
  type OptionLike,
  menuOptions,
  menuSection,
} from "./Autocomplete.types";
import {
  blurAutocomplete,
  closeAutocomplete,
  deleteInput,
  focusAutocomplete,
  getActiveAction,
  getActiveOption,
  navigateDown,
  openAutocomplete,
  selectAll,
  selectWithClick,
  selectWithKeyboard,
  typeInInput,
} from "./Autocomplete.pom";
import { InputText } from "../InputText";
import { GLIMMER_TEST_ID } from "../Glimmer/Glimmer";

// TODO: POM to abstract the interactions and give them meaningful names

interface TestOption {
  label: string;
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
            id: "a1",
            label: "Create",
            onClick: createAction,
          },
          {
            type: "action",
            id: "a2",
            label: "Stay Open",
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
  onChange,
  onInputChange,
  menu,
  openOnFocus,
  filterOptions,
  renderOption,
  renderAction,
  renderSection,
  renderInput,
  loading,
  emptyState,
  ref,
}: {
  readonly initialValue?: T;
  readonly initialInputValue?: string;
  readonly onChange?: (v: T | undefined) => void;
  readonly onInputChange?: (v: string) => void;
  readonly menu?: MenuItem<T>[];
  readonly openOnFocus?: boolean;
  readonly filterOptions?: false | ((o: T, i: string) => boolean);
  readonly renderOption?: AutocompleteRebuiltProps<T, false>["renderOption"];
  readonly renderAction?: AutocompleteRebuiltProps<T, false>["renderAction"];
  readonly renderSection?: AutocompleteRebuiltProps<T, false>["renderSection"];
  readonly renderInput?: AutocompleteRebuiltProps<T, false>["renderInput"];
  readonly loading?: boolean;
  readonly emptyState?: React.ReactNode;
  readonly ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}) {
  const [value, setValue] = React.useState<T | undefined>(initialValue);
  const [inputValue, setInputValue] = React.useState<string>(
    initialValue?.label ?? "",
  );
  const built = React.useMemo(() => buildMenu(), []);

  return (
    <AutocompleteRebuilt
      version={2}
      value={value}
      onChange={onChange ?? setValue}
      inputValue={inputValue}
      onInputChange={onInputChange ?? setInputValue}
      menu={menu ?? (built.menu as unknown as MenuItem<T>[])}
      placeholder=""
      openOnFocus={openOnFocus}
      filterOptions={filterOptions}
      renderOption={renderOption}
      renderAction={renderAction}
      renderSection={renderSection}
      renderInput={renderInput}
      loading={loading}
      emptyState={emptyState}
      ref={ref}
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

      expect(screen.getByRole("listbox")).toBeVisible();
      expect(screen.getAllByTestId(GLIMMER_TEST_ID)).toHaveLength(3);
    });

    it("does not render Glimmers when loading is false or omitted", async () => {
      render(<Wrapper />);

      await openAutocomplete("arrowDown");

      expect(screen.queryByRole("listbox")).toBeVisible();
      expect(screen.queryByTestId(GLIMMER_TEST_ID)).not.toBeInTheDocument();
    });
  });

  it("opens the menu when arrowUp is pressed", async () => {
    render(<Wrapper />);
    await openAutocomplete("arrowUp");
    await navigateDown(1);

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("opens the menu when arrowDown is pressed", async () => {
    render(<Wrapper />);
    await openAutocomplete("arrowDown");
    await navigateDown(1);

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("opens the menu when user types", async () => {
    render(<Wrapper />);
    await openAutocomplete("type", "o");
    await navigateDown(1);

    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("selects the highlighted option on Enter and closes", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("arrowDown");
    await navigateDown(1);
    await selectWithKeyboard();

    expect(onChange).toHaveBeenCalledWith({ label: "One" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an option on click and closes", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("arrowDown");
    await selectWithClick("Two");

    expect(onChange).toHaveBeenCalledWith({ label: "Two" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not select on Enter when menu is closed and free-form is disabled", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await focusAutocomplete();
    // Menu should remain closed on focus when openOnFocus is false
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await selectWithKeyboard();

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not select on Enter after menu was manually closed (free-form disabled)", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("arrowDown");
    await navigateDown(1);
    expect(await screen.findByRole("listbox")).toBeVisible();

    await closeAutocomplete();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await selectWithKeyboard();

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  describe("sections", () => {
    it("renders a default section header when data provided", async () => {
      render(
        <Wrapper
          menu={[
            menuSection("one", "Hello from a section", [
              { label: "One" },
              { label: "Two" },
            ]),
          ]}
        />,
      );

      await openAutocomplete("arrowUp");

      expect(screen.getByText("Hello from a section")).toBeVisible();
      // Double check options are there too for good measure
      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();
    });

    it("renders actions within sections", async () => {
      render(
        <Wrapper
          menu={[
            menuSection<OptionLike>(
              "one",
              "Hello from a section",
              [{ label: "Krabby" }, { label: "Patty" }],
              [
                {
                  type: "action",
                  id: "a1",
                  label: "Experience the high tide",
                  onClick: jest.fn(),
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete("arrowUp");

      expect(screen.getByText("Hello from a section")).toBeVisible();
      expect(screen.getByText("Krabby")).toBeVisible();
      expect(screen.getByText("Patty")).toBeVisible();
      expect(screen.getByText("Experience the high tide")).toBeVisible();
    });

    it("renders section actions and actions on the root", async () => {
      render(
        <Wrapper
          menu={[
            menuSection<OptionLike>(
              "one",
              "Hello from a section",
              [{ label: "Krabby" }, { label: "Patty" }],
              [
                {
                  type: "action",
                  id: "a1",
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
                  id: "a2",
                  label: "Experience the low tide",
                  onClick: jest.fn(),
                },
              ],
            ),
          ]}
        />,
      );

      await openAutocomplete("arrowUp");

      expect(screen.getByText("Hello from a section")).toBeVisible();
      expect(screen.getByText("Krabby")).toBeVisible();
      expect(screen.getByText("Patty")).toBeVisible();
      expect(screen.getByText("Experience the high tide")).toBeVisible();
      expect(screen.getByText("Experience the low tide")).toBeVisible();
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
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("invokes action on click and stays open when shouldClose is false", async () => {
      const { menu, stayOpenAction } = buildMenu();

      render(<Wrapper menu={menu} />);

      await openAutocomplete("type", "o");
      await selectWithClick("Stay Open");

      expect(stayOpenAction).toHaveBeenCalled();
      expect(screen.getByRole("listbox")).toBeVisible();
    });
  });

  it("does not auto-reopen from programmatic input update after selection", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("type", "O");
    await navigateDown(1);
    await selectWithKeyboard();

    expect(onChange).toHaveBeenCalledWith({ label: "One" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  describe("filterOptions", () => {
    it("can opt-out of filtering entirely with filterOptions=false (async pattern)", async () => {
      render(<Wrapper filterOptions={false} />);

      await openAutocomplete(
        "type",
        "Any way you want it, that's the way I need it",
      );

      // With opt-out, all options should be visible regardless of input
      expect(await screen.findByRole("listbox")).toBeVisible();
      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();
      expect(screen.getByText("Three")).toBeVisible();
    });

    it("can provide a custom filter function", async () => {
      // Ignore the search term, just return things that have "t"
      render(<Wrapper filterOptions={o => o.label.includes("T")} />);

      await openAutocomplete("type", "n");

      expect(await screen.findByRole("listbox")).toBeVisible();
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
        o: { label: string; squareRoot: number },
        i: string,
      ) => o.squareRoot === parseInt(i, 10);

      render(
        <Wrapper<{ label: string; squareRoot: number }>
          menu={customOptionMenu}
          filterOptions={filterOptions}
        />,
      );

      await openAutocomplete("type", "4");

      expect(await screen.findByRole("listbox")).toBeVisible();
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

      expect(await screen.findByRole("listbox")).toBeVisible();
      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();
    });

    it("highlights selected item on reopen when input exactly matches that option", async () => {
      render(<Wrapper />);

      await openAutocomplete("arrowDown");
      await screen.findByRole("listbox");

      await selectWithClick("Two");

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

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

      expect(screen.getByRole("listbox")).toBeVisible();
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

      expect(await screen.findByRole("listbox")).toBeVisible();
      expect(screen.getByText("One")).toBeVisible();
      expect(screen.getByText("Two")).toBeVisible();

      const activeOption = getActiveOption();

      expect(activeOption).not.toBeNull();
      expect(activeOption?.textContent).toContain("Two");
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
            filterOptions={() => false}
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
          <AutocompleteRebuilt<TestOption>
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
          <AutocompleteRebuilt<TestOption>
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
          <AutocompleteRebuilt<TestOption>
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
      const renderSection = (section: MenuSection<OptionLike>) => {
        return (
          <strong data-testid="custom-section-header">{section.label}</strong>
        );
      };
      const sectionedMenu: MenuItem<OptionLike>[] = [
        {
          type: "section",
          id: "one",
          label: "One",
          options: [{ label: "One" }, { label: "Two" }],
        },
      ];

      render(<Wrapper renderSection={renderSection} menu={sectionedMenu} />);

      await openAutocomplete("arrowDown");

      expect(screen.getByTestId("custom-section-header")).toBeVisible();
    });
  });

  describe("renderOption", () => {
    it("renders a custom layout for renderOption when provided", async () => {
      const renderOption = ({ value }: { value: OptionLike }) => {
        return <strong data-testid="custom-option">{value.label}</strong>;
      };

      render(<Wrapper renderOption={renderOption} />);

      await openAutocomplete("arrowDown");

      expect(screen.getAllByTestId("custom-option")).toHaveLength(3);
    });
  });

  describe("renderAction", () => {
    it("renders a custom layout for renderAction when provided", async () => {
      const renderAction = ({ value }: { value: OptionLike }) => {
        return <strong data-testid="custom-action">{value.label}</strong>;
      };

      render(<Wrapper renderAction={renderAction} />);

      await openAutocomplete("arrowDown");

      expect(screen.getAllByTestId("custom-action")).toHaveLength(2);
    });
  });

  describe("emptyState", () => {
    it("shows default empty state when there are no options to render", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(<Wrapper menu={emptyMenu} />);

      await openAutocomplete("arrowDown");

      expect(screen.getByRole("listbox")).toBeVisible();
      expect(screen.getByText("No options")).toBeVisible();
    });
    it("shows default empty state when there are no options to render and filtering is disabled", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(<Wrapper menu={emptyMenu} filterOptions={false} />);

      await openAutocomplete("arrowDown");

      expect(screen.getByRole("listbox")).toBeVisible();
      expect(screen.getByText("No options")).toBeVisible();
    });

    it("shows custom empty state when provided", async () => {
      const emptyMenu: MenuItem<OptionLike>[] = [menuOptions<OptionLike>([])];

      render(
        <Wrapper
          menu={emptyMenu}
          emptyState={<span data-testid="custom-empty">Nothing here</span>}
        />,
      );

      await openAutocomplete("arrowDown");

      expect(screen.getByRole("listbox")).toBeVisible();
      expect(screen.getByTestId("custom-empty")).toBeVisible();
      expect(screen.queryByText("No options")).not.toBeInTheDocument();
    });

    it("shows empty state when filtering removes all options", async () => {
      render(<Wrapper filterOptions={() => false} />);

      await openAutocomplete("type", "anything");

      expect(screen.getByRole("listbox")).toBeVisible();
      expect(screen.getByText("No options")).toBeVisible();
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
        <AutocompleteRebuilt<TestOption>
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
        <AutocompleteRebuilt<TestOption>
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
