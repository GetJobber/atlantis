import {
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
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

  const dismiss = useDismiss(floatingContext, {
    outsidePressEvent: "click",
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
