import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";
import { typographyStyles } from "../Typography";

export const styles = StyleSheet.create({
  inputPaddingTop: {
    paddingTop: typographyStyles.smallSize.fontSize,
  },

  multiLineInput: {
    paddingTop: tokens["space-base"] - tokens["space-smallest"],
    paddingBottom: tokens["space-smaller"],
    lineHeight: typographyStyles.defaultSize.lineHeight,
  },

  multiLineInputWithMini: {
    paddingTop: tokens["space-large"],
  },

  multilineInputiOS: {
    // for placeholder
    paddingTop:
      (typographyStyles.smallSize.fontSize || 0) + tokens["space-smallest"],
  },
});
