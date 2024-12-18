import { Box, Content } from "@jobber/components";
import { ContentExport } from "../types/content";

export const ContentView = ({
  content,
}: {
  readonly content: ContentExport["content"];
  readonly intro: string;
  readonly title: string;
}) => {
  return (
    <div
      style={{ backgroundColor: "var(--color-surface)", minHeight: "100dvh" }}
    >
      <custom-elements>
        <Box padding={"larger"}>
          <Content>{content()}</Content>
        </Box>
      </custom-elements>
    </div>
  );
};
