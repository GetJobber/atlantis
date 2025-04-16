import noop from "lodash/noop";
import React, { MutableRefObject, createContext, useContext } from "react";
import { FloatingContext, FloatingTree } from "@floating-ui/react";
import sizes from "./ModalSizes.module.css";
import { useModal } from "./useModal";
import { ModalContextType } from "./Modal.types";

export const ModalContext = createContext<ModalContextType>({
  open: false,
  onRequestClose: noop,
  activatorRef: { current: null },
  floatingRefs: null,
  floatingContext: {} as FloatingContext,
  size: undefined,
  floatingNodeId: undefined,
  dismissible: true,
});
export interface ModalProviderProps {
  readonly children: React.ReactNode;
  readonly size?: keyof typeof sizes;
  readonly open?: boolean;
  readonly onRequestClose?: () => void;
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
  readonly dismissible?: boolean;
}

export function ModalProvider({
  children,
  open = false,
  size,
  onRequestClose = noop,
  activatorRef: refProp,
  dismissible = true,
}: ModalProviderProps) {
  const { floatingRefs, floatingContext, nodeId, activatorRef, parentId } =
    useModal({
      open,
      activatorRef: refProp,
      onRequestClose,
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
