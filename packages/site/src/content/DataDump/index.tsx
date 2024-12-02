import DataDumpContent from "@atlantis/docs/components/DataDump/DataDump.stories.mdx";
import Props from "./DataDump.props.json";
import { ContentExport } from "../../types/content";

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
      url: "http://localhost:6006/?path=/docs/components-utilities-DataDump-web--docs",
    },
  ],
} as const satisfies ContentExport;
