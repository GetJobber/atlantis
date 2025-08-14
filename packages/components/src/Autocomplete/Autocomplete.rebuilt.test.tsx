import { render, screen } from "@testing-library/react";
import React from "react";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";
import { menuOptions } from "./Autocomplete.types";
import {
  blurAutocomplete,
  closeAutocomplete,
  focusAutocomplete,
  getActiveAction,
  getActiveOption,
  navigateDown,
  openAutocomplete,
  selectWithClick,
  selectWithKeyboard,
  typeInInput,
} from "./Autocomplete.pom";

// TODO: POM to abstract the interactions and give them meaningful names

interface TestOption {
  id: string | number;
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
      menuOptions(
        [
          { id: "one", label: "One" },
          { id: "two", label: "Two" },
          { id: "three", label: "Three" },
        ],
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

function Wrapper({
  initialValue,
  initialInputValue,
  onChange,
  onInputChange,
  menu,
  openOnFocus,
}: {
  readonly initialValue?: TestOption;
  readonly initialInputValue?: string;
  readonly onChange?: (v: TestOption | undefined) => void;
  readonly onInputChange?: (v: string) => void;
  readonly menu?: ReturnType<typeof buildMenu>["menu"];
  readonly openOnFocus?: boolean;
}) {
  const [value, setValue] = React.useState<TestOption | undefined>(
    initialValue,
  );
  const [inputValue, setInputValue] = React.useState<string>(
    initialInputValue ?? "",
  );
  const built = React.useMemo(() => buildMenu(), []);

  return (
    <AutocompleteRebuilt
      version={2}
      value={value}
      onChange={onChange ?? setValue}
      inputValue={inputValue}
      onInputChange={onInputChange ?? setInputValue}
      menu={menu ?? built.menu}
      filterOptions={() => true}
      getOptionLabel={opt => opt.label}
      getOptionKey={opt => opt.id}
      placeholder=""
      openOnFocus={openOnFocus}
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

    expect(onChange).toHaveBeenCalledWith({ id: "one", label: "One" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an option on click and closes", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("arrowDown");
    await selectWithClick("Two");

    expect(onChange).toHaveBeenCalledWith({ id: "two", label: "Two" });
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

  it("does not auto-reopen from programmatic input update after selection", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    await openAutocomplete("type", "O");
    await navigateDown(1);
    await selectWithKeyboard();

    expect(onChange).toHaveBeenCalledWith({ id: "one", label: "One" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  describe("openOnFocus=false (default)", () => {
    it("shows full list when input exactly matches an option label (unfiltered) after user opens", async () => {
      render(
        <Wrapper
          initialValue={{ id: "two", label: "Two" }}
          initialInputValue="Two"
        />,
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
          initialValue={{ id: "two", label: "Two" }}
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
              id: "1998",
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
        id: "1998",
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
              id: "1998",
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
        id: "1998",
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
              id: "1998",
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

      expect(onChange).toHaveBeenCalledWith({ id: "two", label: "Two" });
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
              id: "1998",
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
        id: "1998",
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
              id: "1998",
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

      expect(onChange).toHaveBeenCalledWith({ id: "two", label: "Two" });
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
              id: "1998",
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
        id: "1998",
        label: "Custom",
      });
    });
  });

  it("highlights selected item on reopen when input exactly matches that option", async () => {
    render(
      <Wrapper
        initialValue={{ id: "two", label: "Two" }}
        initialInputValue="Two"
      />,
    );

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

  it("does not highlight an option from typing alone", async () => {
    render(<Wrapper />);

    await openAutocomplete("arrowDown");
    await typeInInput("Thr");

    const activeOption = getActiveOption();
    expect(activeOption).toBeNull();
  });

  describe("renderOption/renderAction render args", () => {
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
          value={{ id: "two", label: "Two" }}
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
});
