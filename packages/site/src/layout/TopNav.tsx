import { Box, Button, Tooltip } from "@jobber/components";
import { useBreakpoints } from "@jobber/hooks";
import { Link } from "react-router-dom";
import { SearchButton } from "./SearchButton";
import styles from "./TopNav.module.css";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { useTritonChat } from "../providers/TritonProvider";
import { JobberLogo } from "../assets/JobberLogo.svg";

export const TopNav = () => {
  const { onOpenTriton } = useTritonChat();
  const { mediumAndUp } = useBreakpoints();

  return (
    <Box padding="base" direction="row" alignItems="center" gap="small">
      <div className={styles.mobileNavContainer}>
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
            onClick={() => alert("open menu")}
            icon="menu"
          />
          <Box padding={{ top: "smaller" }}>
            <Link to="/">
              <JobberLogo />
            </Link>
          </Box>
        </Box>
      </div>
      <Box
        direction="row"
        gap="small"
        justifyContent="center"
        width="grow"
        padding={mediumAndUp ? { left: "extravagant" } : {}}
      >
        <Box width={200}>
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
  );
};
