import Content from "@atlantis/docs/components/DescriptionList/DescriptionList.stories.mdx";
import Props from "./DescriptionList.props.json";
import { ContentExport } from "../../types/content";

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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-lists-and-tables-descriptionlist--docs`,
    },
  ],
} as const satisfies ContentExport;
