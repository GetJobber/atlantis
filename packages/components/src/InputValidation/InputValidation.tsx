import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Text } from "../Text";
import styles from "./InputValidation.css";

type ValidationStatus = "success" | "error" | "warn" | "info";

export interface ValidationProps {
  /**
   * Defines the status of the validation message. This also determines how the
   * message is styled in the UI.
   */
  status: ValidationStatus;

  /**
   * The message that gets shown to the user.
   */
  message: string;

  /**
   * Determines if the `message` shows up for the user.
   */
  shouldShow?: boolean;
}

interface InputValidationProps {
  /**
   * Array of validation messages
   */
  messages: ValidationProps[];
}

interface StatusMap {
  [key: string]: ValidationStatus;
}

export function InputValidation({ messages }: InputValidationProps) {
  const variationMap: StatusMap = {
    success: "success",
    error: "error",
    warn: "warn",
    info: "info",
  };

  const variants = {
    slideOut: { y: "5%", height: 0, opacity: 0 },
    slideIn: { y: 0, height: "100%", opacity: 1 },
  };

  return (
    <>
      {messages && messages.length > 0 && (
        <div className={styles.hasValidationMessage}>
          {messages.map(
            ({ status, message, shouldShow = true }: ValidationProps) => (
              <AnimatePresence initial={false} key={`${status}-${message}`}>
                {shouldShow && (
                  <motion.div
                    variants={variants}
                    initial="slideOut"
                    animate="slideIn"
                    exit="slideOut"
                    transition={{ duration: 0.2 }}
                  >
                    <Text variation={variationMap[status]}>{message}</Text>
                  </motion.div>
                )}
              </AnimatePresence>
            ),
          )}
        </div>
      )}
    </>
  );
}
