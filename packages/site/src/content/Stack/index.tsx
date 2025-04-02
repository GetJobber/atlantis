import Content from "./Stack.mdx";
import Props from "./Stack.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Stack>
       <Text>Hello</Text>
       <Text>World</Text>
    </Stack>
    `,
  },
  title: "Stack",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Stack-web--docs",
    },
  ],
} as const satisfies ContentExport;
