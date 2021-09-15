/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Octokit } = require("@octokit/core");
// const { getAllPublicPackages } = require("./getPackages");

/**
 * Destructure some variables off of our environment for use later on.
 */
const { GIT_TOKEN, CIRCLE_PROJECT_USERNAME, CIRCLE_PROJECT_REPONAME } =
  process.env;

/**
 * Create a new instance of Octokit to comment on Pull Requests
 */
const octokit = new Octokit({ auth: GIT_TOKEN });

async function comment() {
  const comments = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: CIRCLE_PROJECT_USERNAME,
      repo: CIRCLE_PROJECT_REPONAME,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: 654,
    },
  );

  const commentToUpdate = comments.data.find(
    message =>
      message.user.login === "eddysims" &&
      message.body.includes("comment added from node"),
  );

  if (commentToUpdate) {
    const body = `
    This is a new updated comment added from node.
    `;
    await octokit
      .request("PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}", {
        owner: "GetJobber",
        repo: "atlantis",
        // eslint-disable-next-line @typescript-eslint/camelcase
        issue_number: 654,
        comment_id: commentToUpdate.id,
        body,
      })
      .then(response => console.log(response));
  } else {
    const body = `
    This is a comment added from node.
    `;
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: "GetJobber",
        repo: "atlantis",
        // eslint-disable-next-line @typescript-eslint/camelcase
        issue_number: 654,
        body,
      },
    );
  }

  // const body = `
  // This is a comment added from node.
  // `;

  // const response = await octokit.request(
  //   "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
  //   {
  //     owner: "GetJobber",
  //     repo: "atlantis",
  //     // eslint-disable-next-line @typescript-eslint/camelcase
  //     issue_number: 654,
  //     body,
  //   },
  // );
}

comment();
