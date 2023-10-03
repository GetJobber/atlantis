import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { View } from "react-native";
import {
  BottomSheet,
  BottomSheetOption,
  BottomSheetRef,
  Button,
} from "@jobber/components-native";

export default {
  title: "Components/Selections/BottomSheet/Mobile",
  component: BottomSheet,
  subcomponents: { BottomSheetOption },
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as ComponentMeta<typeof BottomSheet>;

const BasicTemplate: ComponentStory<typeof BottomSheet> = args => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  return (
    <>
      <BottomSheet {...args} ref={bottomSheetRef}>
        <BottomSheetOption
          icon="sendMessage"
          iconColor="greyBlue"
          text="Send message"
          onPress={() => alert("send message")}
        />
        <BottomSheetOption
          icon="phone"
          iconColor="greyBlue"
          text="Call a friend"
          onPress={() => alert("Calling a friend")}
        />
        <BottomSheetOption
          destructive={true}
          icon="trash"
          text="Remove"
          onPress={() => alert("Removed")}
        />
      </BottomSheet>
      <View style={{ height: 320 }}>
        <Button
          label="Show BottomSheet"
          onPress={() => bottomSheetRef.current?.open()}
        />
      </View>
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  showCancel: true,
  heading: "What would you like to do?",
  onClose: () => alert("Overlay Dismissed"),
};
