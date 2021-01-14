// @ts-expect-error
import components from "gatsby-theme-docz/src/components";
// @ts-expect-error
import { Playground } from "gatsby-theme-docz/src/components/Playground";
// @ts-expect-error
import { Code } from "gatsby-theme-docz/src/components/Code";
// @ts-expect-error
import { Pre } from "gatsby-theme-docz/src/components/Pre";
import { Divider } from "@jobber/components/Divider";
import * as headings from "./Headings";
import { Layout } from "./Layout";
import { Props } from "./Props";

export default {
  ...components,
  ...headings,
  playground: Playground,
  code: Code,
  pre: Pre,
  props: Props,
  layout: Layout,
  hr: Divider,
};
