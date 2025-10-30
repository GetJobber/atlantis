import { DescriptionList } from "@jobber/components/DescriptionList";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { Content } from "@jobber/components/Content";
import { Box } from "@jobber/components/Box";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";
import type { ReactNode } from "react";

export function UseBreakpoints() {
  const breakpoints = useBreakpoints();
  const data: [string, ReactNode][] = Object.entries(breakpoints).map(
    ([key, value]) => [
      key,
      <InlineLabel key={key} color={value ? "green" : "red"}>
        {String(value)}
      </InlineLabel>,
    ],
  );

  return (
    <Box width="100%">
      <Content>
        <DescriptionList data={data} />
      </Content>
    </Box>
  );
}
