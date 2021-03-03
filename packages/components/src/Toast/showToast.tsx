import React, {
  MutableRefObject,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { render } from "react-dom";
import { Toast, ToastProps, ToastRef } from "./Toast";
import styles from "./Toast.css";

export function showToast(props: ToastProps) {
  createDocumentToast(props);
}

function createDocumentToast(props: ToastProps) {
  const targetId = "atlantis-toast-element";
  let target = document.querySelector(`#${targetId}`);

  if (!target) {
    target = document.createElement("div");
    target.id = targetId;
    target.classList.add(styles.wrapper);
    document.body.appendChild(target);
  }

  render(<ToasterOven {...props} />, target);
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
