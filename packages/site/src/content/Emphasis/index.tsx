import { Emphasis, Text } from "@jobber/components";
import EmphasisContent from "@atlantis/docs/components/Emphasis/Emphasis.stories.mdx";
import Props from "./Emphasis.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <EmphasisContent />,
  props: Props,
  component: {
    element: Emphasis,
    defaultProps: {
      children: (
        <Text>
          To <Emphasis variation="bold">boldly</Emphasis> go…
        </Text>
      ),
    },
  },
  title: "Emphasis",
  description: "",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Emphasis-web--docs",
    },
  ],
} as const satisfies ContentExport;
