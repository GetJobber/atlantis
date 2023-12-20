// For retheme purposes only.
// This will be removed once the retheme is out of the experiment.
export function getAtlantisConfig(): typeof window.ATLANTIS_CONFIG {
  if (typeof window !== "undefined") {
    return window.ATLANTIS_CONFIG;
  }
}
