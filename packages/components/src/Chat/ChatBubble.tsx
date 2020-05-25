import React from "react";
import classnames from "classnames";
import styles from "./ChatBubble.css";
import { Avatar, AvatarWithImageProps } from "../Avatar";
import { Text } from "../Text";

interface ChatBubbleProps {
  readonly direction: "inbound" | "outbound";
  readonly message: string;
  readonly sentDateTime?: string;
  readonly status?: "sent" | "failed";
  readonly avatar?: AvatarWithImageProps;
}

export function ChatBubble({
  direction,
  message,
  sentDateTime,
  status = "sent",
  avatar,
}: ChatBubbleProps) {
  const inbound = direction == "inbound";
  const container = classnames(
    inbound ? styles.inContainer : styles.outContainer,
  );

  return (
    <>
      <div className={container}>
        {avatar && (
          <Avatar imageUrl={avatar.imageUrl} initials={avatar.initials} />
        )}
        <div
          className={
            inbound ? styles.inboundChatBubble : styles.outboundChatBubble
          }
        >
          {message}
        </div>
      </div>
      <div className={container}>
        <Text variation={status == "failed" ? "error" : "success"}>
          {status}
        </Text>
      </div>

      {sentDateTime && (
        <div className={container}>
          <p>This is a date</p>
        </div>
      )}
    </>
  );
}
