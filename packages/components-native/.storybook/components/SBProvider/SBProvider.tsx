import React, { useEffect, type PropsWithChildren } from "react";
import { IntlProvider, IntlConfig } from "react-intl";
import { AtlantisThemeContextProvider, Theme,useAtlantisTheme } from "@jobber/components-native";
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

  return (
    <AtlantisThemeContextProvider>
      <StoryWrapper theme={theme}>
        <IntlProvider
          locale={clientLocale}
          messages={translationsForUsersLocale}
          onError={onIntlError}
        >
          {children}
        </IntlProvider>
      </StoryWrapper>
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

function StoryWrapper({ theme, children }: PropsWithChildren<{theme: Theme}>) {
  const { tokens, setTheme } = useAtlantisTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className={styles.storyWrapper} style={{ backgroundColor: tokens["color-surface"] }}>
      {children}
    </div>
  );
}
