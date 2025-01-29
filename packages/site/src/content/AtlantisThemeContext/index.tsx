import AtlantisThemeContextContent from "@atlantis/docs/components/AtlantisThemeContext/AtlantisThemeContext.stories.mdx";
import Props from "./AtlantisThemeContext.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AtlantisThemeContextContent />,
  props: Props,
  component: {
    element: `<AtlantisThemeContextProvider>
  <Text>Theme-aware content</Text>
</AtlantisThemeContextProvider>`,
  },
  title: "AtlantisThemeContext",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-themes-atlantisthemecontext--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
