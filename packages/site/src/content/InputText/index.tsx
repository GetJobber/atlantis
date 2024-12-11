import Content from "@atlantis/docs/components/InputText/InputText.stories.mdx";
import Props from "./InputText.props.json";
import MobileProps from "./InputText.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<InputText name="age" placeholder="Age in words" />`,
    mobileElement: `<InputText name="age" placeholder="Age in words" />`,
  },
  title: "InputText",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-forms-and-inputs-inputtext--docs`,
    },
  ],
} as const satisfies ContentExport;
