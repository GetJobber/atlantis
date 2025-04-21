import React, { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import { useModalContext } from "./ModalContext.rebuilt";
import {
  HeaderProps,
  ModalActionsProps,
  ModalWrapperProps,
} from "./Modal.types";
import { useModalStyles } from "./useModalStyles";
import { Heading } from "../Heading";
import { ButtonDismiss } from "../ButtonDismiss";
import { Button } from "../Button";
import { AtlantisPortalContent } from "../AtlantisPortalContent";

const AnimatedOverlay = motion(FloatingOverlay);

export function ModalHeader({ title, children }: HeaderProps) {
  const { header, dismissButton } = useModalStyles();
  const { dismissible, onRequestClose } = useModalContext();
  const content = children ?? (
    <div className={header} data-testid="ATL-Modal-Header">
      <Heading level={2}>{title}</Heading>

      {dismissible && (
        <div className={dismissButton}>
          <ButtonDismiss onClick={onRequestClose} ariaLabel="Close modal" />
        </div>
      )}
    </div>
  );

  return <>{content}</>;
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
              <Button {...secondary} type="primary" variation="subtle" />
            )}
          </div>
          {tertiary && (
            <div className={leftAction}>
              <Button {...tertiary} type="secondary" variation="destructive" />
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
 * Background overlay for the modal. Used in the ModalWrapper.
 */

export function ModalOverlay({ children }: PropsWithChildren) {
  const { size } = useModalContext();
  const { overlay } = useModalStyles(size);

  return (
    <AnimatedOverlay
      className={overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-testid="ATL-Modal-Overlay"
    >
      {children}
    </AnimatedOverlay>
  );
}

export function ModalWrapper({ children }: ModalWrapperProps) {
  const {
    open,
    floatingContext,
    activatorRef,
    floatingRefs,
    size,
    floatingNodeId,
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
                  initialFocus={floatingRefs?.floating}
                >
                  <motion.div
                    data-floating-ui-focusable
                    className={modal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    ref={floatingRefs?.setFloating}
                    role="dialog"
                    tabIndex={-1}
                  >
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
