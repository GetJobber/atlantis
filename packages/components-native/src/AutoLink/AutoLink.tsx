import React from "react";
import { Text as RNText } from "react-native";
import type { AutoLinkProps } from "./types";
import { ComposeTextWithLinks } from "./components";
import { useCreateLinkedText } from "./hooks/useCreateLinkedText";
import { TypographyGestureDetector } from "../Typography";
import { useAtlantisTheme } from "../AtlantisThemeContext";

export function AutoLink({
  children: text = "",
  bottomTabsVisible = true,
  selectable = true,
  ...rest
}: AutoLinkProps): React.JSX.Element {
  const { splitText, matches } = useCreateLinkedText({ text, ...rest });
  const { tokens } = useAtlantisTheme();

  return (
    <TypographyGestureDetector>
      <RNText
        selectable={selectable}
        selectionColor={tokens["color-brand--highlight"]}
      >
        {splitText.map((part, index) => (
          <ComposeTextWithLinks
            key={index}
            part={part}
            index={index}
            match={matches[part]}
            bottomTabsVisible={bottomTabsVisible}
            selectable={selectable}
          />
        ))}
      </RNText>
    </TypographyGestureDetector>
  );
}
