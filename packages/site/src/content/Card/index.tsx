import CardContent from "@atlantis/docs/components/Card/Card.stories.mdx";
import Props from "./Card.props.json";
import MobileProps from "./Card.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <CardContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Card>
   <Content>
        <Heading level={4}>The Jobber App</Heading>
        <Text>
          Stay connected with your team in the field when you put the Jobber app
          in their hands.
        </Text>
      </Content>
    </Card>`,
    mobileElement: `<Card header={{ title: "Client" }}>
      <Content childSpacing={"small"}>
        <Content spacing={"none"} childSpacing={"none"}>
          <Text variation={"subdued"}>Address</Text>
          <Text>12345 Fake Street</Text>
        </Content>
        <Content spacing={"none"} childSpacing={"none"}>
          <Text variation={"subdued"}>Phone</Text>
          <Text>555-555-5555</Text>
        </Content>
      </Content>
    </Card>`,
  },
  title: "Card",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-layouts-and-structure-card--docs`,
    },
  ],
} as const satisfies ContentExport;
