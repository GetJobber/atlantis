import { Box, Content } from "@jobber/components";
import { ReactNode } from "react";

export const ContentView = ({
  content,
}: {
  readonly content: typeof import("*.md");
  readonly intro: string;
  readonly title: string;
}) => {
  return (
    <div style={{ backgroundColor: "var(--color-surface" }}>
      <custom-elements>
        <Box padding={"larger"}>
          <Content>{content as unknown as ReactNode}</Content>
        </Box>
      </custom-elements>
    </div>
  );
};
