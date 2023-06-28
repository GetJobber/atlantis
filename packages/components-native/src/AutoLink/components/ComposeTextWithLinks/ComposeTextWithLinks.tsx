import React from "react";
import { useIntl } from "react-intl";
import { Platform } from "react-native";
import { ComposeTextWithLinksProps } from "../../types";
import { onLongPressLink, onPressLink } from "../../utils";
import { Link } from "../Link/Link";
import { Text } from "../../../Text";

export function ComposeTextWithLinks({
  part,
  index,
  match,
  bottomTabsVisible,
  selectable = true,
}: ComposeTextWithLinksProps): JSX.Element {
  const { formatMessage } = useIntl();

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
          onLongPressLink(match, bottomTabsVisible, formatMessage);
        }}
      >
        {match.getAnchorText()}
      </Link>
    );
  }

  return <Text key={index}>{part}</Text>;
}
