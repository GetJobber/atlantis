import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Toast.css";
import { Icon, IconColorNames, IconNames } from "../Icon";
import { Button } from "../Button";

interface ToastProps {
  readonly message: string;
  readonly variation?: "success" | "warning" | "error";
  readonly id: number;
  onClose?(): void;
}

interface SliceProps extends ToastProps {
  onClose(): void;
}

interface ToastRef {
  add(props: ToastProps): void;
}

interface Icon {
  name: IconNames;
  color: IconColorNames;
}

export const Toast = forwardRef(ToastInternal);

function ToastInternal(_props: any, ref: Ref<ToastRef>) {
  const [toastKey, setToastKey] = useState(0);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

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
      {toasts.map(toast => (
        <Slice
          {...toast}
          key={toast.id}
          onClose={() => {
            toast.onClose && toast.onClose();
          }}
        />
      ))}
    </div>
  );
}

function Slice({ message, variation, onClose }: SliceProps) {
  const breadClass = classnames(styles.slice);
  const [visible, setVisible] = useState(true);
  const icon = getIcon();

  useEffect(() => {
    setTimeout(() => handleToastClose(), getTimeout());
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.8,
            height: 0,
            transition: { duration: 0.4 },
          }}
        >
          <div className={breadClass}>
            {icon && (
              <div className={styles.icon}>
                <Icon color={icon.color} name={icon.name} />
              </div>
            )}
            <div className={styles.message}>
              {message} {getTimeout()}
            </div>
            <div className={styles.button}>
              <Button
                icon="remove"
                ariaLabel={"Remove Toast"}
                onClick={handleToastClose}
                type="tertiary"
                variation="learning"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  function handleToastClose() {
    onClose && onClose();
    setVisible(false);
  }

  function getTimeout() {
    const min = 2000;
    const max = 5000;
    const time = message.length * 100;

    if (time < min) return min;
    if (time > max) return max;
    return time;
  }

  function getIcon() {
    // if (!variation) return undefined;

    switch (variation) {
      case "success":
        return { name: "checkmark", color: "green" };
      case "warning":
        return { name: "sun", color: "yellow" };
      case "error":
        return { name: "alert", color: "red" };
    }
  }
}
