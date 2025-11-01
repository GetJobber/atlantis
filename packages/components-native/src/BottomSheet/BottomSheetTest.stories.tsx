import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Text, View } from "react-native";
import { Button } from "@jobber/components-native";
import { BottomSheetRebuilt } from "./BottomSheet.rebuilt";
import type { BottomSheetRebuiltRef } from "./BottomSheet.rebuilt";
import { BottomSheetOption } from "./components/BottomSheetOption";

const meta = {
  title: "Components/Selections/BottomSheet/Test",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TestTemplate = () => {
  const bottomSheetRef = useRef<BottomSheetRebuiltRef>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button label="Open Bottom Sheet" onPress={openBottomSheet} />
      <Button label="Close Bottom Sheet" onPress={closeBottomSheet} />
      <Text>Test BottomSheetRebuilt Component</Text>

      <BottomSheetRebuilt ref={bottomSheetRef}>
        <BottomSheetOption
          icon="request"
          text="Request"
          onPress={() => console.log("pressed request")}
        />
        <BottomSheetOption
          icon="quote"
          text="Quote"
          onPress={() => console.log("pressed quote")}
        />
        <BottomSheetOption
          icon="job"
          text="Job"
          onPress={() => console.log("pressed job")}
        />
      </BottomSheetRebuilt>
    </View>
  );
};

export const BasicTest: Story = {
  render: TestTemplate,
};
