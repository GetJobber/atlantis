import { Box, Button } from "@jobber/components";
import { SearchButton } from "./SearchButton";

interface HeaderProps {
  readonly onOpenTriton: () => void;
}

export const Header = ({ onOpenTriton }: HeaderProps) => {
  return (
    <div
      style={{
        width: "calc(100% - var(--sideBarWidth) - (2 * var(--space-small)))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-small)",
      }}
    >
      <Box width={385} direction="row" alignItems="center" gap={"base"}>
        <Box width={"100%"}>
          <SearchButton />
        </Box>
        <Button onClick={onOpenTriton} icon="sparkles" ariaLabel="triton" />
      </Box>
    </div>
  );
};
