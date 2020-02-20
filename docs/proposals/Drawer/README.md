# Drawer

The `<Drawer>` component will provide a dismissible right-hand side panel.

## Design Patterns

The `<Drawer>` component will allow users to view content that relates to their
main task. It would appear on the right-hand side of the screen. The component
would be toggled open and closed by a specified button or link. The component
would fill the available vertical height of the parent container. It would allow
the user to still view and interact with the main content. The user could
dismiss it once they are finished.

Some scenarios for a `<Drawer>` include the following:

- Show a list of notes beside a job detail view
- Show a work request beside a new quote form
- Show a converted quote beside an active job
- Show a list of insight cards beside a dashboard
- Show a list of unscheduled visits on the calendar

There are also some outstanding questions:

## Wireframe

https://www.figma.com/file/wKlxfdTZlrffPrPiWpEOEB/Insightful-Dashboard-Components?node-id=0%3A1

## Prototype

https://www.figma.com/proto/wKlxfdTZlrffPrPiWpEOEB/Insightful-Dashboard-Components?node-id=0%3A1&viewport=645%2C478%2C0.5&scaling=min-zoom

## Interface

```
<Drawer title="Request">
  <Content>
    Request goes here...
  </Content>
</Drawer>
```

## Props Table

| name      | type    | default | description                         |
| --------- | ------- | ------- | ----------------------------------- |
| title     | String  | -       | The title of the drawer             |
| activator | Boolean | -       | The component that opens the drawer |

## Accessibility

The user should be able to navigate to the drawer by keyboard. The drawer
shouldn't overtake the main content in tab priority.

## Resources

Work request drawer:

- https://github.com/GetJobber/Jobber/blob/master/app/assets/stylesheets/desktop/application.scss#L231
- https://github.com/GetJobber/Jobber/blob/master/app/assets/javascripts/desktop/utilities/drawer.js.coffee

Similar components in other design systems:

- https://material-ui.com/components/drawers/
- https://www.lightningdesignsystem.com/components/panels/
- https://ant.design/components/drawer/
- https://designsystem.quickbooks.com/component/drawers/

The Jira ticket for this component:
https://jobber.atlassian.net/browse/JOB-18723
