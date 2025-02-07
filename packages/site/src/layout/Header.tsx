import { Box, Button } from "@jobber/components";
import { SearchButton } from "./SearchButton";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { useTritonChat } from "../providers/TritonProvider";

export const Header = () => {
  const { onOpenTriton } = useTritonChat();

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-small)",
        border: "var(--border-base) solid var(--color-border)",
        borderTop: "none",
      }}
    >
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box width={385} direction="row" alignItems="center" gap={"base"}>
          <Box width="100%">
            <SearchButton />
          </Box>
          <Button onClick={onOpenTriton} icon="sparkles" ariaLabel="triton" />
        </Box>
      </div>
      <ToggleThemeButton />
    </div>
  );
};
