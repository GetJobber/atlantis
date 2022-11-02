import { fontSizes, fonts } from "../typography";
import { radii } from "../radii";
import { colors } from "../colors";

export const prism = {
  plain: {
    fontFamily: fonts.monospace,
    color: colors.textSecondary,
    backgroundColor: colors.surfaceBackground,
    borderRadius: radii.base,
    lineHeight: "1.6",
    fontSize: fontSizes.base,
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: colors.disabled,
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: colors.pink,
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: colors.textSecondary,
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: colors.teal,
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: colors.lightBlue,
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: colors.red,
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "red",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: colors.indigo,
      },
    },
  ],
};
