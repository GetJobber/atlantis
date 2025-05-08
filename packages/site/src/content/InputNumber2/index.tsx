import InputNumber2Content from "@atlantis/docs/components/InputNumber2/InputNumber2.stories.mdx";
import Props from "./InputNumber2.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputNumber2Content />,
  props: Props,
  component: {
    element: `<InputNumber2 />`,
    defaultProps: {},
  },
  title: "InputNumber2",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-(section)-inputnumber2--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
