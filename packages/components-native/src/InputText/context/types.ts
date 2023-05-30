type Name = string;

export interface InputAccessoriesContextProps {
  /**
   * Registered elements.
   */
  readonly elements: Record<Name, () => void>;

  readonly focusedInput: string;

  readonly canFocusNext: boolean;
  readonly canFocusPrevious: boolean;
  readonly inputAccessoryID?: string;

  /**
   * Registers the element to the context.
   */
  readonly register: (name: Name, onFocus: () => void) => void;

  /**
   * Un-registers the element from the context.
   */
  readonly unregister: (name: Name) => void;

  readonly onFocusNext: () => void;
  readonly onFocusPrevious: () => void;
  readonly setFocusedInput: (name: string) => void;
}
