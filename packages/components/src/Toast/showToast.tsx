import React, {
  MutableRefObject,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { v4 } from "uuid";
// According to react, it's imported within the package
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
// eslint-disable-next-line import/no-internal-modules
import { Root, createRoot } from "react-dom/client";
import { Toast, ToastProps, ToastRef } from "./Toast";
import styles from "./Toast.css";

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
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useImperativeHandle(ref, () => ({
    add: props => {
      const id = props.id || v4();
      const dedupeToasts = toasts.filter(toast => {
        return toast.id !== id;
      });
      setToasts([
        {
          ...props,
          id,
        },
        ...dedupeToasts,
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
