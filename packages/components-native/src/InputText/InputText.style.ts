import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";
import { typographyStyles } from "../Typography";

export const styles = StyleSheet.create({
  inputPaddingTop: {
    paddingTop:
      (typographyStyles.smallSize.fontSize || 0) +
      tokens["space-smaller"] +
      tokens["space-smallest"],
  },

  multiLineInput: {
    paddingTop: 0,
    lineHeight: typographyStyles.defaultSize.lineHeight,
  },

  multiLineInputWithMini: {
    paddingTop: tokens["space-large"] + tokens["space-smallest"],
    paddingBottom: tokens["space-smaller"] + tokens["space-smallest"],
  },

  multilineInputiOS: {
    // for placeholder
    paddingTop:
      (typographyStyles.defaultSize.fontSize || 0) + tokens["space-smallest"],
  },
});
