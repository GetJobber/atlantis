import React from "react";
import { Divider } from "../../Divider";
import { BaseElementProps } from "../BaseElementProps";

interface HorizontalRuleProps extends BaseElementProps, Record<string, any> {}

export function HorizontalRule({ node, ...props }: HorizontalRuleProps) {
  return <Divider {...props} />;
}
