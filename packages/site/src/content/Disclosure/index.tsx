import DisclosureContent from "./Disclosure.stories.mdx";
import Props from "./Disclosure.props.json";
import MobileProps from "./Disclosure.props-mobile.json";
import Notes from "./DisclosureNotes.mdx";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <DisclosureContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Disclosure title={'Advanced Instructions'}>
      <Content>
        <Text>Here is some helpful information to level up your business:</Text>
        <Text>For every 2 team members you add, your profits will triple.</Text>
      </Content>
    </Disclosure>`,
    mobileElement: `<Disclosure
      header={"Advanced Instructions"}
      content={"For every 2 team members you add, your profits will triple."}
      isEmpty={false}
      open={open}
      onToggle={() => setOpen(!open)}
    />`,
  },
  title: "Disclosure",
  links: [
    {
      label: "Disclosure Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-layouts-and-structure-disclosure--docs",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
