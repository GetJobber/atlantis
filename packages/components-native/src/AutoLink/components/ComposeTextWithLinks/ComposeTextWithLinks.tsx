import React from "react";
import { Platform } from "react-native";
import { ComposeTextWithLinksProps } from "../../types";
import { onLongPressLink, onPressLink } from "../../utils";
import { Link } from "../Link/Link";
import { Text } from "../../../Text";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

export function ComposeTextWithLinks({
  part,
  index,
  match,
  bottomTabsVisible,
  selectable = true,
}: ComposeTextWithLinksProps): JSX.Element {
  const { t } = useAtlantisI18n();

  const isLink = match?.getType();

  if (isLink) {
    return (
      <Link
        key={index}
        onPress={() => onPressLink(match)}
        onLongPress={() => {
          if (selectable && Platform.OS === "android") {
            return;
          }
          onLongPressLink(match, bottomTabsVisible, t);
        }}
      >
        {match.getAnchorText()}
      </Link>
    );
  }

  return <Text key={index}>{part}</Text>;
}
