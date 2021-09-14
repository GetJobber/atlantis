/**
 * In Atlantis 🔱, we want to ensure that there are never any direct
 * version bumps to any of the @jobber packages. The reason being is
 * that if a version is manually bumped, lerna will have a stuggle to
 * try and figure out what the next proper version to release is.
 */

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Octokit } = require("@octokit/core");
const glob = require("glob");

const octokit = new Octokit({
  auth: `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`,
});

function getAllPackages() {
  /**
   * Define some root directories for us to work with
   */
  const atlantis = process.cwd();
  const packages = `${atlantis}/packages`;

  /**
   * Get a list of all of our package.json files within the
   * packages directory.
   */
  const packageJsons = glob.sync(`${packages}/**/package.json`, {
    ignore: [`${atlantis}/**/node_modules/**`],
  });

  return packageJsons;
}

function getAllPublicPackages() {
  /**
   * Get a list of all of our package.json files within the
   * packages directory and then remove any that are private.
   */
  const packages = getAllPackages();
  const publicPackages = packages.filter(file => {
    const { private } = require(file);
    return !private;
  });

  return publicPackages;
}

async function comment() {
  const body = `
  This is a cool
  comment directly from my
  local machine

  \`code snippet?\`

  \`\`\`tsx
  import { Foo } from 'foo';
  \`\`\`
  `;

  const response = await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: "GetJobber",
      repo: "atlantis",
      issue_number: 647,
      body,
    },
  );

  console.log(response);
}

async function getCommits() {
  // const packages = getAllPublicPackages();
  // for (const package of packages) {
  //   const pkg = require(package);
  //   console.log(pkg.version);
  // }

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{issue_number}/commits",
    {
      owner: "GetJobber",
      repo: "atlantis",
      issue_number: 647,
    },
  );

  const commits = response.data.map(commit => commit.sha);
  console.log(commits);
}

getCommits();
