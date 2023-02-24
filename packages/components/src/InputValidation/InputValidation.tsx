import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./InputValidation.css";
import { Text } from "../Text";

interface InputValidationProps {
  /**
   * Validation message to be displayed
   */
  message: string;
}

export function InputValidation({ message }: InputValidationProps) {
  const messages = [message];
  const variants = {
    slideOut: { y: "5%", height: 0, opacity: 0 },
    slideIn: { y: 0, height: "100%", opacity: 1 },
  };

  return (
    <>
      {messages && messages.length > 0 && (
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={`validation-${msg}`}
              variants={variants}
              initial="slideOut"
              animate="slideIn"
              exit="slideOut"
              transition={{ duration: 2 }}
            >
              <div
                className={styles.message}
                aria-live="assertive"
                role="alert"
                tabIndex={0}
              >
                <Text variation="error">{msg}</Text>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
}
