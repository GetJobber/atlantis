import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { XOR } from "ts-xor";
import styles from "./Toast.css";
import { Icon, IconColorNames, IconNames } from "../Icon";
import { Button } from "../Button";

interface BaseToastProps {
  readonly message: string;
  readonly variation?: "success" | "warning" | "error";
  readonly id: number;
  onClose?(): void;
}

interface ActionToastProps extends BaseToastProps {
  action(): void;
  actionLabel: string;
}

type ToastProps = XOR<BaseToastProps, ActionToastProps>;

interface ToastRef {
  add(props: ToastProps): void;
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

interface Icon {
  name: IconNames;
  color: IconColorNames;
}

function Slice({
  message,
  variation,
  onClose,
  action,
  actionLabel,
}: ToastProps) {
  const breadClass = classnames(styles.slice);
  const [visible, setVisible] = useState(true);
  const icon = getIcon();
  let timer: NodeJS.Timeout;

  useEffect(() => startTimer(), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onHoverStart={() => stopTimer()}
          onHoverEnd={() => startTimer()}
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

            <div className={styles.message}>{message}</div>

            {action && (
              <div className={styles.action}>
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    action();
                  }}
                >
                  {actionLabel}
                </a>
              </div>
            )}

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

  function startTimer() {
    timer = setTimeout(() => handleToastClose(), getTimeout());
  }

  function stopTimer() {
    clearTimeout(timer);
  }

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

  function getIcon(): Icon | undefined {
    if (!variation) return undefined;

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
