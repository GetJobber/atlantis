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
    outsidePressEvent: "pointerdown",
    escapeKey: true,
    bubbles: false,
    // Ignore clicks that originate from a descendant modal branch
    outsidePress: event => {
      const target = event.target as Element | null;
      const branch = target?.closest("[data-atlantis-modal-branch]");
      const myFloating = floatingRefs.floating?.current as Node | null;
      // If there is no branch marker, allow dismissal.
      if (!branch || !myFloating) return true;

      // Only allow if the branch contains our floating (i.e., it's our own branch)
      return branch.contains(myFloating);
    },
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
