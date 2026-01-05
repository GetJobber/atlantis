import React from "react";
import { ModalLegacy } from "./Modal";
import { ModalProvider } from "./ModalContext.rebuilt";
import {
  ModalActions,
  ModalActivator,
  ModalContent,
  ModalHeader,
} from "./Modal.rebuilt";
import type { ModalLegacyProps } from "./Modal.types";

export type { ModalLegacyProps as ModalProps } from "./Modal.types";

function Modal(props: ModalLegacyProps) {
  return <ModalLegacy {...props} />;
}

Modal.Header = ModalHeader;

Modal.Actions = ModalActions;

Modal.Activator = ModalActivator;
Modal.Provider = ModalProvider;

Modal.Content = ModalContent;

export { useModalContext } from "./ModalContext.rebuilt";
export { useModalStyles } from "./useModalStyles";

export { Modal };
