# eslint-plugin-jobber

Custom ESLint rules for Jobber projects.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```bash
npm i eslint --save-dev
```

Next, install `eslint-plugin-jobber`:

```bash
npm install eslint-plugin-jobber --save-dev
```

## Usage

Add `jobber` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["jobber"]
}
```

Then configure the rules you want to use:

```json
{
  "rules": {
    "jobber/no-src-imports": "warn"
  }
}
```

Or use the recommended configuration:

```json
{
  "extends": ["plugin:jobber/recommended"]
}
```

## Rules

### no-src-imports

This rule warns when imports reference `@jobber/*/src/*` paths, which won't work
correctly when the packages are bundled and used in another repository.

Example of incorrect code:

```javascript
import { Clearable } from "@jobber/hooks/src/useShowClear";
```

Example of correct code:

```javascript
import { Clearable } from "@jobber/hooks";
```

## Why this rule is needed

When packages like `@jobber/components`, `@jobber/hooks`, etc. are bundled and
distributed, the internal directory structure is not preserved. Imports that
reference `/src/` directories will fail in consuming repositories.

This rule helps catch these invalid imports early to prevent runtime errors.
