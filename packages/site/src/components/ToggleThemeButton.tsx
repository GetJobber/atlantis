import {
  Button,
  Theme,
  updateTheme,
  useAtlantisTheme,
} from "@jobber/components";
import { saveTheme } from "../utils/theme";

export const ToggleThemeButton = () => {
  const { theme } = useAtlantisTheme();
  const isDark = theme === "dark";

  const handleClick = () => {
    const newTheme: Theme = isDark ? "light" : "dark";
    updateTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "var(--space-base)",
        right: "var(--space-base)",
      }}
    >
      <Button
        type="secondary"
        label={isDark ? "☀️" : "🌕"}
        onClick={handleClick}
      />
    </div>
  );
};
