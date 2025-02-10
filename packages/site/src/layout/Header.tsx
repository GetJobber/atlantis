import { Box, Button, Tooltip } from "@jobber/components";
import { SearchButton } from "./SearchButton";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { useTritonChat } from "../providers/TritonProvider";

export const Header = () => {
  const { onOpenTriton } = useTritonChat();

  return (
    <Box
      padding="small"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap="base"
    >
      <div
        style={{
          flex: "1 1 0%",
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "385px",
            width: "100%",
          }}
        >
          <Box width="100%" direction="row" alignItems="center" gap="base">
            <Box width="100%">
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
        </div>
      </div>
      <ToggleThemeButton />
    </Box>
  );
};
