import { DescriptionList } from "@jobber/components";
import Content from "@atlantis/docs/components/DescriptionList/DescriptionList.stories.mdx";
import Props from "./DescriptionList.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: DescriptionList,
    defaultProps: {},
  },
  title: "DescriptionList",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-DescriptionList-web--docs",
    },
  ],
} as const satisfies ContentExport;
