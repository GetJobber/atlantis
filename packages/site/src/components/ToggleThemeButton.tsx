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
        boxShadow: "var(--shadow-base)",
        borderRadius: "var(--radius-base)",
        zIndex: 1,
      }}
      data-elevation="elevated"
    >
      <Button
        type="secondary"
        variation="subtle"
        label={isDark ? "☀️" : "🌒"}
        onClick={handleClick}
      />
    </div>
  );
};
