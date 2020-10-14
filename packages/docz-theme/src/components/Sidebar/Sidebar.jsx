/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useRef, useState } from "react";
import { Navigation } from "@jobber/docz-theme/components/Navigation";
import { Logo } from "@jobber/docz-theme/components/Logo";
import { InputText } from "@jobber/components/InputText";
import * as styles from "./styles";

export function Sidebar() {
  const [query, setQuery] = useState("");
  const sidebarRef = useRef();

  return (
    <Box sx={styles.wrapper} ref={sidebarRef}>
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
  );
}
