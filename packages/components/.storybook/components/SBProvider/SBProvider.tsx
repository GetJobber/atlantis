import React, { useEffect, type PropsWithChildren } from "react";
import { IntlProvider, IntlConfig } from "react-intl";
import { AtlantisThemeContextProvider, updateTheme, type Theme } from "@jobber/components/AtlantisThemeContext";
// @ts-expect-error Storybook needs a custom tsconfig to understand that vite can load *.module.css files.
import styles from "./SBProvider.module.css";

export function SBProvider({
  children,
  theme = "light",
}: PropsWithChildren<{
  theme: Theme
}>): JSX.Element {
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

  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return (
    <AtlantisThemeContextProvider>
      <div className={styles.storyWrapper}>
        <IntlProvider
          locale={clientLocale}
          messages={translationsForUsersLocale}
          onError={onIntlError}
        >
          {children}
        </IntlProvider>
      </div>
    </AtlantisThemeContextProvider>
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
