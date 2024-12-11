import DataDumpContent from "@atlantis/docs/components/DataDump/DataDump.stories.mdx";
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
      url: getStorybookUrl(`?path=/docs/components-utilities-datadump--docs`),
    },
  ],
} as const satisfies ContentExport;
