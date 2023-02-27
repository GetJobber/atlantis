const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: '🔱 Atlantis',
    description:
      'Atlantis is a design system for Jobber. The primary objective for Atlantis is to provide a system of reusable components to help developers to quickly build beautiful and consistent interfaces for our users.',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: ['Atlantis', 'Patterns', 'Components', 'Hooks', 'Design'],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [
          './docs/CHARTER.md',
          './docs/proposals/**/*',
          './packages/generators/templates/**/*',
          './packages/**/dist/**/*',
          '**/node_modules/**',
          './docz',
          './github',
          './public',
          '**/__mocks__',
          '**/*.stories.mdx',
          './packages/components/src/ButtonDismiss/ButtonDismiss.mdx',
          './packages/components/src/FormField/FormField.mdx',
        ],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/taylornoj/workspace/atlantis/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: [
          './docs/**/*.{md,mdx}',
          './packages/components/src/**/!(*.stories).{md,mdx}',
          './packages/design/src/**/!(*.stories).{md,mdx}',
          './packages/eslint-config/src/**/!(*.stories).{md,mdx}',
          './packages/formatters/src/**/!(*.stories).{md,mdx}',
          './packages/generators/src/**/!(*.stories).{md,mdx}',
          './packages/hooks/src/**/!(*.stories).{md,mdx}',
          './packages/docx/src/**/!(*.stories).{md,mdx}',
          './packages/stylelint-config/src/**/!(*.stories).{md,mdx}',
          './packages/docz-tools/src/**/!(*.stories).{md,mdx}',
          './packages/components/README.{md,mdx}',
          './packages/design/README.{md,mdx}',
          './packages/eslint-config/README.{md,mdx}',
          './packages/formatters/README.{md,mdx}',
          './packages/generators/README.{md,mdx}',
          './packages/hooks/README.{md,mdx}',
          './packages/docx/README.{md,mdx}',
          './packages/stylelint-config/README.{md,mdx}',
          './packages/docz-tools/README.{md,mdx}',
          './packages/components/CHANGELOG.md',
          './packages/design/CHANGELOG.md',
          './packages/eslint-config/CHANGELOG.md',
          './packages/formatters/CHANGELOG.md',
          './packages/generators/CHANGELOG.md',
          './packages/hooks/CHANGELOG.md',
          './packages/docx/CHANGELOG.md',
          './packages/stylelint-config/CHANGELOG.md',
          './packages/docz-tools/CHANGELOG.md',
        ],
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: '🔱 Atlantis',
        description:
          'Atlantis is a design system for Jobber. The primary objective for Atlantis is to provide a system of reusable components to help developers to quickly build beautiful and consistent interfaces for our users.',
        host: '0.0.0.0',
        port: 3333,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/taylornoj/workspace/atlantis',
          templates:
            '/Users/taylornoj/workspace/atlantis/node_modules/docz-core/dist/templates',
          docz: '/Users/taylornoj/workspace/atlantis/.docz',
          cache: '/Users/taylornoj/workspace/atlantis/.docz/.cache',
          app: '/Users/taylornoj/workspace/atlantis/.docz/app',
          appPackageJson: '/Users/taylornoj/workspace/atlantis/package.json',
          appTsConfig: '/Users/taylornoj/workspace/atlantis/tsconfig.json',
          gatsbyConfig: '/Users/taylornoj/workspace/atlantis/gatsby-config.js',
          gatsbyBrowser:
            '/Users/taylornoj/workspace/atlantis/gatsby-browser.js',
          gatsbyNode: '/Users/taylornoj/workspace/atlantis/gatsby-node.js',
          gatsbySSR: '/Users/taylornoj/workspace/atlantis/gatsby-ssr.js',
          importsJs: '/Users/taylornoj/workspace/atlantis/.docz/app/imports.js',
          rootJs: '/Users/taylornoj/workspace/atlantis/.docz/app/root.jsx',
          indexJs: '/Users/taylornoj/workspace/atlantis/.docz/app/index.jsx',
          indexHtml: '/Users/taylornoj/workspace/atlantis/.docz/app/index.html',
          db: '/Users/taylornoj/workspace/atlantis/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
