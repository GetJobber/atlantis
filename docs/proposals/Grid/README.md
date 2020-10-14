# Component Name

The `<Grid>` component will organize child elements into a Flexbox row.

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

## Wireframe

_{Insert a low fidelity wireframe of the components behaviour, enough for
someone to start building it}_

## Interface

```
<Grid columns-on-small>
  <Content>First Column</Content>
  <Content>Second Column</Content>
</Grid>
```

## Props Table

_{Provide a table in the following format of the component's public API}_

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| ...  | ...  | ...     | ...         |
