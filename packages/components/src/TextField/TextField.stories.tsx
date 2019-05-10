/* eslint-env node */
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { TextField } from "./TextField";

const stories = storiesOf("Components", module);

stories.add("TextField", () => <TextField placeholder="Normal input" />, {
  info: { inline: true },
});
