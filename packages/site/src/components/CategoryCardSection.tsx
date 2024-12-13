import { PropsWithChildren } from "react";
import { Typography } from "@jobber/components";
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "96px 1fr",
        gap: "var(--space-larger)",
        width: "100%",
        paddingBottom: "var(--space-large)",
      }}
    >
      <Typography
        element={"h6"}
        fontWeight={"bold"}
        size={"small"}
        textColor={"textSecondary"}
      >
        {category.toUpperCase()}
      </Typography>
      <ContentCardWrapper>{children}</ContentCardWrapper>
    </div>
  );
};
