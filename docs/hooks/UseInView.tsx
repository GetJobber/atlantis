import React from "react";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { useInView } from "@jobber/hooks/useInView";

export function UseInView() {
  const [ref, isInView] = useInView();

  return (
    <Content>
      <Text>{isInView ? "A wild donut appeared!" : "Scroll down"}</Text>
      <div style={{ height: 200, overflow: "auto" }}>
        <Content spacing="small">
          {[...Array(10).keys()].map(i => (
            <div
              key={i}
              style={{
                height: "var(--space-larger)",
                background: "var(--color-grey--lighter)",
              }}
            />
          ))}
          <div ref={ref}>
            <Text size="large">🍩🍩🍩🍩🍩🍩🍩🍩🍩</Text>
          </div>
        </Content>
      </div>
    </Content>
  );
}
