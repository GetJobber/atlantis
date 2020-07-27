import React, {
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

interface ToastProps {
  message: string;
}

interface ToastRef {
  add(props: ToastProps): void;
}

export const Toast = forwardRef(ToastInternal);

function ToastInternal(_props: any, ref: Ref<ToastRef>) {
  const [toasts, setToasts] = useState<ReactNode[]>([]);

  useImperativeHandle(ref, () => ({
    add: ({ message }) => {
      setToasts([...toasts, <Slice key="hello" message={message} />]);
    },
  }));
  return <>{toasts}</>;
}

function Slice({ message }: ToastProps) {
  return <div>{message}</div>;
}
