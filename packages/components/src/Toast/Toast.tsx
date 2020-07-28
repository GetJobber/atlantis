import React, {
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className={styles.container}>
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            className={styles.toast}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              height: 0,
              transition: { duration: 0.3 },
            }}
          >
            <Slice
              {...toast}
              onClose={id => {
                toast.onClose && toast.onClose();
                handleClose(id);
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
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
