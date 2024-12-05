import { ContentExport } from "../types/content";

/**
 * Quick helper to take in the meta for a component and the state values with functions applied and return the component and code
 *
 * @param meta Full Meta Content Export layout
 * @param stateValueWithFunction The state values with functions applied
 * @returns {Component,code}
 */
export const useComponentAndCode = (meta: ContentExport) => {
  return {
    code: meta?.component.element,
  };
};
