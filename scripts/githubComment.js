/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getAllPublicPackages } = require("./getPackages");

function githubComment() {
  console.log(getAllPublicPackages());
}

githubComment();
