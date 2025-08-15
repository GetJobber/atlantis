import React from "react";
import type { FormBannerMessage } from "../../types";
import { FormBannerMessageType } from "../../types";
import type { BannerTypes } from "../../../Banner";
import { Banner } from "../../../Banner";

interface FormMessageBannerProps {
  readonly bannerMessages?: FormBannerMessage[];
}

export function FormMessageBanner({
  bannerMessages,
}: FormMessageBannerProps): JSX.Element {
  return (
    <>
      {bannerMessages?.map((message, index) => (
        <Banner
          key={index}
          text={message.message}
          type={getBannerType(message.messageType)}
        />
      ))}
    </>
  );
}

function getBannerType(messageType: FormBannerMessageType): BannerTypes {
  switch (messageType) {
    case FormBannerMessageType.WarningMessage:
      return "warning";
    case FormBannerMessageType.NoticeMessage:
    default:
      return "notice";
  }
}
