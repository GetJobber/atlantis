import {
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";

interface UseModalProps {
  open: boolean;
  activatorRef?: React.RefObject<HTMLElement | null> | null;
  onRequestClose: () => void;
  startedInsideRef?: MutableRefObject<boolean> | undefined;
}

export function useModal({
  open,
  activatorRef: refProp,
  onRequestClose,
  startedInsideRef,
}: UseModalProps) {
  const nodeId = useFloatingNodeId();
  const defaultActivatorRef = useRef<HTMLElement | null>(null);
  const activatorRef = refProp ?? defaultActivatorRef;

  const { refs: floatingRefs, context: floatingContext } = useFloating({
    elements: { reference: activatorRef?.current },
    nodeId,
    onOpenChange: (newOpen: boolean) => {
      if (!newOpen) onRequestClose?.();
    },
    open: open,
  });

  useEffect(() => {
    if (!startedInsideRef) return;

    if (open) {
      // Ensure the first interaction after open is treated as inside
      startedInsideRef.current = true;
    } else {
      // Reset on close
      startedInsideRef.current = false;
    }
  }, [open, startedInsideRef]);

  const dismiss = useDismiss(floatingContext, {
    // Use pointerdown so the dialog/overlay capture handlers run first and set intent
    outsidePressEvent: "pointerdown",
    outsidePress: () => {
      const startedInside = startedInsideRef?.current ?? true;

      return !startedInside;
    },
    escapeKey: true,
    bubbles: false,
  });

  const role = useRole(floatingContext);

  const { getFloatingProps } = useInteractions([dismiss, role]);
  const parentId = useFloatingParentNodeId();

  return {
    floatingRefs,
    floatingContext,
    nodeId,
    activatorRef,
    parentId,
    getFloatingProps,
  };
}
