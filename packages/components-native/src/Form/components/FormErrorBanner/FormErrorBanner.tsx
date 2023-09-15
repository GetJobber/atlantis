import React from "react";
import { FormBannerErrors } from "../../types";
import { Banner } from "../../../Banner";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

export function FormErrorBanner({
  networkError,
  bannerError,
}: FormBannerErrors): JSX.Element {
  const { t } = useAtlantisI18n();

  if (networkError) {
    return <Banner type={"error"}>{t("errors.couldNotSave")}</Banner>;
  } else if (bannerError) {
    return (
      <Banner
        text={bannerError.title}
        details={bannerError.messages}
        type={"error"}
      />
    );
  }

  return <></>;
}
