import type { XOR } from "ts-xor";
import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import type {
  FocusEvents,
  HTMLInputBaseProps,
  KeyboardEvents,
  RebuiltInputCommonProps,
} from "../sharedHelpers/types";

export interface RowRange {
  min: number;
  max: number;
}

/**
 * Character length constraint for inputs.
 * Only extend this for text-based inputs where character limits make sense.
 */
interface InputLengthConstraint {
  /**
   * Maximum character length for the input.
   * Note: This affects both HTML validation AND visual width of the component.
   * Future work will separate these concerns.
   */
  readonly maxLength?: number;
}

export type InputTextVersion = 1 | 2 | undefined;

/**
 * Experimental version 2 of the InputText component.
 * Do not use unless you have talked with Atlantis first.
 */
export interface InputTextRebuiltProps
  extends HTMLInputBaseProps,
    FocusEvents<HTMLInputElement | HTMLTextAreaElement>,
    KeyboardEvents<HTMLInputElement | HTMLTextAreaElement>,
    RebuiltInputCommonProps,
    InputLengthConstraint {
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline?: boolean;

  /**
   * Specifies the visible height of a long answer form field. Can be in the
   * form of a single number to set a static height, or an object with a min
   * and max keys indicating the minimum number of visible rows, and the
   * maximum number of visible rows.
   */
  readonly rows?: number | RowRange;

  /**
   * Toolbar to render content below the input.
   */
  readonly toolbar?: FormFieldProps["toolbar"];

  /**
   * Determines the visibility of the toolbar.
   */
  readonly toolbarVisibility?: FormFieldProps["toolbarVisibility"];

  /**
   * The current value of the input.
   */
  readonly value: string;

  /**
   * Custom onChange handler that provides the new value as the first argument.
   */
  readonly onChange?: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  /**
   * @deprecated Use `onKeyDown` or `onKeyUp` instead.
   */
  readonly onEnter?: FormFieldProps["onEnter"];
}

interface BaseProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "autofocus"
      | "maxLength"
      | "readonly"
      | "autocomplete"
      | "keyboard"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "onChange"
      | "inputRef"
      | "validations"
      | "defaultValue"
      | "prefix"
      | "suffix"
      | "toolbar"
      | "toolbarVisibility"
      | "version"
    > {
  multiline?: boolean;
}

export interface InputTextRef {
  insert(text: string): void;
  blur(): void;
  focus(): void;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}

interface MultilineProps extends BaseProps {
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline: true;

  /**
   * Specifies the visible height of a long answer form field. Can be in the
   * form of a single number to set a static height, or an object with a min
   * and max keys indicating the minimum number of visible rows, and the
   * maximum number of visible rows.
   */
  readonly rows?: number | RowRange;
}
/**
 * InputText props for the existing version of InputText
 */
export type InputTextLegacyProps = XOR<BaseProps, MultilineProps>;
