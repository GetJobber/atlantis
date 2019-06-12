---
name: Atlantis
route: /
---

# 🔱 Atlantisssss

[![CircleCI](https://circleci.com/gh/GetJobber/atlantis/tree/master.svg?style=svg&circle-token=3f1b0343273ef589350516e23713e81c8c3ac094)](https://circleci.com/gh/GetJobber/atlantis/tree/master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a8bb241d-c781-4ed5-9e12-1f19094e521b/deploy-status)](https://app.netlify.com/sites/jobber-atlantis/deploys)

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

To install Atlantis locally for development:

```sh
git clone git@github.com:GetJobber/atlantis.git
cd atlantis
npm install
```

To start the [docz](https://www.docz.site/) development server:

```sh
npm start
```

### Testing

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

## Contributing

Everyone is a friend of Atlantis and we welcome pull requests. See the
[contribution guidelines](/CONTRIBUTING.md) to learn how.

## Publishing

### Pre-Release

```sh
lerna publish --canary --dist-tag next --preid pre
```

### For Realz

```sh
lerna publish
```
