import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";

export function UseResizeObserver() {
  const [ref, { width, exactWidth, exactHeight, height }] = useResizeObserver();

  return (
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
  );

  function getAccent() {
    if (exactWidth < useBreakpoints.smaller) return "red";
    if (width < useBreakpoints.small) return "orange";
    if (width < useBreakpoints.base) return "yellow";
    if (width < useBreakpoints.large) return "green";
    if (width < useBreakpoints.larger) return "lightBlue";

    return "purple";
  }
}
