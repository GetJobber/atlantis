import Content from "@atlantis/docs/components/InputCurrency/InputCurrency.stories.mdx";
import MobileProps from "./InputCurrency.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<InputCurrency placeholder="Unit Price" />`,
  },
  title: "InputCurrency",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputcurrency--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
