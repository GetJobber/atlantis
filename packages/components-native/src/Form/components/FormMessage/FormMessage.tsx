import React, { useCallback, useState } from "react";
import { InternalFormMessage } from "./components/InternalFormMessage";
import { EmptyStateProps } from "../../../EmptyState";

type FormMessageData = EmptyStateProps;

let open: ((messageData: FormMessageData) => void) | undefined;
let close: (() => void) | undefined;

/**
 * Show a message that takes over the whole screen to the user. This provides a
 * more urgent feedback when the user does an action that requires attention
 * their full attention.
 *
 * By default, rendering `<FormMessage />` on a screen won't show any messages
 * because it's only a container. Use `FormMessage.open(...)`. to show a
 * message to the user. Use `FormMessage.close()` to close the most
 * recent message.
 */
export const FormMessage = (): JSX.Element => {
  const [data, setData] = useState<FormMessageData[]>([]);

  open = useCallback(
    (messageData: FormMessageData) => {
      setData([...data, messageData]);
    },
    [data],
  );

  close = useCallback(() => {
    const newValue = data.slice(0, -1);
    setData(newValue);
  }, [data]);

  if (data.length === 0) {
    return <></>;
  }

  const lastMessage = data[data.length - 1];
  return <InternalFormMessage data={lastMessage} onRequestClose={close} />;
};

FormMessage.show = (messageData: FormMessageData) => {
  if (open) {
    open(messageData);
  } else {
    warnOnUndefinedFunctions("show");
  }
};

FormMessage.close = () => {
  if (close) {
    close();
  } else {
    warnOnUndefinedFunctions("close");
  }
};

function warnOnUndefinedFunctions(method: string) {
  console.warn(
    `Could not ${method} "FormMessage". Either you're calling this method before the component mounts or you're using this without the "<Form />" component. If you're using "FormMessage" without the "Form", include "<FormMessage />" on your component to start using it.`,
  );
}
