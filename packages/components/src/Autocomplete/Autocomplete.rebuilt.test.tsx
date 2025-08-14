import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AutocompleteRebuilt } from "./Autocomplete.rebuilt";
import { menuOptions } from "./Autocomplete.types";

interface TestOption {
  id: string | number;
  label: string;
}

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
describe("AutocompleteRebuilt", () => {
  it("renders", () => {
    render(<Wrapper />);
    expect(screen.getByTestId("ATL-AutocompleteRebuilt")).toBeInTheDocument();
  });

  it("selects the highlighted option on Enter and closes", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    expect(onChange).toHaveBeenCalledWith({ id: "one", label: "One" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an option on click and closes", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.click(screen.getByText("Two"));

    expect(onChange).toHaveBeenCalledWith({ id: "two", label: "Two" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("invokes action on Enter and closes when shouldClose is true/undefined", async () => {
    const { menu, createAction } = buildMenu();

    render(<Wrapper menu={menu} />);

    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    // Move to last option then to first action (3 options → index 0..2; action index 3)
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    expect(createAction).toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("invokes action on click and stays open when shouldClose is false", async () => {
    const { menu, stayOpenAction } = buildMenu();

    render(<Wrapper menu={menu} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "o");
    await userEvent.click(screen.getByText("Stay Open"));

    expect(stayOpenAction).toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("does not auto-reopen from programmatic input update after selection", async () => {
    const onChange = jest.fn();

    render(<Wrapper onChange={onChange} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "O");
    await userEvent.keyboard("{Enter}");

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
      const input = screen.getByRole("textbox");

      await userEvent.click(input);
      await userEvent.keyboard("{ArrowDown}");

      expect(await screen.findByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("One")).toBeInTheDocument();
      expect(screen.getByText("Two")).toBeInTheDocument();
    });

    // We require multiple user interactions, the length is of no consequence
    // eslint-disable-next-line max-statements
    it("highlights selected item on reopen when input exactly matches that option", async () => {
      render(<Wrapper />);

      const input = screen.getByRole("textbox");

      await userEvent.click(input);
      await userEvent.keyboard("{ArrowDown}");
      await screen.findByRole("listbox");

      await userEvent.click(screen.getByText("Two"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

      await userEvent.click(input);
      await userEvent.keyboard("{ArrowDown}");
      await screen.findByRole("listbox");

      const activeByAttr = document.querySelector(
        '[role="option"][data-active="true"]',
      ) as HTMLElement | null;

      expect(activeByAttr).not.toBeNull();
      expect(activeByAttr?.textContent).toContain("Two");
    });
  });

  describe("openOnFocus=true", () => {
    it("opens on focus and shows full list when input exactly matches an option label and highlights selected", async () => {
      render(
        <Wrapper
          initialValue={{ id: "two", label: "Two" }}
          initialInputValue="Two"
          openOnFocus
        />,
      );
      const input = screen.getByRole("textbox");

      await userEvent.click(input);

      expect(await screen.findByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("One")).toBeInTheDocument();
      expect(screen.getByText("Two")).toBeInTheDocument();

      const activeByAttr = document.querySelector(
        '[role="option"][data-active="true"]',
      ) as HTMLElement | null;

      expect(activeByAttr).not.toBeNull();
      expect(activeByAttr?.textContent).toContain("Two");
    });
  });

  describe("allowFreeForm", () => {
    // (helper components moved out of tests above if needed)

    it("commits free-form on blur when non-empty and no exact match", async () => {
      const onChange = jest.fn();

      function WrapperWithSpy() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <>
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
              filterOptions={(opt, input) =>
                opt.label.toLowerCase().includes(input.toLowerCase())
              }
              getOptionLabel={opt => opt.label}
              getOptionKey={opt => opt.id}
              placeholder=""
            />
            <button type="button" data-testid="outside">
              outside
            </button>
          </>
        );
      }

      render(<WrapperWithSpy />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "NewCity");
      await userEvent.click(screen.getByTestId("outside"));

      expect(onChange).toHaveBeenCalledWith({
        id: "1998",
        label: "NewCity",
      });
      expect((input as HTMLInputElement).value).toBe("NewCity");
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
            getOptionLabel={opt => opt.label}
            getOptionKey={opt => opt.id}
            placeholder=""
          />
        );
      }

      render(<WrapperWithSpyFilterNone />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "Zed");
      await userEvent.keyboard("{Enter}");

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
          <>
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
              filterOptions={(opt, input) =>
                opt.label.toLowerCase().includes(input.toLowerCase())
              }
              getOptionLabel={opt => opt.label}
              getOptionKey={opt => opt.id}
              placeholder=""
            />
            <button type="button" data-testid="outside">
              outside
            </button>
          </>
        );
      }

      render(<WrapperWithSpy />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "Two");
      await userEvent.click(screen.getByTestId("outside"));

      expect(onChange).toHaveBeenCalledWith({ id: "two", label: "Two" });
    });

    it("treats different case as free-form by default (case-sensitive)", async () => {
      const onChange = jest.fn();

      function WrapperWithSpy() {
        const [inputValue, setInputValue] = React.useState("");
        const { menu } = buildMenu();

        return (
          <>
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
              filterOptions={(opt, input) =>
                opt.label.toLowerCase().includes(input.toLowerCase())
              }
              getOptionLabel={opt => opt.label}
              getOptionKey={opt => opt.id}
              placeholder=""
            />
            <button type="button" data-testid="outside">
              outside
            </button>
          </>
        );
      }

      render(<WrapperWithSpy />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "two");
      await userEvent.click(screen.getByTestId("outside"));

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
          <>
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
              filterOptions={(opt, input) =>
                opt.label.toLowerCase().includes(input.toLowerCase())
              }
              getOptionLabel={opt => opt.label}
              getOptionKey={opt => opt.id}
              inputEqualsOption={(input, option) =>
                input.trim().toLowerCase() === option.label.toLowerCase()
              }
              placeholder=""
            />
            <button type="button" data-testid="outside">
              outside
            </button>
          </>
        );
      }

      render(<WrapperWithSpy />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "two");
      await userEvent.click(screen.getByTestId("outside"));

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
            filterOptions={(opt, input) =>
              opt.label.toLowerCase().includes(input.toLowerCase())
            }
            getOptionLabel={opt => opt.label}
            getOptionKey={opt => opt.id}
            placeholder=""
          />
        );
      }

      render(<WrapperWithSpy />);

      const input = screen.getByRole("textbox");

      await userEvent.type(input, "Custom");
      // Close menu explicitly then press Enter
      await userEvent.keyboard("{Escape}");
      await userEvent.keyboard("{Enter}");

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
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    await screen.findByRole("listbox");

    const activeByAttr = document.querySelector(
      '[role="option"][data-active="true"]',
    ) as HTMLElement | null;

    expect(activeByAttr).not.toBeNull();
    expect(activeByAttr?.textContent).toContain("Two");
  });
});
