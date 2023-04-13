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
  if (!process.env.summaryJSONString) {
    const workflowRunUrl = await github.rest.actions.getWorkflowRun({
      owner,
      repo,
      run_id: context.runId,
    });
    const previousBuildStatus = existingComment
      ? `\nPrevious build information:\n${existingComment.body}`
      : "";
    return `Failed to Publish Pre-release. See logs: ${workflowRunUrl.data.html_url}${previousBuildStatus}`;
  }
  const summaryFileJson = JSON.parse(process.env.summaryJSONString);

  const releaseString = summaryFileJson
    .map(releaseSummary => {
      const { packageName, version } = releaseSummary;
      return `  - ${packageName}@${version}\n`;
    })
    .join("");
  const toInstallString = summaryFileJson
    .map(releaseSummary => {
      const { packageName, version } = releaseSummary;
      return `${packageName}@${version}`;
    })
    .join(" ");
  return `Published Pre-release with versions:\n\`\`\`\n${releaseString}\`\`\`\n\nRun \`npm install ${toInstallString}\` to install the new versions`;
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
