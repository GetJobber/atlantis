import themeStyles from "gatsby-theme-docz/src/theme/styles";
import { merge } from "lodash/fp";

// eslint-disable-next-line import/no-default-export
export default merge(themeStyles.default, {
  Container: {
    maxWidth: 300,
  },
  a: {
    color: "rgb(239, 87, 51)",
  },
  inlineCode: {
    background: "blue",
    color: "white",
  },
});
