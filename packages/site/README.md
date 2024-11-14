# Welcome!

This is the new Atlantis Documentation site.

The site is currently under development, and not being shown anywhere publicly.

## Installation

The only way to view the site is to from this directory type into a console:

1. `npm install`
1. `npm run dev`

NodeJS should be the only pre-requisite, all other dependencies are covered by
the two commands.

## About

The site is a standard React-based application. After running the above
commands, you will have three directories:

1. node_modules -- Javascript dependencies, automatically managed, git ignored
   (should be greyed out in vscode)
2. public -- files that can be accessed directly from the server when it is
   running, and will be the static assest directory in production
3. src -- source code for the application.

### Source Code

The entry point is `src/main.tsx`

There is a base css file covering the entire application at `src/main.css`

The routing file for the application is found at `src/routes.tsx`

The semi-complete list of components is within `src/componentList.ts`

The semi-complete list of design documentation is within `src/designList.ts`

#### Top-level Directories

1. assets -> Static Assets that are referenced within the code. These will be
   bundled by vite automatically. This is in contrast to the root `public`
   directory which are pure static assets, and are not bundled by vite (but
   instead served by vite)
1. components -> These are standalone components that accept props, and display
   something. They're typically simple (with a few exceptions), and generally
   responsible for a single thing.
1. content -> Home for all static content + how that content is organized. Used
   primarily in the ComponentView. Each component in the system has its own
   `index.ts` or `index.tsx` file that acts as a map to where its written
   content, associated component, initial props, generated typescript props
   json, title, description, keywords (for searching), storybook links.
   Essentially a one-stop shop for a component.
1. hooks -> React based code for sharing functionality between components.
1. layout -> All components and content related to the Layout of the
   application. Mainly the page structure, navigation menu, and global search.
1. maps -> Content that is not a Component needs a related map entry. Currently
   only used for design, but could be expanded in the future.
1. pages -> Top level pages. These are 1:1 with the `src/routes.tsx` directory.
   An argument could be made to move the `src/routes.tsx` into the pages
   directory, but exposing `routes` at the root makes it slightly more
   discoverable.
1. types -> Shared types within the system. If you start to import types from
   another file, hoist the type to the types directory. Good way to prevent
   circular dependencies.
