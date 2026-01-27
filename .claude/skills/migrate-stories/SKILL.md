---
# README
# This skill can be run via Claude Code or any IDEs that support Claude Skills (Cursor).
# To run this skill, simply type `/migrate-stories [componentName]`
#
# Claude Code Permissions
# By default it will ask you for each command it needs to run. It's up to you to determine
# whether to allow those commands and whether to run them by default in the future.
name: migrate-stories
description: Migrates storybook stories from v7 to v9.
argument-hint: "[componentName]"
context: fork
disable-model-invocation: true
---

## Important Context

Throughout this document, "SomeComponentName" is used as a placeholder. Always replace it with $ARGUMENTS which is the component we're focused on migrating today.


## Background

We currently have 3 instances of storybook:

* Storybook v7 (old)
  * These live under `docs/components/SomeComponentName`
* Storybook v9 web
  * These live under `packages/components/src/SomeComponentName`
* Storybook v9 mobile
  * These live under `packages/components-native/src/SomeComponentName`


## The Goal

We're in the process of migrating old v7 stories to the new web/mobile v9 storybook instances.

Your job today is to follow the instructions below and migrate stories from v7 to their respective web and/or mobile v9 instances. Do the tasks in the order they are defined in.

Do NOT run test suites or execute npm commands. Just do the changes and I'll QA after that.


## Tasks

### Move stories

Each component has web and/or mobile stories. They live under `docs/components/SomeComponentName`. Web stories are named `Web.stories.tsx` and mobile stories are named `Mobile.stories.tsx`. Sometimes you may come across files like `WebV2`, those are also web stories.

For web stories: move the component's `Web.stories.tsx` file to its v9 directory.

For mobile stories: move the component's `Mobile.stories.tsx` file to its v9 directory.

**IMPORTANT:** In both cases, you must rename the file to follow this format: `SomeComponentName.stories.tsx`. You also may come across files that are imported by the stories, and in that case you should move those files to their respective v9 directories as well.

**IMPORTANT:** Only move the files, DO NOT make any modifications at this stage. After moving the files, make a git commit to the current branch for that.

### Modernizing stories

After moving the stories, you'll need to modernize them. Here's a couple things below you'll need to change. If you get stuck or confused, refer to @packages/components/src/Autocomplete/Autocomplete.stories.tsx which is a v9 example that works.

After you make these changes, commit them with details about what you had to change and why if necessary.

1. Update imports for v9

Before:

```tsx
import type { ComponentMeta, ComponentStory } from "@storybook/react";
```

After:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
```

2. Update how meta is exported

Before:

```tsx
export default {
    title: "Components/Actions/SomeComponentName/Web",
    component: SomeComponentName,
    parameters: {
        viewMode: "story",
        previewTabs: { code: { hidden: false } },
    },
    decorators: [
        // Workaround Storybook's wrapping flex parent that make everything full width
        story => <div>{story()}</div>,
    ],
} as ComponentMeta<typeof SomeComponentName>;
```

After:


```tsx
// NOTE: the comments are for context, do not add these.
const meta = {
    // Removed the /Web or /Mobile path part
    title: "Components/Actions/SomeComponentName",
    component: SomeComponentName,
    // Removed parameters that were unnecessary in this case. Always remove previewTabs.
    // Removed decorators that were unnecessary in this case.
} satisfies Meta<typeof SomeComponentName>;
export default meta;
type Story = StoryObj<typeof meta>;
```

3. Update story definition

Only update the way the story is defined. DO NOT update the contents of any story.

Before:

```tsx
export const SomeExample = SomeExampleTemplate.bind({});

const SomeExampleTemplate: ComponentStory<typeof SomeComponentName> = (args) => (
    <div>
        Example...
    </div>
);
```

After:

```tsx
export const SomeExample: Story = {
    render: SomeExampleTemplate,
};

// NOTE: make sure to remove any references to ComponentStory or ComponentMeta
const SomeExampleTemplate = (args: Story["args"]) => (
    <div>
        Example...
    </div>
);
```


### Update new docs site links

Our new docs site has a config file for each component. The config locations follow this format: `packages/site/src/content/SomeComponentName/index.tsx`.

You need to update the `links` section for this component with the new storybook link(s) for web and/or mobile. See @packages/site/src/content/Button/index.tsx for an example of what this should look like.

**IMPORTANT:** Only link to Web if you migrated web stories, and only link to Mobile if you migrated mobile stories. Some components only have one or the other.

Before:

```ts
links: [
    {
        label: "Storybook",
        url: getStorybookUrl("?path=/docs/components-example-somecomponentname--docs"),
    },
],
```

After:

```ts
links: [
    {
        label: "Web Storybook",
        type: "web",
        url: getStorybookUrl(
            "?path=/story/components-example-somecomponentname--basic",
            "web",
        ),
    },
    {
        label: "Mobile Storybook",
        type: "mobile",
        url: getStorybookUrl(
            "?path=/story/components-example-somecomponentname--basic",
            "mobile",
        ),
    },
],
```


### Update old docs page

Each component has a docs page that our v7 storybook uses.

The filename is in this format: `docs/components/SomeComponentName/SomeComponentName.stories.mdx`

You need to update this file to point to the new v9 storybook locations. See the snippet below, you need to replace `NEW-V9-WEB-PATH` and/or `NEW-V9-MOBILE-PATH` with the actual storybook paths that are expected.

**IMPORTANT:** Only link to Web if you migrated web stories, and only link to Mobile if you migrated mobile stories. Some components only have one or the other.

```md
[Web](https://atlantis.getjobber.com/storybook/web/?path=/story/NEW-V9-WEB-PATH) and [Mobile](https://atlantis.getjobber.com/storybook/mobile/?path=/story/NEW-V9-MOBILE-PATH) stories have moved to Storybook v9.
```

See @docs/components/Button/Button.stories.mdx for an example of what this looks like. Note the paths are determined by the `title` field exported from the stories, using lowercase letters and dashes instead of slashes.
