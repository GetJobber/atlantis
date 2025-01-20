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
<<<<<<< Updated upstream
=======
    codedExamples: [
      {
        code: `<Button type="primary" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Primary",
      },

      {
        code: `<Button type="secondary" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Secondary",
      },
      {
        code: `<Button type="tertiary" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Tertiary",
      },
      {
        code: `<Button variation="work" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Work",
      },
      {
        code: `<Button variation="learning" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Learning",
      },
      {
        code: `<Button variation="subtle" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Subtle",
      },
      {
        code: `<Button variation="destructive" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Destructive",
      },
      {
        code: `<Button variation="learning" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Learning",
      },
      {
        code: `<Button variation="subtle" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Subtle",
      },
      {
        code: `<Button variation="destructive" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Destructive",
      },
      {
        code: `<Button variation="learning" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Learning",
      },
      {
        code: `<Button variation="subtle" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Subtle",
      },
      {
        code: `<Button variation="destructive" label="Button!" onClick={() => alert('Button Clicked!')} />`,
        name: "Destructive",
      },
    ],
>>>>>>> Stashed changes
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
