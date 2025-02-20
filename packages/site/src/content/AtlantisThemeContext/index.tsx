import AtlantisThemeContextContent from "@atlantis/docs/components/AtlantisThemeContext/AtlantisThemeContext.stories.mdx";
import Props from "./AtlantisThemeContext.props.json";
import MobileProps from "./AtlantisThemeContext.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AtlantisThemeContextContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<AtlantisThemeContextProvider>
    <Box background="surface" padding="larger" radius="base" gap="base">
      <div style={{ display: "flex", gap: "8px" }}>
        <InlineLabel color="red">Past due</InlineLabel>
        <InlineLabel color="yellow">Unscheduled</InlineLabel>
        <InlineLabel color="green">Approved</InlineLabel>
        <InlineLabel color="greyBlue">Draft</InlineLabel>
        <InlineLabel color="lightBlue">Sent</InlineLabel>
      </div>
      <Flex gap="base" align="center" direction="row" template={["grow", "grow"]}>
        <Button label="Set dark theme" onClick={() => updateTheme("dark")} />
        <Button label="Set light theme" onClick={() => updateTheme("light")} />
      </Flex>
    </Box>
  </AtlantisThemeContextProvider>
  `,
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
