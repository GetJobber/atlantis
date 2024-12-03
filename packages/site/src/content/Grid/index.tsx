import Content from "@atlantis/docs/components/Grid/Grid.stories.mdx";
import Props from "./Grid.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Content spacing="large">
      <Grid gap={true}>
        <Grid.Cell
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card>
            <Content>
              <Text>Column 1</Text>
            </Content>
          </Card>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <Card>
            <Content>
              <Text>Column 2</Text>
            </Content>
          </Card>
        </Grid.Cell>
        <Grid.Cell
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <Card>
            <Content>
              <Text>Column 3</Text>
            </Content>
          </Card>
        </Grid.Cell>
      </Grid>
    </Content>`,
  },
  title: "Grid",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Grid-web--docs",
    },
  ],
} as const satisfies ContentExport;
