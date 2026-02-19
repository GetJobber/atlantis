import React from "react";
import { AutocompleteRebuilt } from "../Autocomplete.rebuilt";
import {
  type AutocompleteRebuiltProps,
  type MenuItem,
  type OptionLike,
  menuOptions,
} from "../Autocomplete.types";

const ACTION1_LABEL = "Create";
const ACTION2_LABEL = "Stay Open";

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

export function Wrapper<T extends OptionLike>({
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
  customRenderOption,
  customRenderAction,
  customRenderSection,
  customRenderInput,
  customRenderHeader,
  customRenderFooter,
  loading,
  customRenderLoading,
  emptyStateMessage,
  ref,
  readOnly,
  UNSAFE_className,
  UNSAFE_styles,
  debounce = 0,
  ...props
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
  readonly customRenderOption?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderOption"];
  readonly customRenderAction?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderAction"];
  readonly customRenderInput?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderInput"];
  readonly customRenderHeader?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderHeader"];
  readonly customRenderFooter?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderFooter"];
  readonly customRenderSection?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderSection"];
  readonly loading?: boolean;
  readonly customRenderLoading?: React.ReactNode;
  readonly emptyStateMessage?: React.ReactNode;
  readonly ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  readonly UNSAFE_className?: AutocompleteRebuiltProps<
    T,
    false
  >["UNSAFE_className"];
  readonly UNSAFE_styles?: AutocompleteRebuiltProps<T, false>["UNSAFE_styles"];
  readonly readOnly?: boolean;
  readonly debounce?: number;
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
      debounce={debounce}
      customRenderOption={customRenderOption}
      customRenderAction={customRenderAction}
      customRenderSection={customRenderSection}
      customRenderInput={customRenderInput}
      loading={loading}
      customRenderLoading={customRenderLoading}
      emptyStateMessage={emptyStateMessage}
      ref={ref}
      UNSAFE_className={UNSAFE_className}
      UNSAFE_styles={UNSAFE_styles}
      readOnly={readOnly}
      customRenderHeader={customRenderHeader}
      customRenderFooter={customRenderFooter}
      {...props}
    />
  );
}

export function FreeFormWrapper({
  initialValue,
  initialInputValue,
  onChange,
  onInputChange,
  menu,
  openOnFocus,
  inputEqualsOption,
  debounce = 0,
}: {
  readonly initialValue?: OptionLike;
  readonly initialInputValue?: string;
  readonly onChange?: (v: OptionLike | undefined) => void;
  readonly onInputChange?: (v: string) => void;
  readonly menu?: MenuItem<OptionLike>[];
  readonly openOnFocus?: boolean;
  readonly inputEqualsOption?: (input: string, option: OptionLike) => boolean;
  readonly debounce?: number;
}) {
  const [value, setValue] = React.useState<OptionLike | undefined>(
    initialValue,
  );
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
      menu={menu ?? (built.menu as MenuItem<OptionLike>[])}
      placeholder=""
      openOnFocus={openOnFocus}
      allowFreeForm
      createFreeFormValue={(input: string) => ({ label: input })}
      inputEqualsOption={inputEqualsOption}
      debounce={debounce}
    />
  );
}

/**
 * Stateful wrapper for testing multiple-selection behavior.
 * Manages both value (array) and inputValue internally so tests
 * can perform multiple interactions that build on each other.
 */
export function MultipleWrapper<T extends OptionLike>({
  initialValue = [],
  onChange,
  onInputChange,
  menu,
  debounce = 0,
}: {
  readonly initialValue?: T[];
  readonly onChange?: (v: T[]) => void;
  readonly onInputChange?: (v: string) => void;
  readonly menu?: MenuItem<T>[];
  readonly debounce?: number;
}) {
  const [value, setValue] = React.useState<T[]>(initialValue);
  const [inputValue, setInputValue] = React.useState<string>("");
  const built = React.useMemo(() => buildMenu(), []);

  return (
    <AutocompleteRebuilt
      version={2}
      multiple
      value={value}
      onChange={(v: T[]) => {
        setValue(v);
        onChange?.(v);
      }}
      inputValue={inputValue}
      onInputChange={(v: string) => {
        setInputValue(v);
        onInputChange?.(v);
      }}
      menu={menu ?? (built.menu as MenuItem<T>[])}
      placeholder=""
      debounce={debounce}
    />
  );
}

/**
 * Wrapper for testing focus and blur behavior with tabbable siblings
 * Includes tabbable elements before and after the autocomplete
 * so tests can use tab navigation to focus without clicking
 */
export function FocusableSiblingsWrapper<T extends OptionLike>({
  onFocus,
  onChange,
  onInputChange,
  menu,
  readOnly,
  openOnFocus = false,
}: {
  readonly onChange?: (v: T | undefined) => void;
  readonly onInputChange?: (v: string) => void;
  readonly menu?: MenuItem<T>[];
  readonly readOnly?: boolean;
  readonly onFocus?: () => void;
  readonly openOnFocus?: boolean;
}) {
  const [value, setValue] = React.useState<T | undefined>(undefined);
  const [inputValue, setInputValue] = React.useState<string>("");
  const built = React.useMemo(() => buildMenu(), []);

  return (
    <>
      <button type="button" data-testid="before-button">
        Before
      </button>
      <AutocompleteRebuilt
        version={2}
        value={value}
        onChange={onChange ?? setValue}
        onFocus={onFocus}
        inputValue={inputValue}
        onInputChange={onInputChange ?? setInputValue}
        menu={menu ?? (built.menu as MenuItem<T>[])}
        placeholder=""
        openOnFocus={openOnFocus}
        readOnly={readOnly}
      />
      <button type="button" data-testid="after-button">
        After
      </button>
    </>
  );
}
