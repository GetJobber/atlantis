# Toast

# Toast

Toasts are short, temporary messages used to inform users that a process was
performed. They provide visual feedback on the outcome of an action and require
minimal user interaction.

Toast, unlike common React components, is not a component that will be added to
your view. Instead, Toast is used by importing and calling the `showToast()`
function.

## Design & usage guidelines

Use `Toast` to present non-blocking feedback about the system to a user.

### Related components

For more persistent feedback (such as displaying errors), communicating a
background process that is ongoing, or for feedback that has a longer reading
length or CTA, use [Banner.](/components/Banner)

### Variation (Web only)

The primary use case for Toast is success messages.

In some cases, an informational Toast may be used to inform the user of some
background system activity. See
[Web/Info example](../?path=/story/components-status-and-feedback-toast-web--variation)

### Errors

> Do not use Toast for errors. This is currently an available variation, but
> should be considered deprecated and not propagated.

Use [Banner](/components/Banner) and, where necessary, targeted error messaging
(such as [InputValidation](/components/InputValidation)) so that the user can
appropriately assess and recover from the error.

## Content guidelines

The Toast label should be clear and concise, and should not take up more than
one line.

Use the pattern "action + subject" to maintain
[active voice](/content/voice-and-tone). The subject should be specific without
overloading too much detail for the user to parse at a quick glance.

| ✅ Do             | ❌ Don't                                           |
| ----------------- | -------------------------------------------------- |
| Saved job         | Saved job #216 - Weekly mowing for Nathaniel Lewis |
| Archived property | Archived 289 NW 198th St, Shoreline, WA 98177, USA |

- No need to use "Successfully", should be implicit in the Toast
- Don't use `Dismiss` or `Cancel` as an action label
  - Examples of action labels: `Undo`, `View`, `Refresh`
- Toast's label does not require a period
- Use sentence case, and only capitalize
  ["branded"](/content/product-vocabulary) Jobber features

| ✅ Do      | ❌ Don't                |
| ---------- | ----------------------- |
| Saved job  | Saved Job Successfully. |
| Sent quote | Sent Quote              |

## Web Component Code

```tsx
Toast Alert Notification Flash Snackbar Message Web React import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { XOR } from "ts-xor";
import styles from "./Toast.module.css";
import type { IconColorNames, IconNames } from "../Icon";
import { Icon } from "../Icon";
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
            <Icon color={icon.color} name={icon.name} />

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
import type { MutableRefObject, Ref } from "react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// According to react, it's imported within the package
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import type { ToastProps, ToastRef } from "./Toast";
import { Toast } from "./Toast";
import styles from "./Toast.module.css";

const targetId = "atlantis-toast-element";
let root: Root | undefined;

export function showToast(props: ToastProps) {
  // Ensure target and body is still there when rendering the toast. This is due
  // to an issue with ReactDOM createRoot assuming document is always there and
  // Jest taking the document down.
  if (!globalThis.document) return;
  let target = globalThis.document.querySelector(`#${targetId}`);

  if (!target) {
    target = globalThis.document.createElement("div");
    target.id = targetId;
    target.classList.add(styles.wrapper);
    globalThis.document.body.appendChild(target);
  }

  if (target && !root) {
    root = createRoot(target);
  }

  if (root && target && globalThis.document.body.contains(target)) {
    root.render(<ToasterOven {...props} />);
  }
}

const ToastContainer = forwardRef(ToastInternal);

function ToasterOven(props: ToastProps) {
  const toastRef = useRef() as MutableRefObject<ToastRef>;
  useEffect(() => toastRef.current.add(props));

  return <ToastContainer ref={toastRef} />;
}

function ToastInternal(_: unknown, ref: Ref<ToastRef>) {
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
        <Toast {...toast} key={toast.id} />
      ))}
    </div>
  );
}

```

## Props

### Web Props

| Prop          | Type         | Required  | Default  | Description                                                           |
| ------------- | ------------ | --------- | -------- | --------------------------------------------------------------------- | --------- | ---------------- |
| `variation`   | `"info"      | "success" | "error"` | ❌                                                                    | `success` | _No description_ |
| `message`     | `string`     | ✅        | `_none_` | _No description_                                                      |
| `action`      | `() => void` | ❌        | `_none_` | **Deprecated**: action will be removed in the next major version      |
| @deprecated   |
| `actionLabel` | `string`     | ❌        | `_none_` | **Deprecated**: actionLabel will be removed in the next major version |
| @deprecated   |

### Mobile Props

| Prop                                           | Type     | Required | Default | Description                                 |
| ---------------------------------------------- | -------- | -------- | ------- | ------------------------------------------- |
| `bottomOffset`                                 | `number` | ❌       | `40`    | Offset from the bottom of the screen in px. |
| Has effect only when the position is "bottom". |

## Categories

- Status & Feedback

## Web Test Code

```typescript
Toast Alert Notification Flash Snackbar Message Web React Test Testing Jest import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { showToast } from ".";

