import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ButtonGroup } from "@jobber/components-native";

const meta = {
  title: "Components/Actions/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
  subcomponents: {
    "ButtonGroup.PrimaryAction": ButtonGroup.PrimaryAction,
    "ButtonGroup.SecondaryAction": ButtonGroup.SecondaryAction,
  },
} satisfies Meta<typeof ButtonGroup>;
export default meta;

type ButtonGroupStory = StoryObj<
  Partial<React.ComponentProps<typeof ButtonGroup>>
>;
type PrimaryActionStory = StoryObj<
  React.ComponentProps<typeof ButtonGroup.PrimaryAction>
>;
type SecondaryActionStory = StoryObj<
  React.ComponentProps<typeof ButtonGroup.SecondaryAction>
>;

export const Basic: ButtonGroupStory = {
  render: args => (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <ButtonGroup {...args}>
          <ButtonGroup.PrimaryAction
            label={"Create"}
            icon={"plus"}
            onPress={() => console.log("create")}
          />
          <ButtonGroup.PrimaryAction
            label={"Edit"}
            icon={"edit"}
            onPress={() => console.log("edit")}
          />
          <ButtonGroup.SecondaryAction
            label={"Delete"}
            icon={"trash"}
            onPress={() => console.log("delete")}
          />
        </ButtonGroup>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  ),
  args: {},
};

export const Primary: PrimaryActionStory = {
  render: args => (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <ButtonGroup>
          <ButtonGroup.PrimaryAction {...args} />
          <ButtonGroup.SecondaryAction
            label={"Edit"}
            icon={"edit"}
            onPress={() => console.log("edit")}
          />
          <ButtonGroup.SecondaryAction
            label={"Delete"}
            icon={"trash"}
            onPress={() => console.log("delete")}
          />
        </ButtonGroup>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  ),
  args: {
    label: "Create",
    icon: "plus",
    onPress: () => console.log("create"),
  },
};

export const Secondary: SecondaryActionStory = {
  render: args => (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  ),
  args: {
    label: "Create",
    icon: "plus",
    onPress: () => console.log("create"),
  },
};
