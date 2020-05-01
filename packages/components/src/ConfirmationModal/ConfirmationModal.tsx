import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
} from "react";
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

interface ResetAction extends BaseAction {
  type: "reset";
  state: ConfirmationModalState;
}

function confirmationModalReducer(
  state: ConfirmationModalState,
  action: XOR<BaseAction, XOR<ResetAction, DisplayAction>>,
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
      state.onCancel && state.onCancel();
      return {
        ...state,
        open: false,
      };

    case "reset":
      return { ...state, ...action.state };

    default:
      throw new Error();
  }
}

export interface ConfirmationModalRef {
  show(props: Omit<DisplayAction, "type">): void;
}

interface ConfirmationModalProps {
  readonly title?: string;
  readonly text: string;
  readonly open?: boolean;
  readonly confirmLabel: string;
  readonly cancelLabel?: string;
  onConfirm?(): void;
  onCancel?(): void;
  onRequestClose?(): void;
}

export const ConfirmationModal = forwardRef(ConfirmationModalInternal);
function ConfirmationModalInternal(
  {
    title,
    text,
    open = false,
    confirmLabel,
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    onRequestClose,
  }: ConfirmationModalProps,
  ref: Ref<ConfirmationModalRef>,
) {
  const [state, dispatch] = useReducer(confirmationModalReducer, {
    title,
    text,
    open: false,
    onConfirm,
    onCancel,
  });
  useImperativeHandle(ref, () => ({
    show: ({
      title: newTitle,
      text: newText,
      onConfirm: newOnConfirm,
      onCancel: newOnCancel,
    }: Omit<DisplayAction, "type">) => {
      dispatch({
        type: "display",
        title: newTitle,
        text: newText,
        onConfirm: newOnConfirm,
        onCancel: newOnCancel,
      });
    },
  }));

  useEffect(() => {
    dispatch({
      type: "reset",
      state: {
        ...state,
        title,
        text,
        onConfirm,
        onCancel,
      },
    });
  }, [title, text, onConfirm, onCancel]);

  return (
    <Modal
      title={state.title}
      open={open || state.open}
      dismissible={false}
      primaryAction={{
        label: confirmLabel,
        onClick: () => {
          dispatch({ type: "confirm" });
          onRequestClose && onRequestClose();
        },
      }}
      secondaryAction={{
        label: cancelLabel,
        onClick: () => {
          dispatch({ type: "cancel" });
          onRequestClose && onRequestClose();
        },
      }}
    >
      <Content>
        <Text>{state.text}</Text>
      </Content>
    </Modal>
  );
}
