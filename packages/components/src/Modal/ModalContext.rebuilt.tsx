import noop from "lodash/noop";
import React, { MutableRefObject, createContext, useContext } from "react";
import identity from "lodash/identity";
import sizes from "./ModalSizes.module.css";
import { useModal } from "./useModal";
import { ModalContextType } from "./Modal.types";

export const ModalContext = createContext<ModalContextType>({
  open: false,
  onRequestClose: noop,
  activatorRef: { current: null },
  floatingRefs: null,
  size: undefined,
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
}

export function ModalProvider({
  children,
  open = false,
  size,
  onRequestClose = noop,
  activatorRef: refProp,
  dismissible = true,
  modalLabelledBy = "ATL-Modal-Header",
}: ModalProviderProps) {
  const { floatingRefs, activatorRef, getFloatingProps } = useModal({
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
        size,
        open,
        dismissible,
        modalLabelledBy,
        getFloatingProps,
      }}
    >
      {children}
    </ModalContext.Provider>
  );

  return content;
}

export function useModalContext() {
  return useContext(ModalContext);
}
