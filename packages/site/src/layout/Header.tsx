import { Box, Button } from "@jobber/components";
import { SearchButton } from "./SearchButton";
import { ToggleThemeButton } from "../components/ToggleThemeButton";

interface HeaderProps {
  readonly onOpenTriton: () => void;
}

export const Header = ({ onOpenTriton }: HeaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-small)",
        borderLeft: "var(--border-base) solid var(--color-border)",
        borderBottom: "var(--border-base) solid var(--color-border)",
      }}
    >
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box width={385} direction="row" alignItems="center" gap={"base"}>
          <Box width={"100%"}>
            <SearchButton />
          </Box>
          <Button onClick={onOpenTriton} icon="sparkles" ariaLabel="triton" />
        </Box>
      </div>
      <ToggleThemeButton />
    </div>
  );
};
