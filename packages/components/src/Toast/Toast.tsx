import React, {
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import classnames from "classnames";
import styles from "./Toast.css";
import { Icon, IconNames } from "../Icon";
import { Button } from "../Button";

interface ToastProps {
  message: string;
  icon?: IconNames;
  id: number;
  onClose?(): void;
}

interface ToastRef {
  add(props: ToastProps): void;
}

export const Toast = forwardRef(ToastInternal);

function ToastInternal(_props: any, ref: Ref<ToastRef>) {
  const [toastKey, setToastKey] = useState(0);
  const [toasts, setToasts] = useState<ReactNode[]>([]);

  useImperativeHandle(ref, () => ({
    add: props => {
      setToastKey(toastKey + 1);
      setToasts([
        {
          ...props,
          id: toastKey,
        },
        ...toasts,
      ]);
    },
  }));
  return (
    <>
      {toasts.map(toast => (
        <Slice
          {...toast}
          key={toast.id}
          onClose={id => {
            toast.onClose && toast.onClose();
            handleClose(id);
          }}
        />
      ))}
      <pre>{JSON.stringify(toasts, undefined, 2)}</pre>
    </>
  );

  function handleClose(id) {
    const newToasts = toasts.filter(toast => toast.id !== id);
    setToasts(newToasts);
  }
}

function Slice({ message, icon, onClose, id }: ToastProps) {
  const breadClass = classnames(styles.slice);
  return (
    <div className={breadClass}>
      {icon && (
        <div className={styles.icon}>
          <Icon color="green" name={icon} />
        </div>
      )}
      <div className={styles.message}>{message}</div>
      <div className={styles.button}>
        <Button
          icon="remove"
          ariaLabel={"Remove Toast"}
          onClick={() => onClose(id)}
          type="tertiary"
          variation="learning"
        />
      </div>
    </div>
  );
}
