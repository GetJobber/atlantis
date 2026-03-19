import Content, { toc } from "./Menu.stories.mdx";
import Props from "./Menu.props.json";
import MobileProps from "./Menu.props-mobile.json";
import Notes from "./MenuNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Menu
      ariaLabel="More Actions"
      trigger={
        <Button
          label="More Actions"
          icon="more"
          type="secondary"
        />
      }
    >
      <Menu.Section>
        <Menu.Item
          onClick={function onClick() {
            alert("✏️");
          }}
          textValue="Edit"
        >
          <Menu.ItemLabel>Edit</Menu.ItemLabel>
          <Menu.ItemIcon name="edit" />
        </Menu.Item>
      </Menu.Section>
      <Menu.Section>
        <Menu.Header>
          <Menu.HeaderLabel>Send as...</Menu.HeaderLabel>
        </Menu.Header>
        <Menu.Item
          onClick={function onClick() {
            alert("📱");
          }}
          textValue="Text message"
        >
          <Menu.ItemLabel>Text message</Menu.ItemLabel>
          <Menu.ItemIcon name="sms" />
        </Menu.Item>
        <Menu.Item
          onClick={function onClick() {
            alert("📨");
          }}
          textValue="Email"
        >
          <Menu.ItemLabel>Email</Menu.ItemLabel>
          <Menu.ItemIcon name="email" />
        </Menu.Item>
      </Menu.Section>
    </Menu>`,
    mobileElement: `const [selected, setSelected] = useState(0);

  const menuOptions = [
    {
      label: "Option one",
      icon: selected === 1 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(1),
    },
    {
      label: "Option two",
      icon: selected === 2 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(2),
    },
    {
      label: "Option three",
      icon: selected === 3 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(3),
    },
  ];

  return <Menu menuOptions={menuOptions} />`,
    defaultProps: {},
  },
  title: "Menu",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-navigation-menu--horizontal",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-navigation-menu--basic",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
