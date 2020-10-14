import themeStyles from "gatsby-theme-docz/src/theme/index";
import { merge } from "lodash/fp";
import jobberStyles from "@jobber/docz-theme/theme/index";
// eslint-disable-next-line import/no-default-export
export default merge({ ...themeStyles, colors: {} }, jobberStyles);
