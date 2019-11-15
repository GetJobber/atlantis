import { ReactNode } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.body.appendChild(document.createElement("div"));

interface RootPortalProps {
  children: ReactNode | ReactNode[];
}

export function RootPortal({ children }: RootPortalProps) {
  return ReactDOM.createPortal(children, modalRoot);
}
