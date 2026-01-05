<!--
## Important notes

* Atlantis is a PUBLIC repo. Please avoid sharing internal details/context.
* If you haven't yet, please create a slack thread to ensure UXF is aware of this PR.

## PR title formatting

Atlantis uses Conventional Commits to track versions.
Pull request titles should follow the following format.

For help creating your pull request, you can [use this tool](https://atlantis.getjobber.com/guides/pull-request-title-generator)

<TYPE>(<optional SCOPE>): <conditionally BREAKING CHANGE:> <description>

eg.
fix(SCOPE): stop graphite breaking when too much pressure applied — Patch Release
feat(SCOPE): add 'graphiteWidth' option — (Minor) Feature Release
feat(SCOPE): BREAKING CHANGE: remove graphiteWidth option — (Major) Breaking Release

TYPE should consist of:
- fix: a commit of the type fix patches a bug in your codebase
- feat: a commit of the type feat introduces a new feature to the codebase
- docs: documentation only changes
- build: improvements to the build system
- refactor: a change that neither fixes a bug nor introduces a feature
- chore: other changes that don't modify src or test files

SCOPE should be one of:
- components
- components-native
- deps
- deps-dev
- design
- docx
- eslint
- formatters
- generators
- hooks
- stylelint


If your pull request introduces a breaking change please append `BREAKING CHANGE:` following type / scope.

Further Reading:
- https://www.conventionalcommits.org
- https://github.com/commitizen/conventional-commit-types/blob/master/index.json
-->

## Motivations

<!-- Why did you do what you did? -->

## Changes

<!-- https://keepachangelog.com/en/1.0.0/ -->

### Added

- <!-- new features -->

### Changed

- <!-- changes in existing functionality -->

### Deprecated

- <!-- soon-to-be removed features -->

### Removed

- <!-- now removed features -->

### Fixed

- <!-- for any bug fixes -->

### Security

- <!-- in case of vulnerabilities -->

## Testing

<!-- How to test your changes. -->

Changes can be
[tested via Pre-release](https://github.com/GetJobber/atlantis/actions/workflows/trigger-qa-build.yml)

---

[In Atlantis we use Github's built in pull request reviews](https://help.github.com/en/articles/about-pull-request-reviews).
