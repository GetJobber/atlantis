import Content, { toc } from "./FeatureSwitch.stories.mdx";
import Props from "./FeatureSwitch.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  component: {
    element: `const [featureEnabled, setFeatureEnabled] = useState(true);

  function handleSwitch(newValue) {
    setFeatureEnabled(newValue);
  }

  return (
    <FeatureSwitch
      title={"Quote follow-up"}
      description={
        "Send a notification to your client following up on an outstanding quote."
      }
      hasSaveIndicator={true}
      enabled={featureEnabled}
      onSwitch={handleSwitch}
      onEdit={() => console.log("You clicked edit")}
    >
      <Text>Extra feature content and information</Text>
    </FeatureSwitch>
  )
    `,
  },
  title: "FeatureSwitch",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-selections-featureswitch--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
