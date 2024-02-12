import React, { PropsWithChildren } from "react";
// We need this to add an underline on the tertiary buttons
// eslint-disable-next-line no-restricted-imports
import { Text as RNText } from "react-native";
import { styles } from "./ButtonLabelOverrides.styles";

interface ButtonLabelOverridesProps extends PropsWithChildren {
  readonly underlined?: boolean;
}

export function ButtonLabelOverrides({
  underlined,
  children,
}: ButtonLabelOverridesProps): JSX.Element {
  if (underlined) {
    return <RNText style={styles.underlined}>{children}</RNText>;
  }

  return <>{children}</>;
}
