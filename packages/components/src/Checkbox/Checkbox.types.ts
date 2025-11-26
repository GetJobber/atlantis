import type { ReactElement, ReactNode } from "react";
import type { XOR } from "ts-xor";
import type {
  AriaInputProps,
  FocusEvents,
  HTMLInputBaseProps,
  RebuiltInputCommonProps,
} from "../sharedHelpers/types";

export interface BaseCheckboxProps
  extends AriaInputProps,
    FocusEvents<HTMLInputElement>,
    Pick<HTMLInputBaseProps, "id" | "name" | "disabled">,
    Pick<RebuiltInputCommonProps, "description" | "invalid"> {
  /**
   * Determines if the checkbox is checked or not.
   */
  readonly checked?: boolean;

  /**
   * Initial checked value of the checkbox. Only use this when you need to
   * pre-populate the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
  readonly defaultChecked?: boolean;

  /**
   * When `true` the checkbox to appears in indeterminate.
   *
   * @default false
   */
  readonly indeterminate?: boolean;

  /**
   * Value of the checkbox.
   */
  readonly value?: string;

  /**
   * Called when the checkbox value changes
   */
  onChange?(newValue: boolean): void;
}

interface CheckboxLabelProps extends BaseCheckboxProps {
  /**
   * Label that shows up beside the checkbox.
   */
  readonly label?: string;
}

interface CheckboxChildrenProps extends BaseCheckboxProps {
  /**
   * Component children, which shows up as a label
   */
  readonly children?: ReactElement;
}

export type CheckboxRebuiltProps = Omit<
  BaseCheckboxProps,
  "label" | "description" | "children" | "onChange"
> &
  Pick<RebuiltInputCommonProps, "version"> & {
    /**
     * Label that shows up beside the checkbox.
     * String will be rendered with the default markup.
     * ReactElement will be rendered with provided positionining.
     */
    label?: string | ReactElement;

    /**
     * Additional description of the checkbox.
     * String will be rendered with the default markup.
     * ReactElement will be rendered with provided positioning.
     */
    description?: ReactNode;

    /**
     * Called when the checkbox value changes.
     * Includes the change event as a second argument.
     */
    onChange?(
      newValue: boolean,
      event: React.ChangeEvent<HTMLInputElement>,
    ): void;
  };

export type CheckboxLegacyProps = XOR<
  CheckboxLabelProps,
  CheckboxChildrenProps
> & {
  version?: 1;
};
