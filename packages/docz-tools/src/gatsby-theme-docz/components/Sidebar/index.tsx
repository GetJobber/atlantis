/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { FormEvent, createRef, useState } from "react";
import { useConfig } from "docz";
import { Icon } from "@jobber/components/Icon";
import * as styles from "./styles";
import { Navigation } from "../Navigation";
import { Logo } from "../Logo";

export function Sidebar() {
  const [query, setQuery] = useState("");
  const {
    themeConfig: { sideBarWidth },
  } = useConfig();
  const sidebarRef = createRef<HTMLDivElement>();

  return (
    <Box sx={styles.sidebar(sideBarWidth)} ref={sidebarRef}>
      <Logo />
      <Box sx={styles.search}>
        <Icon name="search" color="greyBlue" />
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
