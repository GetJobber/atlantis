import Content from "./ContentOverlay.stories.mdx";
import MobileProps from "./ContentOverlay.props-mobile.json";
import Notes from "./ContentOverlayNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        `?path=/story/components-overlays-contentoverlay--basic`,
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
