import React from "react";
import { ModalRebuilt } from "./Modal.rebuilt";
import { ModalLegacy } from "./Modal";
import { ModalProvider } from "./ModalContext.rebuilt";
import {
  ModalActions,
  ModalActivator,
  ModalHeader,
  ModalWrapper,
} from "./ModalInternals.rebuilt";
import { ModalLegacyProps, ModalRewriteProps } from "./Modal.types";

type ModalProps = ModalLegacyProps | ModalRewriteProps;

function isModalV2(props: ModalProps): props is ModalRewriteProps {
  return "version" in props && props.version === 2;
}

function Modal(props: ModalLegacyProps | ModalRewriteProps) {
  if (isModalV2(props)) {
    return <ModalRebuilt {...props}>{props.children}</ModalRebuilt>;
  }

  return <ModalLegacy {...props}>{props.children}</ModalLegacy>;
}

Modal.Header = ModalHeader;

Modal.Actions = ModalActions;

Modal.Activator = ModalActivator;
Modal.Provider = ModalProvider;

Modal.Wrapper = ModalWrapper;

export { useModalContext } from "./ModalContext.rebuilt";
export { useModalStyles } from "./useModalStyles";

export type { ModalProps };
export { Modal };
