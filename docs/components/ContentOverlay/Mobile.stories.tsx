import React, { useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { View } from "react-native";
import {
  Button,
  Content,
  ContentOverlay,
  ContentOverlayRef,
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
} as ComponentMeta<typeof ContentOverlay>;

const BasicTemplate: ComponentStory<typeof ContentOverlay> = args => {
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "Overlay Title",
  onClose: () => alert("Overlay Dismissed"),
  onOpen: () => alert("Overlay opened"),
  fullScreen: false,
};
