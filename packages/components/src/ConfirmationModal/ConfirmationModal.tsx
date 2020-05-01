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
  readonly text?: string;
  readonly open?: boolean;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  onConfirm?(): void;
  onCancel?(): void;
  onRequestClose?(): void;
}

export const ConfirmationModal = forwardRef(ConfirmationModalInternal);
function ConfirmationModalInternal(
  {
    title: initialTitle = "",
    text: initialText = "",
    open: initialOpen = false,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm: initialOnConfirm,
    onCancel: initialOnCancel,
    onRequestClose,
  }: ConfirmationModalProps,
  ref: Ref<ConfirmationModalRef>,
) {
  console.log({ ref });

  const [state, dispatch] = useReducer(confirmationModalReducer, {
    title: initialTitle,
    text: initialText,
    open: false,
    onConfirm: initialOnConfirm,
    onCancel: initialOnCancel,
  });
  useImperativeHandle(ref, () => ({
    show: ({
      title,
      text,
      onConfirm,
      onCancel,
    }: Omit<DisplayAction, "type">) => {
      dispatch({
        type: "display",
        title,
        text,
        onConfirm,
        onCancel,
      });
    },
  }));

  useEffect(() => {
    dispatch({
      type: "reset",
      state: {
        title: initialTitle,
        text: initialText,
        open: false,
        onConfirm: initialOnConfirm,
        onCancel: initialOnCancel,
      },
    });
  }, [initialTitle, initialText, initialOnConfirm, initialOnCancel]);

  return (
    <Modal
      title={state.title}
      open={initialOpen || state.open}
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
