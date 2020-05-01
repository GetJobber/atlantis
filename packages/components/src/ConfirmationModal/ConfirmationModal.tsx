import React, { forwardRef, useImperativeHandle, useReducer } from "react";
import { XOR } from "ts-xor";
import { Text } from "../Text";
import { Modal } from "../Modal";
import { Content } from "../Content";

interface ConfirmationModalState {
  readonly title?: string;
  readonly text?: string;
  readonly open: boolean;
  onConfirm?(): void;
  onCancel?(): void;
}

interface BaseAction {
  type: string;
}

interface DisplayAction extends BaseAction {
  type: "display";
  title?: string;
  text?: string;
  onConfirm(): void;
  onCancel?(): void;
}

function confirmationModalReducer(
  state: ConfirmationModalState,
  action: XOR<BaseAction, DisplayAction>,
) {
  switch (action.type) {
    case "display":
      return {
        ...state,
        title: action.title,
        text: action.text,
        open: true,
        onConfirm: action.onConfirm,
        onCancel: action.onCancel,
      };

    case "confirm":
      state.onConfirm && state.onConfirm();
      return {
        ...state,
        open: false,
      };

    case "cancel":
      return {
        ...state,
        open: false,
      };

    default:
      throw new Error();
  }
}

interface ConfirmationModalProps {
  readonly title?: string;
  readonly text?: string;
  readonly open?: boolean;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
}

export const ConfirmationModal = forwardRef(ConfirmationModalInternal);
function ConfirmationModalInternal(
  {
    title: initialTitle = "",
    text: initialText = "",
    open = false,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
  }: ConfirmationModalProps,
  ref: any,
) {
  const [state, dispatch] = useReducer(confirmationModalReducer, {
    title: initialTitle,
    text: initialText,
    open: open,
    onConfirm: undefined,
    onCancel: undefined,
  });
  useImperativeHandle(ref, () => ({
    show: ({ title, text }: Pick<ConfirmationModalProps, "title" | "text">) => {
      dispatch({
        type: "display",
        title,
        text,
        onConfirm: () => {
          alert("Bob");
        },
      });
    },
  }));

  return (
    <Modal
      title={state.title}
      open={state.open}
      dismissible={false}
      primaryAction={{
        label: confirmLabel,
        onClick: () => {
          dispatch({ type: "confirm" });
        },
      }}
      secondaryAction={{
        label: cancelLabel,
        onClick: () => {
          dispatch({ type: "cancel" });
        },
      }}
    >
      <Content>
        <Text>{state.text}</Text>
      </Content>
    </Modal>
  );
}
