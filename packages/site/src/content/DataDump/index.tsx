import DataDumpContent, { toc } from "./DataDump.stories.mdx";
import Props from "./DataDump.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <DataDumpContent />,
  toc,
  props: Props,
  component: {
    element: `<DataDump data={{ name: "Bob" }}></DataDump>`,
  },
  title: "DataDump",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-utilities-datadump--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
