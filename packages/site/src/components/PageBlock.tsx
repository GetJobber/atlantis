import { SegmentedControl } from "@jobber/components";
import { useState } from "react";
import { BodyBlock } from "./BodyBlock";
import { ContentCard } from "./ContentCard";
import { HeaderBlock } from "./HeaderBlock";
import { ContentCardWrapper } from "./ContentCardWrapper";
import { CategoryCardSection } from "./CategoryCardSection";
import { PageWrapper } from "../layout/PageWrapper";
import { ContentCardProps } from "../types/components";
import usePageTitle from "../hooks/usePageTitle";

interface PageBlockProps {
  readonly structure: {
    header: {
      title: string;
      body: string;
      ctaLabel?: string;
      to?: string;
      imageURL?: string;
    };
    body: {
      content: ContentCardProps[];
    };
    useCategories?: boolean;
    showSegmentedControl?: boolean;
  };
}

/**
 * Opinionated layout for a page. Has a Header, Body and list of content cards.
 * @param param0 PageBlockProps
 * @returns
 */
export const PageBlock = ({ structure }: PageBlockProps) => {
  usePageTitle({ title: structure.header.title });
  interface SectionMap {
    [key: string]: Array<(typeof structure.body.content)[0]>;
  }

  const defaultView = structure.useCategories ? "category" : "a-z";
  const [cardView, setCardView] = useState(defaultView);

  const sectionedComponents = () => {
    const sectionMap = structure.body.content.reduce(
      (acc: SectionMap, item) => {
        item.sections?.forEach(section => {
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(item);
        });

        return acc;
      },
      {} as SectionMap,
    );

    return Object.entries(sectionMap).map(([section, items]) => ({
      section,
      items,
    }));
  };

  return (
    <PageWrapper>
      <HeaderBlock {...structure.header} />
      <BodyBlock>
        {structure.showSegmentedControl && (
          <div
            style={{
              width: "240px",
              margin: "auto",
              paddingBottom: "var(--space-largest)",
            }}
          >
            <SegmentedControl
              selectedValue={cardView}
              onSelectValue={setCardView}
            >
              <SegmentedControl.Option value={"category"}>
                Category
              </SegmentedControl.Option>
              <SegmentedControl.Option value={"a-z"}>
                A-Z
              </SegmentedControl.Option>
            </SegmentedControl>
          </div>
        )}

        {structure.useCategories && cardView === "category" ? (
          <>
            {sectionedComponents().map(({ section, items }) => (
              <CategoryCardSection key={section} category={section}>
                {items.map((content, index) => (
                  <ContentCard {...content} key={index} />
                ))}
              </CategoryCardSection>
            ))}
          </>
        ) : (
          <ContentCardWrapper>
            {structure.body.content.map((content, index) => (
              <ContentCard {...content} key={index} />
            ))}
          </ContentCardWrapper>
        )}
      </BodyBlock>
    </PageWrapper>
  );
};
