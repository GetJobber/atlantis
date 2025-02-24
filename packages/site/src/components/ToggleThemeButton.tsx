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
    <Button
      variation="subtle"
      label={isDark ? "☀️" : "🌒"}
      onClick={handleClick}
    />
  );
};
