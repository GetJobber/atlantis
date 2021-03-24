# Popover

An out-of-the-box component combining functionality from PopperJS with Jobber's
design system for displaying popovers attached to and pointing to other elements
on the page.

## Design Patterns

First iteration will be used to inform users of changes to features and views
when they initially encounter them. The popover will be displayed on
_first-render_ and be dismissible.

> This component relates to the Tooltip component and might develop (private)
> base components that the existing Tooltip component in a follow iteration
> might implement to replace it's usage of `@popper/core`

## Accessibility

- Inject focus order when displayed after a user interaction with the attached
  element?
- [Behave like a modal?](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html)

## Responsiveness & Mobile

The component should look and behave the same on small screens. When providing
specific arrow placement, developers are responsible for choosing the optimal
option based on responsive information.

## Wireframe

[Design in Figma](https://www.figma.com/file/i2CF0Qou8QIzhs8umPvnnB/Design-System-Contribution-%5BPopover%5D?node-id=26%3A2)

## Interface

```tsx
// AttachPdfToQuote.tsx
// Using render props to display a dismiss button inside the popover
...
const AttachPdfToQuote = (props { checked: boolean}) => {
  const checkboxRef = useRef()
  const dontTellMeAnyMore = () => { ... }
    const [toggled, setToggled] = useState(true)

    const onDismiss = () => {
        setToggled(false)
        dontTellMeAnymore()
    }

  return (
    <>
      <Checkbox
        checked={props.checked}
        ref={checkboxRef} checked
      >
        Attach quote as PDF
      </Checkbox>

      <Popover
        attachTo={checkboxRef}
                open={toggled}
        onRequestClose={onDismiss}
      >
                <Card>
                    <strong>
                        Attachments are excluded by default now!
                    </strong>
                    <button onClick={onDismiss}>
                        Okay!
                    </button>
                </Card>
      </Popover>
    </>
  )
}
```

## Props Table

### Popover

| name           | type                                            | required? | default   | description                                                                                               |
| -------------- | ----------------------------------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------- |
| attachTo       | `HTMLElement \| React.Ref<HTMLElement \| null>` | ✓         |           | Element the popover will attach to and point at.                                                          |
| activateOn     | `"click" \| "focus"`                            |           | `"click"` | When `attachTo` is React node it it will be cloned and the popover will be toggled _on click_ by default. |
| dismissable    | `boolean`                                       |           | `true`    | Whether or not the popover is dismissable.                                                                |
| open           | `boolean`                                       |           | `false`   | Control popover viability.                                                                                |
| children       | `React.ReactNode`                               | ✓         |           | Pop-over content.                                                                                         |
| onRequestClose | `() => void`                                    |           |           | Callback executed when the user wants to close/dismiss the popover                                        |

```ts
type propsPopover = {
    attachTo: HTMLElement | React.Ref<HTMLElement | null>;
    dismissable?: boolean;
    open?: boolean;
    children: React.ReactNode |
    onRequestClose?: () => void;
}
```

### Resources

[Proof of concept on Codesandbox](https://codesandbox.io/s/dreamy-swirles-8k908?file=/src/App.tsx)
_(primarily focused on styling the arrow)_
