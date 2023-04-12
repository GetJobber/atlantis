// eslint-disable-next-line max-statements
module.exports = async ({ github, context, core }) => {
  const summaryFileJson = JSON.parse(process.env.summaryJSONString);
  const response = await github.rest.pulls.list({
    repo: context.repo.repo,
    owner: context.repo.owner,
    head: `${context.repo.owner}:${context.ref}`,
  });
  const prs = response.data.map(pr => pr.number);

  const commentBody = generatePRComment(summaryFileJson);
  if (prs.length === 0) {
    core.info(
      "No PRs found",
      JSON.stringify({ response, contextRef: context.ref }),
    );
    return;
  }
  const issueNumber = Number(prs[0]);
  const owner = context.repo.owner;
  const repo = context.repo.repo;
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
  let commentResponse;
  if (existingComment) {
    commentResponse = await github.rest.issues.updateComment({
      comment_id: existingComment.id,
      owner,
      repo,
      body: commentBody,
    });
  } else {
    commentResponse = await github.rest.issues.createComment({
      issue_number: issueNumber,
      owner,
      repo,
      body: commentBody,
    });
  }
  core.info(JSON.stringify(commentResponse));
};

function generatePRComment(summaryFileJson) {
  const releaseString = summaryFileJson
    .map(releaseSummary => {
      const { packageName, version } = releaseSummary;

      return `  - ${packageName}@${version}\n`;
    })
    .join("");
  return `Published Pre-release with versions:\n\`\`\`${releaseString}\`\`\``;
}
