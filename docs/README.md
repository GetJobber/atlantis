---
name: Atlantis
route: /
---

# 🔱 Atlantis

[![CircleCI](https://circleci.com/gh/GetJobber/atlantis/tree/master.svg?style=svg&circle-token=3f1b0343273ef589350516e23713e81c8c3ac094)](https://circleci.com/gh/GetJobber/atlantis/tree/master)

## What is Atlantis?

> Design systems enable teams to build better products faster by making design
> reusable—reusability makes scale possible. This is the heart and primary value
> of design systems. A design system is a collection of reusable components,
> guided by clear standards, that can be assembled together to build any number
> of applications.

Atlantis is a design system for [Jobber](https://getjobber.com). The primary
objective for Atlantis is to provide a system of reusable components to help
developers to quickly build beautiful and consistent interfaces for our users.

## Development

### Prerequisites

- `node@10` or higher
- `npm@6`

To install Atlantis locally for development:

```sh
git clone git@github.com:GetJobber/atlantis.git
cd atlantis
npm ci
```

To start the [docz](https://www.docz.site/) development server:

```sh
npm start
```

### Monorepo Notes

#### Installing Dependencies

When installing dependencies, unless they are required for the documentation
viewer, they should be within the package you are working within.

#### Cross Linking

If you are making a change in one package that will be needed in another you
will need to make the needed change and run a `npm run lerna:bootstrap` before
using it. The bootstrap will recompile and link the changes across the project.

It's also worth noting that within Atlantis in order for one package to depend
on another all that is required is for it to be listed in the appropriate
`package.json` file. Lerna will automatically take care of managing the versions
for you.

## Installing packages

Atlantis packages are installed and updated using [npm](https://www.npmjs.com/).
This following list has installation links for each package:

### Design system

These are the core packages you'll need to build with Atlantis:

- [Components](/packages/components)
- [Design foundations](/packages/design)
- [Hooks](/packages/hooks)

### Tooling and configuration

If you're looking to build documentation and tooling using Atlantis' development
standards, these packages will be useful:

- [Docz tools](/packages/docz-tools)
- [EsLint configuration](/packages/eslint-config)
- [StyleLint configuration](/packages/stylelint-config)

## Generating a Component

Running the following command will prompt you for a component name and generate
a starting point consisting of a component, tests, styling, etc to help you get
started.

You should name your component in `PascalCase`.

```sh
npm run generate
```

#### Example

```sh
❯❯❯ npm run generate

> atlantis@0.0.1 generate /path/to/atlantis
> plop

? Component Name: ExampleComponent
✔  +! 5 files added
 -> /packages/components/src/ExampleComponent/index.ts
 -> /packages/components/src/ExampleComponent/ExampleComponent.css
 -> /packages/components/src/ExampleComponent/ExampleComponent.mdx
 -> /packages/components/src/ExampleComponent/ExampleComponent.test.tsx
 -> /packages/components/src/ExampleComponent/ExampleComponent.tsx
```

## Testing

To run tests:

```sh
npm test
```

### Linting

To ensure your code passes our linters run:

```sh
npm run lint
```

You can also auto fix many linting errors by running:

```
npm run lint:fix
```

You can run the linters separately with:

```sh
npm run lint:css
npm run lint:ts
```

## Repo Structure

The `atlantis` repo is a monorepo consisting of a few different packages all
living in the `./packages/` directory.

The primary packages in here are:

- `packages/`
  - `components/`
    - The primary home for components. Each component lives in its own folder in
      the `./src` directory within here.
  - `design/`
    - A home for shareable css variables.
  - `docx/`
    - Any components internal to the documention viewer itself.

When installing dependencies be sure to install them relative to the appropriate
sub package. For example if you want to use package `foo` in a component you
would run `npm install foo` from within the `components` directory.

## Contributing

Everyone is a friend of Atlantis and we welcome pull requests. See the
[contribution guidelines](/CONTRIBUTING.md) to learn how.

## Publishing

Atlantis uses [Lerna](https://github.com/lerna/lerna) and will automatically
automatically publish whenever a pull request is merged.

<details>
<summary>Manual Release Instructions</summary>
<p>Follow <a href="https://semver.org" target="_blank">semver</a> when choosing versions.</p>
<code>npm run release-the-kraken</code>
</details>

### Pre-Release

```sh
npm run prerelease
```

### What has Changed

```sh
lerna changed
```
