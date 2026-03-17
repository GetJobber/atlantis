import noop from "lodash/noop";
import type { RefObject } from "react";
import React, { createContext, useContext, useRef } from "react";
import type { FloatingContext } from "@floating-ui/react";
import { FloatingTree } from "@floating-ui/react";
import identity from "lodash/identity";
import type sizes from "./ModalSizes.module.css";
import { useModal } from "./useModal";
import type { ModalContextType } from "./Modal.types";
import { MODAL_HEADER_ID } from "./constants";

export const ModalContext = createContext<ModalContextType>({
  open: false,
  onRequestClose: noop,
  activatorRef: { current: null },
  floatingRefs: null,
  floatingContext: {} as FloatingContext,
  size: undefined,
  floatingNodeId: undefined,
  dismissible: true,
  getFloatingProps: identity,
});
export interface ModalProviderProps {
  readonly children: React.ReactNode;
  readonly size?: keyof typeof sizes;
  readonly open?: boolean;
  readonly onRequestClose?: () => void;
  readonly activatorRef?: RefObject<HTMLElement | null>;
  readonly dismissible?: boolean;
  readonly modalLabelledBy?: string;
  readonly ariaLabel?: string;
  /**
   * Controls the internal padding of Modal.Body.
   *
   * - `"base"`: applies standard padding to align body content with Header/Actions
   * - `"none"`: removes all padding from Modal.Body for full-width/edge-to-edge content
   *
   * Has no effect without a `Modal.Body` child.
   * @default "base"
   */
  readonly spacing?: "base" | "none";
  /**
   * Controls where overflow scrolling occurs when content exceeds the modal height.
   *
   * - `"inner"`: only Modal.Body scrolls; Header and Actions stay pinned at the
   *   top and bottom of the modal
   * - `"outer"`: the entire modal content area scrolls as a single unit, matching
   *   the legacy behavior before Modal.Body existed
   *
   * This prop is ignored when no `Modal.Body` is present — without it, the modal
   * always uses outer scrolling regardless of this value.
   * @default "inner"
   */
  readonly scrollBehavior?: "inner" | "outer";
}

export function ModalProvider({
  children,
  open = false,
  size,
  onRequestClose = noop,
  activatorRef: refProp,
  dismissible = true,
  modalLabelledBy = MODAL_HEADER_ID,
  ariaLabel,
  spacing = "base",
  scrollBehavior = "inner",
}: ModalProviderProps) {
  const startedInsideRef = useRef<boolean>(true);
  const {
    floatingRefs,
    floatingContext,
    nodeId,
    activatorRef,
    parentId,
    getFloatingProps,
  } = useModal({
    open,
    activatorRef: refProp,
    onRequestClose,
    startedInsideRef,
  });

  const content = (
    <ModalContext.Provider
      value={{
        onRequestClose,
        activatorRef,
        floatingRefs,
        floatingContext,
        size,
        open,
        floatingNodeId: nodeId,
        dismissible,
        modalLabelledBy,
        ariaLabel,
        getFloatingProps,
        startedInsideRef,
        spacing,
        scrollBehavior,
      }}
    >
      {children}
    </ModalContext.Provider>
  );

  if (parentId) {
    return content;
  }

  return <FloatingTree>{content}</FloatingTree>;
}

export function useModalContext() {
  return useContext(ModalContext);
}
