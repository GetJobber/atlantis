import React from "react";
import { FormBannerMessage, FormBannerMessageType } from "../../types";
import { Banner, BannerTypes } from "../../../Banner";

interface FormMessageBannerProps {
  bannerMessages?: FormBannerMessage[];
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
