import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface CreatePortalProps {
  children: ReactNode | ReactNode[];
}

export function CreatePortal({ children }: CreatePortalProps) {
  return <Portal>{children}</Portal>;
}

interface PortalProps {
  children: ReactNode | ReactNode[];
}

export function Portal({ children }: PortalProps) {
  const modalRoot = document.body.appendChild(document.createElement("div"));
  const tempVar = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(tempVar);

    return () => {
      modalRoot.removeChild(tempVar);
    };
  });

  return ReactDOM.createPortal(children, modalRoot);
}
