/* eslint max-statements: 0 */
// This is here because it was complaining the function has 13 statements and the limit is 12
// Maybe it can be refactored in the future? But this number seems arbitrary
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
import { guidesList } from "../guidesList";
import { changelogList } from "../changelogList";
import { hooksList } from "../hooksList";
import { packagesList } from "../packagesList";
import { ContentListItem } from "../types/components";

/**
 * Full Page Search Modal
 *
 * This lists all the components and design items in the system,
 * for filtering and searching.
 *
 * @param param0 {open,setOpen}
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

  const filterFunction = (item: ContentListItem) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.additionalMatches?.find((e: string) =>
      e.toLowerCase().includes(search.toLowerCase()),
    );

  useOnKeyDown(event => {
    event.preventDefault();
    setOpen(true);
  }, "/");

  const filteredContentList = useMemo(() => {
    return contentList.filter(d => filterFunction(d));
  }, [search]);

  const filteredDesignList = useMemo(() => {
    return designList.filter(d => filterFunction(d));
  }, [search]);

  const filteredComponentList = useMemo(() => {
    return componentList.filter(d => filterFunction(d));
  }, [search]);

  const filteredChangelogList = useMemo(() => {
    return changelogList.filter(d => filterFunction(d));
  }, [search]);

  const filteredGuidesList = useMemo(() => {
    return guidesList.filter(d => filterFunction(d));
  }, [search]);

  const filteredHooksList = useMemo(() => {
    return hooksList.filter(d => filterFunction(d));
  }, [search]);

  const filteredPackagesList = useMemo(() => {
    return packagesList.filter(d => filterFunction(d));
  }, [search]);

  const emptyResults =
    !filteredContentList.length &&
    !filteredDesignList.length &&
    !filteredComponentList.length &&
    !filteredChangelogList.length &&
    !filteredGuidesList.length &&
    !filteredHooksList.length &&
    !filteredPackagesList.length;

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
            {filteredComponentList.length > 0 && (
              <Content>
                <SearchBoxSection
                  sectionTitle="Components"
                  filteredListItems={filteredComponentList}
                  handleCloseModal={closeModal}
                />
              </Content>
            )}
            {filteredContentList.length > 0 && (
              <Content>
                <SearchBoxSection
                  sectionTitle="Content"
                  filteredListItems={filteredContentList}
                  handleCloseModal={closeModal}
                />
              </Content>
            )}
            {filteredDesignList.length > 0 && (
              <Content>
                <SearchBoxSection
                  sectionTitle="Design"
                  filteredListItems={filteredDesignList}
                  handleCloseModal={closeModal}
                />
              </Content>
            )}
            {filteredChangelogList.length > 0 && (
              <Content>
                <SearchBoxSection
                  sectionTitle="Changelog"
                  filteredListItems={filteredChangelogList}
                  handleCloseModal={closeModal}
                />
              </Content>
            )}
            {filteredGuidesList.length > 0 && (
              <Content>
                <SearchBoxSection
                  sectionTitle="Guides"
                  filteredListItems={filteredGuidesList}
                  handleCloseModal={closeModal}
                />
              </Content>
            )}
            {filteredHooksList.length > 0 && (
              <Content>
                <SearchBoxSection
                  sectionTitle="Hooks"
                  filteredListItems={filteredHooksList}
                  handleCloseModal={closeModal}
                />
              </Content>
            )}
            {filteredPackagesList.length > 0 && (
              <Content>
                <SearchBoxSection
                  sectionTitle="Packages"
                  filteredListItems={filteredPackagesList}
                  handleCloseModal={closeModal}
                />
              </Content>
            )}
            {emptyResults && (
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
                  We couldn&apos;t match any results with your search; try a
                  different term.
                </Typography>
                <Typography
                  align={"center"}
                  fontWeight={"medium"}
                  size={"large"}
                  textColor={"textSecondary"}
                >
                  If you think something&apos;s missing, let the Atlantis team
                  know.
                </Typography>
              </Box>
            )}
          </Content>
        </div>
      </Content>
    </Modal>
  );
};
