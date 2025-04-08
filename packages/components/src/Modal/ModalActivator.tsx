import React, { PropsWithChildren, forwardRef } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useModalContext } from "./ModalContext";

const ModalActivator = forwardRef<HTMLSpanElement, PropsWithChildren>(
  function InternalModalActivator({ children }, ref) {
    const { activatorRef } = useModalContext();
    const mergedRef = useMergeRefs([ref, activatorRef]);

    return (
      <span ref={mergedRef} style={{ display: "contents" }}>
        {children}
      </span>
    );
  },
);

export { ModalActivator };
