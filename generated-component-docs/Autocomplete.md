# Autocomplete

<Meta
  title="Components/Forms and Inputs/Autocomplete"
  component={Autocomplete}
/>

# Autocomplete

An Autocomplete component allows a user to quickly pick a preset value from a
larger list of possible options.

## Design & usage guidelines

The options in an Autocomplete component should be a list of possible values
that the user can select. These options should be presented in a way that makes
it easy for the user to find the value they are looking for. There are a few
ways to achieve this.

[Details](../?path=/story/components-forms-and-inputs-autocomplete-web--with-details)
can be added to an option, which will either appear below the option's label or
on the bottom right of the option. This can be used to provide more information
about the option, such as a description or a count.

[Section headings](../?path=/story/components-forms-and-inputs-autocomplete-web--section-heading)
can be added to an Autocomplete to break up the options into groups. This can be
useful if there are a lot of options or if the options are related to different
things.

You can
[set a value](../?path=/story/components-forms-and-inputs-autocomplete-web--set-a-value)
to the Autocomplete component by passing an active option. This will set the
`value` of the input.

Using the `getOptions` prop, you can pass a function that will be called when
the user types in the input. This async request should return a list of possible
options based on the user's input. This can be achieved by using either promises
or `await`.

## Related components

- If you want to present a list of predefined options without text input, or the
  number of options is smaller, use a [Select](/components/Select)
- If autocompleted results are not required for the text input, use
  [InputText](/components/InputText)

## Web Component Code

