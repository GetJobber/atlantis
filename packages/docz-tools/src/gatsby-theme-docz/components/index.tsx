/* eslint-disable react/display-name */
import React from "react";
// @ts-expect-error
import components from "gatsby-theme-docz/src/components";
// @ts-expect-error
import { Code } from "gatsby-theme-docz/src/components/Code";
// @ts-expect-error
import { Pre } from "gatsby-theme-docz/src/components/Pre";
import { Divider } from "@jobber/components/Divider";
import { Cell, Header, Table } from "@jobber/components/Table";
import { Image } from "./Image";
import { Tr } from "./Tr";
import * as headings from "./Headings";
import { Layout } from "./Layout";
import { Props } from "./Props";
import { Playground } from "./Playground";
import { Snack } from "./Snack";

// eslint-disable-next-line import/no-default-export
export default {
  ...components,
  ...headings,
  playground: Playground,
  props: Props,
  layout: Layout,
  code: (props: any) => {
    if (props.className === "language-SnacksRenderer") {
      return <Snack code={props.children} meta={props.metastring} />;
    }
    return <Code {...props} />;
  },
  pre: Pre,
  hr: Divider,
  table: Table,
  thead: Header,
  th: Cell,
  tr: Tr,
  td: Cell,
  img: Image,
};
