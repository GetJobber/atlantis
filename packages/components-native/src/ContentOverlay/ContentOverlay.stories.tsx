import React, { useRef } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import type { ContentOverlayRef } from "@jobber/components-native";
import {
  Button,
  Content,
  ContentOverlay,
  Text,
} from "@jobber/components-native";

const meta = {
  title: "Components/Overlays/ContentOverlay",
  component: ContentOverlay,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof ContentOverlay>;
export default meta;

interface ContentOverlayStoryArgs {
  title: string;
  onClose?: React.ComponentProps<typeof ContentOverlay>["onClose"];
  onOpen?: React.ComponentProps<typeof ContentOverlay>["onOpen"];
  fullScreen?: boolean;
}

type Story = StoryObj<ContentOverlayStoryArgs>;

const BasicTemplate = (args: ContentOverlayStoryArgs) => {
  const contentOverlayRef = useRef<ContentOverlayRef>(null);

  return (
    <SafeAreaProvider>
      <Host>
        <View
          style={{
            width: 300,
          }}
        >
          <ContentOverlay
            title={args.title}
            onClose={args.onClose}
            onOpen={args.onOpen}
            fullScreen={args.fullScreen}
            ref={contentOverlayRef}
          >
            <Content>
              <Text>I am some text inside the ContentOverlay.</Text>
            </Content>
          </ContentOverlay>
          <View>
            <Button
              label="Open Overlay"
              onPress={() => contentOverlayRef.current?.open?.()}
            />
          </View>
        </View>
      </Host>
    </SafeAreaProvider>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    title: "Overlay Title",
    onClose: () => alert("Overlay Dismissed"),
    onOpen: () => alert("Overlay opened"),
    fullScreen: false,
  },
};
