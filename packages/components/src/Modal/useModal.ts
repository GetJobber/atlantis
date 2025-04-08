import {
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
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
  const nodeId = useFloatingNodeId();
  const defaultActivatorRef = useRef<HTMLElement | null>(null);
  const activatorRef = refProp ?? defaultActivatorRef;

  const { refs: floatingRefs, context: floatingContext } = useFloating({
    elements: { reference: activatorRef?.current },
    nodeId,
    onOpenChange: (newOpen: boolean) => {
      if (!newOpen) {
        onRequestClose?.();
      }
    },
    open: open,
  });

  const click = useClick(floatingContext);
  const dismiss = useDismiss(floatingContext, {
    outsidePressEvent: "mousedown",
    escapeKey: true,
    bubbles: true,
  });
  const role = useRole(floatingContext);

  useInteractions([click, dismiss, role]);

  return {
    floatingRefs,
    floatingContext,
    nodeId,
    activatorRef,
  };
}
