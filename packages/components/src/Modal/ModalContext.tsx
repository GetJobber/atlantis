import noop from "lodash/noop";
import React, {
  HTMLProps,
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import {
  ExtendedRefs,
  FloatingContext,
  FloatingFocusManager,
  FloatingPortal,
  ReferenceType,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "./useModal";
import { useModalStyles } from "./useModalStyles";
import sizes from "./ModalSizes.module.css";

export interface ModalContextType {
  open?: boolean;
  onRequestClose: () => void;
  activatorRef?: MutableRefObject<HTMLElement | null> | null;
  floatingRefs: ExtendedRefs<ReferenceType> | null;
  floatingContext: FloatingContext;
  getFloatingProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  size?: keyof typeof sizes;
}

export const ModalContext = createContext<ModalContextType>({
  open: false,
  onRequestClose: noop,
  activatorRef: null,
  floatingRefs: null,
  floatingContext: {} as FloatingContext,
  getFloatingProps: () => ({}),
  size: undefined,
});

export interface ModalProviderProps {
  readonly children: React.ReactNode;
  readonly size?: keyof typeof sizes;
  readonly open?: boolean;
  readonly onRequestClose?: () => void;
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
}

export function ModalProvider({
  children,
  open = false,
  size,
  onRequestClose = noop,
}: ModalProviderProps) {
  const activatorRef = useRef<HTMLElement | null>(null);
  const { floatingRefs, floatingContext, getFloatingProps } = useModal({
    open,
    activatorRef,
    onRequestClose,
  });

  return (
    <ModalContext.Provider
      value={{
        onRequestClose,
        activatorRef,
        floatingRefs,
        floatingContext,
        getFloatingProps,
        size,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalWrapper({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { open, floatingContext, activatorRef, floatingRefs, size } =
    useModalContext();
  const { container } = useModalStyles(size);

  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingFocusManager
            context={floatingContext}
            returnFocus={activatorRef?.current ? activatorRef : true}
          >
            <div
              ref={floatingRefs?.setFloating}
              role="dialog"
              className={container}
              tabIndex={0}
            >
              <ModalOverlay />
              <ModalContentWrapper>{children}</ModalContentWrapper>
            </div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

/**
 * Background overlay for the modal
 */
function ModalOverlay() {
  const { size } = useModalContext();
  const { overlay } = useModalStyles(size);

  return (
    <motion.div
      className={overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
}

/**
 * Modal content wrapper
 */
function ModalContentWrapper({ children }: PropsWithChildren) {
  const { size } = useModalContext();
  const { modal } = useModalStyles(size);

  return (
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
      {children}
    </motion.div>
  );
}
