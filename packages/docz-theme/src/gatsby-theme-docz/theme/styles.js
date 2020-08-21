import themeStyles from "gatsby-theme-docz/src/theme/styles";
import { merge } from "lodash/fp";

// eslint-disable-next-line import/no-default-export
export default merge(themeStyles.default, {
  Container: {
    maxWidth: 960,
  },
  a: {
    color: "green",
  },
});
