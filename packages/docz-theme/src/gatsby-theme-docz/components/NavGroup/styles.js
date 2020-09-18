/* eslint-disable import/export  */
import * as navigation from "@jobber/docz-theme/gatsby-theme-docz/theme/navigation";

export * from "gatsby-theme-docz/src/components/NavGroup/styles";

export const sublinkWrapper = {
  ml: 0,
  mt: 2,
  mb: 3,
};

export const sublink = {
  pl: 3,
};

export const title = {
  ...navigation.levelOne,
};

export const link = {
  ...navigation.levelTwo,

  "+ div": {
    pl: 4,
  },
};
