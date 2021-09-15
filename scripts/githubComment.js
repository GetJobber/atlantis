/* eslint-env node */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Octokit } = require("@octokit/core");
const { getAllPublicPackages } = require("./getPackages");

/**
 * Destructure some variables off of our environment for use later on.
 */
const {
  GIT_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_PULL_REQUEST,
  GH_USER,
} = process.env;

/**
 * Create a new instance of Octokit to comment on Pull Requests
 */
const octokit = new Octokit({ auth: GIT_TOKEN });
const issue_number = CIRCLE_PULL_REQUEST.substring(
  CIRCLE_PULL_REQUEST.lastIndexOf("/") + 1,
);

const initialComment = `
This is a comment from Circle CI.

## Packages
${listPublishedPackages()}
`;

const updatedComment = `
This is an updated comment from Circle CI

## Packages
${listPublishedPackages()}
`;

function hasLernaPublished() {
  const packages = getAllPublicPackages();
  const publishedPackages = [];
  let result = false;

  for (const package of packages) {
    const { name, version } = require(package);
    publishedPackages.push(`${name}@${version}`);
    if (!/^\^?\d+.\d+.\d+$/.test(version)) {
      result = true;
    }
  }

  return {
    result,
    publishedPackages,
  };
}

function listPublishedPackages() {
  const { publishedPackages } = hasLernaPublished();
  let result = ``;

  publishedPackages.forEach(package => {
    result += `
${package}
`;
  });

  return result;
}

async function commentOnPr() {
  /**
   * If lerna did not publish, do not comment
   */
  if (hasLernaPublished().result === true) {
    return;
  }

  /**
   * Get all of the comments from our current branch.
   */
  const comments = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: CIRCLE_PROJECT_USERNAME,
      repo: CIRCLE_PROJECT_REPONAME,
      issue_number,
    },
  );

  /**
   * Find if we have added a comment that contains some specific text.
   * This text should be kept in all comments so we have a unique way
   * to find the specific comment.
   */
  const comment = comments.data.find(
    message =>
      message.user.login === GH_USER &&
      message.body.includes("comment from Circle CI."),
  );

  if (comment) {
    /**
     * If we find a comment, we should update it with the new versions
     * that have been published
     */
    const { id } = comment;

    await octokit
      .request("PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}", {
        owner: CIRCLE_PROJECT_USERNAME,
        repo: CIRCLE_PROJECT_REPONAME,
        issue_number,
        comment_id: id,
        body: updatedComment,
      })
      .then(response => console.log(response));
  } else {
    /**
     * If there is no comment, we add an initial comment to the PR.
     */
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: CIRCLE_PROJECT_USERNAME,
        repo: CIRCLE_PROJECT_REPONAME,
        issue_number,
        body: initialComment,
      },
    );
  }
}

commentOnPr();
