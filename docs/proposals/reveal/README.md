# Reveal

The `Reveal` component will collapse content to a specified maximum height; when
interacted with that content will reveal its full content.

## Design Patterns

The goal of the `Reveal` component is to hide away secondary or supporting
information that is not immediately necessary for the current action or goal. It
allows the user to easily reveal that content when and if it becomes relevant.

The information contained in a reveal **is** important, and should be easily
discoverable. However it's not related to the typical primary action on the
page.

It should only be used to hide away context if there's a good reason to believe
it will not be relevant in the majority of cases

_Note: This is **not** a `Disclosure Control`. A `Disclosure Control` is for
advanced actions._

## Wireframe

![mockup](https://user-images.githubusercontent.com/779421/47378214-b1c90a00-d6b4-11e8-8fff-7c42eed24184.png)

## Interface

Note: The buttons that control the reveal are not part of the component.

```jsx
render() {
  const buttonText = this.state.expanded ? "Show More" : "Show Less";
  return (
    <Card>
      <Reveal expanded=this.state.expanded>
        {/* ... */}
      </Reveal>

      <button onClick={this.toggleExpanded}>{buttonText}</button>
    </Card>
  )
}
```

```jsx
render() {
  return (
    <Card>
      {this.state.expanded ||
        <CardHeader>
          <Icon onClick={this.toggleExpanded} type="arrowDown"/>
        </CardHeader>
      }
      <Reveal expanded=this.state.expanded>
        {/* ... */}
      </Reveal>

      {this.state.expanded &&
        <button onClick={this.toggleExpanded}>Show More</button>
      }
    </Card>
  )
}
```

## Props Table

| name       | type      | default | description                                                       |
| ---------- | --------- | ------- | ----------------------------------------------------------------- |
| `children` | `node`    | `null`  | The node that will be collapsed                                   |
| `expanded` | `boolean` | `false` | Whether or not this node should be rendered in it's expanded form |

## Accessibility

While collapsed the content of this container should **not** be tabbable. See
this repo for the `inert` polyfill
https://github.com/WICG/inert#notes-on-the-polyfill

When the section is expanded, the first tabbable element (if one exists) should
be focused.
