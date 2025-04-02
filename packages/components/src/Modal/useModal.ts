import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

interface UseModalProps {
  open: boolean;
  activatorRef?: React.RefObject<HTMLElement | null> | null;
  onRequestClose: () => void;
}

export function useModal({
  open,
  activatorRef,
  onRequestClose,
}: UseModalProps) {
  const { refs: floatingRefs, context: floatingContext } = useFloating({
    elements: { reference: activatorRef?.current },
    onOpenChange: newOpen => {
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
  });
  const role = useRole(floatingContext);

  // Merge all the interactions into prop getters
  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  return { floatingRefs, floatingContext, getFloatingProps };
}
