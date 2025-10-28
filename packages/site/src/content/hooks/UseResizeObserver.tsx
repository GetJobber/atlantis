import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";
import { BREAKPOINT_SIZES } from "@jobber/hooks/useBreakpoints";
import { Box } from "@jobber/components/Box";

export function UseResizeObserver() {
  const [ref, { width, exactWidth, exactHeight, height }] =
    useResizeObserver<HTMLDivElement>();

  return (
    <Box width="100%">
      <div ref={ref}>
        <Card title={`Check out my àçƈéñŦ`} accent={getAccent()}>
          <Content>
            <Text>Width Step: {width}</Text>
            <Text>Height Step: {height}</Text>
            <Text>Exact Width: {exactWidth}</Text>
            <Text>Exact Height: {exactHeight}</Text>
          </Content>
        </Card>
      </div>
    </Box>
  );

  function getAccent() {
    if (exactWidth && exactWidth < BREAKPOINT_SIZES.sm) return "red";
    if (width && width < BREAKPOINT_SIZES.md) return "orange";
    if (width && width < BREAKPOINT_SIZES.lg) return "green";
    if (width && width < BREAKPOINT_SIZES.xl) return "lightBlue";

    return "purple";
  }
}
