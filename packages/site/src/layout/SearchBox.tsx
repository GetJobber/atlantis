import {
  Box,
  Content,
  Heading,
  InputText,
  InputTextRef,
  Modal,
  Typography,
} from "@jobber/components";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOnKeyDown } from "@jobber/hooks";
import styles from "./SearchBox.module.css";
import { SearchBoxSection } from "./SearchBoxSection";
import { ToolBoxIllustration } from "../assets/ToolBoxIllustration";
import { componentList } from "../componentList";
import { contentList } from "../contentList";
import { designList } from "../designList";
import { patternsList } from "../patternsList";
import { guidesList } from "../guidesList";
import { changelogList } from "../changelogList";
import { hooksList } from "../hooksList";
import { packagesList } from "../packagesList";
import { ContentListItem } from "../types/components";

const lists = [
  { title: "Components", items: componentList },
  { title: "Content", items: contentList },
  { title: "Design", items: designList },
  { title: "Patterns", items: patternsList },
  { title: "Changelog", items: changelogList },
  { title: "Guides", items: guidesList },
  { title: "Hooks", items: hooksList },
  { title: "Packages", items: packagesList },
];

/**
 * Search Input & Modal; for filtering and searching all navigation items.
 *
 * @param param0 {open, setOpen} - The props for the SearchBox component.
 * @returns ReactNode
 */
export const SearchBox = ({
  open,
  setOpen,
}: {
  readonly open: boolean;
  readonly setOpen: (item: boolean) => void;
}) => {
  const ref = useRef<InputTextRef>(null);
  const [search, setSearch] = useState("");

  const filterItems = (items: ContentListItem[], searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return items.filter(
      item =>
        item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.additionalMatches?.some((e: string) =>
          e.toLowerCase().includes(lowerCaseSearchTerm),
        ),
    );
  };

  useOnKeyDown(event => {
    event.preventDefault();
    setOpen(true);
  }, "/");

  const filteredLists = useMemo(() => {
    return lists.map(list => ({
      title: list.title,
      items: filterItems(list.items, search),
    }));
  }, [search]);

  const emptyResults = filteredLists.every(list => list.items.length === 0);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
    }
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <Modal size="large" open={open} onRequestClose={closeModal} title="Search">
      <Content spacing={"larger"}>
        <InputText
          ref={ref}
          value={search}
          placeholder="Search"
          prefix={{ icon: "search" }}
          clearable="always"
          onChange={d => setSearch(d as string)}
        />
        <div className={styles.searchBoxResults}>
          <Content spacing={"larger"}>
            {filteredLists.map(
              list =>
                list.items.length > 0 && (
                  <Content key={list.title}>
                    <SearchBoxSection
                      sectionTitle={list.title}
                      filteredListItems={list.items}
                      handleCloseModal={closeModal}
                    />
                  </Content>
                ),
            )}
            {emptyResults && <EmptyResults />}
          </Content>
        </div>
      </Content>
    </Modal>
  );
};

const EmptyResults = () => (
  <Box
    height={"100%"}
    direction={"column"}
    padding={"extravagant"}
    gap={"larger"}
    alignItems={"center"}
  >
    <ToolBoxIllustration />
    <Heading level={1} element={"h3"}>
      The toolbox looks empty!
    </Heading>
    <Typography
      align={"center"}
      fontWeight={"semiBold"}
      size={"large"}
      textColor={"text"}
    >
      We couldn&apos;t match any results with your search; try a different term.
    </Typography>
    <Typography
      align={"center"}
      fontWeight={"medium"}
      size={"large"}
      textColor={"textSecondary"}
    >
      If you think something&apos;s missing, let the Atlantis team know.
    </Typography>
  </Box>
);
