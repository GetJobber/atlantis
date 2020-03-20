// eslint-disable-next-line
import themeStyles from "gatsby-theme-docz/src/theme/styles";

const styles = {
  ...themeStyles,
  Container: {
    ...themeStyles.Container,
    maxWidth: 960,
  },
  inlineCode: {
    color: "var(--color-grey--dark)",
    background: "var(--color-grey--lightest)",
    fontSize: 2,
    marginX: "2px",
    borderRadius: "radius",
    padding: "2px 5px",
  },
};

// eslint-disable-next-line import/no-default-export
export default styles;
