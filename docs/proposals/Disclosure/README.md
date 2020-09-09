# Component Name

A `<Disclosure>` component will hide/show content or other controls.

## Design Patterns

The disclosure component would be used to remove clutter from an interface by
hiding optional items that aren't core to the workflow.

## Accessibility

The user should be able to toggle the disclosure pane via keyboard. Color
contrast must be acceptable.

## Responsiveness & Mobile

It should handle both click/touch and be responsive to it's container.

## Wireframe

_{Insert a low fidelity wireframe of the components behaviour, enough for
someone to start building it}_

## Interface

<Disclosure title="Advanced Options"

>   <Content>

    Example content here

  </Content>
</Disclosure>

## Props Table

_{Provide a table in the following format of the component's public API}_

| name        | type    | default   | description                                                                              |
| ----------- | ------- | --------- | ---------------------------------------------------------------------------------------- |
| title       | string  | -         | Title for the disclosure pane                                                            |
| defaultOpen | boolean | false     | This sets the default open state of the disclosure. By default the disclosure is closed. |
| open        | boolean | undefined | Control if the disclosure component is open or closed                                    |

## Other

- Icon should be the same across jobber for consistency
- Some level of easing when opening the drawer
- Title should be clickable as well as icon
- Onchange event needed for tracking opens? v2?

## Similar components in other design systems

https://reakit.io/docs/disclosure/ https://reach.tech/disclosure/
https://chakra-ui.com/usedisclosure https://github.com/accessible-ui/disclosure
