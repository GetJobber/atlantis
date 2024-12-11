import ButtonContent from "@atlantis/docs/components/Button/Button.stories.mdx";
import Props from "./Button.props.json";
import MobileProps from "./Button.props-mobile.json";
import Notes from "./ButtonNotes.mdx";
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
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