jest.mock("framer-motion", () => ({
  motion: {
    div: require("react").forwardRef(({ children, ...rest }, ref) => (
      <div {...rest} ref={ref}>
        {children}
      </div>
    )),
  },
  AnimatePresence: jest
    .fn()
    .mockImplementation(({ children }) => <>{children}</>),
  default: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  act(() => jest.runOnlyPendingTimers());
  jest.useRealTimers();
});

const successMessage =
  "Successful Message that should last the full 5 seconds, it just needs to be 50 characters long";
const infoMessage = "Bland Toast";
const errorMessage = "Errorful should last inbetween min-max";

it("creates exactly one toasts target div", () => {
  const { getByText, getAllByText } = render(<MockToast />);
  fireEvent.click(getByText("Success"));

  expect(document.querySelector("#atlantis-toast-element")).toBeInTheDocument();

  fireEvent.click(getByText("Success"));
  expect(getAllByText(successMessage)).toHaveLength(2);

  expect(document.querySelectorAll("#atlantis-toast-element")).toHaveLength(1);
});

it("renders a Slice of Toast when the 'showToast' method is called", () => {
  const { getByText, queryByText } = render(<MockToast />);
  expect(queryByText(successMessage)).not.toBeInTheDocument();

  fireEvent.click(getByText("Success"));
  expect(getByText(successMessage)).toBeInTheDocument();
});

it("shows a the checkmark icon for success toast", () => {
  const { getByText, getByTestId } = render(<MockToast />);
  fireEvent.click(getByText("Success"));
  expect(getByTestId("checkmark")).toBeInstanceOf(SVGElement);
});

it("renders an knot icon variation: 'info' is set", () => {
  const { getByText, getByTestId } = render(<MockToast />);
  fireEvent.click(getByText("No Variation"));
  expect(getByTestId("knot")).toBeInstanceOf(SVGElement);
});

it("renders an alert icon variation: 'error' is set", () => {
  const { getByText, getByTestId } = render(<MockToast />);
  fireEvent.click(getByText("Error"));
  expect(getByTestId("alert")).toBeInstanceOf(SVGElement);
});

it("fires an action callback when the action button is clicked", () => {
  const mockAction = jest.fn();
  const { getByText } = render(<MockToast mockAction={mockAction} />);

  fireEvent.click(getByText("No Variation"));
  fireEvent.click(getByText("Do The Action"));
  expect(mockAction).toHaveBeenCalledTimes(1);
});

it("sets a timer and clears the Slice after a certain amount of time", async () => {
  const { getByText, queryAllByText, findAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(await findAllByText(infoMessage)).toHaveLength(1);

  act(() => {
    jest.runAllTimers();
  });

  await waitFor(() => {
    expect(queryAllByText("Bland Toast").length).toBe(0);
  });
});

it("stops and starts the timer when the item is hover toggled", async () => {
  const { getByText, queryAllByText } = render(<MockToast />);

  fireEvent.click(getByText("No Variation"));
  expect(setTimeout).toHaveBeenCalled();
  expect(queryAllByText("Bland Toast").length).toBe(1);

  fireEvent.mouseEnter(getByText("Bland Toast"));

  act(() => {
    jest.advanceTimersByTime(10000);
  });

  expect(queryAllByText("Bland Toast")).toHaveLength(1);

  fireEvent.mouseLeave(getByText("Bland Toast"));

  act(() => {
    jest.advanceTimersByTime(10000);
  });

  await waitFor(() => {
    expect(queryAllByText("Bland Toast")).toHaveLength(0);
  });
});

/**
 * Mocks out an example of Toast for usage in tests
 */
interface MockToastProps {
  mockAction?(): void;
}

const MockToast = ({ mockAction }: MockToastProps) => {
  const buttons = [
    {
      label: "No Variation",
      onClick: () => {
        showToast({
          message: infoMessage,
          variation: "info",
          actionLabel: "Do The Action",
          action: () => mockAction && mockAction(),
        });
      },
    },
    {
      label: "Success",
      onClick: () => {
        showToast({
          message: successMessage,
        });
      },
    },
    {
      label: "Error",
      onClick: () => {
        showToast({
          message: errorMessage,
          variation: "error",
        });
      },
    },
  ];

  return (
    <>
      {buttons.map(({ label, onClick }) => (
        <button key={label} onClick={onClick}>
          {label}
        </button>
      ))}
    </>
  );
};

```

## Component Path

`/components/Toast`

---

_Generated on 2025-08-21T17:35:16.373Z_
