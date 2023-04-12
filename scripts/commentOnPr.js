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
  });
};

function generatePRComment(summaryFileJson) {
  const releaseString = summaryFileJson
    .map(releaseSummary => {
      const { packageName, version } = releaseSummary;

      return `  - ${packageName}@${version}\n`;
    })
    .join("");
  return `Published Pre-release with versions:\n\`\`\`\n${releaseString}\`\`\``;
}

async function getPRs({ github, repo, owner, ref }) {
  const response = await github.rest.pulls.list({
    repo,
    owner,
    head: `${owner}:${ref}`,
  });
  return response.data.map(pr => pr.number);
}

async function createOrUpdateComment({ github, repo, owner, prs }) {
  const summaryFileJson = JSON.parse(process.env.summaryJSONString);

  const commentBody = generatePRComment(summaryFileJson);
  const issueNumber = Number(prs[0]);

  const comments = await github.rest.issues.listComments({
    issue_number: issueNumber,
    owner,
    repo,
  });
  const matchExpr = new RegExp(".*Published Pre-release.*");

  const existingComment = comments.data.find(
    comment =>
      comment.user &&
      /.*bot.*/i.test(comment.user.type) &&
      /.*github-actions.*/i.test(comment.user.login) &&
      comment.body?.match(matchExpr),
  );

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
