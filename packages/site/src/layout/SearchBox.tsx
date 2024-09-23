import {
  Box,
  Content,
  InputText,
  InputTextRef,
  Modal,
  Typography,
} from "@jobber/components";
import { useEffect, useMemo, useRef, useState } from "react";
import { ContentCardWrapper } from "../components/ContentCardWrapper";
import { ContentCard } from "../components/ContentCard";
import { componentList } from "../componentList";
import { designList } from "../designList";

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
    return designList.filter(d =>
      d.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const filteredComponentList = useMemo(() => {
    return componentList.filter(
      d =>
        d.title.includes(search) ||
        d.additionalMatches?.find(e => e.includes(search)),
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
    <Modal open={open} onRequestClose={closeModal} title="Search">
      <Content>
        <InputText
          ref={ref}
          value={search}
          placeholder="Search"
          onChange={d => setSearch(d as string)}
        />
        <Box width="100%">
          {filteredComponentList.length > 0 && (
            <Content>
              <Typography size="larger" fontWeight="bold">
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
                <Typography size="larger" fontWeight="bold">
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
        </Box>
      </Content>
    </Modal>
  );
};
