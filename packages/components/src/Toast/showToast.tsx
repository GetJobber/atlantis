import React, {
  MutableRefObject,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// According to react, it's imported within the package
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
// eslint-disable-next-line import/no-internal-modules
import { createRoot } from "react-dom/client";
import { Toast, ToastProps, ToastRef } from "./Toast";
import styles from "./Toast.css";

const targetId = "atlantis-toast-element";
let target =
  typeof document !== "undefined" && document.querySelector(`#${targetId}`);

if (!target) {
  target = typeof document !== "undefined" && document.createElement("div");

  if (target) {
    target.id = targetId;
    target.classList.add(styles.wrapper);
    document.body.appendChild(target);
  }
}

const root = target && createRoot(target);

export function showToast(props: ToastProps) {
  // Ensure target and body is still there when rendering the toast. This is due
  // to an issue with ReactDOM createRoot assuming document is always there and
  // Jest taking the document down.
  if (target && root && document.body.contains(target)) {
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
