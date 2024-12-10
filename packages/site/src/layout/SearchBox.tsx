import {
  Box,
  Content,
  InputText,
  InputTextRef,
  Modal,
  Typography,
} from "@jobber/components";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchBox.module.css";
import { ContentCardWrapper } from "../components/ContentCardWrapper";
import { ContentCard } from "../components/ContentCard";
import { componentList } from "../componentList";
import { designList } from "../designList";

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
          {filteredDesignList.length > 0 && (
            <Box padding={{ top: "largest" }}>
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
            </Box>
          )}
        </div>
      </Content>
    </Modal>
  );
};
