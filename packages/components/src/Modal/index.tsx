import React from "react";
import { ModalLegacy } from "./Modal";
import { ModalProvider } from "./ModalContext.rebuilt";
import {
  ModalContent,
  ModalFooter,
  ModalFooterActions,
  ModalFooterMainActions,
  ModalFooterOtherActions,
  ModalHeader,
  ModalHeaderTitle,
} from "./Modal.rebuilt";
import type { ModalLegacyProps } from "./Modal.types";

export type { ModalLegacyProps as ModalProps } from "./Modal.types";

function Modal(props: ModalLegacyProps) {
  return <ModalLegacy {...props} />;
}

Modal.Header = ModalHeader;

Modal.Provider = ModalProvider;

Modal.Content = ModalContent;
// New alias for body-area wrapper
Modal.Body = ModalContent;
Modal.Title = ModalHeaderTitle;

Modal.Footer = ModalFooter;
Modal.FooterMainActions = ModalFooterMainActions;
Modal.FooterOtherActions = ModalFooterOtherActions;

export { useModalContext } from "./ModalContext.rebuilt";

export { useModalStyles } from "./useModalStyles";

export { Modal };
