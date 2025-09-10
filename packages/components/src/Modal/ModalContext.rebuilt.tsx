import noop from "lodash/noop";
import type { MutableRefObject } from "react";
import React, { createContext, useContext } from "react";
import type { FloatingContext } from "@floating-ui/react";
import { FloatingTree } from "@floating-ui/react";
import identity from "lodash/identity";
import type sizes from "./ModalSizes.module.css";
import { useModal } from "./useModal";
import type { ModalContextType } from "./Modal.types";

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
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
  readonly dismissible?: boolean;
  readonly modalLabelledBy?: string;
  readonly accessibleName?: string;
}

export function ModalProvider({
  children,
  open = false,
  size,
  onRequestClose = noop,
  activatorRef: refProp,
  dismissible = true,
  modalLabelledBy = "ATL-Modal-Header",
  accessibleName,
}: ModalProviderProps) {
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
    dismissible,
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
        accessibleName,
        getFloatingProps,
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
