// @ts-expect-error
import components from "gatsby-theme-docz/src/components";
// @ts-expect-error
import { Code } from "gatsby-theme-docz/src/components/Code";
// @ts-expect-error
import { Pre } from "gatsby-theme-docz/src/components/Pre";
import { Divider } from "@jobber/components/Divider";
import * as headings from "./Headings";
import { Layout } from "./Layout";
import { Props } from "./Props";
import { Playground } from "./Playground";

export default {
  ...components,
  ...headings,
  playground: Playground,
  props: Props,
  layout: Layout,
  code: Code,
  pre: Pre,
  hr: Divider,
};
