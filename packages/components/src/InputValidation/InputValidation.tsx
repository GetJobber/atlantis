import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./InputValidation.module.css";
import { Text } from "../Text";
import { Icon } from "../Icon";

interface InputValidationProps {
  /**
   * Validation message to be displayed
   */
  readonly message: string;
  readonly visible?: boolean;
}

export function InputValidation({
  message,
  visible = true,
}: InputValidationProps) {
  const messages = [message];
  const variants = {
    slideOut: { y: "5%", opacity: 0 },
    slideIn: { y: 0, opacity: 1 },
  };

  if (!visible) return null;

  return (
    <>
      {messages && messages.length > 0 && (
        <AnimatePresence mode="wait">
          {messages.map(msg => (
            <motion.div
              key={`validation-${msg}`}
              variants={variants}
              initial="slideOut"
              animate="slideIn"
              exit="slideOut"
              transition={{ duration: 0.2 }}
            >
              <div
                className={styles.message}
                aria-live="assertive"
                role="alert"
                tabIndex={0}
              >
                <Icon name="alert" size="small" color="critical" />
                <Text size="small" variation="error">
                  {msg}
                </Text>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
}
