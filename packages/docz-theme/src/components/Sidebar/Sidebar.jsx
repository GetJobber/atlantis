/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Logo } from "@jobber/docz-theme/components/Logo";

export function Sidebar() {
  return (
    <Box>
      <Box>
        <Logo />
      </Box>
      <Box>Search</Box>
      <Box>Navigation</Box>
    </Box>
  );
}
