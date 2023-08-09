import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroup } from "@jobber/components-native";

export default {
  title: "Components/Actions/ButtonGroup/Mobile/ButtonGroup.SecondaryAction",
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
  component: ButtonGroup.SecondaryAction,
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup.SecondaryAction> = args => (
  <ButtonGroup
    bottomSheetHeading="What would you like to do"
    showCancelInBottomSheet={true}
  >
    <ButtonGroup.PrimaryAction
      label={"Click that ellipsis >>>"}
      buttonType={"secondary"}
      onPress={() => alert("No, not me. The ellipsis!")}
    />
    <ButtonGroup.SecondaryAction {...args} />
  </ButtonGroup>
);

export const Primary = Template.bind({});
Primary.storyName = "ButtonGroup.SecondaryAction";
Primary.args = {
  label: "Create",
  icon: "plus",
  onPress: () => console.log("create"),
};
