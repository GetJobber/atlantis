import Content from "@atlantis/docs/components/Content/Content.stories.mdx";
import Props from "./Content.props.json";
import MobileProps from "./Content.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `
    return (
    <Content spacing={"small"}>
      <Card title="About me">
        <Content spacing={"small"}>
          <Heading level={2}>Sign up!</Heading>
          <Text>
            Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
            vestibulum. Nulla vitae elit libero, a pharetra augue. Nullam quis
            risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta
            felis euismod semper. Curabitur blandit tempus porttitor.
          </Text>
          <InputText placeholder="Name" />
          <InputText placeholder="Phone" />
          <InputText placeholder="Email" />
          <InputText
            multiline={true}
            placeholder="Describe yourself"
            name="describeAge"
          />
        </Content>
      </Card>
    </Content>
  );`,
    mobileElement: `<Content direction={"vertical"}>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam
          neque quam nemo dolores illo eaque qui possimus consequuntur libero.
        </Text>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam
          neque quam nemo dolores illo eaque qui possimus consequuntur libero.
        </Text>
      </Content>`,
  },
  title: "Content",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Content-web--docs",
    },
  ],
} as const satisfies ContentExport;
