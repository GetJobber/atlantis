import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./InputValidation.css";
import { Text } from "../Text";

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

export function InputValidation({ messages }: InputValidationProps) {
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
                    <Text variation={status}>{message}</Text>
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
