import Content from "@atlantis/docs/components/ContentOverlay/ContentOverlay.stories.mdx";
import MobileProps from "./ContentOverlay.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `const contentOverlayRef = useRef<ContentOverlayRef>(null);

  return (
    <View
      style={{
        width: 300,
      }}
    >
      <ContentOverlay
        title={"Overlay Title"}
        onClose={() => {
          return alert("Overlay Dismissed");
        }}
        onOpen={() => {
          return alert("Overlay opened");
        }}
        fullScreen={false}
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
    </View>)`,
  },
  title: "ContentOverlay",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ContentOverlay-web--docs",
    },
  ],
} as const satisfies ContentExport;
