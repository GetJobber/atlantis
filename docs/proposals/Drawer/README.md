# Component Name

The `<Drawer>` component will provide a dismissible side panel.

## Design Patterns

`<Drawer>` It will allow the user to view related content to their main task.
Unlike a `<Modal>`, it will not obscure the main content from the user.

Some scenarios for a `<Drawer>` include the following:

- Show a list of notes beside a job detail view
- Show a work request beside a new quote form
- Show a converted quote beside an active job
- Show a list of insight cards beside a dashboard

There are also some outstanding questions:

- Should the drawer be full-height of the viewport or just the parent container?
- How should the drawer animate when it opens and closed?
- Should we include an option for left-hand and right-hand drawers?
- Do all drawers need to be dismissible? What about an always-open version?
- Could the unscheduled visits accordion on the calendar turn into a drawer?

## Wireframe

https://www.figma.com/file/wKlxfdTZlrffPrPiWpEOEB/Insightful-Dashboard-Components?node-id=0%3A1

## Interface

```
<Drawer title="Request" subtitle="2020-02-10">
  <Content>
    Request goes here...
  </Content>
</Drawer>
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name      | type    | default | description                                             |
| --------- | ------- | ------- | ------------------------------------------------------- |
| title     | String  | -       | The title of the drawer                                 |
| subtitle  | String  | -       | The subtitle of the drawer                              |
| overlay   | String  | -       | If the drawer overlays the main content or displaces it |
| open      | Boolean | -       | If the drawer is visible                                |
| activator | Boolean | -       | The component that opens the drawer                     |

## Accessibility

Because the drawer is secondary content it shouldn't overtake the main content
in tab priority.
