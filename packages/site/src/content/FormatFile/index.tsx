import Content, { toc } from "./FormatFile.stories.mdx";
import Props from "./FormatFile.props.json";
import MobileProps from "./FormatFile.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `const file = {
        key: "abc",
        name: "myballisbigandroundIamrollingitontheground.png",
        type: "image/png",
        size: 213402324,
        progress: 1,
        src: () => {
          return Promise.resolve("https://picsum.photos/250");
        },
      };

      return (
        <FormatFile
          file={file}
          display={"compact"}
          displaySize={"large"}
          onDelete={() => {
            return alert("Deleted");
          }}
        />
      );`,
    mobileElement: `<FormatFile
      file={{
        fileName: "image.png",
        contentType: "image/png",
        url: "https://picsum.photos/250",
        thumbnailUrl: "https://picsum.photos/250",
        fileSize: 1024,
      }}
    />`,
  },
  title: "FormatFile",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-images-and-icons-formatfile--expanded",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-images-and-icons-formatfile--image",
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
