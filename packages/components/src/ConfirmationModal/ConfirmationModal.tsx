import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
} from "react";
import { Text } from "../Text";
import { Modal } from "../Modal";
import { Content } from "../Content";

interface ConfirmationModalState {
  readonly title?: string;
  readonly message?: string;
  readonly open: boolean;
  readonly confirmLabel: string;
  readonly cancelLabel: string;
  onConfirm?(): void;
  onCancel?(): void;
}

interface ConfirmOrCancelAction {
  type: "confirm" | "cancel";
}

interface DisplayAction {
  type: "display";
  title?: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm(): void;
  onCancel?(): void;
}

interface ResetAction {
  type: "reset";
  state: ConfirmationModalState;
}

function confirmationModalReducer(
  state: ConfirmationModalState,
  action: ConfirmOrCancelAction | ResetAction | DisplayAction,
) {
  switch (action.type) {
    case "display":
      return {
        ...state,
        title: action.title,
        message: action.message,
        open: true,
        confirmLabel: action.confirmLabel,
        cancelLabel: action.cancelLabel || "Cancel",
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

type SimpleKeyComparerator = string;

interface VerboseKeyComparerator {
  readonly key: SimpleKeyComparerator;
  readonly shiftKey?: boolean;
  readonly ctrlKey?: boolean;
  readonly altKey?: boolean;
  readonly metaKey?: boolean;
}

type KeyComparerator = XOR< VerboseKeyComparerator, SimpleKeyComparerator>

interface BaseConfirmationModalProps {
  /**
   * Title for the modal.
   */
  readonly title?: string;

  /**
   * Text for the body of the modal.
   */
  readonly message?: string;

  /**
   * Controls if the modal is open or not.
   */
  readonly open?: boolean;

  /**
   * Label for the confirm button.
   */
  readonly confirmLabel?: string;

  /**
   * Label for the cancel button.
   */
  readonly cancelLabel?: string;

  /**
   * Callback for when the confirm button is pressed.
   */
  onConfirm?(): void;

  /**
   * Callback for when the cancel button is pressed.
   */
  onCancel?(): void;

  /**
   * Callback for whenever a user's action should close the modal.
   */
  onRequestClose?(): void;
}

interface SimpleConfirmationModalProps extends BaseConfirmationModalProps {
  readonly message: string;
  readonly open: boolean;
  readonly confirmLabel: string;
}

interface ComplexConfirmationModalProps extends BaseConfirmationModalProps {
  readonly ref: Ref<ConfirmationModalRef>;
  readonly open?: undefined;
}

type ConfirmationModalProps =
  | SimpleConfirmationModalProps
  | ComplexConfirmationModalProps;

export const ConfirmationModal = forwardRef(function ConfirmationModalInternal(
  {
    title,
    message,
    open = false,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    onRequestClose,
  }: ConfirmationModalProps,
  ref: Ref<ConfirmationModalRef>,
) {
  const [state, dispatch] = useReducer(confirmationModalReducer, {
    title,
    message,
    open: false,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
  });

  // Expose a `show` method through this component's ref.
  useImperativeHandle(ref, () => ({
    show: ({
      title: newTitle,
      message: newMessage,
      confirmLabel: newConfirmLabel,
      cancelLabel: newCancelLabel,
      onConfirm: newOnConfirm,
      onCancel: newOnCancel,
    }: Omit<DisplayAction, "type">) => {
      dispatch({
        type: "display",
        title: newTitle,
        message: newMessage,
        confirmLabel: newConfirmLabel,
        cancelLabel: newCancelLabel,
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
        message: message,
        confirmLabel,
        cancelLabel,
        onConfirm,
        onCancel,
      },
    });
  }, [title, message, confirmLabel, cancelLabel, onConfirm, onCancel]);

  const handleConfirm = () => {
    dispatch({ type: "confirm" });
    onRequestClose && onRequestClose();
  };

  const handleCancel = () => {
    dispatch({ type: "cancel" });
    onRequestClose && onRequestClose();
  };

  useEffect(() => {
    const confirmShortcut = createKeyDownHandler("Enter", handleConfirm);
    const cancelShortcut = createKeyDownHandler(
      ["Escape", { metaKey: true, key: "." }],
      handleCancel,
    );
    if (open || state.open) {
      window.addEventListener("keydown", confirmShortcut);
      window.addEventListener("keydown", cancelShortcut);
    }
    return () => {
      window.removeEventListener("keydown", confirmShortcut);
      window.removeEventListener("keydown", cancelShortcut);
    };
  }, [open || state.open]);

  return (
    <Modal
      title={state.title}
      open={open || state.open}
      size="small"
      dismissible={false}
      primaryAction={{
        label: state.confirmLabel,
        onClick: handleConfirm,
      }}
      secondaryAction={{
        label: state.cancelLabel,
        onClick: handleCancel,
      }}
    >
      <Content>
        <Text>{state.message}</Text>
      </Content>
    </Modal>
  );
});

function createKeyDownHandler(
  option:
    | Array<
        KeyboardEventCompareratorOption | KeyboardEventCompareratorOption["key"]
      >
    | KeyboardEventCompareratorOption
    | KeyboardEventCompareratorOption["key"],
  callback: () => void,
) {
  const handler: (event: globalThis.KeyboardEvent) => void = (
    event: globalThis.KeyboardEvent,
  ) => {
    const keyboardEvent = (event as unknown) as KeyboardEventCompareratorOption;
    if (typeof option === "string" && keyboardEvent.key === option) {
      return callback();
    }
    if (
      Array.isArray(option) &&
      option.some(item => {
        if (typeof item === "string") return keyboardEvent.key === item;
        return Object.keys(item).every(
          index => keyboardEvent[index] === item[index],
        );
      })
    ) {
      return callback();
    }
    if (
      !Array.isArray(option) &&
      typeof option !== "string" &&
      Object.keys(option).every(index => keyboardEvent[index] === option[index])
    ) {
      return callback();
    }
  };

  return handler;
}
