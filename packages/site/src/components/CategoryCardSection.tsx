import { PropsWithChildren } from "react";
import { Content, Heading } from "@jobber/components";
import { ContentCardWrapper } from "./ContentCardWrapper";

interface CategoryCardSectionProps {
  readonly category: string;
}

/**
 * A very cool grid-based wrapper to make the contents auto-scale in category mode.
 *
 * @param param0 {children: ReactNode}
 * @param category {string}
 * @returns ReactNode
 */
export const CategoryCardSection = ({
  category,
  children,
}: PropsWithChildren<CategoryCardSectionProps>) => {
  return (
    <Content spacing={"large"}>
      <div
        className="stickySectionHeader"
        style={{
          background: "var(--color-surface)",
          padding:
            "var(--space-base) var(--space-minuscule) var(--space-smaller) 0px",
          marginLeft: "-1px",
          width: "100%",
        }}
      >
        <Heading level={2}>{category}</Heading>
      </div>
      <ContentCardWrapper>{children}</ContentCardWrapper>
    </Content>
  );
};
