import { Button } from "@jobber/components";
import ButtonContent from "@atlantis/docs/components/Button/Button.stories.mdx";
import Props from "./Button.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ButtonContent />,
  props: Props,
  component: {
    element: Button,
    defaultProps: { label: "Button" },
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
