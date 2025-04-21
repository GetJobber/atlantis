import React from "react";
import { ModalLegacy } from "./Modal";
import { ModalProvider } from "./ModalContext.rebuilt";
import {
  ModalActions,
  ModalActivator,
  ModalHeader,
  ModalWrapper,
} from "./Modal.rebuilt";
import { ModalLegacyProps } from "./Modal.types";

export type { ModalLegacyProps as ModalProps } from "./Modal.types";

const Modal = (props: ModalLegacyProps) => <ModalLegacy {...props} />;

Modal.Header = ModalHeader;

Modal.Actions = ModalActions;

Modal.Activator = ModalActivator;
Modal.Provider = ModalProvider;

Modal.Wrapper = ModalWrapper;

export { useModalContext } from "./ModalContext.rebuilt";
export { useModalStyles } from "./useModalStyles";

export { Modal };
