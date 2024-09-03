/// <reference types="react" />
/// <reference types="react" />
/**
 * Traps the focus within the children of the ref element.
 *
 * @param active - Turns the focus trapping on or off. Also adds aria-hidden on the
 * body but not the dialog.
 *
 * @returns ref
 */
export declare function useFocusTrap<T extends HTMLElement>(active: boolean): import("react").RefObject<T>;
