import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import { useModalContext } from "./ModalContext";
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

export function ModalHeader({
  title,
  children,
  UNSAFE_className,
  UNSAFE_style,
}: HeaderProps) {
  const { header, dismissButton } = useModalStyles();
  const { dismissible, onRequestClose } = useModalContext();
  const headerClassName = classNames(header, UNSAFE_className?.header);
  const dismissButtonClassName = classNames(
    dismissButton,
    UNSAFE_className?.dismissButton,
  );
  const content = children ?? (
    <div
      className={headerClassName}
      data-testid="ATL-Modal-Header"
      style={UNSAFE_style?.header}
    >
      <Heading
        level={2}
        UNSAFE_className={UNSAFE_className?.title}
        UNSAFE_style={UNSAFE_style?.title}
      >
        {title}
      </Heading>

      {dismissible && (
        <div
          className={dismissButtonClassName}
          style={UNSAFE_style?.dismissButton}
        >
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
  UNSAFE_className,
  UNSAFE_style,
}: ModalActionsProps) {
  const { actionBar, rightAction, leftAction } = useModalStyles();
  const shouldShow =
    primary != undefined || secondary != undefined || tertiary != undefined;
  const actionBarClassName = classNames(actionBar, UNSAFE_className?.actionBar);
  const rightActionClassName = classNames(
    rightAction,
    UNSAFE_className?.rightAction,
  );
  const leftActionClassName = classNames(
    leftAction,
    UNSAFE_className?.leftAction,
  );

  return (
    <>
      {shouldShow && (
        <div
          className={actionBarClassName}
          style={UNSAFE_style?.actionBar}
          data-testid="ATL-Modal-Actions"
        >
          <div
            className={rightActionClassName}
            style={UNSAFE_style?.rightAction}
          >
            {primary && <Button {...primary} />}
            {secondary && (
              <Button {...secondary} type="primary" variation="subtle" />
            )}
          </div>
          {tertiary && (
            <div
              className={leftActionClassName}
              style={UNSAFE_style?.leftAction}
            >
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

export function ModalOverlay({
  children,
  UNSAFE_className,
  UNSAFE_style,
}: PropsWithChildren & {
  readonly UNSAFE_className?: {
    overlay?: string;
  };
  readonly UNSAFE_style?: {
    overlay?: React.CSSProperties;
  };
}) {
  const { size } = useModalContext();
  const { overlay } = useModalStyles(size);
  const overlayclassNames = classNames(overlay, UNSAFE_className?.overlay);

  return (
    <AnimatedOverlay
      className={overlayclassNames}
      style={UNSAFE_style?.overlay}
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

export function ModalWrapper({
  children,
  UNSAFE_className,
  UNSAFE_style,
}: ModalWrapperProps) {
  const {
    open,
    floatingContext,
    activatorRef,
    floatingRefs,
    size,
    floatingNodeId,
  } = useModalContext();
  const { modal } = useModalStyles(size);
  const modalclassNames = classNames(modal, UNSAFE_className?.modal);

  return (
    <AnimatePresence>
      {open && (
        <FloatingNode id={floatingNodeId}>
          <FloatingPortal>
            <AtlantisPortalContent>
              <ModalOverlay
                UNSAFE_className={UNSAFE_className}
                UNSAFE_style={UNSAFE_style}
              >
                <FloatingFocusManager
                  context={floatingContext}
                  returnFocus={activatorRef?.current ? activatorRef : true}
                  order={["content", "floating"]}
                >
                  <motion.div
                    data-floating-ui-focusable
                    className={modalclassNames}
                    style={UNSAFE_style?.modal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
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
