// For retheme purposes only.
// This will be removed once the retheme is out of the experiment.
export function getAtlantisConfig() {
  let JOBBER_RETHEME = false;

  if (typeof window !== "undefined") {
    JOBBER_RETHEME = document.body.classList.contains("jobber-retheme");
  }

  return { JOBBER_RETHEME };
}
