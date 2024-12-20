import { Content, Typography } from "@jobber/components";
import { ContentCardWrapper } from "../components/ContentCardWrapper";
import { ContentCard } from "../components/ContentCard";
import { ContentCardProps } from "../types/components";

interface SearchBoxSectionProps {
  readonly sectionTitle: string;
  readonly filteredListItems: ContentCardProps[];
  readonly handleCloseModal: () => void;
}

export const SearchBoxSection = ({
  sectionTitle,
  filteredListItems,
  handleCloseModal,
}: SearchBoxSectionProps) => {
  const activateCloseModal = handleCloseModal;

  return (
    <Content>
      <Typography
        size={"base"}
        fontWeight={"bold"}
        textCase={"uppercase"}
        textColor={"textSecondary"}
        element="h3"
      >
        {sectionTitle}
      </Typography>
      <ContentCardWrapper>
        {filteredListItems.map(({ title, to, imageURL }, key) => {
          return (
            <ContentCard
              onClick={activateCloseModal}
              title={title}
              to={to}
              imageURL={imageURL}
              key={key}
            />
          );
        })}
      </ContentCardWrapper>
    </Content>
  );
};
