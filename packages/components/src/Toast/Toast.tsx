import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XOR } from "ts-xor";
import styles from "./Toast.css";
import { Icon, IconColorNames, IconNames } from "../Icon";
import { Button } from "../Button";
import { Typography } from "../Typography";

interface BaseToastProps {
  readonly variation?: "info" | "success" | "error";
  readonly message: string;
  readonly id?: number;
}

interface ActionToastProps extends BaseToastProps {
  /**
   * **Deprecated**: action will be removed in the next major version
   * @deprecated
   */
  action(): void;

  /**
   * **Deprecated**: actionLabel will be removed in the next major version
   * @deprecated
   */
  actionLabel: string;
}

export type ToastProps = XOR<BaseToastProps, ActionToastProps>;
type ToastPropsInternal = Omit<ToastProps, "id">;

export interface ToastRef {
  add(props: ToastProps): void;
}

interface Icon {
  name: IconNames;
  color: IconColorNames;
}

export function Toast({
  message,
  variation = "success",
  action,
  actionLabel,
}: ToastPropsInternal) {
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
          onMouseEnter={() => stopTimer()}
          onMouseLeave={() => startTimer()}
          exit={{
            opacity: 0,
            scale: 0.8,
            height: 0,
            transition: { duration: 0.4 },
          }}
        >
          <div className={styles.slice}>
            <div className={styles.icon}>
              <Icon color={icon.color} name={icon.name} />
            </div>

            <Typography element="span" size="large">
              {message}
            </Typography>

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
                variation="subtle"
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
    setVisible(false);
  }

  function getTimeout() {
    const min = 5000;
    const max = 10000;
    const time = message.length * 200;

    if (time < min) return min;
    if (time > max) return max;
    return time;
  }

  function getIcon(): Icon {
    switch (variation) {
      case "info":
        return { name: "knot", color: "lightBlue" };
      case "error":
        return { name: "alert", color: "red" };
      default:
        return { name: "checkmark", color: "green" };
    }
  }
}
