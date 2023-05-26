module.exports = async ({ github, context, core }) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  const prs = await getPRs({ github, repo, owner, ref: context.ref });
  if (prs.length === 0) {
    core.info("No PRs found");
    return;
  }
  await createOrUpdateComment({
    github,
    repo,
    owner,
    prs,
    context,
  });
};

async function generatePRComment({
  context,
  github,
  owner,
  repo,
  existingComment,
}) {
  if (!process.env.SUMMARY_JSON_STRING) {
    const workflowRun = await github.rest.actions.getWorkflowRun({
      owner,
      repo,
      run_id: context.runId,
    });
    const workflowRunUrl = workflowRun.data.html_url;
    const quotedPreviousComment = quotePreviousComment(existingComment?.body);

    const previousBuildStatus = quotedPreviousComment
      ? `\nPrevious build information:\n${quotedPreviousComment}`
      : "";
    return `Could not publish Pre-release for ${process.env.COMMIT_SHA}. [View Logs](${workflowRunUrl})\nThe problem is likely in the \`NPM Publish\` or \`NPM CI\` step in the \`Trigger Pre-release Build\` Job.\n${previousBuildStatus}.\n `;
  }
  const summaryFileJson = JSON.parse(process.env.SUMMARY_JSON_STRING);

  const releaseString = summaryFileJson
    .map(releaseSummary => {
      const { packageName, version } = releaseSummary;
      return `  - ${packageName}@${version}\n`;
    })
    .join("");
  const webInstallString = getInstallPackageString(
    summaryFileJson.filter(releaseSummary => {
      const { packageName } = releaseSummary;
      return packageName !== "@jobber/components-native";
    }),
  );
  const mobileInstallString = getInstallPackageString(
    summaryFileJson.filter(releaseSummary => {
      const { packageName } = releaseSummary;
      return packageName !== "@jobber/components";
    }),
  );

  return `Published Pre-release for ${process.env.COMMIT_SHA} with versions:\n\`\`\`\n${releaseString}\`\`\`\n\nTo install the new version(s) for Web run:\n\`\`\`\nnpm install ${webInstallString}\n\`\`\`\n\nTo install the new version(s) for Web run:\n\`\`\`\nnpm install ${mobileInstallString}\n\`\`\``;
}

async function getPRs({ github, repo, owner, ref }) {
  const response = await github.rest.pulls.list({
    repo,
    owner,
    head: `${owner}:${ref}`,
  });
  return response.data.map(pr => pr.number);
}

async function createOrUpdateComment({ github, repo, owner, prs, context }) {
  const issueNumber = Number(prs[0]);

  const comments = await github.rest.issues.listComments({
    issue_number: issueNumber,
    owner,
    repo,
  });
  const matchExpr = new RegExp(".*Pre-release.*");

  const existingComment = comments.data.find(
    comment =>
      comment.user &&
      /.*bot.*/i.test(comment.user.type) &&
      /.*github-actions.*/i.test(comment.user.login) &&
      comment.body?.match(matchExpr),
  );
  const commentBody = await generatePRComment({
    github,
    repo,
    owner,
    context,
    existingComment,
  });

  if (existingComment) {
    await github.rest.issues.updateComment({
      comment_id: existingComment.id,
      owner,
      repo,
      body: commentBody,
    });
  } else {
    await github.rest.issues.createComment({
      issue_number: issueNumber,
      owner,
      repo,
      body: commentBody,
    });
  }
}

function quotePreviousComment(previousCommentBody) {
  if (!previousCommentBody) {
    return "";
  }
  return previousCommentBody
    .split("\n")
    .map(commentBodyLine => {
      return `> ${commentBodyLine}`;
    })
    .join("\n");
}

function getInstallPackageString(packages) {
  return packages
    .map(releaseSummary => {
      const { packageName, version } = releaseSummary;
      return `${packageName}@${version}`;
    })
    .join(" ");
}
