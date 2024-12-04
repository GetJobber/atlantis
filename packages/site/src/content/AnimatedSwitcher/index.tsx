import AnimatedSwitcherContent from "@atlantis/docs/components/AnimatedSwitcher/AnimatedSwitcher.stories.mdx";
import Props from "./AnimatedSwitcher.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AnimatedSwitcherContent />,
  props: Props,
  component: {
    element: `

  const [switched, setSwitched] = useState(undefined || false);

  return (
    <AnimatedSwitcher
      switched={switched}
      initialChild={
        <Button label="Mark complete" onClick={() => setSwitched(true)} />
      }
      switchTo={
        <Button
          icon="checkmark"
          label="Complete"
          type="secondary"
          onClick={() => setSwitched(false)}
        />
      }
    />
  )
`,
  },
  title: "AnimatedSwitcher",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-utilities-animatedswitcher--docs",
      ),
    },
  ],
} as const satisfies ContentExport;
