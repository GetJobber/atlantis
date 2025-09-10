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

export function ModalOverlay() {
  const { onRequestClose } = useModalContext();
  const { overlayBackground } = useModalStyles();

  return (
    <motion.div
      onClick={onRequestClose}
      className={overlayBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
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
    accessibleName,
    getFloatingProps,
  } = useModalContext();
  const { modal, overlay } = useModalStyles(size);

  return (
    <AnimatePresence>
      {open && (
        <FloatingNode id={floatingNodeId}>
          <FloatingPortal>
            <AtlantisPortalContent>
              <FloatingOverlay className={overlay}>
                <FloatingFocusManager
                  context={floatingContext}
                  returnFocus={activatorRef?.current ? activatorRef : true}
                  initialFocus={floatingRefs?.floating}
                >
                  <div
                    ref={floatingRefs?.setFloating}
                    {...getFloatingProps({
                      tabIndex: 0,
                      "aria-modal": true,
                      "aria-labelledby": modalLabelledBy,
                      "aria-label": accessibleName,
                    })}
                  >
                    <ModalOverlay />
                    <motion.div
                      data-floating-ui-focusable
                      className={modal}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      {children}
                    </motion.div>
                  </div>
                </FloatingFocusManager>
              </FloatingOverlay>
            </AtlantisPortalContent>
          </FloatingPortal>
        </FloatingNode>
      )}
    </AnimatePresence>
  );
}
