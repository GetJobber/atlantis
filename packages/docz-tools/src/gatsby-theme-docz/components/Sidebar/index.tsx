/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { FormEvent, createRef, useState } from "react";
import { useConfig } from "docz";
import { Icon } from "@jobber/components/Icon";
import * as styles from "./styles";
import { Navigation } from "../Navigation";
import { Logo } from "../Logo";
import { DeferRender } from "../DeferRender";

export function Sidebar() {
  const [query, setQuery] = useState("");
  const {
    themeConfig: { sideBarWidth, hasLogo, sidebarOffset = 0 },
  } = useConfig();
  const sidebarRef = createRef<HTMLDivElement>();

  return (
    <Box sx={styles.sidebar(sideBarWidth, sidebarOffset)} ref={sidebarRef}>
      {hasLogo && <Logo />}
      <Box sx={styles.search}>
        <DeferRender>
          <Icon name="search" color="greyBlue" />
        </DeferRender>
        <input
          sx={styles.input}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Type to search"
        />
      </Box>
      <Navigation query={query} sidebarRef={sidebarRef} />
    </Box>
  );

  function handleChange(event: FormEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value);
  }
}
