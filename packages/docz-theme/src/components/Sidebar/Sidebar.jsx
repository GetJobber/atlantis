/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useRef, useState } from "react";
import t from "prop-types";
import { Navigation } from "@jobber/docz-theme/components/Navigation";
import { Logo } from "@jobber/docz-theme/components/Logo";
import { InputText } from "@jobber/components/InputText";
import * as styles from "./styles";

export function Sidebar({ open }) {
  const [query, setQuery] = useState("");
  const sidebarRef = useRef();

  return (
    <Box sx={styles.wrapper(open)} ref={sidebarRef}>
      <Box sx={styles.menu}>
        <Box>
          <Logo />
        </Box>
        <Box sx={styles.search}>
          <InputText onChange={setQuery} placeholder="Search Atlantis" />
        </Box>
        <Box>
          <Navigation query={query} sidebarRef={sidebarRef} />
        </Box>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  open: t.bool,
};
