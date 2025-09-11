import type { PropsWithChildren } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import { useModalContext } from "./ModalContext.rebuilt";
import type {
  HeaderProps,
  ModalActionsProps,
  ModalContentProps as ModalContainerProps,
} from "./Modal.types";
import { useModalStyles } from "./useModalStyles";
import { Heading } from "../Heading";
import { ButtonDismiss } from "../ButtonDismiss";
import { Button } from "../Button";
import { AtlantisPortalContent } from "../AtlantisPortalContent";

export function ModalHeader({ title, children }: HeaderProps) {
  const { header, dismissButton } = useModalStyles();
  const { dismissible, onRequestClose, modalLabelledBy } = useModalContext();

  if (children) {
    return <>{children}</>;
  }

  return (
    <div className={header} data-testid="ATL-Modal-Header" id={modalLabelledBy}>
      <Heading level={2}>{title}</Heading>

      {dismissible && (
        <div className={dismissButton}>
          <ButtonDismiss onClick={onRequestClose} ariaLabel="Close modal" />
        </div>
      )}
    </div>
  );
}

export function ModalActions({
  primary,
  secondary,
  tertiary,
}: ModalActionsProps) {
  const { actionBar, rightAction, leftAction } = useModalStyles();
  const shouldShow =
    primary != undefined || secondary != undefined || tertiary != undefined;

  return (
    <>
      {shouldShow && (
        <div className={actionBar} data-testid="ATL-Modal-Actions">
          <div className={rightAction}>
            {primary && <Button {...primary} />}
            {secondary && (
              <Button type="primary" variation="subtle" {...secondary} />
            )}
          </div>
          {tertiary && (
            <div className={leftAction}>
              <Button type="secondary" variation="destructive" {...tertiary} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function ModalActivator({ children }: PropsWithChildren) {
  const { activatorRef } = useModalContext();

  return (
    <span ref={activatorRef} style={{ display: "contents" }}>
      {children}
    </span>
  );
}

/**
 * Background overlay for the modal. Used in the ModalContent.
 */

export function ModalOverlay({ children }: PropsWithChildren) {
  const { overlay, overlayBackground } = useModalStyles();
  const { onRequestClose } = useModalContext();

  return (
    <FloatingOverlay lockScroll className={overlay} data-atlantis-modal-branch>
      <motion.div
        aria-hidden="true"
        className={overlayBackground}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={e => {
          e.stopPropagation();
          onRequestClose?.();
        }}
      />
      {children}
    </FloatingOverlay>
  );
}

export function ModalContent({ children }: ModalContainerProps) {
  const {
    open,
    floatingContext,
    activatorRef,
    floatingRefs,
    size,
    floatingNodeId,
    modalLabelledBy,
    getFloatingProps,
  } = useModalContext();
  const { modal } = useModalStyles(size);

  return (
    <AnimatePresence>
      {open && (
        <FloatingNode id={floatingNodeId}>
          <FloatingPortal>
            <AtlantisPortalContent>
              <ModalOverlay>
                <FloatingFocusManager
                  context={floatingContext}
                  returnFocus={activatorRef?.current ? activatorRef : true}
                  initialFocus={0}
                >
                  <motion.div
                    className={modal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      ref={floatingRefs?.setFloating}
                      {...getFloatingProps({
                        role: "dialog",
                        "aria-labelledby": modalLabelledBy,
                      })}
                    >
                      {children}
                    </div>
                  </motion.div>
                </FloatingFocusManager>
              </ModalOverlay>
            </AtlantisPortalContent>
          </FloatingPortal>
        </FloatingNode>
      )}
    </AnimatePresence>
  );
}
