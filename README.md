# What is Atlantis?

🔱 Atlantis is a design system for Jobber. The primary objective for Atlantis is
to provide a system of reusable components to help developers to quickly build
beautiful and consistent interfaces for our users.

## Development

To install Atlantis locally for development:

```sh
git clone git@github.com:GetJobber/atlantis.git
cd atlantis
yarn
```

To start the [docz](https://www.docz.site/) development server:

```sh
yarn start
```

### Testing

To run tests:

```sh
yarn test
```

### Linting

To ensure your code passes our linters run:

```sh
yarn lint:css
yarn lint:ts
```

or as one command run:

```sh
yarn lint
```

You can also auto fix many linting errors by running:

```
yarn lint:fix
```

## Contributing

Everyone is a friend of Atlantis and we welcome pull requests. See the
[contribution guidelines](/CONTRIBUTING.md) to learn how.

## Publishing

### Pre-Release

lerna publish --canary --dist-tag next --preid pre

### For Realz

lerna publish
