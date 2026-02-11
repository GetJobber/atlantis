import Content, { toc } from "./SideDrawer.stories.mdx";
import Props from "./SideDrawer.props.json";
import Notes from "./SideDrawerNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  component: {
    element: `
    const [sideDrawerOpen, setSideDrawerOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => setSideDrawerOpen(true)}
        label="Open Side Drawer"
      />
      <SideDrawer
        open={true}
        open={sideDrawerOpen}
        onRequestClose={() => setSideDrawerOpen(false)}
      >
        <SideDrawer.Title>Side Drawers are here</SideDrawer.Title>

        <Content>
          <Text>You can add a text content.</Text>

          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            obcaecati debitis animi ullam dicta consectetur, dolorem nemo itaque
            enim aperiam!
          </Text>
        </Content>

        <Content>
          <Heading level={3}>Or a List</Heading>
        </Content>

        <List
          items={[
            {
              id: 1,
              icon: "wallet",
              iconColor: "orange",
              content: "Payment for Invoice #39",
              value: "-$300.00",
              caption: "Sep 25, 2019",
              onClick: function onClick() {
                return alert("TODO: Implement onClick");
              },
            },
            {
              id: 3,
              icon: "paidInvoice",
              content: "Invoice #39",
              value: "$300.00",
              caption: "Sep 24, 2019",
              onClick: function onClick() {
                return alert("TODO: Implement onClick");
              },
            },
          ]}
        />

        <Content>
          <Heading level={3}>Even tabs</Heading>
        </Content>

        <Tabs>
          <Tab label={"Eggs"}>
            🍳 Some eggs are laid by female animals of many different species,
            including birds, reptiles, amphibians, mammals, and fish, and have
            been eaten by humans for thousands of years.
          </Tab>
          <Tab label="Cheese">
            🧀 Cheese is a dairy product derived from milk that is produced in a
            wide range of flavors, textures, and forms by coagulation of the
            milk protein casein.
          </Tab>
          <Tab label="Berries">
            🍓 A berry is a small, pulpy, and often edible fruit. Typically,
            berries are juicy, rounded, brightly colored, sweet, sour or tart,
            and do not have a stone or pit.
          </Tab>
        </Tabs>

        <SideDrawer.Footer>
          <Content>
            <Flex template={["grow", "grow"]}>
              <Button
                icon="help"
                label="Visit Help Center"
                variation="subtle"
              />
              <Button icon="video" label="Watch Video" variation="subtle" />
            </Flex>
            <Button icon="chat" label="Chat With Us" fullWidth={true} />
          </Content>
        </SideDrawer.Footer>
      </SideDrawer>
    </>
  );`,
    defaultProps: {},
  },
  title: "SideDrawer",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-overlays-sidedrawer--docs`),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