```tsx
Autocomplete Search Typeahead Suggest Web React import type { Ref, RefAttributes } from "react";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@jobber/hooks/useDebounce";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu/Menu";
import {
  type AnyOption,
  type AutocompleteProps,
  type Option,
} from "./Autocomplete.types";
import { isOptionGroup } from "./Autocomplete.utils";
import type { InputTextRef } from "../InputText";
import { InputText } from "../InputText";
import { mergeRefs } from "../utils/mergeRefs";

// Max statements increased to make room for the debounce functions
// eslint-disable-next-line max-statements
function AutocompleteInternal<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  {
    initialOptions = [],
    value,
    allowFreeForm = true,
    size = undefined,
    debounce: debounceRate = 300,
    onChange,
    getOptions,
    placeholder,
    onBlur,
    onFocus,
    validations,
    customRenderMenu,
    ...inputProps
  }: AutocompleteProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  >,
  ref: Ref<InputTextRef>,
) {
  const initialOptionsMemo = useMemo(
    () => mapToOptions(initialOptions),
    [initialOptions],
  );
  const [options, setOptions] =
    useState<Array<GenericOption | GenericGetOptionsValue>>(initialOptionsMemo);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const [autocompleteRef, setAutocompleteRef] = useState<HTMLDivElement | null>(
    null,
  );
  const delayedSearch = useDebounce(updateSearch, debounceRate);
  const inputRef = useRef<InputTextRef | null>(null);

  useEffect(() => {
    delayedSearch();
  }, [inputText]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return (
    <div className={styles.autocomplete} ref={setAutocompleteRef}>
      <InputText
        ref={mergeRefs([ref, inputRef])}
        autocomplete={false}
        size={size}
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        validations={validations}
        {...inputProps}
      />
      <Menu
        attachTo={autocompleteRef}
        inputRef={inputRef}
        inputFocused={inputFocused}
        options={options}
        customRenderMenu={customRenderMenu}
        selectedOption={value}
        onOptionSelect={handleMenuChange}
      />
    </div>
  );

  function updateInput(newText: string) {
    setInputText(newText);

    if (newText === "") {
      setOptions(mapToOptions(initialOptions));
    }
  }

  async function updateSearch() {
    const updatedOptions = await getOptions(inputText);
    const filteredOptions = updatedOptions.filter(option =>
      isOptionGroup(option) ? option.options.length > 0 : true,
    );

    setOptions(mapToOptions(filteredOptions));
  }

  function handleMenuChange(chosenOption?: GenericOptionValue) {
    onChange(chosenOption);
    updateInput(chosenOption?.label ?? "");
    setInputFocused(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);

    if (allowFreeForm) {
      onChange({ label: newText } as GenericOptionValue);
    }
  }

  function handleInputBlur() {
    setInputFocused(false);

    if (value == undefined || value.label !== inputText) {
      setInputText("");
      onChange(undefined);
    }
    onBlur && onBlur();
  }

  function handleInputFocus() {
    setInputFocused(true);

    if (onFocus) {
      onFocus();
    }
  }
}

function mapToOptions<GenericOption extends AnyOption = AnyOption>(
  items: GenericOption[],
) {
  const retVal = items.reduce<GenericOption[]>((result, item) => {
    result.push(item);

    if (isOptionGroup(item) && item.options) {
      result = result.concat(item.options as GenericOption[]);
    }

    return result;
  }, []);

  return retVal;
}

// Casts the Generics to the forward ref so autocomplete works as expected for consumers
export const Autocomplete = forwardRef(AutocompleteInternal) as <
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  props: AutocompleteProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > &
    RefAttributes<InputTextRef>,
) => ReturnType<typeof AutocompleteInternal>;
import type { PropsWithChildren } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./Autocomplete.module.css";
import { isOptionGroup } from "./Autocomplete.utils";
import { type AnyOption, type Option } from "./Autocomplete.types";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Icon } from "../Icon";

export interface MenuOptionProps {
  readonly isHighlighted: boolean;
  readonly option: AnyOption;
  readonly onOptionSelect: (option?: AnyOption) => void;
  /**
   * Whether to add separators between the options.
   */
  readonly addSeparators: boolean;
  readonly isSelected: boolean;
  readonly UNSAFE_className?: {
    option?: BaseMenuOptionProps["UNSAFE_className"];
    content?: MenuOptionContentProps["UNSAFE_className"];
    groupOption?: MenuGroupOptionProps["UNSAFE_className"];
  };
  readonly UNSAFE_style?: {
    option?: BaseMenuOptionProps["UNSAFE_style"];
    content?: MenuOptionContentProps["UNSAFE_style"];
    groupOption?: MenuGroupOptionProps["UNSAFE_style"];
  };
}

/**
 * The rendering of the default MenuOption
 */
export function MenuOption({
  isHighlighted,
  option,
  onOptionSelect,
  isSelected,
  addSeparators,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: MenuOptionProps) {
  if (isOptionGroup(option)) {
    return (
      <MenuGroupOptions
        UNSAFE_className={UNSAFE_className.groupOption}
        option={option}
        UNSAFE_style={UNSAFE_style.groupOption}
      />
    );
  }

  return (
    <BaseMenuOption
      UNSAFE_className={UNSAFE_className.option}
      UNSAFE_style={UNSAFE_style.option}
      option={option}
      isHighlighted={isHighlighted}
      onOptionSelect={onOptionSelect}
      addSeparators={addSeparators}
    >
      <MenuOptionContent
        option={option}
        isSelected={isSelected}
        UNSAFE_className={UNSAFE_className.content}
        UNSAFE_style={UNSAFE_style.content}
      />
    </BaseMenuOption>
  );
}
interface MenuOptionContentProps {
  readonly UNSAFE_className?: {
    readonly icon?: string;
    readonly text?: string;
    readonly details?: string;
    readonly label?: string;
  };
  readonly UNSAFE_style?: {
    readonly icon?: React.CSSProperties;
    readonly text?: React.CSSProperties;
    readonly label?: React.CSSProperties;
    readonly details?: React.CSSProperties;
  };
  readonly option: Option;
  readonly isSelected: boolean;
}

export function MenuOptionContent({
  option,
  isSelected,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: MenuOptionContentProps) {
  const iconClassName = classnames(styles.icon, UNSAFE_className.icon);
  const textClassName = classnames(styles.text, UNSAFE_className.text);
  const labelClassName = classnames(styles.label, UNSAFE_className.label);
  const detailsClassName = classnames(styles.details, UNSAFE_className.details);

  return (
    <>
      <div className={iconClassName} style={UNSAFE_style.icon}>
        {isSelected && <Icon name="checkmark" size="small" />}
      </div>
      <div className={textClassName} style={UNSAFE_style.text}>
        <div className={labelClassName} style={UNSAFE_style.label}>
          <Text>{option.label}</Text>
          {option.description !== undefined && (
            <Text variation="subdued">{option.description}</Text>
          )}
        </div>
        {option.details !== undefined && (
          <div className={detailsClassName} style={UNSAFE_style.details}>
            <Text>{option.details}</Text>
          </div>
        )}
      </div>
    </>
  );
}

export interface MenuGroupOptionProps {
  readonly option: AnyOption;
  readonly UNSAFE_className?: { heading?: string };
  readonly UNSAFE_style?: { heading?: React.CSSProperties };
}

/**
 * The rendering of the default MenuGroupOption
 */
export function MenuGroupOptions({
  option,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: MenuGroupOptionProps) {
  return (
    <BaseMenuGroupOption
      UNSAFE_className={UNSAFE_className.heading}
      UNSAFE_style={UNSAFE_style.heading}
    >
      <Heading level={5}>{option.label}</Heading>
    </BaseMenuGroupOption>
  );
}

/**
 * The base component for the MenuGroupOption
 */
export interface BaseMenuGroupOptionProps extends PropsWithChildren {
  readonly UNSAFE_className?: string;
  readonly UNSAFE_style?: React.CSSProperties;
}

export function BaseMenuGroupOption({
  children,
  UNSAFE_className = "",
  UNSAFE_style = {},
}: BaseMenuGroupOptionProps) {
  const headingClassName = classnames(styles.heading, UNSAFE_className);

  return (
    <div className={headingClassName} style={UNSAFE_style}>
      {children}
    </div>
  );
}

export interface BaseMenuOptionProps<
  GenericOption extends AnyOption = AnyOption,
> extends PropsWithChildren {
  readonly option?: GenericOption;
  readonly onOptionSelect?: (option?: GenericOption) => void;
  readonly isHighlighted: boolean;
  readonly addSeparators: boolean;
  readonly UNSAFE_className?: string;
  readonly UNSAFE_style?: React.CSSProperties;
}

/**
 * Renders the base option component. The component takes children and renders them inside a button.
 */
export function BaseMenuOption<GenericOption extends AnyOption = AnyOption>({
  option,
  isHighlighted,
  onOptionSelect,
  addSeparators,
  children,
  UNSAFE_className = "",
  UNSAFE_style = {},
}: BaseMenuOptionProps<GenericOption>) {
  const optionClass = classnames(
    styles.option,
    {
      [styles.active]: isHighlighted,
      [styles.separator]: addSeparators,
    },
    UNSAFE_className,
  );

  return (
    <button
      role="option"
      type="button"
      className={optionClass}
      onMouseDown={onOptionSelect?.bind(undefined, option)}
      style={UNSAFE_style}
    >
      {children}
    </button>
  );
}

```

