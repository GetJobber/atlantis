import AnimatedPresenceContent from "@atlantis/docs/components/AnimatedPresence/AnimatedPresence.stories.mdx";
import Props from "./AnimatedPresence.props.json";
import Notes from "./AnimatedPresenceNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AnimatedPresenceContent />,
  props: Props,
  component: {
    element: `const [switched, setSwitched] = useState(false);
  return (
    <Content>
      <Button
        label={switched ? "Switched" : "Initial"}
        onClick={() => setSwitched(!switched)}
      />
      <AnimatedPresence {...props}>
        {switched && (
          <Content>
            <Flex template={["grow", "shrink"]}>
              <Text>Additional Content!</Text>
              <Text>Additional Content 2!</Text>
            </Flex>
          </Content>
        )}
        {switched && (
          <Content>
            <Flex template={["grow", "shrink"]}>
              <Text>Additional Content!</Text>
              <Text>Additional Content 2!</Text>
            </Flex>
          </Content>
        )}
      </AnimatedPresence>
    </Content>
  );`,
  },
  title: "AnimatedPresence",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-utilities-animatedpresence--docs",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
