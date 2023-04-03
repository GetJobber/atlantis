import React from "react";
import { ComponentStory } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export const Basic: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button label="Hiya" {...args} />
);

export default {
  title: "Components/Button/Mobile",
  component: Button,
};
