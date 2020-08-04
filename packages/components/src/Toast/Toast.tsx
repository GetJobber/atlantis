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
  readonly variation?: "success" | "error";
  readonly message: string;
  readonly id?: number;
  onClose?(): void;
}

interface ActionToastProps extends BaseToastProps {
  action(): void;
  actionLabel: string;
}

type ToastProps = XOR<BaseToastProps, ActionToastProps>;
type ToastPropsInternal = Omit<ToastProps, "id">;

export interface ToastRef {
  add(props: ToastProps): void;
}

export const Toast = forwardRef(ToastInternal);

/**
 * Ignoring no-explicit-any as the ToastInternal takes no props, however
 * since it is used in a forwardRef, it needs the second param.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ToastInternal(_: any, ref: Ref<ToastRef>) {
  const [toastKey, setToastKey] = useState(0);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useImperativeHandle(ref, () => ({
    add: props => {
      setToastKey(toastKey + 1);
      const newToasts = [
        {
          ...props,
          id: toastKey,
        },
        ...toasts,
      ];
      setToasts(newToasts);
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

export function Slice({
  message,
  variation,
  onClose,
  action,
  actionLabel,
}: ToastPropsInternal) {
  const breadClass = classnames(styles.slice);
  const [visible, setVisible] = useState(true);
  const icon = getIcon();
  let timer: NodeJS.Timeout;

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onMouseEnter={() => stopTimer()}
          onMouseLeave={() => startTimer()}
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
              <Button
                label={`${actionLabel}`}
                onClick={action}
                type="tertiary"
              />
            )}

            <div className={styles.button}>
              <Button
                icon="remove"
                ariaLabel={"Hide Notification"}
                onClick={handleToastClose}
                type="tertiary"
                variation="cancel"
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
    switch (variation) {
      case "success":
        return { name: "checkmark", color: "green" };
      case "error":
        return { name: "alert", color: "red" };
      default:
        return { name: "knot", color: "lightBlue" };
    }
  }
}
