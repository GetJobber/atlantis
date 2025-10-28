import { DescriptionList } from "@jobber/components/DescriptionList";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { Content } from "@jobber/components/Content";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";

export function UseBreakpoints() {
  const breakpoints = useBreakpoints();
  const data = Object.entries(breakpoints).map(([key, value], i) => [
    <code key={i}>{key}</code>,
    <InlineLabel key={key} color={value ? "green" : "red"}>
      {String(value)}
    </InlineLabel>,
  ]);

  return (
    <Content>
      <DescriptionList data={data} />
    </Content>
  );
}
