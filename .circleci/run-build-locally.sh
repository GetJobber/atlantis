#!/usr/bin/env bash
git_branch=$(git rev-parse --abbrev-ref HEAD)
git_revision=$(git rev-parse HEAD)

curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=${git_revision}\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/getjobber/atlantis/tree/${git_branch}
