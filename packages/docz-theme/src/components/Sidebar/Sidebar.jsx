/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useState } from "react";
import { Logo } from "@jobber/docz-theme/components/Logo";
import { InputText } from "@jobber/components/InputText";

export function Sidebar() {
  const [query, setQuery] = useState("");

  return (
    <Box>
      <Box>
        <Logo />
      </Box>
      <Box>
        <InputText onChange={setQuery} placeholder="Search Atlantis" />
      </Box>
      <Box>Navigation - query: {query}</Box>
    </Box>
  );
}
