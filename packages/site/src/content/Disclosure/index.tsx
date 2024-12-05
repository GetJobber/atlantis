import DisclosureContent from "@atlantis/docs/components/Disclosure/Disclosure.stories.mdx";
import Props from "./Disclosure.props.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <DisclosureContent />,
  props: Props,
  component: {
    element: `<Disclosure title={'Advanced Instructions'}>
      <Content>
        <Text>Here is some helpful information to level up your business:</Text>
        <Text>For every 2 team members you add, your profits will triple.</Text>
      </Content>
    </Disclosure>`,
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
} as const satisfies ContentExport;
