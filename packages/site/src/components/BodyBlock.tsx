import { Content } from "@jobber/components";
import { PropsWithChildren } from "react";

/**
 * A simple opinionated wrapper for a block of content within a PageBlock
 * @param param0 {children:ReactNode}
 * @returns ReactNode
 */
export const BodyBlock = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        maxWidth: 1024,
        margin: "auto",
        padding: "var(--space-largest) var(--space-large)",
      }}
    >
      <Content spacing={"extravagant"}>{children}</Content>
    </div>
  );
};
