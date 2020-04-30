import React, { useReducer } from "react";
import { Text } from "../Text";
import { Modal } from "../Modal";
import { Content } from "../Content";

interface ConfirmationModalState {
  readonly title: string;
  readonly text: string;
  readonly open: boolean;
  readonly meta: any;
}

export function confirmationModalReducer(
  state: ConfirmationModalState,
  action: any,
) {
  switch (action.type) {
    case "deleteUser":
      return {
        ...state,
        open: true,
        meta: action.meta,
        confirmedAction: action.confirmed,
      };

    case "confirm":
      // Do API Request
      state.confirmedAction();
      return { ...state, open: false, meta: {}, confirmedAction: undefined };

    case "cancel":
      return { ...state, open: false, meta: {}, confirmedAction: undefined };

    default:
      throw new Error();
  }
}

interface ConfirmationModalProps {
  readonly state: ConfirmationModalState;

  /**
   *
   */
  readonly confirmLabel?: string;

  /**
   *
   */
  readonly cancelLabel?: string;

  onConfirm(): void;
  onCancel(): void;
}

export function ConfirmationModal({
  state,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal
      title={state.title}
      open={state.open}
      dismissible={false}
      primaryAction={{ label: confirmLabel, onClick: onConfirm }}
      secondaryAction={{ label: cancelLabel, onClick: onCancel }}
    >
      <Content>
        <Text>{state.text}</Text>
      </Content>
    </Modal>
  );
}
