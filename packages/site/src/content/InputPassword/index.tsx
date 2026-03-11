import InputPasswordContent from "./InputPassword.stories.mdx";
import Props from "./InputPassword.props.json";
import MobileProps from "./InputPassword.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputPasswordContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<InputPassword placeholder={"Password Spot"} />`,
    mobileElement: `<InputPassword placeholder={"Password In"} />`,
  },
  title: "InputPassword",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputpassword--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputpassword--basic",
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
