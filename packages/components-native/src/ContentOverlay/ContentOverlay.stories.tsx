import React, { useRef } from "react";
import { View } from "react-native";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import type { ContentOverlayRef } from "@jobber/components-native";
import {
  Button,
  Content,
  ContentOverlay,
  Text,
} from "@jobber/components-native";

export default {
  title: "Components/Overlays/ContentOverlay/Mobile",
  component: ContentOverlay,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof ContentOverlay>;

const BasicTemplate: StoryFn<typeof ContentOverlay> = args => {
  const contentOverlayRef = useRef<ContentOverlayRef>(null);

  return (
    <View
      style={{
        width: 300,
      }}
    >
      <ContentOverlay {...args} ref={contentOverlayRef}>
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
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    title: "Overlay Title",
    onClose: () => console.log("Overlay Dismissed"),
    onOpen: () => console.log("Overlay opened"),
    fullScreen: false,
  },
};
