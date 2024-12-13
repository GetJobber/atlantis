import { Box, Content } from "@jobber/components";
import { ContentExport } from "../types/content";

//STODO: Some tidy up in here. I was running with that custom-elements pattern for a bit (which I want to explore more in 2025)
// But we should be consistent here and remove this one below and replace with a CSS module if needed.\

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
      </custom-elements>
    </div>
  );
};
