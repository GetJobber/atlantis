import { readFileSync } from "fs";

const summaryFileName = "./lerna-publish-summary.json";

module.exports = async ({ github, context }) => {
  const summaryFileJson = JSON.parse(readFileSync(summaryFileName, "utf8"));
  const prs = await github.rest.pulls
    .list({
      repo: context.repo.repo,
      owner: context.repo.owner,
      head: `${context.owner}:${context.ref}`,
    })
    .data.map(pr => pr.number);
  const commentBody = generatePRComment(summaryFileJson);
  if (prs.length === 0) return;
  const issueNumber = Number(prs[0]);
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const comments = await github.rest.issues.listComments({
    issue_number: issueNumber,
    owner,
    repo,
  });

  const existingComment = comments.data.find(
    comment =>
      comment.user &&
      /.*bot.*/i.test(comment.user.type) &&
      /.*jobbie.*/i.test(comment.user.login),
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
};

function generatePRComment(summaryFileJson) {
  const releaseString = summaryFileJson.map(releaseSummary => {
    const { packageName, version } = releaseSummary;
    return `  -${packageName}@${version}\n`;
  });
  return `\`\`\`${releaseString}\`\`\``;
}
