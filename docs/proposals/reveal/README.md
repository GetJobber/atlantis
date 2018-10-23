# Reveal

The `Reveal` component will collapse content to a specified maximum height; when interacted with that content will reveal its full content.

## Design Patterns

The goal of the `Reveal` component is to hide away secondary or supporting information that is not immediately necessary for the current action or goal. It allows the user to easily reveal that content when and if it becomes relevant.

The information contained in a reveal **is** important, and should be easily discoverable. However it's not related to the typical primary action on the page.

It should only be used to hide away context if there's a good reason to believe it will not be relevant in the majority of cases

_Note: This is **not** a `Disclosure Control`. A `Disclosure Control` is for advanced actions._

## Wireframe
![mockup](https://user-images.githubusercontent.com/779421/47378214-b1c90a00-d6b4-11e8-8fff-7c42eed24184.png)

## Interface
```jsx
<Reveal>
  <!-- ... Content elements that will be collapsed -->
</Reveal>
```

## Props Table
| name | type | default | description |
|---|---|---|---|
| `children` | `node` | `null` | The node that will be collapsed |
