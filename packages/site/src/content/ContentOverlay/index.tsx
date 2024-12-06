import Content from "@atlantis/docs/components/ContentOverlay/ContentOverlay.stories.mdx";
import MobileProps from "./ContentOverlay.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: ` const contentOverlayRef = useRef<ContentOverlayRef>(null);

    return (
    <Host>
    <ContentOverlay
        title={"Overlay Title"}
        onClose={function onClose() {
          return alert("Overlay Dismissed");
        }}
        onOpen={function onOpen() {
          return alert("Overlay opened");
        }}
        fullScreen={false}
        ref={contentOverlayRef}
      >
        <Content>
          <Text>I am some text inside the ContentOverlay.</Text>
        </Content>
      </ContentOverlay>
      </Host>
      )`,
  },
  title: "ContentOverlay",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ContentOverlay-web--docs",
    },
  ],
} as const satisfies ContentExport;
