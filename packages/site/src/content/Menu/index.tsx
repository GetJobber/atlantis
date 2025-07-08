import Content from "@atlantis/docs/components/Menu/Menu.stories.mdx";
import Props from "./Menu.props.json";
import MobileProps from "./Menu.props-mobile.json";
import Notes from "./MenuNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Menu
      items={[
        {
          actions: [
            {
              label: "Edit",
              icon: "edit",
              onClick: function onClick() {
                alert("✏️");
              },
            },
          ],
        },
        {
          header: "Send as...",
          actions: [
            {
              label: "Text message",
              icon: "sms",
              onClick: function onClick() {
                alert("📱");
              },
            },
            {
              label: "Email",
              icon: "email",
              onClick: function onClick() {
                alert("📨");
              },
            },
          ],
        },
      ]}
    />`,
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
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-navigation-menu--docs`),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
