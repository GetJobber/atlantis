# Drawer

The Drawer component is a temporary sidebar that provides supplemental
information. We need it because we want to provide users with related content
without navigating to a new page.

## Layout

It would appear on the right-hand side of the main content container. It would
fill the available vertical height of the parent container. A user could still
view the main content when the drawer opens.

## Behavior

A user could toggle it open and by a specified button. The user could also close
it by clicking a close button in the drawer header.

## Scenarios

Some scenarios for a Drawer component include:

- Show a list of supplementary content beside an object view
- Show a related object beside an object view
- Show a feed of content beside the current view

## Mockup

https://www.figma.com/file/q3Q0P0EEiHfjjSdI307aYf/Design-System-Contribution-Drawer?node-id=30%3A581

## Prototype

https://www.figma.com/proto/q3Q0P0EEiHfjjSdI307aYf/Design-System-Contribution-Drawer?node-id=110%3A179&scaling=min-zoom

## Interface

```
<Drawer title="Drawer Title" open=true>
  Drawer content goes here...
</Drawer>
```

## Props Table

| name      | type    | default | description                         |
| --------- | ------- | ------- | ----------------------------------- |
| title     | String  | -       | The title of the drawer             |
| open      | Boolean | -       | Renders the drawer open by default  |
| activator | Boolean | -       | The component that opens the drawer |

## Accessibility

The user should be able to navigate to the drawer by keyboard. The drawer
shouldn't overtake the main content in tab priority.

## Resources

The Jira ticket for this component:

https://jobber.atlassian.net/browse/JOB-24504

Work request drawer:

- https://github.com/GetJobber/Jobber/blob/master/app/assets/stylesheets/desktop/application.scss#L231
- https://github.com/GetJobber/Jobber/blob/master/app/assets/javascripts/desktop/utilities/drawer.js.coffee

Similar components in other design systems:

- https://material-ui.com/components/drawers/
- https://www.lightningdesignsystem.com/components/panels/
- https://ant.design/components/drawer/
- https://designsystem.quickbooks.com/component/drawers/
