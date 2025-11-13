import AtlantisContextContent from "./AtlantisContext.stories.mdx";
import Props from "./AtlantisContext.props.json";
import MobileProps from "./AtlantisContext.props-mobile.json";
import Notes from "./AtlantisContextNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AtlantisContextContent />,
  props: Props,
  mobileProps: MobileProps,
  notes: () => <Notes />,
  component: {
    element: `<AtlantisContext.Provider
  value={{
    ...atlantisContextDefaultValues,
    dateFormat: "MM/dd/yyyy",
    locale: "en-US",
    firstDayOfWeek: 1,
  }}
>
  <Content>
    <Text>Date format: MM/dd/yyyy</Text>
    <Text>Locale: en-US</Text>
    <Text>First day of week: Monday</Text>
  </Content>
</AtlantisContext.Provider>`,
    mobileElement: `<AtlantisContext.Provider
  value={{
    ...atlantisContextDefaultValues,
    dateFormat: "MM/dd/yyyy",
    locale: "en-US",
    isOnline: true,
  }}
>
  <Content>
    <Text>Date format: MM/dd/yyyy</Text>
    <Text>Locale: en-US</Text>
    <Text>Online status: true</Text>
  </Content>
</AtlantisContext.Provider>`,
  },
  title: "AtlantisContext",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-contexts-atlantiscontext--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
