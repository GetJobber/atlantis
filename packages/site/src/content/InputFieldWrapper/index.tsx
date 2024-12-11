import Content from "@atlantis/docs/components/InputFieldWrapper/InputFieldWrapper.stories.mdx";
import MobileProps from "./InputFieldWrapper.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<InputFieldWrapper
      placeholder={"Enter a value in cents"}
      prefix={{ icon: "invoice" }}
    />`,
  },
  title: "InputFieldWrapper",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-private-inputfieldwrapper--docs`,
    },
  ],
} as const satisfies ContentExport;
