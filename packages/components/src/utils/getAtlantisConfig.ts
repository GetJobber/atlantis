// This is a workaround for the lack of context and its limitations in Jobber.
export function getAtlantisConfig(): typeof window.ATLANTIS_CONFIG {
  return window.ATLANTIS_CONFIG;
}
