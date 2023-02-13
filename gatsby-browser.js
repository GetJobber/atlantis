try {
  // eslint-disable-next-line import/no-internal-modules
  require("@jobber/fonts/dist/index.css");
} catch {
  console.log("Jobber fonts not found");
}
