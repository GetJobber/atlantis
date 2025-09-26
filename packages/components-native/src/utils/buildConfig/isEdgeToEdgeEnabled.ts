import { Platform } from "react-native";

type BuildCfg = { IS_EDGE_TO_EDGE_ENABLED?: boolean } | undefined | null;

function loadBuildConfig(): BuildCfg {
  try {
    const mod = require("react-native-build-config");

    return (mod?.default ?? mod) as BuildCfg;
  } catch {
    return null; // module not installed or not linked
  }
}

export function isEdgeToEdgeEnabled(): boolean {
  if (Platform.OS !== "android") return false;
  const cfg = loadBuildConfig();

  return !!cfg?.IS_EDGE_TO_EDGE_ENABLED;
}
