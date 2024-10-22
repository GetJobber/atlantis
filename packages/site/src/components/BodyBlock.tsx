import { Box, Content, Typography } from "@jobber/components";
import { PropsWithChildren } from "react";

interface BodyBlockProps extends PropsWithChildren {
  readonly title: string;
}

/**
 * A simple opinionated wrapper for a block of content within a PageBlock
 * @param param0 {children:ReactNode, title: string}
 * @returns ReactNode
 */
export const BodyBlock = ({ children, title }: BodyBlockProps) => {
  return (
    <Box padding={"extravagant"}>
      <Content>
        <Typography size="larger" fontWeight="bold">
          {title}
        </Typography>
        <Box direction="row" alignItems="stretch" gap={"base"}>
          {children}
        </Box>
      </Content>
    </Box>
  );
};
