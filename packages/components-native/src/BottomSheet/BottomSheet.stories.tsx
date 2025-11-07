import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Heading, Text } from "@jobber/components-native";
import { BottomSheet } from "./BottomSheet";
import type { BottomSheetRef } from "./BottomSheet";
import { BottomSheetOption } from "./components/BottomSheetOption";

const meta = {
  title: "Components/Selections/BottomSheet",
  component: BottomSheet,
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaProvider>
      <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Heading>Basic BottomSheet</Heading>
        <Text>
          Note that due to the differences between React Native Web and React
          Native, this does not render 100% properly
        </Text>
        <Button label="Open Bottom Sheet" onPress={openBottomSheet} />
        <Button label="Close Bottom Sheet" onPress={closeBottomSheet} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => console.log("closed bottom sheet")}
        onOpen={() => console.log("opened bottom sheet")}
      >
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
    </SafeAreaProvider>
  );
};

const HeaderFooterInputTextTemplate = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaProvider>
      <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Heading>Basic BottomSheet</Heading>
        <Text>
          Note that due to the differences between React Native Web and React
          Native, this does not render 100% properly
        </Text>
        <Button label="Open Bottom Sheet" onPress={openBottomSheet} />
        <Button label="Close Bottom Sheet" onPress={closeBottomSheet} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        showCancel={true}
        heading="BottomSheet Header"
        onClose={() => console.log("closed bottom sheet")}
        onOpen={() => console.log("opened bottom sheet")}
      >
        <BottomSheetOption
          icon="sendMessage"
          iconColor="greyBlue"
          text="Send message"
          onPress={() => alert("send message")}
        />
        <BottomSheet.InputText placeholder="Enter your name" />
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
    </SafeAreaProvider>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {} as Story["args"],
};

export const HeaderFooterInputText: Story = {
  render: HeaderFooterInputTextTemplate,
  args: {} as Story["args"],
};
