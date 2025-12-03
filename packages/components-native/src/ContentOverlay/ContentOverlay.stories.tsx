import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Button, Heading, Text } from "@jobber/components-native";
import { ContentOverlay } from "./ContentOverlay";
import type { ContentOverlayRef } from "./types";

const meta = {
  title: "Components/Overlays/ContentOverlay",
  component: ContentOverlay,
} satisfies Meta<typeof ContentOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = () => {
  const contentOverlayRef = useRef<ContentOverlayRef>(null);

  const openContentOverlay = () => {
    contentOverlayRef.current?.open?.();
  };

  const closeContentOverlay = () => {
    contentOverlayRef.current?.close?.();
  };

  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Heading>Basic ContentOverlay</Heading>
          <Text>
            Note that due to the differences between React Native Web and React
            Native, this does not render 100% properly
          </Text>
          <Button label="Open Content Overlay" onPress={openContentOverlay} />
          <Button label="Close Content Overlay" onPress={closeContentOverlay} />
        </View>
        <ContentOverlay
          ref={contentOverlayRef}
          title="Content Overlay Title"
          onClose={() => console.log("closed content overlay")}
          onOpen={() => console.log("opened content overlay")}
        >
          <View style={{ padding: 16 }}>
            <Text>This is the content inside the overlay.</Text>
          </View>
        </ContentOverlay>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {} as Story["args"],
};
