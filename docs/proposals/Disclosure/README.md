# Disclosure

A `<Disclosure>` component will reveal and hide additional information that our
users may care about, should they choose to learn more about it.

## Design Usage and Guidelines

- use when you want to reduce feelings of being overwhelmed and to reduce
  distractions
- used for lightweight editing, such as selecting a value for a setting
- used for information that is lower priority or don’t need to see all the time
- not be used for other critical information that requires immediate action

## Content Guidelines

- A title that should be informative and label the type of content grouped in
  the body content in it
- Content should be actionable and clear
- A `<Content>` component is recommended to properly encapsulate the details

## Accessibility

- Headings are permitted in
  [`<summary>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary)
  to provide in-page navigational assistance
- Users should be able to use their keyboard and toggle the component's
  open/close state
- Since the component is presented with a title and arrow icon, users should
  still be able to use and navigate the content with ease
- In HTML, there is a
  [`<details>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
  that serves very similar purpose
- Because this is similar to `<details>` HTML element, we can use the
  [`"group"` ARIA role](https://w3c.github.io/aria/#group) to form a collection
  of related items that are recognizable by assistive technologies
- As of writing, there are no equalvant component found in React Native's
  [Core Component](https://reactnative.dev/docs/components-and-apis) library

## Responsiveness

- This component should handle both click and touch, as well as keyboard inputs
- This component should fill the width of its container
- If the component is less than `375px` wide, the title will wrap and should not
  be truncated
- Text increases/decreases when user zooms in/out

## Mockup

_{Insert a low fidelity wireframe of the components behaviour, enough for
someone to start building it}_

## Interface

```jsx
<Disclosure title="Advanced Options">
  <Content>Example content here</Content>
</Disclosure>
```

## Props Table

| name            | type         | default   | description                                                                                                                                                                                                             |
| --------------- | ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title           | string       | -         | Title for the disclosure pane                                                                                                                                                                                           |
| open            | boolean      | undefined | Control if the disclosure component is open or closed                                                                                                                                                                   |
| defaultOpen     | boolean      | false     | This sets the default open state of the disclosure. By default the disclosure is closed. For use when the component is being used as an [Uncontrolled](https://reactjs.org/docs/uncontrolled-components.html) component |
| onRequestToggle | (() => void) | void      | This function would toggle the open state. For use when the component is being used as a [Controlled](https://reactjs.org/docs/forms.html#controlled-components) component                                              |

## Notes

- `onchange` event for tracking when opens; we may want to consider this in the
  future so the component can broadcast its changes to other interested
  subscribers
- This component should be stackable with some/minimal modifications, so that it
  can form a `<Accordion>` component for the future
- The content must not be interactable when this component is collapsed, those
  content should also ignore any pointer events when it is hidden away

## Similar components in other design systems

https://reakit.io/docs/disclosure/

https://reach.tech/disclosure/

https://chakra-ui.com/usedisclosure

https://github.com/accessible-ui/disclosure

https://developer.apple.com/design/human-interface-guidelines/macos/buttons/disclosure-controls/

https://polaris.shopify.com/components/behavior/collapsible
