import { Box, Button, Tooltip } from "@jobber/components";
import { SearchButton } from "./SearchButton";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { useTritonChat } from "../providers/TritonProvider";

export const Header = () => {
  const { onOpenTriton } = useTritonChat();

  return (
    <Box padding="base" direction="row" alignItems="center" gap="small">
      <div
        style={{
          display: "flex",
          flexGrow: "1",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 0 0 var(--space-extravagant)",
          gap: "var(--space-small)",
        }}
      >
        <div style={{ minWidth: "200px" }}>
          <SearchButton />
        </div>
        <Tooltip message="Ask Triton">
          <Button
            onClick={onOpenTriton}
            icon="sparkles"
            ariaLabel="triton"
            variation="subtle"
          />
        </Tooltip>
      </div>
      <ToggleThemeButton />
    </Box>
  );
};
