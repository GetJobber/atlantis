import Content from "@atlantis/docs/components/Gallery/Gallery.stories.mdx";
import Props from "./Gallery.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Gallery
      files={[
        {
          key: "abc",
          name: "myballisbigandroundIamrollingitontheground.png",
          type: "image/png",
          size: 213402324,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "def",
          name: "iamanimage.png",
          type: "image/png",
          size: 124525234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "efg",
          name: "upanddown.png",
          type: "image/png",
          size: 233411234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "jkl",
          name: "kramer.png",
          type: "image/png",
          size: 233411234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "mno",
          name: "boston.png",
          type: "image/png",
          size: 233411234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "pqr",
          name: "pizzaisgood.png",
          type: "image/png",
          size: 233411234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "pQ=",
          name: "avatar.png",
          type: "image/png",
          size: 233411234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "fGr",
          name: "whatevenisthat.png",
          type: "image/png",
          size: 233411234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
        {
          key: "AM=",
          name: "stairs.png",
          type: "image/png",
          size: 233411234,
          progress: 1,
          thumbnailSrc: "https://picsum.photos/250",
          src: "https://picsum.photos/550",
        },
      ]}
        />`,
  },
  title: "Gallery",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-images-and-icons-gallery--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
