import Content from "@atlantis/docs/components/FormatFile/FormatFile.stories.mdx";
import Props from "./FormatFile.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<FormatFile
      file={{
        key: "abc",
        name: "myballisbigandroundIamrollingitontheground.png",
        type: "image/png",
        size: 213402324,
        progress: 1,
        src: () => {
          return Promise.resolve("https://picsum.photos/250");
        },
      }}
      display={"compact"}
      displaySize={"large"}
      onDelete={() => {
        return alert("Deleted");
      }}
    />`,
  },
  title: "FormatFile",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FormatFile-web--docs",
    },
  ],
} as const satisfies ContentExport;
