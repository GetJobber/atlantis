import FormatDateContent from "@atlantis/docs/components/FormatDate/FormatDate.stories.mdx";
import Props from "./FormatDate.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <FormatDateContent />,
  props: Props,
  component: {
    element: `<FormatDate date={new Date()} />`,
  },
  title: "FormatDate",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FormatDate-web--docs",
    },
  ],
} as const satisfies ContentExport;
