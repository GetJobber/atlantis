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
}

interface ToastRef {
  add(props: ToastProps): void;
}

export const Toast = forwardRef(ToastInternal);

function ToastInternal(_props: any, ref: Ref<ToastRef>) {
  const [toasts, setToasts] = useState<ReactNode[]>([]);

  useImperativeHandle(ref, () => ({
    add: ({ message, icon }) => {
      setToasts([
        <Slice key="hello" icon={icon} message={message} />,
        ...toasts,
      ]);
    },
  }));
  return <>{toasts}</>;
}

function Slice({ message, icon }: ToastProps) {
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
          onClick={() => alert("remove!")}
          type="tertiary"
          variation="learning"
        />
      </div>
    </div>
  );
}
