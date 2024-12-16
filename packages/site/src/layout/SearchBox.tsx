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
import { ToolBoxIllustration } from "../assets/ToolBoxIllustration";
import { ContentCardWrapper } from "../components/ContentCardWrapper";
import { ContentCard } from "../components/ContentCard";
import { componentList } from "../componentList";
import { contentList } from "../contentList";
import { designList } from "../designList";
import { changelogList } from "../changelogList";

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

  useOnKeyDown(event => {
    event.preventDefault();
    setOpen(true);
  }, "/");

  const filteredContentList = useMemo(() => {
    return contentList.filter(
      d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.additionalMatches?.find(e =>
          e.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }, [search]);

  const filteredDesignList = useMemo(() => {
    return designList.filter(
      d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.additionalMatches?.find(e =>
          e.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }, [search]);

  const filteredComponentList = useMemo(() => {
    return componentList.filter(
      d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.additionalMatches?.find(e =>
          e.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }, [search]);

  const filteredChangelogList = useMemo(() => {
    return changelogList.filter(
      d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.additionalMatches?.find(e =>
          e.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }, [search]);
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
                <Typography
                  size={"base"}
                  fontWeight={"bold"}
                  textCase={"uppercase"}
                  textColor={"textSecondary"}
                  element="h3"
                >
                  Components
                </Typography>
                <ContentCardWrapper>
                  {filteredComponentList.map(({ title, to, imageURL }, key) => {
                    return (
                      <ContentCard
                        onClick={closeModal}
                        title={title}
                        to={to}
                        imageURL={imageURL}
                        key={key}
                      />
                    );
                  })}
                </ContentCardWrapper>
              </Content>
            )}
            {filteredContentList.length > 0 && (
              <Content>
                <Typography
                  size={"base"}
                  fontWeight={"bold"}
                  textCase={"uppercase"}
                  textColor={"textSecondary"}
                  element="h3"
                >
                  Content
                </Typography>
                <ContentCardWrapper>
                  {filteredContentList.map(({ title, to, imageURL }, key) => {
                    return (
                      <ContentCard
                        onClick={closeModal}
                        title={title}
                        to={to}
                        imageURL={imageURL}
                        key={key}
                      />
                    );
                  })}
                </ContentCardWrapper>
              </Content>
            )}
            {filteredDesignList.length > 0 && (
              <Content>
                <Typography
                  size={"base"}
                  fontWeight={"bold"}
                  textCase={"uppercase"}
                  textColor={"textSecondary"}
                  element="h3"
                >
                  Design
                </Typography>
                <ContentCardWrapper>
                  {filteredDesignList.map(({ title, to, imageURL }, key) => {
                    return (
                      <ContentCard
                        onClick={closeModal}
                        title={title}
                        to={to}
                        imageURL={imageURL}
                        key={key}
                      />
                    );
                  })}
                </ContentCardWrapper>
              </Content>
            )}
            {filteredChangelogList.length > 0 && (
              <Content>
                <Typography
                  size={"base"}
                  fontWeight={"bold"}
                  textCase={"uppercase"}
                  textColor={"textSecondary"}
                  element="h3"
                >
                  Changelog
                </Typography>
                <ContentCardWrapper>
                  {filteredChangelogList.map(({ title, to, imageURL }, key) => {
                    return (
                      <ContentCard
                        onClick={closeModal}
                        title={title}
                        to={to}
                        imageURL={imageURL}
                        key={key}
                      />
                    );
                  })}
                </ContentCardWrapper>
              </Content>
            )}
            {!filteredComponentList.length && !filteredDesignList.length && (
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
