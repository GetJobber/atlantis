import React, { ReactElement } from "react";
import styles from "./Chat.css";
import { InputText } from "../InputText";
import { Button } from "../Button";

interface ChatProps {
  readonly canReply?: boolean;
  scrollTopHandler?(): void;
  sendReplyHandler(): void;
  readonly children?: ReactElement | ReactElement[];
}

export function Chat({
  canReply = true,
  scrollTopHandler,
  children,
  sendReplyHandler,
}: ChatProps) {
  const childrenAsArray = React.Children.toArray(children);

  return (
    <>
      <ul
        className={styles.chat}
        onScroll={scrollTopHandler ? onScroll : undefined}
      >
        {childrenAsArray.reverse().map((bubble, index) => (
          <li key={index}>{bubble}</li>
        ))}
      </ul>
      {canReply && (
        <div>
          <InputText
            multiline={true}
            placeholder="Write a reply..."
            name="message"
          />
          <Button label="Send Text Message" onClick={sendReply} />
        </div>
      )}
    </>
  );

  function sendReply() {
    //TODO: add in loading animation
    sendReplyHandler();
  }

  function onScroll(event: React.UIEvent<HTMLUListElement>) {
    if (scrollTopHandler == undefined) {
      return;
    }

    const target = event.currentTarget;
    if (target.scrollTop === 0) {
      scrollTopHandler();
    }
  }
}
