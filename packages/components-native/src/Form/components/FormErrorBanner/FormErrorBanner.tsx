import React from "react";
import { useIntl } from "react-intl";
import { messages } from "./messages";
import { FormBannerErrors } from "../../types";
import { useAtlantisContext } from "../../../AtlantisContext";
import { Banner } from "../../../Banner";

export function FormErrorBanner({
  networkError,
  bannerError,
}: FormBannerErrors): JSX.Element {
  const { formatMessage } = useIntl();
  const { isOnline } = useAtlantisContext();

  if (!isOnline) {
    return (
      <Banner text={formatMessage(messages.offlineError)} type={"error"} />
    );
  } else if (networkError) {
    return (
      <Banner text={formatMessage(messages.networkError)} type={"error"} />
    );
  } else if (bannerError) {
    return (
      <Banner
        text={bannerError.title}
        details={bannerError.messages}
        type={"error"}
      />
    );
  } else {
    return <></>;
  }
}
