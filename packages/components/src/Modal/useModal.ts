import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useRef } from "react";

interface UseModalProps {
  open: boolean;
  activatorRef?: React.RefObject<HTMLElement | null> | null;
  onRequestClose: () => void;
}

export function useModal({
  open,
  activatorRef: refProp,
  onRequestClose,
}: UseModalProps) {
  const defaultActivatorRef = useRef<HTMLElement | null>(null);
  const activatorRef = refProp ?? defaultActivatorRef;

  const { refs: floatingRefs, context: floatingContext } = useFloating({
    elements: { reference: activatorRef?.current },
    onOpenChange: (newOpen: boolean) => {
      if (!newOpen) {
        onRequestClose?.();
      }
    },
    open: open,
  });

  const click = useClick(floatingContext);
  const dismiss = useDismiss(floatingContext, {
    outsidePressEvent: "click",
    escapeKey: true,
    bubbles: false,
  });
  const role = useRole(floatingContext);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  return {
    floatingRefs,
    activatorRef,
    getFloatingProps,
  };
}
