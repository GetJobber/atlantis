# InputValidation

# Input Validation

<Banner type="warning" dismissible={false}>
  90% of validation for inputs will be handled out-of-the-box by the{" "}
  <a href="../?path=/docs/components-forms-and-inputs-inputtext--docs#validation-message">
    input component&apos;s validation
  </a>
  . Check that you cannot use the built-in validation before using this component.
</Banner>

An InputValidation component is used to display validation messages for an
input.

## Design & usage guidelines

InputValidation allows you to show the validation messages in cases where an
[input's built-in validation](../?path=/docs/components-forms-and-inputs-inputtext--docs#validation-message)
is not available, such as in `inline` usage.

For more information about `validations` using any of the Input components, see
the
[InputText](../?path=/docs/components-forms-and-inputs-inputtext--docs#validation-message)
documentation.

## Web Component Code

```tsx
InputValidation Field Error Error Message Web React import React from "react";
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

```

## Props

### Web Props

| Prop      | Type      | Required | Default  | Description                        |
| --------- | --------- | -------- | -------- | ---------------------------------- |
| `message` | `string`  | ✅       | `_none_` | Validation message to be displayed |
| `visible` | `boolean` | ❌       | `true`   | _No description_                   |

## Categories

- Forms & Inputs

## Web Test Code

```typescript
InputValidation Field Error Error Message Web React Test Testing Jest import { render, screen } from "@testing-library/react";
import React from "react";
import { InputValidation } from ".";

describe("InputValidation", () => {
  it("renders the input validation messages", () => {
    render(<InputValidation message="I am an error" />);
    expect(screen.getByText("I am an error")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render the input validation messages when visible is false", () => {
    render(<InputValidation message="I am an error" visible={false} />);
    expect(screen.queryByText("I am an error")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

```

## Component Path

`/components/InputValidation`

---

_Generated on 2025-08-21T17:35:16.367Z_
