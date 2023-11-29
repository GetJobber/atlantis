import { RefObject } from "react";
import { NativeMethods, View } from "react-native";

interface Methods {
  /**
   * Requires the method that returns
   *  - x
   *  - y
   *  - width
   *  - height
   *
   * This determines the location of the element on screen.
   */
  readonly measure: NativeMethods["measureLayout"];

  /**
   * Requires a method that makes accessible element be focused.
   *
   * **Example**
   * ```
   * function accessibilityFocus() {
   *  const reactTag = findNodeHandle(ref.current);
   *  AccessibilityInfo.setAccessibilityFocus(reactTag);
   * }
   * ```
   */
  readonly accessibilityFocus: () => void;

  /**
   * Check if the registered element has an error.
   */
  readonly hasErrorMessage: boolean;
}

export interface Element {
  /**
   * Used to easily identify the registered element so it's easier to modify or
   * unregister it.
   */
  readonly id: string;

  /**
   * Information about the element that you can access.
   */
  readonly methods: Methods;
}

type ElementID = Element["id"];

export interface ErrorMessageContextRegisterParams {
  readonly id: ElementID;
  readonly hasErrorMessage: Methods["hasErrorMessage"];
  readonly ref: RefObject<View>;
}

export interface ErrorMessageContextProps {
  /**
   * Registered elements.
   */
  readonly elements: Record<ElementID, Element["methods"]>;

  /**
   * Registers the element to the context.
   */
  readonly register: (params: ErrorMessageContextRegisterParams) => void;

  /**
   * Un-registers the element from the context.
   */
  readonly unregister: (id: ElementID) => void;
}
