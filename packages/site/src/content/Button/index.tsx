import { Button as WebButton } from "@jobber/components";
import { Button as MobileButton } from "@jobber/components-native";
import ButtonContent from "@atlantis/docs/components/Button/Button.stories.mdx";
import Props from "./Button.props.json";
import MobileProps from "./Button.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ButtonContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: WebButton,
    mobileElement: MobileButton,
    defaultProps: { label: "Button", children: "Button2" },
  },
  title: "Button",
  description:
    "Buttons are a core user interface component, as they allow users to initiate, complete, and reverse actions.",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-actions-button--docs"),
    },
    {
      label: "Web - Basic",
      url: getStorybookUrl("?path=/story/components-actions-button-web--basic"),
    },

    {
      label: "Mobile - Basic",
      url: getStorybookUrl(
        "?path=/story/components-actions-button-mobile--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
