import Content from "./ThumbnailList.stories.mdx";
import MobileProps from "./ThumbnailList.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: MobileProps,
  component: {
    mobileElement: `<ThumbnailList
      files={[
        {
          contentType: "image/png",
          fileName: "image.png",
          thumbnailUrl: "https://picsum.photos/250",
          url: "https://picsum.photos/250",
          fileSize: 1024,
        },
        {
          contentType: "image/png",
          fileName: "atlantis.png",
          thumbnailUrl: "https://picsum.photos/250",
          url: "https://picsum.photos/250",
          fileSize: 1024,
        },
        {
          contentType: "image/png",
          fileName: "components.png",
          thumbnailUrl: "https://picsum.photos/250",
          url: "https://picsum.photos/250",
          fileSize: 1024,
        },
        {
          contentType: "image/png",
          fileName: "storybook.png",
          thumbnailUrl: "https://picsum.photos/250",
          url: "https://picsum.photos/250",
          fileSize: 1024,
        },
        {
          contentType: "image/png",
          fileName: "storybook2.png",
          thumbnailUrl: "https://picsum.photos/250",
          url: "https://picsum.photos/250",
          fileSize: 1024,
        },
        {
          contentType: "image/png",
          fileName: "components2.png",
          thumbnailUrl: "https://picsum.photos/250",
          url: "https://picsum.photos/250",
          fileSize: 1024,
        },
      ]}
      rowCount={2}
    />`,
  },
  title: "ThumbnailList",
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-images-and-icons-thumbnaillist--basic",
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
