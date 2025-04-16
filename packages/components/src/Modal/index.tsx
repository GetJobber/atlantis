import React from "react";
import { Modal as ModalV1 } from "./Modal";
import { Modal as ModalV2 } from "./ModalV2";
import { ModalProps as ModalV1Props, ModalV2Props } from "./types";

type ModalProps = ModalV1Props | ModalV2Props;

function isNewModalProps(props: ModalProps): props is ModalV2Props {
  return props.version === 2;
}

export const Modal = (props: ModalProps) => {
  if (isNewModalProps(props)) {
    return <ModalV2 {...props} />;
  }

  return <ModalV1 {...props} />;
};
