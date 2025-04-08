import noop from "lodash/noop";
import React, {
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import {
  FloatingContext,
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
  useFloatingParentNodeId,
} from "@floating-ui/react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { useModal } from "./useModal";
import { useModalStyles } from "./useModalStyles";
import sizes from "./ModalSizes.module.css";
import { ModalContextType, ModalWrapperProps } from "./Modal.types";

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
const AnimatedOverlay = motion(FloatingOverlay);
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
  const { floatingRefs, floatingContext, nodeId, activatorRef } = useModal({
    open,
    activatorRef: refProp,
    onRequestClose,
  });

  const parentId = useFloatingParentNodeId();

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
  const modalClassNames = classNames(modal, UNSAFE_className?.modal);

  return (
    <FloatingNode id={floatingNodeId}>
      <FloatingPortal>
        {open && (
          <ModalOverlay
            UNSAFE_className={UNSAFE_className}
            UNSAFE_style={UNSAFE_style}
          >
            <FloatingFocusManager
              context={floatingContext}
              returnFocus={activatorRef?.current ? activatorRef : true}
              initialFocus={floatingRefs?.floating}
            >
              <motion.div
                className={modalClassNames}
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
                tabIndex={0}
              >
                {children}
              </motion.div>
            </FloatingFocusManager>
          </ModalOverlay>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
}

/**
 * Background overlay for the modal
 */

function ModalOverlay({
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
  const overlayClassNames = classNames(overlay, UNSAFE_className?.overlay);

  return (
    <AnimatedOverlay
      className={overlayClassNames}
      style={UNSAFE_style?.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </AnimatedOverlay>
  );
}
