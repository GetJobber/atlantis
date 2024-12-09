import Content from "@atlantis/docs/components/ThumbnailList/ThumbnailList.stories.mdx";
import MobileProps from "./ThumbnailList.props-mobile.json";
import { ContentExport } from "../../types/content";

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
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-ThumbnailList-web--docs`,
    },
  ],
} as const satisfies ContentExport;
