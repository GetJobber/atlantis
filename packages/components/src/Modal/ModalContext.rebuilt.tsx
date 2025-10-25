import noop from "lodash/noop";
import type { MutableRefObject } from "react";
import React, { createContext, useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
} from "@floating-ui/react";
import type { FloatingContext } from "@floating-ui/react";
import identity from "lodash/identity";
import type sizes from "./ModalSizes.module.css";
import { useModal } from "./useModal";
import type { ModalContextType } from "./Modal.types";
import { MODAL_HEADER_ID } from "./constants";
import { useModalStyles } from "./useModalStyles";
import styles from "./Modal.rebuilt.module.css";
// use FloatingOverlay directly here to avoid a dependency cycle with Modal.rebuilt
import { AtlantisPortalContent } from "../AtlantisPortalContent";
import { ButtonDismiss } from "../ButtonDismiss";

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
  returnFocusRef: undefined,
});
export interface ModalProviderProps {
  readonly children: React.ReactNode;
  readonly size?: keyof typeof sizes;
  readonly open?: boolean;
  readonly onRequestClose?: () => void;
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
  readonly dismissible?: boolean;
  readonly modalLabelledBy?: string;
  readonly ariaLabel?: string;
  readonly returnFocusRef?: MutableRefObject<HTMLElement | null> | null;
}

export function ModalProvider({
  children,
  open = false,
  size,
  onRequestClose = noop,
  dismissible = true,
  modalLabelledBy = MODAL_HEADER_ID,
  ariaLabel,
  returnFocusRef,
}: ModalProviderProps) {
  const startedInsideRef = useRef<boolean>(true);
  const { floatingRefs, floatingContext, nodeId, parentId, getFloatingProps } =
    useModal({
      open,
      onRequestClose,
      startedInsideRef,
    });
  const { modal } = useModalStyles(size);

  const content = (
    <ModalContext.Provider
      value={{
        returnFocusRef,
        onRequestClose,
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
      }}
    >
      <AnimatePresence>
        {open && (
          <FloatingNode id={nodeId}>
            <FloatingPortal>
              <AtlantisPortalContent>
                <FloatingOverlay
                  lockScroll
                  className={styles.overlay}
                  data-modal-node-id={nodeId}
                >
                  <motion.div
                    aria-hidden="true"
                    className={styles.overlayBackground}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    data-modal-node-id={nodeId}
                    onPointerDownCapture={() => {
                      // Interaction began on overlay: mark as outside for the next click
                      if (startedInsideRef) startedInsideRef.current = false;
                    }}
                  />
                  <FloatingFocusManager
                    context={floatingContext}
                    returnFocus={returnFocusRef ? returnFocusRef : true}
                    order={["floating", "content"]}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      ref={floatingRefs?.setFloating}
                      data-modal-node-id={nodeId}
                      {...getFloatingProps({
                        role: "dialog",
                        className: modal,
                        "aria-labelledby": modalLabelledBy,
                        "aria-label": ariaLabel,
                        "aria-modal": true,
                      })}
                      onPointerDownCapture={() => {
                        // Interaction began inside dialog
                        if (startedInsideRef) startedInsideRef.current = true;
                      }}
                    >
                      {dismissible && (
                        <div className={styles.headerDismiss}>
                          <ButtonDismiss
                            onClick={onRequestClose}
                            ariaLabel="Close modal"
                          />
                        </div>
                      )}
                      {children}
                    </motion.div>
                  </FloatingFocusManager>
                </FloatingOverlay>
              </AtlantisPortalContent>
            </FloatingPortal>
          </FloatingNode>
        )}
      </AnimatePresence>
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
