# Atlantis Preview

Atlantis Preview is a Live Code Editor for Atlantis Components.

It's composed of two parts: A way to edit code, and a way to preview what that
code looks like.

There is a React Provider to act as an orchestrator to ferry the code between
the editor and the preview so they have no knowledge of each other.

You can edit the code directly, or you can inject code snippets which we do when
swapping tabs.

## How does it work under the hood?

The power of iframes!

In a less pithy description:

1. We take the code from a `<textarea>` dressed up with line numbers and syntax
   highlighting.
1. We wrap that code with `function` boilerplate, and a `return` statement if
   the code doesn't have one.
1. We transpile that code with Babel (we assume Typescript, React, and
   Atlantis).
1. We send the transpiled code to an iframe, where it is rendered like magic in
   front of our eyes.
1. We all say "Wow that was cool."

## I want to make changes, how do I get started?

The AtlantisPreviewProvider is the top level orchestrator. It initializes two
hooks:

1. `useAtlantisPreviewViewer` which provides the tools for viewing a preview
   (two iframes for mobile/web, and a mechanism to update which one is active)
1. `useAtlantisPreviewCode` which accepts the iframes, and provides the active
   code + errors.

These pieces are the glue that ferry all the required parts around.

`AtlantisPreviewViewer` is very basic, it's just a wrapper with two iframes, and
we attach React Refs out of our Context.

The `type` (web or mobile) determines which iframe is visible and in the DOM.

`AtlantisPreviewEditor` is built on CodeMirror. We first initalize that library,
attach a callback to notify the provider when the code has changed (so it can
re-transpile and update the preview). We have a custom theme for Code Mirror,
which is built on our design tokens and loaded via `useAtlantisPreviewCodeTheme`

The last file is `useAtlantisPreviewSkeleton`, this file contains the wrapping
HTML/Code for generating the Preview. We have a set of imports, one for mobile,
and one for web. These imports wrap every example so we don't require imports in
our examples, but that may change in the future if users prefer explicit import
statements. Also in this file is the code required for directly updating +
modifying the content of the iframes.

## Why didn't you just use Sandpack/React-Live/OtherLibrary?

We have a couple of unique needs, primarily react-native and some older
libraries/approaches that we're actively trying to update. We wanted a
lightweight solution in the interim that loaded in quickly, and didn't require a
lot of overhead. We looked under the hood of the listed libraries, and saw both
Babel + CodeMirror as solutions for the two problems that aren't easily solved
(transpiling React + custom syntax highlighting). So we've combined those two
pieces, with a bit of custom styling, code and the power of an iframe as a
lightweight solution.

# External Requirements

You need to provide your own browser-ready build of Atlantis, both for
components and components-native. The code here expects those builds to be
present at `/editorBundle.js` for web and `/editorMobileBundle.js` for mobile.
You can modify those locations in the `useAtlantisPreviewSkeleton` file, the
`skeletonHTML` function specifically.

If you're reading this README from the context of the Atlantis Documentation
site, we build those two files using Rollup, via `editorBundle.rollup.config.js`
and `editorMobileBundle.rollup.config.js` respectively, which are built via our
`npm run dev` command.
