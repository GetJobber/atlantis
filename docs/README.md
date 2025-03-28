# 🔱 Atlantis

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

- `node@18`
- `npm@10`

To install Atlantis locally for development:

```sh
git clone git@github.com:GetJobber/atlantis.git
cd atlantis
npm install
```

To start the [Storybook](https://storybook.js.org/) development server:

```sh
npm start
```

### Monorepo notes

#### Installing dependencies

When installing dependencies, unless they are required for the documentation
viewer, they should be within the package you are working within.

#### Cross-linking

Within Atlantis, in order for one package to depend on another all that is
required is for it to be listed in the appropriate `package.json` file. Lerna
will automatically take care of managing the versions for you.

When working on some packages (for example `design`) locally, you'll need to run

```
 npm run bootstrap
```

and then

```
  npm start
```

to view and test your changes.

## Installing packages

Atlantis packages are installed and updated using [npm](https://www.npmjs.com/).
This following list has installation links for each package:

### Design system

These are the core packages you'll need to build with Atlantis:

- [Components](https://atlantis.getjobber.com/components)
- [Design](https://atlantis.getjobber.com/design)
- [Hooks](https://atlantis.getjobber.com/hooks)

#### Installing specific versions

Once a package is installed, update that package to the latest version by
running:

```sh
npm install @jobber/{package}@latest
```

or if you want a specific version:

```sh
npm install @jobber/{package}@{version}
```

### Tooling and configuration

If you're looking to build documentation and tooling using Atlantis' development
standards, these packages will be useful:

- [EsLint configuration](https://atlantis.getjobber.com/packages/eslint-config)
- [StyleLint configuration](https://atlantis.getjobber.com/packages/stylelint-config)

## Generating a component

Running the following command will prompt you for a component name and generate
a starting point consisting of a component, tests, styling, etc to help you get
started.

You should name your component in `PascalCase`.

```sh
npm run generate
```

You will be able to select the platform you want to create the component.

#### Example

```sh
❯❯❯ npm run generate

> atlantis@0.0.1 generate /path/to/atlantis
> plop

? Component Name: ExampleComponent
? Generate for:
> Web
> React Native
> Both

✔  +! 5 files added
 -> /packages/components/src/ExampleComponent/index.ts
 -> /packages/components/src/ExampleComponent/ExampleComponent.css
 -> /packages/components/src/ExampleComponent/ExampleComponent.stories.mdx
 -> /packages/components/src/ExampleComponent/ExampleComponent.test.tsx
 -> /packages/components/src/ExampleComponent/ExampleComponent.tsx
✔  +! 2 files added
 -> /docs/components/ExampleComponent/Web.stories.tsx
 -> /docs/components/ExampleComponent/ExampleComponent.stories.mdx
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

If you want to troubleshoot linting errors in CI, try running locally first to
find the error. If that doesn't work you can open the artifacts for the linting
step. To find the errors causing the failure, search for `Error - `.

## Repo structure

The `atlantis` repo is a monorepo consisting of a few different packages all
living in the `./packages/` directory.

The primary packages in here are:

- `packages/`
  - `components/`
    - The primary home for components. Each component lives in its own folder in
      the `./src` directory within here.
  - `design/`
    - A home for shareable css variables.

When installing dependencies be sure to install them relative to the appropriate
sub package. For example if you want to use package `foo` in the components
package, you would run `npm install foo -w @jobber/components`.

For more information on how the packages are bootstrapped, check out
[NPM workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces).

## Contributing

Everyone is a friend of Atlantis and we welcome pull requests. See the
[contribution guidelines](https://atlantis.getjobber.com/?path=/docs/contributing--docs)
to learn how.

## Publishing

Atlantis uses [Lerna](https://github.com/lerna/lerna) and will automatically
publish whenever a pull request is merged.

### Manual Release Instructions

Follow [semver](https://semver.org) when choosing versions.

```sh
npm run release-the-kraken
```

### Publishing a failed release to NPM

In some cases, the automatic release may successfully bump the version and add a
[changelog](https://atlantis.getjobber.com/changelog/components) but fail to
publish to NPM. If this happens and you're one of the Atlantis NPM
collaborators, run the code below to send unpublished versions to NPM.

```sh
npm run release:unpublished-package
```

## Pre-release

### Releasing manually (Team Atlantis Only)

```sh
npm run publish:prerelease
```

### Releasing with dependency changes

Lerna automatically determines which package changed and can be released.
However, if you've only changed/added/updated an NPM package, Lerna won't count
that as a releasable "change". The script below should allow you to create a
prerelease for package changes.

```sh
npm run publish:prerelease:force @jobber/components
```

_NOTE: You can replace `@jobber/components` with the package you want to
prerelease or remove it to prerelease all of them._

### Using Github Actions to Publish a Pre-release

It is possible to generate Pre-releases through GitHub Actions.

1. To do this create a Pull Request for your branch.
2. Navigate to the Actions tab.
3. Navigate to the `Trigger Pre-release Build` Action
4. Run click `Run Workflow`, select your branch and use the
   `Publish Pre-release (Recommended)` option
5. If you only have dependency changes run the `Force Publish <package>` to get
   those changes published. This is only needed if the only file modified is the
   `package.json` or `package-lock.json`
6. When the Action is finished your PR will have a comment with the new release
   versions

_NOTE: You can only do 1 pre-release per commit. If you trigger another
pre-release on a previously published commit, it will fail. This also happens on
forced pre-release._

## Local testing

If you're not sharing your changes with your peers yet and want a quicker way to
check your changes, you can run `npm run pack {{scope}}` from the root folder
against one of the workspaces.

```sh
npm run pack @jobber/components
```

That will create a `jobber-components-{{version}}.tgz` file on the root. You can
then install it on your project.

```sh
npm i your/path/to/atlantis/repo/jobber-components-{{version}}.tgz
```

You can replace `@jobber/components` with `@jobber/design`, `@jobber/hooks` or
the package you want to be packed up.

_**NOTE: Use a pre-release if you want to share your changes with someone else
instead of sending them the file.**_

### What has changed

```sh
lerna changed
```
