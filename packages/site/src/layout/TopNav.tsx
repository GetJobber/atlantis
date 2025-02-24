import { Box, Button, Tooltip } from "@jobber/components";
import { SearchButton } from "./SearchButton";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { useTritonChat } from "../providers/TritonProvider";

export const TopNav = () => {
  const { onOpenTriton } = useTritonChat();

  return (
    <Box padding="base" direction="row" alignItems="center" gap="small">
      <Box
        direction="row"
        gap="small"
        justifyContent="center"
        width="grow"
        padding={{ left: "extravagant" }}
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
