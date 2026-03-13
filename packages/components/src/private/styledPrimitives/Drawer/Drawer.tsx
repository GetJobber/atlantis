import type { ReactElement } from "react";
import React, { createContext, useContext, useState } from "react";
import type {
  DrawerBackdropProps,
  DrawerContentProps,
  DrawerPopupProps,
  DrawerPortalProps,
  DrawerRootProps,
  DrawerTriggerProps,
} from "./Drawer.types";
import { DrawerPrimitive } from "../../primitives/Drawer/Drawer";

const DrawerCloseContext = createContext<(() => void) | null>(null);

export function useDrawerRequestClose() {
  return useContext(DrawerCloseContext);
}

function DrawerRoot({
  children,
  onOpenChange,
  open,
  defaultOpen,
}: DrawerRootProps): ReactElement {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const currentOpen = open ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <DrawerCloseContext.Provider value={() => setOpen(false)}>
      <DrawerPrimitive.Root open={currentOpen} onOpenChange={setOpen}>
        {children}
      </DrawerPrimitive.Root>
    </DrawerCloseContext.Provider>
  );
}

const DrawerTrigger = React.forwardRef<HTMLDivElement, DrawerTriggerProps>(
  function DrawerTrigger({ ariaLabel, children, style, className }, ref) {
    const render = (
      <div
        aria-label={ariaLabel}
        className={className}
        ref={ref}
        role="button"
        style={style}
      />
    );

    return (
      <DrawerPrimitive.Trigger nativeButton={false} render={render}>
        {children}
      </DrawerPrimitive.Trigger>
    );
  },
);

function DrawerPortal({ children }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal>{children}</DrawerPrimitive.Portal>;
}

function DrawerBackdrop({ className }: DrawerBackdropProps) {
  return <DrawerPrimitive.Backdrop className={className} />;
}

function DrawerPopup({ children, className }: DrawerPopupProps) {
  return (
    <DrawerPrimitive.Popup className={className}>
      {children}
    </DrawerPrimitive.Popup>
  );
}

function DrawerContent({ children, style, className }: DrawerContentProps) {
  return (
    <DrawerPrimitive.Content className={className} style={style}>
      {children}
    </DrawerPrimitive.Content>
  );
}

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Backdrop: DrawerBackdrop,
  Popup: DrawerPopup,
  Content: DrawerContent,
});
