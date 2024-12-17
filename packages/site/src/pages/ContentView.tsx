import { Box, Content } from "@jobber/components";
import { ContentExport } from "../types/content";
import { AnchorLinks } from "../components/AnchorLinks";

export const ContentView = ({
  content,
}: {
  readonly content: ContentExport["content"];
  readonly intro: string;
  readonly title: string;
}) => {
  return (
    <div style={{ backgroundColor: "var(--color-surface" }}>
      <custom-elements>
        <Box padding={"larger"}>
          <Content>{content()}</Content>
        </Box>
        <AnchorLinks header="Details" />
      </custom-elements>
    </div>
  );
};
