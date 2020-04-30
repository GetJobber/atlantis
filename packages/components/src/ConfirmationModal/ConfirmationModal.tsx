import React from "react";
import { Text } from "../Text";
import { Modal } from "../Modal";
import { Content } from "../Content";

interface ConfirmationModalState {
  readonly title?: string;
  readonly text?: string;
  readonly open: boolean;
  confirmedAction(): void;
}

interface BaseAction {
  type: string;
}

interface DisplayAction extends BaseAction {
  type: "display";
  title: string;
  text: string;
  onConfirm(): void;
}

export function confirmationModalReducer(
  state: ConfirmationModalState = {
    open: false,
    confirmedAction: () => undefined,
  },
  action: BaseAction | DisplayAction,
) {
  switch (action.type) {
    case "display":
      return {
        ...state,
        ...action.state,
        open: true,
        confirmedAction: action.confirmed,
      };

    case "confirm":
      state.confirmedAction();
      return {
        ...state,
        ...action.state,
        open: false,
        confirmedAction: undefined,
      };

    case "cancel":
      return {
        ...state,
        ...action.state,
        open: false,
        confirmedAction: undefined,
      };

    default:
      throw new Error();
  }
}

interface ConfirmationModalProps {
  readonly state: ConfirmationModalState;
  readonly confirmLabel?: string;
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
