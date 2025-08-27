import AnimatedSwitcherContent from "./AnimatedSwitcher.stories.mdx";
import MobileProps from "./AnimatedSwitcher.props.json";
import Notes from "./AnimatedSwitcherNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AnimatedSwitcherContent />,
  mobileProps: MobileProps,
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
  notes: () => <Notes />,
} as const satisfies ContentExport;
