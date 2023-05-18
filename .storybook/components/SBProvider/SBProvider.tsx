import React, { PropsWithChildren } from "react";
import { IntlProvider, IntlConfig } from "react-intl";

export function SBProvider({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  /*
  For now, client's locale is hard coded to "en-US".
  This will change when we have a strategy for translating the app
  */
  const clientLocale = "en-US";

  /*
  For now, translationsForUsersLocale is an empty object. This means everything will fallback
  to "defaultMessage" defined in the messages.ts files.
  */
  const translationsForUsersLocale = {};

  return (
    <IntlProvider
      locale={clientLocale}
      messages={translationsForUsersLocale}
      onError={onIntlError}
    >
       {children}
    </IntlProvider>
  );

  /*
  Since we are not providing any translated messages yet
  we ignore the "MISSING_TRANSLATION" error types
  */
  function onIntlError(error: Parameters<Required<IntlConfig>["onError"]>[0]) {
    if (error.code === "MISSING_TRANSLATION") {
      return;
    }
    throw error;
  }
}
