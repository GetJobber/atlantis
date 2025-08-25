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
  renderOption,
  renderAction,
  renderSection,
  renderInput,
  renderPersistent,
  loading,
  renderLoading,
  emptyStateMessage,
  ref,
  readOnly,
  UNSAFE_className,
  UNSAFE_styles,
  debounce = 0,
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
  readonly renderLoading?: React.ReactNode;
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
      renderOption={renderOption}
      renderAction={renderAction}
      renderSection={renderSection}
      renderInput={renderInput}
      loading={loading}
      renderLoading={renderLoading}
      emptyStateMessage={emptyStateMessage}
      ref={ref}
      UNSAFE_className={UNSAFE_className}
      UNSAFE_styles={UNSAFE_styles}
      readOnly={readOnly}
      renderPersistent={renderPersistent}
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
