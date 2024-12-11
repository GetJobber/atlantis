import Content from "@atlantis/docs/components/InputCurrency/InputCurrency.stories.mdx";
import MobileProps from "./InputCurrency.props-mobile.json";
import { ContentExport } from "../../types/content";

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
      url: "http://localhost:6006/?path=/docs/components-utilities-InputCurrency-web--docs",
    },
  ],
} as const satisfies ContentExport;
