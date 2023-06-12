import React from "react";
import { render } from "@testing-library/react-native";
import { FormMessageBanner } from "./FormMessageBanner";
import { FormBannerMessageType } from "../../types";

const noticeMessage = {
  messageType: FormBannerMessageType.NoticeMessage,
  message: "Take note of this information.",
};

const warningMessage = {
  messageType: FormBannerMessageType.WarningMessage,
  message: "Caution is warranted in this case.",
};

describe("FormMessageBanner", () => {
  it.each([
    [FormBannerMessageType.NoticeMessage, noticeMessage],
    [FormBannerMessageType.WarningMessage, warningMessage],
  ])("should render a %s", async (_messageType, message) => {
    const { getByText } = render(
      <FormMessageBanner bannerMessages={[message]} />,
    );

    expect(getByText(message.message)).toBeDefined();
  });
});
