import DataDumpContent from "./DataDump.stories.mdx";
import Props from "./DataDump.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <DataDumpContent />,
  props: Props,
  component: {
    element: `<DataDump data={{ name: "Bob" }}></DataDump>`,
  },
  title: "DataDump",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/story/components-utilities-datadump-web--basic`,
      ),
    },
  ],
} as const satisfies ContentExport;
