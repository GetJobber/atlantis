/* eslint-disable import/export */
/* eslint-disable import/namespace */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/Playground/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/Playground/styles";

export const previewWrapper = {
  ...styles.previewWrapper,

  "& ~ span:last-child > div": {
    borderRadius: "0 4px 4px 0",
    backgroundColor: t => t.colors.playground.border,

    "::before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: "50%",
      left: "2px",
      transform: "translateY(-50%)",
      width: "2px",
      height: "50px",
      border: t => `solid 2px ${t.colors.background}`,
      borderRadius: "2px",
      borderColor: "transparent #fff",
    },
  },
};

export const editor = theme => ({
  ...styles.editor(theme),
  border: () => "none",
  backgroundColor: "var(--color-grey--lightest)",
});

export const previewInner = (content, showingCode) => {
  return {
    ...styles.previewInner(content, showingCode),
    borderRadius: "4px 4px 0 0",

    ":not(:first-child)": {
      borderTopWidth: 0,
      borderRadius: "0 0 4px 4px",
    },
  };
};

export const preview = {
  ...styles.preview,

  // Inset the preview to make room for the handle.
  paddingRight: "25px",
};

export const buttons = {
  ...styles.buttons,
  bottom: "-15px",
};

export const button = {
  ...styles.button,
  color: t => t.colors.text,
  borderRadius: "3px",
};
