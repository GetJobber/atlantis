# Component Name

The `<Grid>` component will organize child elements into various grid layouts.

## Design Patterns

The purpose of this component is to introduce a basic layout tool into Atlantis.
Developers needed add extra CSS to their React components to add columns. Here's
an example in Jobber Online:

`app/javascript/anchor/accountSettings/components/CurrentPlanDetails/CurrentPlanDetails.module.css`

## Accessibility

I can't think of any accessibility considerations at this time.

## Responsiveness & Mobile

There's a future opportunity to change the number of rows for different
breakpoints.

## Interface

```
<Grid template={Templates.twoColumns}>
  <Content>First Column</Content>
  <Content>Second Column</Content>
</Grid>
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name     | type             | default | description |
| -------- | ---------------- | ------- | ----------- |
| template | Templates object | fit     | ...         |

The templates object would contain strings for `grid-template-columns` CSS
properties.

```
{
  "fit": "repeat(auto-fill, minmax(200px, 1fr))",
  "twoColumn": "repeat(2, 1fr)"
}
```
