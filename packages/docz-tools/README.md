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

### Sidebar Offset

The sidebar offset can be adjusted if you have a wrapping component at the top,
such as a primary navigation bar. By default, it is `0` and represents
`pixels / px`.

```
// doczrc.js
export default {
  ...,
  themeConfig: {
    ...,
    sidebarOffset: 100
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

### Hide / Show Actions

The actions in the top right can be hidden if required by adjusting `hasActions`
to false. By default it is `true`.

```
// doczrc.js
export default {
  ...,
  themeConfig: {
    ...,
    hasActions: false
  }
}
```

### Hide / Show Logo

The logo within the sidebar can be hidden if required by adjusting `hasLogo` to
false. By default it is `true`.

```
// doczrc.js
export default {
  ...,
  themeConfig: {
    ...,
    hasLogo: false
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

## Prioritizing items in the navigation

`@jobber/docz-tools` allows you to prioritize items within the sidebar
navigation by adding a `(0x)` prefix to the `name` or `menu` item in the
frontmatter.

In the following example, we will prioritize the `Switch` item over the `Button`
item in the menu.

```md
## <!-- Button.mdx -->

name: Button menu: Components/Actions

---

## <!-- Switch.mdx -->

name: (01) Switch menu: Components/Actions

---
```

The same can be done for menus. In the example below, we are prioritizing the
`Layout` menu before the `Actions` menu.

```md
## <!-- Button.mdx -->

name: Button menu: Components/Actions

---

## <!-- Banner.mdx -->

name: Banner menu: Components/(01) Layout

---
```
