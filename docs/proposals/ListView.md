# Component Name

The `ListPage` component will provide the structure and parts needed to display
a list view.

## Design Patterns

_{Describe the design goal of this component. What is the design purpose of this
component? How do its responsibilities relate to other components? Is there
anything else that is important to describe?}_

There is a desire to provide developers with page templates to both speed up the
development of pages but also provide our users with a more consistent
experience.

A first step in this is imagining what a common `ListPage` component would look
like. It would need to have some level of flexibility to allow for use on
different pages but still provide common "slots" or areas where.

## Accessibility

_{Describe the accessibility concerns for the component. Should it be keyboard
navigatable? Should it capture input, what should a screen reader see when it's
focused?}_

As a primarily layout component we don't have a lot of interaction concerns on
the ListPage but, we should ensure that we're using semantically appropriate
tags wherever possible to aid in readability and navigation.

## Responsiveness & Mobile

_{How should the component behave on mobile devices or tablets. How does it
respond to different screen sizes. How does it handle touch only interactions?}_

The list page consists of a few main areas. The List Body itself, an open
ListItem, a ListSummary and a CtaContainer.

When in a mobile viewport they should be organized as follows:

- ListSummary
- ListBody
- CtaContainer

ListItem would then open as a pane top of the "page".

## Wireframe

https://www.figma.com/file/qw8HnK3rBDHGf44RVksCXT/JOB-20476-Manage-Team?node-id=139%3A245

## Interface

Should we include items as a list prop? We could nest a list view? How to handle
the sidebar / drawer?

Still doing some iteration on this part. There are a few options we can consider

```tsx
Foo = Component

<ListPage
  title="Page Title"
  intro="Description of this page."
  actions={[ButtonProps]}
  filters={}
  searchable={true}

  listType={table | list}
  listItems={[]}
  cells={[Text, Action, Number, Foo]}
>
  <list />

  <listItemRow>
    <Cell></Cell>
  </listItemRow>

  <listItem />
  <listSummary />
  <ctaContainer />
</ListPage>
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| ...  | ...  | ...     | ...         |
