import CardContent from "@atlantis/docs/components/Card/Card.stories.mdx";
import Props from "./Card.props.json";
import MobileProps from "./Card.props-mobile.json";
import Notes from "./CardNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <CardContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Card header={{
        title: "Get the mobile app",
        action: <Button label="Get It Now" />,
      }}>
      <Content>
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
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-card--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
