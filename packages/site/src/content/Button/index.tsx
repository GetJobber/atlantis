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
    element: `<Button label="Button!" onClick={() => alert('Button Clicked!')} ></Button>`,
    mobileElement: `<Button label="Button!" onPress={() => alert('Button Pressed!')} ></Button>`,
  },
  title: "Button",
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
