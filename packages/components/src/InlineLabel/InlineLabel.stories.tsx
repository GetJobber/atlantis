/* eslint-env node */
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { InlineLabel } from "./InlineLabel";

const stories = storiesOf("Components", module);

stories.add("InlineLabel", () => <InlineLabel>My Label</InlineLabel>, {
  info: { inline: true },
});
