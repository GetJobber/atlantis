import { tokens } from "@jobber/design/foundation";
import { StyleSheet } from "react-native";
import { typographyStyles } from "../Typography/Typography.style";

const miniLabelFontSize = typographyStyles.smallSize.fontSize || 0;
const miniLabelPadding = tokens["space-small"];

export const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },

  inputPressableStyles: {
    paddingTop: miniLabelPadding + miniLabelFontSize,
    lineHeight: typographyStyles.defaultSize.lineHeight,
  },

  inputEmpty: {
    paddingTop: 0,
  },

  inputDisabled: {
    color: typographyStyles.disabled.color,
  },

  inputInvalid: {
    borderColor: tokens["color-critical"],
  },
});
