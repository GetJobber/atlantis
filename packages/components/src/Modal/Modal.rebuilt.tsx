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
import { MODAL_HEADER_ID } from "./constants";
import styles from "./Modal.rebuilt.module.css";
import { Heading } from "../Heading";
import { ButtonDismiss } from "../ButtonDismiss";
import { Button } from "../Button";
import { AtlantisPortalContent } from "../AtlantisPortalContent";

export function ModalHeader({ children }: HeaderProps) {
  return <div className={styles.header}>{children}</div>;
}

export function ModalHeaderTitle({ children }: PropsWithChildren) {
  return <Heading level={2}>{children}</Heading>;
}

export function ModalFooter({ children }: PropsWithChildren) {
  return <div className={styles.footer}>{children}</div>;
}

export function ModalFooterActions({ children }: PropsWithChildren) {
  return <div className={styles.footerActions}>{children}</div>;
}

/*
  @deprecated This component is deprecated. Please use the <ModalFooterActions /> instead.
  @deprecatedSince 1.2.0
*/
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

/**
 * @deprecated This component is deprecated. Please use the <NewComponent /> instead.
 * @deprecatedSince 1.2.0
 */
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
  const { floatingNodeId, startedInsideRef } = useModalContext();

  return (
    <FloatingOverlay
      lockScroll
      className={overlay}
      data-modal-node-id={floatingNodeId}
    >
      <motion.div
        aria-hidden="true"
        className={overlayBackground}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        data-modal-node-id={floatingNodeId}
        onPointerDownCapture={() => {
          // Interaction began on overlay: mark as outside for the next click
          if (startedInsideRef) startedInsideRef.current = false;
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
    ariaLabel,
    getFloatingProps,
    startedInsideRef,
    dismissible,
    onRequestClose,
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
                  order={["floating", "content"]}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    ref={floatingRefs?.setFloating}
                    data-modal-node-id={floatingNodeId}
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
                      <ModalHeaderDismiss onRequestClose={onRequestClose} />
                    )}
                    {children}
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

function ModalHeaderDismiss({
  onRequestClose,
}: {
  readonly onRequestClose?: () => void;
}) {
  return (
    <div className={styles.headerDismiss}>
      <ButtonDismiss onClick={onRequestClose} ariaLabel="Close modal" />
    </div>
  );
}
