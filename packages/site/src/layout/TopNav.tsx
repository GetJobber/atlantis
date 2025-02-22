import { Box, Button, Tooltip } from "@jobber/components";
import { useBreakpoints } from "@jobber/hooks";
import { Link } from "react-router-dom";
import { SearchButton } from "./SearchButton";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { useTritonChat } from "../providers/TritonProvider";
import { JobberLogo } from "../assets/JobberLogo.svg";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";

export const TopNav = () => {
  const { onOpenTriton } = useTritonChat();
  const { mediumAndUp } = useBreakpoints();
  const { toggleMobileMenu } = useAtlantisSite();

  return (
    <Box
      padding="base"
      direction="row"
      alignItems="center"
      gap="small"
      justifyContent={mediumAndUp ? "" : "space-between"}
    >
      {!mediumAndUp && (
        <Box
          direction="row"
          gap="small"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            ariaLabel="Menu"
            type="tertiary"
            variation="subtle"
            size="base"
            onClick={toggleMobileMenu}
            icon="menu"
          />
          <Box padding={{ top: "smaller" }}>
            <Link to="/">
              <JobberLogo />
            </Link>
          </Box>
        </Box>
      )}
      <Box
        direction="row"
        gap="small"
        alignItems="center"
        width={mediumAndUp ? "grow" : "shrink"}
      >
        <Box
          direction="row"
          gap="small"
          justifyContent="center"
          width={mediumAndUp ? "grow" : "auto"}
          padding={mediumAndUp ? { left: "extravagant" } : {}}
        >
          <Box width={mediumAndUp ? 200 : "auto"}>
            <SearchButton />
          </Box>
          <Tooltip message="Ask Triton">
            <Button
              onClick={onOpenTriton}
              icon="sparkles"
              ariaLabel="triton"
              variation="subtle"
            />
          </Tooltip>
        </Box>
        <ToggleThemeButton />
      </Box>
    </Box>
  );
};