## Props

### Web Props

| Prop             | Type                                      | Required                  | Default                | Description                                                       |
| ---------------- | ----------------------------------------- | ------------------------- | ---------------------- | ----------------------------------------------------------------- | -------- | ------------------------------ | ------------------------------------------------------------------------- |
| `inputRef`       | `RefObject<HTMLInputElement               | HTMLTextAreaElement       | HTMLSelectElement>`    | ❌                                                                | `_none_` | @deprecated Use `ref` instead. |
| `initialOptions` | `GenericOption[]`                         | ❌                        | `_none_`               | _No description_                                                  |
| `value`          | `Option`                                  | ✅                        | `_none_`               | Set Autocomplete value.                                           |
| `allowFreeForm`  | `boolean`                                 | ❌                        | `true`                 | Allow the autocomplete to use values not from the drop down menu. |
| `debounce`       | `number`                                  | ❌                        | `300`                  | Debounce in milliseconds for getOptions                           |
| `onChange`       | `(newValue?: GenericOptionValue) => void` | ✅                        | `_none_`               | Simplified onChange handler that only provides the new value.     |
| @param newValue  |
| `getOptions`     | `(newInputText: string) => (GenericOption | GenericGetOptionsValue)[] | Promise<(GenericOption | GenericGetOptionsValue)[]>`                                       | ✅       | `_none_`                       | Called as the user types in the input. The autocomplete will display what |

