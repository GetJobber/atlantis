---
name: Docz Tools
menu: Packages
route: /packages/docz-tools
---

# Jobber Docz Tools

Jobber Docz Tools contains the theme and components to create Jobber flavored
documentation. Documentation is powered by [Docz](https://docz.site) and uses
[Theme UI](https://theme-ui.com) for styling.

## Usage

Install the package using `npm`.

```
npm install --save @jobber/docz-tools
```

Next, add the theme to a `gatsby-config.js` file at the root of your project.

```
// gatsby-config.js
module.exports = {
  plugins: [
    "@jobber/docz-tools",
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: ["@jobber/docz-tools"],
      },
    },
  ],
};
```

## Config

Jobber flavored documentation is powered by [Docz](https://docz.site). However
it also adds a few custom `config` options added to your `doczrc.js` to allow
minor customizations to the theme.

### Logo

The Logo can be added by adding a relative path to the logo image that you would
like to use.

```
// doczrc.js
export default {
  ...,
  themeConfig: {
    ...,
    logo: `/relative/path/to/logo/file.svg`
  }
}
```

### Sidebar Width

The sidebar width can be adjusted.

```
// doczrc.js
export default {
  ...,
  themeConfig: {
    ...,
    sideBarWidth: 275
  }
}
```

### Container Width

The container width can be adjusted. This will adjust the width that the content
of the documention is displayed at.

```
// doczrc.js
export default {
  ...,
  themeConfig: {
    ...,
    containerWidth: 768
  }
}
```

## Frontmatter

The `@jobber/docz-tools` allows for some custom front matter to be added to your
`mdx` files.

### showDirectoryLink

Adding `showDirectoryLink` will add a new link to the directory where the `mdx`
file is located on Github.

_`showDirectoryLink` must be set to a boolen of `true`._

```
---
name: Component Name
showDirectoryLink: true
---
```
