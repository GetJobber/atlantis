# Reveal

The `Reveal` component will collapse content to a specified maximum height; when interacted with that content will reveal its full content.

## Design Patterns

The goal of the `Reveal` component is to hide away secondary or supporting information that is not immediately necessary for the current action or goal. It allows the user to easily reveal that content when and if it becomes relevant.

The information contained in a reveal **is** important, and should be easily discoverable. However it's not related to the typical primary action on the page.

It should only be used to hide away context if there's a good reason to believe it will not be relevant in the majority of cases

_Note: This is **not** a `Disclosure Control`. A `Disclosure Control` is for advanced actions._

## Wireframe
![collapse element](https://user-images.githubusercontent.com/779421/47315129-e4b1c600-d600-11e8-822e-837f2125bc78.png)

## Interface
```jsx
<Reveal collapsedHeight="2 em">
  <ul class="list">
    <!-- ... Content of the list that will be collapsed -->
  </ul>
</Reveal>
```

## Props Table
| name | type | default | description |
|---|---|---|---|
| `collapsedHeight` |  `string` | '0em' | The height of the component when it is collapsed |
| `children` | `node` | `null` | The node that will be collapsed |
