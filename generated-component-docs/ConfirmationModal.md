# ConfirmationModal

# Confirmation Modal

A ConfirmationModal allows users to confirm or cancel actions that they are
performing. Examples of actions that may need confirmation are navigating off an
edited page or deleting an object.

## Design & usage guidelines

ConfirmationModal should be used to confirm or cancel an action the user is
performing.

If the user is confirming an action that will destroy, delete, or remove
something, use a
[destructive](../?path=/story/components-overlays-confirmationmodal-web--destructive)
ConfirmationModal to visually reinforce the potential consequences.

In some instances, such as when dealing with a collection of items with common
actions, you may want to place a single ConfirmationModal on a page and then
call to open it when required for each action. We can do this by using the
`confirmationModalRef` which exposes a `show` method, allowing you to present a
confirmation modal on demand. In the
[Controlled](../?path=/story/components-overlays-confirmationmodal-web--controlled)
example, we have an array of users and then render a button for each that
presents a confirm modal.

## Content guidelines

Keep language in a ConfirmationModal clear, concise, and consistent.

Verbs in the title should directly relate to the `confirmLabel`.

| **✅ Do**                    | **❌ Don't**        |
| ---------------------------- | ------------------- |
| **Discard unsaved changes?** | **Cancel editing?** |
| Cancel / Discard             | No / Yes            |

Only use **Cancel** as a label to allow the user to exit the current action.

| **✅ Do**             | **❌ Don't**            |
| --------------------- | ----------------------- |
| **Stop file upload?** | **Cancel file upload?** |
| Cancel / Stop         | Exit / Cancel           |

Avoid using generic or verbose titles.

| **✅ Do**                                           | **❌ Don't**                                        |
| --------------------------------------------------- | --------------------------------------------------- |
| **Delete job #2121?**                               | **Are you sure?**                                   |
| Deleting this job will remove all associated visits | Deleting this job will remove all associated visits |
| Cancel / Delete Job                                 | Cancel / Delete Job                                 |

## Related components

- To present non-blocking, contextual, text-only content, use a
  [Tooltip](/components/Tooltip)
- To simply present information for users to view, edit, or for a temporary
  change of context, use a regular [Modal](/components/Modal)

## Web Component Code

```tsx
ConfirmationModal Confirm Prompt Modal Web React import type { ReactNode, Ref } from "react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
} from "react";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { Modal } from "../Modal";
import { Content } from "../Content";
import { Markdown } from "../Markdown";

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
      return {
        ...state,
        open: false,
      };

    case "cancel":
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

interface BaseConfirmationModalProps {
  /**
   * Title for the modal.
   */
  readonly title?: string;

  /**
   * Text or rich text content for the body of the modal.
   * Not displayed if **children** prop is passed.
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
   * Type (Work or destructive) for confirm button.
   */
  readonly variation?: "work" | "destructive";

  /**
   * Size of the modal (small, large),
   */
  readonly size?: "small" | "large";

  /**
   * Child component. Not displayed if **message** prop is passed.
   */
  readonly children?: ReactNode;

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

export interface SimpleConfirmationModalProps
  extends BaseConfirmationModalProps {
  readonly open: boolean;
  readonly confirmLabel: string;
}

export interface ComplexConfirmationModalProps
  extends BaseConfirmationModalProps {
  readonly open?: undefined;
}

export interface ChildrenMessage extends BaseConfirmationModalProps {
  message?: never;
  children: ReactNode;
}

export interface StringMessage extends BaseConfirmationModalProps {
  message: string;
  children?: never;
}

type ConfirmationModalProps =
  | (SimpleConfirmationModalProps & (StringMessage | ChildrenMessage))
  | (ComplexConfirmationModalProps & (StringMessage | ChildrenMessage));

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
    variation = "work",
    size,
    children,
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

  useOnKeyDown(handleKeyboardShortcut, ["Escape", "Enter"]);

  return (
    <Modal
      title={state.title}
      open={open || state.open}
      size={size}
      dismissible={false}
      primaryAction={{
        label: state.confirmLabel,
        onClick: handleAction("confirm"),
        variation: variation === "destructive" ? "destructive" : "work",
      }}
      secondaryAction={{
        label: state.cancelLabel,
        onClick: handleAction("cancel"),
      }}
    >
      {state.message ? (
        <Content>
          <Markdown content={state.message} />
        </Content>
      ) : (
        children
      )}
    </Modal>
  );

  function handleAction(type: "confirm" | "cancel") {
    return () => {
      if (type === "confirm") {
        state.onConfirm?.();
      } else if (type === "cancel") {
        state.onCancel?.();
      }

      dispatch({ type });
      onRequestClose && onRequestClose();
    };
  }

  function handleKeyboardShortcut(event: KeyboardEvent) {
    const { metaKey, ctrlKey, key, target } = event;
    if (!open) return;

    const shouldTriggerShortcut =
      target instanceof HTMLButtonElement ? metaKey || ctrlKey : true;

    if (!shouldTriggerShortcut) return;

    event.preventDefault();
    event.stopPropagation();

    switch (key) {
      case "Enter": {
        handleAction("confirm")();
        break;
      }
      case "Escape": {
        handleAction("cancel")();
        break;
      }
    }
  }
});

```

## Props

### Web Props

| Prop                                          | Type                              | Required       | Default           | Description                                                   |
| --------------------------------------------- | --------------------------------- | -------------- | ----------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| `open`                                        | `boolean`                         | ❌             | `[object Object]` | Controls if the modal is open or not.                         |
| `confirmLabel`                                | `string`                          | ❌             | `Confirm`         | Label for the confirm button.                                 |
| `title`                                       | `string`                          | ❌             | `_none_`          | Title for the modal.                                          |
| `message`                                     | `string`                          | ❌             | `_none_`          | Text or rich text content for the body of the modal.          |
| Not displayed if **children** prop is passed. |
| `cancelLabel`                                 | `string`                          | ❌             | `Cancel`          | Label for the cancel button.                                  |
| `variation`                                   | `"work"                           | "destructive"` | ❌                | `work`                                                        | Type (Work or destructive) for confirm button. |
| `size`                                        | `"small"                          | "large"`       | ❌                | `_none_`                                                      | Size of the modal (small, large),              |
| `children`                                    | `ReactNode`                       | ❌             | `_none_`          | Child component. Not displayed if **message** prop is passed. |
| `onConfirm`                                   | `() => void`                      | ❌             | `_none_`          | Callback for when the confirm button is pressed.              |
| `onCancel`                                    | `() => void`                      | ❌             | `_none_`          | Callback for when the cancel button is pressed.               |
| `onRequestClose`                              | `() => void`                      | ❌             | `_none_`          | Callback for whenever a user's action should close the modal. |
| `ref`                                         | `LegacyRef<ConfirmationModalRef>` | ❌             | `_none_`          | Allows getting a ref to the component instance.               |

Once the component unmounts, React will set `ref.current` to `null` (or call the
ref with `null` if you passed a callback ref). @see {@link
https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React
Docs} | | `key` | `Key` | ❌ | `_none_` | _No description_ |

## Categories

- Overlays

## Component Path

`/components/ConfirmationModal`

---

_Generated on 2025-08-21T17:35:16.357Z_
