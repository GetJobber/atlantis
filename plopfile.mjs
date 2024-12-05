/* eslint-env node */
/* eslint-disable import/no-default-export */

export default async plop => {
  await plop.load("./packages/generators/index.mjs");
};
