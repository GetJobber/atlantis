# Disclosure

A `<Disclosure>` component will reveal and hide additional information that our
users may care about, should they choose to learn more about it.

## Design Usage and Guidelines

- use when you want to reduce feelings of being overwhelmed and to reduce
  distractions
- used for information that is lower priority or don’t need to see all the time
- can be used to hide optional settings and controls
- for progressive disclosure of elements that aren't essential for the user to
  view all at once
- not be used for other critical information that requires immediate action

  ### How it might behave:

  - both title bar and arrow are clickable
    - an interactive title bar that has relevant info about its hidden content
    - arrow indicating the next direction if clicked
  - panel is closed on default
  - a prop that controls the revealing / hiding state
    - when “showing”, it will roll down and reveal the inner contents
    - when “hiding”, it will roll back up to hide the contents
      - at hidden state, content should have no height and not
        clickable/interactable
      - title has a `<summary>` of its content

## Content guidelines

- **Title** should be informative and label the type of content grouped in the
  body content in it
  - use `<Heading level={4}>` component
- **Content** should be actionable and clear. May contain:
  - good ol’ plain text
  - accepts any React component as a child
  - except: `<Page>`, `<Table>`

## Accessibility

- Users should be able to use their keyboard and toggle the component's
  open/close state
- Headings are permitted in `<summary>` elements to provide in-page navigational
  assistance
- Include `aria-expanded` attribute on the trigger to communicate to assistive
  technology
- Include `aria-controls` attribute ties on the trigger to the content it
  controls using the `id` of the collapsible container
- The trigger contains a downward-pointing-arrow to hint that it can be
  expanded. when the disclosure item is in expanded state, this is rotated 180
  degrees to point upwards
- The icon will be given an `aria-hidden=”true”` attribute to hide it from
  assistive technologies, as well as `focusable=”false”` to address an
  inconsistency in IE and older versions of Edge

## Responsiveness

- This component should handle both click and touch, as well as keyboard inputs
- This component should fill the width of its container
- If the component is less than `375px` wide, the title will wrap and should not
  be truncated
- Text increases/decreases when user zooms in/out

## Mockup

!["Disclosure Mockup"](https://gist.githubusercontent.com/kingstonfung/b882aa211f4213b1ac89bd515dc48a50/raw/efef596279fa0070d26b67cd364e533ca3d572bd/image2.png)

## Interface

```jsx
<Disclosure title="Advanced Options">Example content here</Disclosure>
```

## Props Table

| name            | type         | default   | description                                                                                                                                                                                                             |
| --------------- | ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title           | string       | -         | Title for the disclosure pane                                                                                                                                                                                           |
| open            | boolean      | undefined | Control if the disclosure component is open or closed                                                                                                                                                                   |
| defaultOpen     | boolean      | false     | This sets the default open state of the disclosure. By default the disclosure is closed. For use when the component is being used as an [Uncontrolled](https://reactjs.org/docs/uncontrolled-components.html) component |
| onRequestToggle | (() => void) | void      | This function would toggle the open state. For use when the component is being used as a [Controlled](https://reactjs.org/docs/forms.html#controlled-components) component                                              |

## Notes

**Trade-offs, considerations, and things we want to remember**

- We may, in the future, setup an `onchange` handler that receives
  expanded/collapsed events. For example so other parts of a page, SPA or not,
  can subscribe to this and react accordingly.
- While this is roughly based on a legacy Jobber implementation of an accordion,
  we haven't fleshed out exactly how Disclosure will behave and look if used in
  an accordion fashion
- Assumption: `<Heading level=4>` should solve most use cases for this
  component. We did consider the possibility of opening this up to other levels
  (3, maybe?) but for a simpler end-user experience are not making the heading
  level configurable from the component API at this time.

## Similar components in other design systems

https://reakit.io/docs/disclosure/

https://reach.tech/disclosure/

https://chakra-ui.com/usedisclosure

https://github.com/accessible-ui/disclosure

https://developer.apple.com/design/human-interface-guidelines/macos/buttons/disclosure-controls/

https://polaris.shopify.com/components/behavior/collapsible