is returned from this method to the user as available options. @param
newInputText | | `placeholder` | `string` | ✅ | `_none_` | Hint text that goes
above the value once the form is filled out. | | `customRenderMenu` |
`(props: CustomOptionsMenuProp<GenericOption | GenericGetOptionsValue, GenericOptionValue>) => ReactElement<...>`
| ❌ | `_none_` | Override the content rendered in the menu. | | `clearable` |
`Clearable` | ❌ | `_none_` | Add a clear action on the input that clears the
value.

You should always use `while-editing` if you want the input to be clearable. if
the input value isn't editable (i.e. `InputTime`) you can set it to `always`. |
| `description` | `ReactNode` | ❌ | `_none_` | Further description of the
input, can be used for a hint. | | `invalid` | `boolean` | ❌ | `_none_` |
Highlights the field red to indicate an error. | | `name` | `string` | ❌ |
`_none_` | Name of the input. | | `onBlur` |
`(event?: React.FocusEvent) => void` | ❌ | `_none_` | Blur callback. | |
`onFocus` | `(event?: React.FocusEvent) => void` | ❌ | `_none_` | Focus
callback. | | `prefix` | `Affix` | ❌ | `_none_` | Adds a prefix label and icon
to the field | | `size` | `"small" | "large"` | ❌ | `_none_` | Adjusts the
interface to either have small or large spacing. | | `suffix` |
`{ onClick: () => void; readonly ariaLabel: string; readonly icon: IconNames; readonly label?: string; } | { onClick?: never; ariaLabel?: never; readonly label?: string; readonly icon?: IconNames; }`
| ❌ | `_none_` | Adds a suffix label and icon with an optional action to the
field | | `validations` | `RegisterOptions` | ❌ | `_none_` | Show an error
message above the field. This also highlights the the field red if an error
message shows up. | | `ref` | `LegacyRef<InputTextRef>` | ❌ | `_none_` | Allows
getting a ref to the component instance. Once the component unmounts, React will
set `ref.current` to `null` (or call the ref with `null` if you passed a
callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

## Categories

- Forms & Inputs

## Web Test Code

```typescript
Autocomplete Search Typeahead Suggest Web React Test Testing Jest import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnyOption, CustomOptionsMenuProp } from ".";
import { Autocomplete } from ".";
import type { InputTextRef } from "../InputText";
import { Text } from "../Text";

function returnOptions(options: AnyOption[]) {
  return async () => {
    return Promise.resolve(options);
  };
}

const options = [
  {
    value: "0",
    label: "option_0",
  },
  {
    value: "1",
    label: "option_1",
  },
];

const headingOptions = [
  {
    label: "first_heading",
    options: [
      {
        value: "0",
        label: "option_0",
      },
    ],
  },
  {
    label: "second_heading",
    options: [
      {
        value: "1",
        label: "option_1",
      },
      {
        value: "2",
        label: "option_2",
      },
    ],
  },
];

// eslint-disable-next-line max-statements
describe("Autocomplete", () => {
  it("renders an Autocomplete", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        initialOptions={options}
        onChange={jest.fn()}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should call the getOptions handler with the new value", async () => {
    const placeholder = "my_placeholder";
    const changeHandler = jest.fn();
    const changeOptionsHandler = jest.fn();
    changeOptionsHandler.mockReturnValue(Promise.resolve([]));
    const newValue = "new search value";
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        getOptions={changeOptionsHandler}
        placeholder={placeholder}
      />,
    );

    await userEvent.type(screen.getByLabelText(placeholder), newValue);
    await waitFor(() => {
      expect(changeOptionsHandler).toHaveBeenCalledWith(newValue);
    });
  });

  it("should call the handler when an option is selected", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
      />,
    );
    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(changeHandler).toHaveBeenCalledWith(options[1]);
  });

  it("should display headers when headers are passed in", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={headingOptions}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should call the handler skipping headings when an option is selected", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={headingOptions}
        getOptions={returnOptions(headingOptions)}
        placeholder="placeholder_name"
      />,
    );

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.keyboard("{ArrowDown}{Enter}");

    expect(changeHandler).toHaveBeenCalledWith(headingOptions[1].options[0]);
  });

  it("should remove the menu when blurred", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
      />,
    );

    const input = screen.getByRole("textbox");

    await userEvent.click(input);

    expect(screen.getByText("option_0")).toBeInstanceOf(HTMLParagraphElement);

    await userEvent.tab();

    await waitFor(() => {
      expect(screen.queryByText("option_0")).toBeNull();
    });
  });

  it("should call onBlur callback when blurred", async () => {
    const blurHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        onBlur={blurHandler}
      />,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.tab();

    await waitFor(() => {
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });
  });

  it("should call onChange with undefined if allowFreeForm is false and not matched", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        allowFreeForm={false}
      />,
    );

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.type(input, "opt");
    await userEvent.tab();

    await waitFor(() => {
      expect(changeHandler).toHaveBeenCalledWith(undefined);
    });
  });

  it("sets the input value to blank if allowFreeForm is false and not matched", async () => {
    const changeHandler = jest.fn();
    render(
      <Autocomplete
        value={undefined}
        onChange={changeHandler}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder="placeholder_name"
        allowFreeForm={false}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, "opt");
    await userEvent.tab();

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("passes the invalid prop to the InputText", async () => {
    const { container } = render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
        invalid
      />,
    );

    const invalid = container.querySelector(".invalid");

    expect(invalid).toBeInstanceOf(HTMLDivElement);
  });

  it("should focus input text", async () => {
    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder={placeholder}
        allowFreeForm={false}
        ref={textRef}
      />,
    );

    await waitFor(() => {
      textRef.current?.focus();
      expect(screen.getByLabelText(placeholder)).toHaveFocus();
    });
  });

  it("should scroll into view input text", async () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const placeholder = "Got milk?";

    const textRef = React.createRef<InputTextRef>();

    render(
      <Autocomplete
        value={undefined}
        onChange={jest.fn()}
        initialOptions={options}
        getOptions={returnOptions(options)}
        placeholder={placeholder}
        allowFreeForm={false}
        ref={textRef}
      />,
    );

    textRef.current?.scrollIntoView();
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  function RenderCustomMenu({
    options: customOptions,
    MenuWrapper,
  }: CustomOptionsMenuProp) {
    return (
      <MenuWrapper visible={true}>
        {customOptions.map(option => (
          <Text key={option.label}>{option.label}</Text>
        ))}
      </MenuWrapper>
    );
  }
  describe("Custom Menu", () => {
    it("should render the options", () => {
      render(
        <Autocomplete
          value={undefined}
          onChange={jest.fn()}
          placeholder="placeholder_name"
          initialOptions={options}
          getOptions={returnOptions(options)}
          customRenderMenu={props => <RenderCustomMenu {...props} />}
        />,
      );

      expect(screen.getByText(options[0].label)).toBeInstanceOf(
        HTMLParagraphElement,
      );
      expect(screen.getByText(options[0].label)).toBeInstanceOf(
        HTMLParagraphElement,
      );
    });

    it("should provide the inputFocused prop", async () => {
      const mockCustomRenderMenu = jest.fn();
      render(
        <Autocomplete
          value={undefined}
          onChange={jest.fn()}
          placeholder="placeholder_name"
          initialOptions={options}
          getOptions={returnOptions(options)}
          customRenderMenu={mockCustomRenderMenu}
        />,
      );
      const input = screen.getByRole("textbox");

      expect(mockCustomRenderMenu).toHaveBeenCalledWith(
        expect.objectContaining({
          inputFocused: false,
        }),
      );

      await userEvent.click(input);

      expect(mockCustomRenderMenu).toHaveBeenCalledWith(
        expect.objectContaining({
          inputFocused: true,
        }),
      );
    });
  });
});

```

## Component Path

`/components/Autocomplete`

---

_Generated on 2025-08-21T17:35:16.352Z_
