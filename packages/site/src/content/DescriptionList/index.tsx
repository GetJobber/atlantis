import Content from "./DescriptionList.stories.mdx";
import Props from "./DescriptionList.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<DescriptionList
      data={[
        ["Issued", "2018-12-08"],
        ["Due", "2019-01-06"],
      ]}
    />`,
  },
  title: "DescriptionList",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-lists-and-tables-descriptionlist--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
