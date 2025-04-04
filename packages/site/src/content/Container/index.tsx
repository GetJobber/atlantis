import Content from "./Container.stories.mdx";
import Props from "./Container.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<div style={{width:'100%'}}>
  <Container name="wrapper">
    <Container.Apply className='item'>
      <Stack>
        <Heading level={1}>Container</Heading>
        <Text>This is an item in a container. Try updating the container name to 'wrapper-two' to see the same layout + classes in a different container.</Text>
        <Text>The container name is passed as a CSS custom property to the container query.</Text>
        <Text>Feel free to write your own container queries to make adjustments to layouts, or use our pre-built containers for well-defined layouts.</Text>
      </Stack>
    </Container.Apply>
  </Container>
</div>
    `,
  },
  title: "Container",
  links: [
    {
      label: "Containers",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@container",
    },
  ],
} as const satisfies ContentExport;
